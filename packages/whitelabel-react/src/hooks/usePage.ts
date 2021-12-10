import { PreferenceListTags } from "@ericssonbroadcastservices/exposure-sdk";
import {
  WLAsset,
  WLCarousel,
  WLCategoriesComponent,
  WLComponentSubType,
  WLComponentType,
  WLEpgComponent,
  WLHerobanner,
  WLImageComponent,
  WLPageModel,
  WLReference,
  WLTextComponent
} from "@ericssonbroadcastservices/whitelabel-sdk";
import { useQueries, useQuery, UseQueryResult } from "react-query";
import { QueryKeys } from "../util/react-query";
import { useWLApi } from "./useApi";
import { useRedBeeState } from "../RedBeeProvider";
import { useTagList } from "../hooks/useTagList";
import { useSetSelectedLanguage } from "../hooks/useSelectedLanguage";
import { useUserSession } from "../hooks/useUserSession";
import { TApiHook } from "../types/type.apiHook";

export enum PageType {
  PAGE = "page",
  ASSET = "asset",
  BROWSE = "browse",
  PLAY = "play"
}

export type TWLComponent =
  | WLCarousel
  | WLTextComponent
  | WLAsset
  | WLEpgComponent
  | WLHerobanner
  | WLImageComponent
  | WLCategoriesComponent;

export function usePage(pageId: string, pageType: PageType): TApiHook<WLPageModel> {
  const wlApi = useWLApi();
  const { customer, businessUnit, selectedLanguage } = useRedBeeState();
  const { data, isFetching, error } = useQuery(
    [QueryKeys.PAGE, pageId, selectedLanguage],
    () => {
      if (!customer || !businessUnit) return;
      switch (pageType) {
        case PageType.ASSET:
          return wlApi.getAssetPageById({
            assetId: pageId,
            customer,
            businessUnit,
            locale: selectedLanguage as string
          });
        case PageType.BROWSE:
          return wlApi.getPageByBase64Query({
            customer,
            businessUnit,
            locale: selectedLanguage as string,
            query: pageId
          });
        default:
          return wlApi.getPage({ pageId, customer, businessUnit, locale: selectedLanguage as string });
      }
    },
    { staleTime: 1000 * 60 * 10 }
  );
  if (isFetching) return [null, true, error];
  return [data || null, isFetching, error];
}

function getComponentConstructor(reference: WLReference) {
  switch (reference.type) {
    case WLComponentType.CAROUSEL:
      return WLCarousel;
    case WLComponentType.HEROBANNER:
      return WLHerobanner;
    case WLComponentType.ASSET_DISPLAY:
      return WLAsset;
    case WLComponentType.IMAGE:
      return WLImageComponent;
    case WLComponentType.TEXT:
      return WLTextComponent;
    case WLComponentType.EPG:
      return WLEpgComponent;
    case WLComponentType.TAG_TYPE:
      return WLCategoriesComponent;
    default:
      throw `unknown component type ${reference.type} ${reference.subType}`;
  }
}
export interface IResolvedComponent {
  component: TWLComponent;
  reference: WLReference;
}

export function useResolvedPage(pageId: string, pageType: PageType): TApiHook<IResolvedComponent[]> {
  const [tagList] = useTagList();
  const selectedLanguage = useSetSelectedLanguage();
  const wlApi = useWLApi();
  const [page, pageLoading, pageError] = usePage(pageId, pageType);
  const [userSession] = useUserSession();
  const results: UseQueryResult<IResolvedComponent>[] = useQueries(
    (page?.components || []).map(reference => {
      return {
        retry: false,
        staleTime: reference.authorized ? 0 : 1000 * 60 * 10,
        refetchInterval: reference.reloadInterval,
        queryKey: [
          selectedLanguage,
          reference.id,
          reference.presentation.layout,
          reference.authorized ? userSession?.sessionToken : null,
          reference?.subType === WLComponentSubType.TAG_FEED_QUERY ? tagList?.query : null
        ],
        queryFn: async () => {
          if (!userSession?.isLoggedIn() && reference.authorized === true) {
            return undefined;
          }
          let internalUrl: string | undefined = reference.internalUrl;
          if (reference?.subType === WLComponentSubType.TAG_FEED_QUERY && reference?.urlVariables) {
            if (!!tagList && tagList.items.length) {
              reference.urlVariables.forEach(urlVariable => {
                internalUrl = internalUrl?.replace(
                  `{${urlVariable}}`,
                  (tagList as PreferenceListTags & { [key: string]: any })[`${urlVariable}`]
                );
              });
            } else {
              return;
            }
          }
          return {
            component: await wlApi.getComponentByInternalUrl<TWLComponent>({
              internalUrl,
              type: getComponentConstructor(reference),
              useAuthHeader: reference.authorized
            }),
            reference: reference
          };
        }
      };
    })
  ) as UseQueryResult<IResolvedComponent>[];
  const somethingIsLoading = results.some(r => r.isLoading) || pageLoading;
  if (somethingIsLoading) {
    return [null, true, pageError || results.find(r => !!r.error)?.error];
  }
  return [
    results.filter(r => r.data?.component && r.data.reference).map(r => r.data) as IResolvedComponent[],
    false,
    pageError || results.find(r => !!r.error)?.error
  ];
}
