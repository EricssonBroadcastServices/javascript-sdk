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

export enum PageType {
  PAGE = "page",
  ASSET = "asset",
  BROWSE = "browse",
  PLAY = "play"
}

export function usePage(pageId: string, pageType: PageType): TApiHook<IExposureWLPage> {
  const appService = useAppService();
  const countryCode = useCountryCode();
  const { data, isFetching, error } = useQuery(
    [QueryKeys.PAGE, pageId, countryCode],
    () => {
      if (!countryCode) return;
      switch (pageType) {
        case PageType.ASSET:
          // TODO: implement asset page once meta adds that feature to the cms
          return null;
        case PageType.BROWSE:
          // TODO: implement tag and participants pages once meta adds that feature to the cms
          return null;
        default:
          return appService.getComponentById<IExposureWLPage>({ componentId: pageId, countryCode });
      }
    },
    { staleTime: 1000 * 60 * 10 }
  );
  if (isFetching) return [null, true, error];
  return [data || null, isFetching, error];
}

export function useResolvedPage(pageId: string, pageType: PageType): TApiHook<ResolvedComponent<any>[]> {
  const [tagList] = useTagList();
  const countryCode = useCountryCode();
  const appService = useAppService();
  const [page, pageLoading, pageError] = usePage(pageId, pageType);
  const [userSession] = useUserSession();
  const results: UseQueryResult<ResolvedComponent>[] = useQueries(
    (page?.components.pageBody || []).map(reference => {
      return {
        retry: false,
        staleTime: reference.hasAuthorizedContent ? 0 : 1000 * 60 * 10,
        queryKey: [
          countryCode,
          reference.appSubType,
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
  if (somethingIsLoading) {
    return [null, true, pageError || results.find(r => !!r.error)?.error];
  }
  return [
    results
      .filter(r => r.data?.component && r.data.presentationParameters)
      .map(r => r.data) as ResolvedComponent<any>[],
    false,
    pageError || results.find(r => !!r.error)?.error
  ];
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
  return [data || null, isLoading, error];
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
  return [data || null, isLoading, error];
}
