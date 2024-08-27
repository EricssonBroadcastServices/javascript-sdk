import { useQueries, useQuery, UseQueryResult } from "react-query";
import { QueryKeys } from "../util/react-query";
import { useAppService } from "./useApi";
import { useTagList } from "../hooks/useTags";
import { useUserSession } from "../hooks/useUserSession";
import { TApiHook } from "../types/type.apiHook";
import { useCountryCode } from "./useGeolocation";
import {
  IExposureWLCategoriesComponent,
  IExposureWLPage,
  ResolvedComponent,
  WLConfig
} from "@ericssonbroadcastservices/app-sdk";
import { useSelectedLanguage } from "./useSelectedLanguage";
import { useTranslations } from "./useTranslations";
import { useMemo } from "react";
import { useAppError } from "./useAppError";
import { useConfig } from "./useConfig";
import { TagList } from "@ericssonbroadcastservices/rbm-ott-sdk";

export enum PageType {
  PAGE = "page",
  ASSET = "asset",
  TAG = "tag",
  BROWSE = "browse",
  PARTICIPANT = "participant",
  PLAY = "play",
  SEE_ALL = "seeAll"
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
  const somethingIsFetching = results.some(r => r.isFetching);
  const data = useMemo(() => {
    if (somethingIsLoading) {
      return null;
    }
    return results
      .filter(r => r.data?.component && r.data.presentationParameters)
      .map(r => r.data) as ResolvedComponent<any>[];
    // We only want to recalculate the data when the complete response is meaningfull to the app.
    // Hence we return null when something is loading, and rerun the calculation whenever something is fetching(updating)
    // adding results as a dep in useMemo would increase the number of renders since it would recaluculate data, every time
    // a since query completes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [somethingIsFetching, somethingIsLoading]);

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

export function useResolvedSeeAllPage(pageId: string): TApiHook<ResolvedComponent<any>[]> {
  const [tagList] = useTagList();
  const countryCode = useCountryCode();
  const appService = useAppService();
  const [config] = useConfig();
  const [page, pageLoading, pageError] = usePage(WLConfig.getHomePageId(config) || "");
  const [userSession] = useUserSession();
  const filterPage = page?.components.pageBody.filter(p => p.referenceId === pageId);
  const results: UseQueryResult<ResolvedComponent>[] = useQueries(
    (filterPage || []).map(reference => {
      return {
        retry: false,
        staleTime: reference.hasAuthorizedContent ? 0 : 1000 * 60 * 10,
        queryKey: [
          PageType.SEE_ALL,
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
          return appService.getSeeAllPage({ wlReference: reference, countryCode });
        }
      };
    })
  ) as UseQueryResult<ResolvedComponent<any>>[];

  const somethingIsLoading = results.some(r => r.isLoading) || pageLoading;
  const somethingIsFetching = results.some(r => r.isFetching);
  const data = useMemo(() => {
    if (somethingIsLoading) {
      return null;
    }
    return results
      .filter(r => r.data?.component && r.data.presentationParameters && r.data.component.id === pageId)
      .map(r => r.data)
      ?.map(p => ({
        ...p,
        component: {
          ...p?.component,
          appType: PageType.SEE_ALL
        }
      })) as ResolvedComponent<any>[];
  }, [somethingIsFetching, somethingIsLoading]);

  const componentError = useMemo(() => {
    return results.find(r => !!r.error)?.error;
  }, [results]);
  const appError = useAppError(componentError);

  return [data, somethingIsLoading, pageError || appError];
}

export function useGetCategoriesComponentNextPage(
  categoriesComponent: IExposureWLCategoriesComponent | undefined,
  nextPageNumber: number
): TApiHook<TagList> {
  const appService = useAppService();

  const url = new URL(categoriesComponent?.contentUrl?.url || "", appService.context.baseUrl);
  const params = new URLSearchParams(url.search);
  params.set("pageNumber", nextPageNumber.toString());
  if (categoriesComponent?.contentUrl?.url) {
    categoriesComponent.contentUrl.url = url.pathname + `?${params.toString()}`;
  }
  const { data, isLoading, error } = useQuery(
    [categoriesComponent],
    () => {
      return categoriesComponent && appService.getCategoriesContent(categoriesComponent);
    },
    { staleTime: 1000 * 60 * 10, enabled: !!categoriesComponent && !!categoriesComponent.contentUrl }
  );

  const errorResult = useAppError(error);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => [data || null, isLoading, errorResult], [nextPageNumber, errorResult, isLoading]);
}
