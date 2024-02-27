import { deleteDetails } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useServiceContext } from "./useApi";
import { useSetSession, useUserSession } from "./useUserSession";
import { TApiMutation } from "../types/type.apiHook";
import { useMutation } from "react-query";
import { useAppError } from "./useAppError";

export function useDeleteAccount(): TApiMutation<void, void> {
  const [session] = useUserSession();
  const setSession = useSetSession();
  const ctx = useServiceContext();

  const mutation = useMutation({
    onSuccess: () => {
      setSession(null);
    },
    mutationKey: [session, ctx, setSession],
    mutationFn: async () => {
      if (!session?.isLoggedIn()) {
        throw new Error("User needs to be logged in to request account deletion");
      }
      const headers = { Authorization: `Bearer ${session.sessionToken}` };
      await deleteDetails.call(ctx, { headers });
      setSession(null);
    }
  });
  return [mutation.mutate, mutation.data || null, mutation.isLoading, useAppError(mutation.error)];
}
