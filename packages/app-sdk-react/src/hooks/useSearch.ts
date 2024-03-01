import { useQuery } from "react-query";
import { QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";
import { useServiceContext } from "./useApi";
import { useDebounce } from "./useDebounce";
import { Asset, SearchList, getAssets, searchAsset, searchV3 } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useSystemConfigV2 } from "./useSystemConfig";
import { useCountryCode } from "./useGeolocation";
import { useConfig } from "./useConfig";
import { useAppError } from "./useAppError";

/** return assets matching the provided search term */
export function useSearch(term: string, debounceTime = 300): TApiHook<SearchList> {
  const ctx = useServiceContext();
  const debouncedTerm = useDebounce(term, debounceTime);
  const [systemConfig] = useSystemConfigV2();
  const countryCode = useCountryCode();
  const [config] = useConfig();
  const { data, isLoading, error } = useQuery([QueryKeys.SEARCH, debouncedTerm], () => {
    if (!debouncedTerm || term === "") return;
    return searchAsset.call(ctx, {
      query: term,
      locale: systemConfig?.frontendFeatures.searchLocales,
      allowedCountry: countryCode,
      types: config?.parameters.assetSearchTypes
    });
  });
  const isLoadingOrDebouncing = term !== "" && (isLoading || term !== debouncedTerm);
  return [data || null, isLoadingOrDebouncing, useAppError(error)];
}

type TSearchParams = {
  debounceTime?: number;
  /** tag schemes to include in tag results */
  schemes?: string[];
  term: string;
};

/** return assets matching the provided search term
 * or assets tagged with a tag matching the provided search term.  */
export function useExpandedSearch({
  debounceTime = 300,
  schemes = ["other", "genre", "category"],
  term
}: TSearchParams): TApiHook<Asset[]> {
  const ctx = useServiceContext();
  const debouncedTerm = useDebounce(term, debounceTime);
  const [systemConfig] = useSystemConfigV2();
  const countryCode = useCountryCode();
  const [config] = useConfig();
  const { data, isLoading, error } = useQuery([QueryKeys.SEARCH, debouncedTerm], () => {
    if (!debouncedTerm || term === "") return;
    return searchV3
      .call(ctx, {
        query: term,
        locale: systemConfig?.frontendFeatures.searchLocales,
        allowedCountry: countryCode,
        types: config?.parameters.assetSearchTypes,
        schemes
      })
      .then(async res => {
        const tagHits = res.tagHits?.items;
        if (!tagHits || tagHits.length === 0) return res.assetHits?.items.map(a => a.asset) || [];
        const tagHitIds = tagHits.map(i => i.tag?.tagId);
        const query = `tags.tagId:${tagHitIds.join(" OR ")}`;
        return getAssets.call(ctx, { allowedCountry: countryCode, query, pageSize: 100 }).then(tagAssets => {
          const assetHits = res.assetHits?.items.map(a => a.asset) || [];
          return [...assetHits, ...tagAssets.items];
        });
      });
  });
  const isLoadingOrDebouncing = term !== "" && (isLoading || term !== debouncedTerm);
  return [
    data?.filter((a, i, arr) => arr.findIndex(b => b?.assetId === a?.assetId) === i) || null,
    isLoadingOrDebouncing,
    useAppError(error)
  ];
}
