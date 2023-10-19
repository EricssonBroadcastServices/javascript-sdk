import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useRedBeeState } from "../RedBeeProvider";
import { useDeprecatedExposureApi } from "./useApi";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { WLComponentSubType } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useUserSession } from "./useUserSession";

const FAVORITES_LIST_ID = "favorites";

function invalidateFavourites() {
  queryClient.invalidateQueries(QueryKeys.FAVORITE_ASSET_IN_LIST);
  queryClient.invalidateQueries(WLComponentSubType.FAVORITES);
}

export function useAddAssetToFavorites(assetId: string): TApiHook<() => void> {
  const deprecatedExposureApi = useDeprecatedExposureApi();
  const { customer, businessUnit } = useRedBeeState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const add = useCallback(() => {
    setLoading(true);
    deprecatedExposureApi.preferences
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
  const deprecatedExposureApi = useDeprecatedExposureApi();
  const { customer, businessUnit } = useRedBeeState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const remove = useCallback(() => {
    setLoading(true);
    deprecatedExposureApi.preferences
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
  const deprecatedExposureApi = useDeprecatedExposureApi();
  const [handleAdd, loadingAdd] = useAddAssetToFavorites(assetId);
  const [handleRemove, loadingRemove] = useRemoveAssetFromFavorites(assetId);
  const { customer, businessUnit } = useRedBeeState();
  const [session] = useUserSession();
  const handler: HandleAssetFavorites = {
    isInList: false,
    remove: handleRemove,
    add: handleAdd
  };

  const {
    data,
    isLoading: loadingList,
    error
  } = useQuery([QueryKeys.FAVORITE_ASSET_IN_LIST, assetId, customer, businessUnit], async () => {
    if (!session?.isLoggedIn()) {
      return false;
    }
    try {
      await deprecatedExposureApi.preferences.getAssetFromList({
        listId: FAVORITES_LIST_ID,
        assetId,
        customer,
        businessUnit
      });
      return true;
    } catch {
      return false;
    }
  });

  handler.isInList = !!data;

  return [handler, loadingAdd || loadingRemove || loadingList, error];
}
