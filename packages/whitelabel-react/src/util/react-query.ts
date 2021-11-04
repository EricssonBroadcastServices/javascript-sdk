import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false
    }
  }
});

export enum QueryKeys {
  COMPONENT = "component",
  CONFIG = "config",
  PAGE = "PAGE",
  TRANSLATIONS = "translations",
  USER_LOCATION = "userLocation",
  TAGS_LIST = "tagsList",
  USER_DETAILS = "userDetails"
}
