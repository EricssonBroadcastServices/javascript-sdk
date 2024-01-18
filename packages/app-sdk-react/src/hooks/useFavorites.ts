import { useMutation, useQuery } from "react-query";
import { addToAssetList, deleteFromAssetList, getFromAssetList } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { AppError, WLComponentSubType } from "@ericssonbroadcastservices/app-sdk";
import { TApiHook, TApiMutation } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { useUserSession } from "./useUserSession";
import { useAssetList } from "./useAssetList";
import { useServiceContext } from "./useApi";

const FAVORITES_LIST_ID = "favorites";

function invalidateFavourites() {
  queryClient.invalidateQueries(QueryKeys.FAVORITE_ASSET_IN_LIST);
  queryClient.invalidateQueries(WLComponentSubType.FAVORITES);
}

export function useFavoritesList() {
  return useAssetList(FAVORITES_LIST_ID);
}

export function useAddAssetToFavorites(assetId: string): TApiMutation<void, void> {
  const serviceContext = useServiceContext();
  const [session] = useUserSession();

  const mutation = useMutation({
    onSuccess: invalidateFavourites,
    mutationKey: [session, serviceContext, assetId],
    mutationFn: async () => {
      if (!session?.isLoggedIn()) {
        throw new Error("User needs to be logged in to add to favorites");
      }
      const headers = { Authorization: `Bearer ${session?.sessionToken}` };
      await addToAssetList.call(serviceContext, { assetId, list: FAVORITES_LIST_ID, headers });
    }
  });
  return [mutation.mutate, mutation.data || null, mutation.isLoading, AppError.fromUnknown(mutation.error)];
}

export function useRemoveAssetFromFavorites(assetId: string): TApiMutation<void, void> {
  const serviceContext = useServiceContext();
  const [session] = useUserSession();

  const mutation = useMutation({
    onSuccess: invalidateFavourites,
    mutationKey: [session, serviceContext, assetId],
    mutationFn: async () => {
      if (!session?.isLoggedIn()) {
        throw new Error("User needs to be logged in to remove from favorites");
      }
      const headers = { Authorization: `Bearer ${session?.sessionToken}` };
      await deleteFromAssetList.call(serviceContext, { assetId, list: FAVORITES_LIST_ID, headers });
    }
  });
  return [mutation.mutate, mutation.data || null, mutation.isLoading, AppError.fromUnknown(mutation.error)];
}

type HandleAssetFavorites = {
  isInList: boolean;
  add: () => void;
  remove: () => void;
};

export function useHandleAssetFavorites(assetId: string): TApiHook<HandleAssetFavorites, HandleAssetFavorites> {
  const serviceContext = useServiceContext();
  const [handleAdd, , loadingAdd, addError] = useAddAssetToFavorites(assetId);
  const [handleRemove, , loadingRemove, removeError] = useRemoveAssetFromFavorites(assetId);
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

  return [handler, loadingAdd || loadingRemove || loadingList, AppError.fromUnknown(error) || addError || removeError];
}
