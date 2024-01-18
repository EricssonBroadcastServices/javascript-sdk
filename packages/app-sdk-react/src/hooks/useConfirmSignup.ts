import { ConfirmAccountResponse, confirmUserWithToken } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { TApiMutation } from "../types/type.apiHook";
import { useMutation } from "react-query";
import { useSetSession } from "./useUserSession";
import { useRedBeeState } from "../RedBeeProvider";
import { AppError } from "@ericssonbroadcastservices/app-sdk";

type TConfirmSignupParams = { token: string };

export function useConfirmSignup(): TApiMutation<TConfirmSignupParams, ConfirmAccountResponse> {
  const { deviceRegistration, serviceContext } = useRedBeeState();
  const setSession = useSetSession();

  const mutation = useMutation({
    onSuccess: data => {
      if (data.loginResponse) {
        setSession(data.loginResponse);
      }
    },
    mutationKey: [serviceContext, deviceRegistration, setSession],
    mutationFn: ({ token }: TConfirmSignupParams) => {
      return confirmUserWithToken.call(serviceContext, { token, deviceRegistration });
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, AppError.fromUnknown(mutation.error)];
}
