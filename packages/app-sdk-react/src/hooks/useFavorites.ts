import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { addToAssetList, deleteFromAssetList, getFromAssetList } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WLComponentSubType } from "@ericssonbroadcastservices/app-sdk";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { useUserSession } from "./useUserSession";

const FAVORITES_LIST_ID = "favorites";

function invalidateFavourites() {
  queryClient.invalidateQueries(QueryKeys.FAVORITE_ASSET_IN_LIST);
  queryClient.invalidateQueries(WLComponentSubType.FAVORITES);
}

export function useAddAssetToFavorites(assetId: string): TApiHook<() => void, () => void> {
  const { serviceContext } = useRedBeeState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [session] = useUserSession();

  const add = useCallback(async () => {
    setLoading(true);
    try {
      if (!session?.isLoggedIn()) {
        throw new Error("User needs to be logged in to add to favorites");
      }
      const headers = { Authorization: `Bearer ${session?.sessionToken}` };
      await addToAssetList.call(serviceContext, { assetId, list: FAVORITES_LIST_ID, headers });
      invalidateFavourites();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [serviceContext, assetId]);

  return [add, loading, error];
}

export function useRemoveAssetFromFavorites(assetId: string): TApiHook<() => void, () => void> {
  const { serviceContext } = useRedBeeState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [session] = useUserSession();

  const remove = useCallback(async () => {
    setLoading(true);
    try {
      if (!session?.isLoggedIn()) {
        throw new Error("User needs to be logged in to remove from favorites");
      }
      const headers = { Authorization: `Bearer ${session?.sessionToken}` };
      await deleteFromAssetList.call(serviceContext, { assetId, list: FAVORITES_LIST_ID, headers });
      invalidateFavourites();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [serviceContext, assetId]);

  return [remove, loading, error];
}

type HandleAssetFavorites = {
  isInList: boolean;
  add: (() => void);
  remove: (() => void);
};

export function useHandleAssetFavorites(assetId: string): TApiHook<HandleAssetFavorites, HandleAssetFavorites> {
  const { serviceContext } = useRedBeeState();
  const [handleAdd, loadingAdd] = useAddAssetToFavorites(assetId);
  const [handleRemove, loadingRemove] = useRemoveAssetFromFavorites(assetId);
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
  } = useQuery([QueryKeys.FAVORITE_ASSET_IN_LIST, assetId, serviceContext], async () => {
    if (!session?.isLoggedIn()) {
      return false;
    }
    try {
      const headers = { Authorization: `Bearer ${session.sessionToken}` };
      await getFromAssetList.call(serviceContext, { assetId, list: FAVORITES_LIST_ID, headers });
      return true;
    } catch {
      return false;
    }
  });

  handler.isInList = !!data;

  return [handler, loadingAdd || loadingRemove || loadingList, error];
}
