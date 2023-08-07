import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useRedBeeState } from "../RedBeeProvider";
import { useExposureApi } from "./useApi";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { WLComponentSubType } from "@ericssonbroadcastservices/whitelabel-sdk";

const FAVORITES_LIST_ID = "favorites";

function invalidateFavourites() {
  queryClient.invalidateQueries(QueryKeys.FAVORITE_ASSET_IN_LIST);
  queryClient.invalidateQueries(WLComponentSubType.FAVORITES);
}

export function useAddAssetToFavorites(assetId: string): TApiHook<() => void> {
  const exposureApi = useExposureApi();
  const { customer, businessUnit } = useRedBeeState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const add = useCallback(() => {
    setLoading(true);
    exposureApi.preferences
      .addAssetToList({
        assetId,
        listId: FAVORITES_LIST_ID,
        customer,
        businessUnit
      })
      .then(() => {
        invalidateFavourites();
        setLoading(false);
      })
      .catch((e: any) => {
        setLoading(false);
        setError(e);
      });
  }, [assetId, customer, businessUnit]);

  return [add, loading, error];
}

export function useRemoveAssetFromFavorites(assetId: string): TApiHook<() => void> {
  const exposureApi = useExposureApi();
  const { customer, businessUnit } = useRedBeeState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const remove = useCallback(() => {
    setLoading(true);
    exposureApi.preferences
      .deleteAssetFromList({
        assetId,
        listId: FAVORITES_LIST_ID,
        customer,
        businessUnit
      })
      .then(() => {
        invalidateFavourites();
        setLoading(false);
      })
      .catch((e: any) => {
        setLoading(false);
        setError(e);
      });
  }, [assetId, customer, businessUnit]);

  return [remove, loading, error];
}

type HandleAssetFavorites = {
  isInList: boolean;
  add: (() => void) | null;
  remove: (() => void) | null;
};

export function useHandleAssetFavorites(assetId: string): TApiHook<HandleAssetFavorites, HandleAssetFavorites> {
  const exposureApi = useExposureApi();
  const [handleAdd, loadingAdd] = useAddAssetToFavorites(assetId);
  const [handleRemove, loadingRemove] = useRemoveAssetFromFavorites(assetId);
  const { customer, businessUnit } = useRedBeeState();

  const {
    data,
    isLoading: loadingList,
    error
  } = useQuery([QueryKeys.FAVORITE_ASSET_IN_LIST, assetId, customer, businessUnit], () => {
    return exposureApi.preferences
      .getAssetFromList({
        listId: FAVORITES_LIST_ID,
        assetId,
        customer,
        businessUnit
      })
      .then(() => true)
      .catch(() => false);
  });

  return [
    {
      isInList: !!data,
      remove: handleRemove,
      add: handleAdd
    },
    loadingAdd || loadingRemove || loadingList,
    error
  ];
}
