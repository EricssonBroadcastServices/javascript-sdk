import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false
    }
  }
});

export enum QueryKeys {
  ASSET = "asset",
  CONTINUE_WATCHING = "continueWatching",
  COMPONENT = "component",
  CONFIG = "config",
  PAGE = "PAGE",
  TRANSLATIONS = "translations",
  USER_LOCATION = "userLocation",
  TAGS_LIST = "tagsList",
  USER_DETAILS = "userDetails",
  SEARCH = "search",
  ASSET_ENTITLEMENT = "assetEntitlement",
  PURCHASES = "purchases",
  PRODUCT_OFFERINGS = "productOfferings",
  FAVORITE_ASSET_IN_LIST = "favorite_asset_in_list",
  BOOKMARKS = "bookmarks",
  SYSTEM_CONFIG_V2 = "systemConfigV2"
}
