import { useQuery } from "react-query";
import { Asset, getAsset } from "@ericssonbroadcastservices/rbm-ott-sdk";

import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { QueryKeys } from "../util/react-query";
import { AppError } from "@ericssonbroadcastservices/app-sdk";

export function useAsset(assetId?: string): TApiHook<Asset> {
  const { serviceContext } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.ASSET, assetId, serviceContext],
    () => {
      if (!assetId) return;
      return getAsset.call(serviceContext, { assetId, includeEpisodes: true, includeSeasons: true });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, AppError.fromUnknown(error)];
}
