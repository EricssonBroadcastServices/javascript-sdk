import { WLAsset } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useQuery } from "react-query";
import { QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";
import { useDeprecatedWLApi } from "./useApi";
import { useConfig } from "./useConfig";
import { useDebounce } from "./useDebounce";

export function useSearch(term: string, debounceTime = 300): TApiHook<WLAsset[]> {
  const deprecatedWlApi = useDeprecatedWLApi();
  const searchUrl = useConfig()[0]?.apiConfig.search.internalUrl;
  const debouncedTerm = useDebounce(term, debounceTime);
  const { data, isLoading, error } = useQuery([QueryKeys.SEARCH, debouncedTerm], () => {
    if (!searchUrl || !debouncedTerm || term === "") return;
    return deprecatedWlApi.search({ url: searchUrl, searchTerm: debouncedTerm });
  });
  const isLoadingOrDebouncing = term !== "" && (isLoading || term !== debouncedTerm);
  return [data || null, isLoadingOrDebouncing, error];
}
