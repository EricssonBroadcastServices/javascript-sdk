import { deleteUserDetails } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useServiceContext } from "./useApi";
import { useSetSession, useUserSession } from "./useUserSession";
import { TApiMutation } from "../types/type.apiHook";
import { useMutation } from "react-query";
import { useAppError } from "./useAppError";

export function useDeleteAccount(): TApiMutation<string, void> {
  const [session] = useUserSession();
  const setSession = useSetSession();
  const ctx = useServiceContext();

  const mutation = useMutation({
    onSuccess: () => {
      setSession(null);
    },
    mutationKey: [session, ctx, setSession],
    mutationFn: async (password: string) => {
      if (!session?.isLoggedIn()) {
        throw new Error("User needs to be logged in to request account deletion");
      }
      const headers = { Authorization: `Bearer ${session.sessionToken}` };
      await deleteUserDetails.call(ctx, { password, headers });
      setSession(null);
    }
  });
  return [mutation.mutate, mutation.data || null, mutation.isLoading, useAppError(mutation.error)];
}
