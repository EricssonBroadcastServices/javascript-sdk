import { setPassword } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { TApiMutation } from "../types/type.apiHook";
import { useMutation } from "react-query";
import { useServiceContext } from "./useApi";
import { useAppError } from "./useAppError";

type TSetNewPasswordParams = { token: string; password: string };

export function useSetNewPassword(): TApiMutation<TSetNewPasswordParams, Response> {
  const ctx = useServiceContext();

  const mutation = useMutation({
    mutationKey: [ctx],
    mutationFn: ({ token, password }: TSetNewPasswordParams) => {
      return setPassword.call(ctx, { token, password });
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, useAppError(mutation.error)];
}
