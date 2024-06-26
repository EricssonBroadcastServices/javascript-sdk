import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false
    }
  }
});

/** @description refetch app data by invalidating the cache. Including geolocation, app config, components, menu, session */
export function refetchAppData() {
  queryClient.invalidateQueries();
}

export enum QueryKeys {
  ESSENTIAL_APP_DATA = "essentialAppData",
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
  PURCHASE_TRANSACTIONS = "purchaseTransactions",
  PRODUCT_OFFERINGS = "productOfferings",
  FAVORITE_ASSET_IN_LIST = "favorite_asset_in_list",
  BOOKMARKS = "bookmarks",
  SYSTEM_CONFIG_V2 = "systemConfigV2",
  TAGS = "tags",
  AVAILABILITY_KEYS = "availabilityKeys",
  PAYMENT_METHODS = "paymentMethods",
  ON_NOW = "onNow"
}
