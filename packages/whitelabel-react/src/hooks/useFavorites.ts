import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useExposureApi, useRedBeeState } from "..";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";

const FAVORITES_LIST_ID = "favorites";

export function useAddAssetToFavorites({
  assetId
}: {
  assetId: string;
}): TApiHook<{ addAssetToFavourites: () => void }> {
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
        queryClient.invalidateQueries(QueryKeys.FAVORITE_ASSET_IN_LIST);
        setLoading(false);
      })
      .catch((e: any) => {
        setLoading(false);
        setError(e);
      });
  }, [assetId, customer, businessUnit]);

  return [{ addAssetToFavourites: add }, loading, error];
}

export function useRemoveAssetFromFavorites({
  assetId
}: {
  assetId: string;
}): TApiHook<{ removeAssetFromFavorites: () => void }> {
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
        queryClient.invalidateQueries(QueryKeys.FAVORITE_ASSET_IN_LIST);
        setLoading(false);
      })
      .catch((e: any) => {
        setLoading(false);
        setError(e);
      });
  }, [assetId, customer, businessUnit]);

  return [{ removeAssetFromFavorites: remove }, loading, error];
}

export function useHandleAssetFavorites({
  assetId
}: {
  assetId: string;
}): TApiHook<{
  isInList: boolean;
  addAssetToFavourites: (() => void) | undefined;
  removeAssetFromFavorites: (() => void) | undefined;
}> {
  const exposureApi = useExposureApi();
  const [handleAdd] = useAddAssetToFavorites({ assetId });
  const [handleRemove] = useRemoveAssetFromFavorites({ assetId });
  const { customer, businessUnit } = useRedBeeState();

  const { data, isLoading, error } = useQuery(
    [QueryKeys.FAVORITE_ASSET_IN_LIST, assetId, customer, businessUnit],
    () => {
      return exposureApi.preferences
        .getAssetFromList({
          listId: FAVORITES_LIST_ID,
          assetId,
          customer,
          businessUnit
        })
        .then(() => {
          return true;
        })
        .catch((e: any) => {
          return false;
        });
    }
  );

  return [
    {
      isInList: !!data,
      removeAssetFromFavorites: handleRemove?.removeAssetFromFavorites,
      addAssetToFavourites: handleAdd?.addAssetToFavourites
    },
    isLoading,
    error
  ];
}
