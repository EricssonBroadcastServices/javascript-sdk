import { useQueries, useQuery, UseQueryResult } from "react-query";
import { QueryKeys } from "../util/react-query";
import { useAppService } from "./useApi";
import { useTagList } from "../hooks/useTags";
import { useUserSession } from "../hooks/useUserSession";
import { TApiHook } from "../types/type.apiHook";
import { useCountryCode } from "./useGeolocation";
import { IExposureWLPage, ResolvedComponent } from "@ericssonbroadcastservices/app-sdk";
import { useSelectedLanguage } from "./useSelectedLanguage";
import { useTranslations } from "./useTranslations";
import { useMemo } from "react";
import { useAppError } from "./useAppError";

export enum PageType {
  PAGE = "page",
  ASSET = "asset",
  TAG = "tag",
  BROWSE = "browse",
  PARTICIPANT = "participant",
  PLAY = "play"
}

export function usePage(pageId: string): TApiHook<IExposureWLPage> {
  const appService = useAppService();
  const countryCode = useCountryCode();
  const { data, isFetching, error } = useQuery(
    [QueryKeys.PAGE, pageId, countryCode],
    () => {
      if (!countryCode) return;
      return appService.getComponentById<IExposureWLPage>({ componentId: pageId, countryCode });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  const appError = useAppError(error);
  if (isFetching) return [null, true, appError];
  return [data || null, isFetching, appError];
}

export function useResolvedComponentPage(pageId: string): TApiHook<ResolvedComponent<any>[]> {
  const [tagList] = useTagList();
  const countryCode = useCountryCode();
  const appService = useAppService();
  const [page, pageLoading, pageError] = usePage(pageId);
  const [userSession] = useUserSession();
  const results: UseQueryResult<ResolvedComponent>[] = useQueries(
    (page?.components.pageBody || []).map(reference => {
      return {
        retry: false,
        staleTime: reference.hasAuthorizedContent ? 0 : 1000 * 60 * 10,
        queryKey: [
          reference.appSubType,
          countryCode,
          reference.referenceId,
          reference.parameters,
          reference.referenceUrl,
          reference.hasAuthorizedContent ? userSession?.sessionToken : null,
          reference?.appSubType === "TagFeedQuery" ? tagList?.query : null
        ],
        queryFn: async () => {
          if (!countryCode) return;
          if (!userSession?.isLoggedIn() && reference.hasAuthorizedContent === true) {
            return undefined;
          }
          return appService.getResolvedComponentByReference({ wlReference: reference, countryCode });
        }
      };
    })
  ) as UseQueryResult<ResolvedComponent<any>>[];

  const somethingIsLoading = results.some(r => r.isLoading) || pageLoading;

  const data = useMemo(() => {
    if (somethingIsLoading) {
      return null;
    }
    return results
      .filter(r => r.data?.component && r.data.presentationParameters)
      .map(r => r.data) as ResolvedComponent<any>[];
  }, [results, somethingIsLoading]);
  const componentError = useMemo(() => {
    return results.find(r => !!r.error)?.error;
  }, [results]);
  const appError = useAppError(componentError);

  return [data, somethingIsLoading, pageError || appError];
}

export function useResolvedAssetPage(assetId: string): TApiHook<ResolvedComponent[]> {
  const appService = useAppService();
  const locale = useSelectedLanguage();
  const [translations] = useTranslations();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.ASSET, assetId, translations],
    () => {
      if (!translations) return;
      return appService.getAssetPage(assetId, locale, translations);
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, useAppError(error)];
}

export function useResolvedTagPage(tagId: string): TApiHook<ResolvedComponent[]> {
  const appService = useAppService();
  const locale = useSelectedLanguage();
  const [translations] = useTranslations();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.ASSET, tagId, translations],
    () => {
      if (!translations) return;
      return appService.getTagPage(tagId, locale);
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, useAppError(error)];
}

export function useResolvedParticipantPage(participantName: string): TApiHook<ResolvedComponent[]> {
  const appService = useAppService();
  const { data, isLoading, error } = useQuery(
    [participantName],
    () => {
      return appService.getParticipantPage(participantName);
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, useAppError(error)];
}
