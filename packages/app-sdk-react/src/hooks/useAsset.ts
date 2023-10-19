import { useQuery } from "react-query";
import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";

import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { QueryKeys } from "../util/react-query";

export function useAsset(assetId?: string): TApiHook<Asset> {
  const { customer, businessUnit, selectedLanguage, appService } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.ASSET, assetId, customer, businessUnit, selectedLanguage],
    () => {
      if (!customer || !businessUnit || !assetId) return;
      return appService.getAssetById(assetId);
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}
