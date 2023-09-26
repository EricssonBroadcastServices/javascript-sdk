import { useCallback, useState } from "react";
import { useExposureApi } from "./useApi";
import { useSetSession } from "./useUserSession";
import { TApiHook } from "../types/type.apiHook";

export function useDeleteAccount(): TApiHook<(password: string) => Promise<void>, (password: string) => Promise<void>> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const setSession = useSetSession();
  const exposureApi = useExposureApi();
  const deleteAccount = useCallback(
    (password: string) => {
      setLoading(true);
      return exposureApi.user
        .deleteUser({ password })
        .catch(err => {
          setError(err);
          throw err;
        })
        .then(() => {
          setSession(null);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setSession, exposureApi]
  );
  return [deleteAccount, loading, error];
}
