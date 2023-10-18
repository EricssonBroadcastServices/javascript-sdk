import { WLAsset } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useQuery } from "react-query";
import { useRedBeeState } from "../RedBeeProvider";
import { useDeprecatedWLApi } from "./useApi";
import { TApiHook } from "../types/type.apiHook";
import { QueryKeys } from "../util/react-query";

export function useAsset(identifier?: string): TApiHook<WLAsset> {
  const deprecatedWlApi = useDeprecatedWLApi();
  const { customer, businessUnit, selectedLanguage } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.ASSET, identifier, customer, businessUnit, selectedLanguage],
    () => {
      if (!customer || !businessUnit || !identifier) return;
      return deprecatedWlApi.getAssetById({
        assetId: identifier,
        customer,
        businessUnit,
        locale: selectedLanguage as string
      });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}
