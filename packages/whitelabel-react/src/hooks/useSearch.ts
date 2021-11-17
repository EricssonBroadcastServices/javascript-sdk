import { WLAsset } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useQuery } from "react-query";
import { QueryKeys } from "../util/react-query";
import { TApiHook } from "./type.apiHook";
import { useWLApi } from "./useApi";
import { useConfig } from "./useConfig";
import { useDebounce } from "./useDebounce";

export function useSearch(term: string, debounceTime = 300): TApiHook<WLAsset[]> {
  const wlApi = useWLApi();
  const searchUrl = useConfig()?.apiConfig.search.internalUrl;
  const debouncedTerm = useDebounce(term, debounceTime);
  const { data, isLoading } = useQuery([QueryKeys.SEARCH, debouncedTerm], () => {
    if (!searchUrl || !term || term === "") return;
    return wlApi.search({ url: searchUrl, searchTerm: term });
  });
  return [data || null, isLoading];
}
