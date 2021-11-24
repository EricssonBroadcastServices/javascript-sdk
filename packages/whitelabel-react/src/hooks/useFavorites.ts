import { useCallback, useEffect, useState } from "react";
import { useExposureApi, useRedBeeState } from "..";
import { TApiHook } from "../types/type.apiHook";

const FAVORITES_LIST_ID = "favorites";

export function useIsFavoriteInList({ assetId }: { assetId: string }): TApiHook<{ isInList: boolean }> {
  const exposureApi = useExposureApi();
  const { customer, businessUnit } = useRedBeeState();
  const [isInList, setIsInList] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    exposureApi.preferences
      .getAssetFromList({
        listId: FAVORITES_LIST_ID,
        assetId,
        customer,
        businessUnit
      })
      .then(() => {
        setIsInList(true);
        setLoading(false);
      })
      .catch((e: any) => {
        setIsInList(false);
        setLoading(false);
        setError(e);
      });
  }, [assetId, customer, businessUnit]);

  return [{ isInList }, loading, error];
}

export function useAddFavorites({ assetId }: { assetId: string }): TApiHook<{ add: () => void }> {
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
        setLoading(false);
      })
      .catch((e: any) => {
        setLoading(false);
        setError(e);
      });
  }, [assetId, customer, businessUnit]);

  return [{ add }, loading, error];
}

export function useRemoveFavorite({ assetId }: { assetId: string }): TApiHook<{ remove: () => void }> {
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
        setLoading(false);
      })
      .catch((e: any) => {
        setLoading(false);
        setError(e);
      });
  }, [assetId, customer, businessUnit]);

  return [{ remove }, loading, error];
}
