import { useQuery } from "react-query";
import { QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";
import { useServiceContext } from "./useApi";
import { useDebounce } from "./useDebounce";
import { SearchList, searchAsset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useSystemConfigV2 } from "./useSystemConfig";
import { useCountryCode } from "./useGeolocation";

export function useSearch(term: string, debounceTime = 300): TApiHook<SearchList> {
  const ctx = useServiceContext();
  const debouncedTerm = useDebounce(term, debounceTime);
  const [systemConfig] = useSystemConfigV2();
  const countryCode = useCountryCode();
  const { data, isLoading, error } = useQuery([QueryKeys.SEARCH, debouncedTerm], () => {
    if (!debouncedTerm || term === "") return;
    return searchAsset.call(ctx, {
      query: term,
      locales: systemConfig?.frontendFeatures.searchLocales,
      allowedCountry: countryCode
    });
  });
  const isLoadingOrDebouncing = term !== "" && (isLoading || term !== debouncedTerm);
  return [data || null, isLoadingOrDebouncing, error];
}
