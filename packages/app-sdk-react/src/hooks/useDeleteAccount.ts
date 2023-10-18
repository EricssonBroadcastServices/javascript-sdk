import { useCallback, useState } from "react";
import { useDeprecatedExposureApi } from "./useApi";
import { useSetSession } from "./useUserSession";
import { TApiHook } from "../types/type.apiHook";

export function useDeleteAccount(): TApiHook<(password: string) => Promise<void>, (password: string) => Promise<void>> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const setSession = useSetSession();
  const deprecatedExposureApi = useDeprecatedExposureApi();
  const deleteAccount = useCallback(
    (password: string) => {
      setLoading(true);
      return deprecatedExposureApi.user
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
    [setSession, deprecatedExposureApi]
  );
  return [deleteAccount, loading, error];
}
