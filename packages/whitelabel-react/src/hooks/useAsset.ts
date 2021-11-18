import { WLAsset } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useQuery } from "react-query";
import { useRedBeeState, useWLApi } from "..";
import { TApiHook } from "../types/type.apiHook";

export function useAsset(identifier: string): TApiHook<WLAsset> {
  const wlApi = useWLApi();
  const { customer, businessUnit, selectedLanguage } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [identifier, customer, businessUnit, selectedLanguage],
    () => {
      if (!customer || !businessUnit) return;
      return wlApi.getAssetById({ assetId: identifier, customer, businessUnit, locale: selectedLanguage as string });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}
