import { useCallback, useState } from "react";
import { deleteUserDetails } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useServiceContext } from "./useApi";
import { useSetSession, useUserSession } from "./useUserSession";
import { TApiHook } from "../types/type.apiHook";

export function useDeleteAccount(): TApiHook<(password: string) => Promise<void>, (password: string) => Promise<void>> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [session] = useUserSession();
  const setSession = useSetSession();
  const ctx = useServiceContext();
  const deleteAccount = useCallback(
    async (password: string) => {
      setLoading(true);
      try {
        if (!session?.isLoggedIn()) {
          throw new Error("User needs to be logged in to request account deletion");
        }
        const headers = { Authorization: `Bearer ${session.sessionToken}` };
        await deleteUserDetails.call(ctx, { password, headers });
        setSession(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [setSession, ctx]
  );
  return [deleteAccount, loading, error];
}
