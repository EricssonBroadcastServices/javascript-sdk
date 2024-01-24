import { WLAsset } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useQuery } from "react-query";
import { useRedBeeState } from "../RedBeeProvider";
import { useWLApi } from "./useApi";
import { TApiHook } from "../types/type.apiHook";
import { QueryKeys } from "../util/react-query";
import { AppError } from "@ericssonbroadcastservices/app-sdk";

export function useAsset(identifier?: string): TApiHook<WLAsset> {
  const wlApi = useWLApi();
  const { customer, businessUnit, selectedLanguage } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.ASSET, identifier, customer, businessUnit, selectedLanguage],
    () => {
      if (!customer || !businessUnit || !identifier) return;
      return wlApi.getAssetById({ assetId: identifier, customer, businessUnit, locale: selectedLanguage as string });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, !!error ? AppError.fromUnknown(error) : null];
}
