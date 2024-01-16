import { useCallback } from "react";
import { useSetSession, useUserSession } from "./useUserSession";
import { useRedBeeState } from "../RedBeeProvider";
import { ErrorCode } from "../util/error";
import { login, loginOauth, logout, validateSessionToken } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { TApiMutation } from "../types/type.apiHook";
import { useMutation } from "react-query";

type TUseLogin = { username: string; password: string };

export function useLogin(): TApiMutation<TUseLogin, void> {
  const { deviceRegistration, serviceContext } = useRedBeeState();
  const setSession = useSetSession();
  const mutation = useMutation({
    mutationKey: [deviceRegistration, serviceContext, setSession],
    mutationFn: async ({ username, password }: TUseLogin) => {
      setSession(
        await login.call(serviceContext, {
          username,
          password,
          device: deviceRegistration,
          informationCollectionConsentGivenNow: false
        })
      );
    }
  });
  return [mutation.mutate, mutation.data || null, mutation.isLoading, mutation.error];
}

export function useOauthLogin(): TApiMutation<string, void> {
  const { deviceRegistration, serviceContext } = useRedBeeState();
  const setSession = useSetSession();

  const mutation = useMutation({
    mutationKey: [deviceRegistration, serviceContext, setSession],
    mutationFn: async (token: string) => {
      setSession(await loginOauth.call(serviceContext, { token, device: deviceRegistration }));
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, mutation.error];
}

type TUseLogout = { fromAllDevice?: boolean };

export function useLogout(): TApiMutation<TUseLogout, object> {
  const setSession = useSetSession();
  const { serviceContext } = useRedBeeState();
  const [session] = useUserSession();

  const mutation = useMutation({
    mutationKey: [serviceContext, session?.sessionToken, setSession],
    mutationFn: async ({ fromAllDevice = false }: TUseLogout) => {
      if (!session?.sessionToken) {
        return;
      }
      const headers = { Authorization: `Bearer ${session?.sessionToken}` };
      return logout.call(serviceContext, { headers, fromAllDevice }).finally(async () => setSession(null));
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, mutation.error];
}

export function useValidateSession() {
  const { serviceContext } = useRedBeeState();
  const [session] = useUserSession();
  const setSession = useSetSession();
  return useCallback(async () => {
    if (session?.sessionToken) {
      const headers = { Authorization: `Bearer ${session.sessionToken}` };
      return validateSessionToken.call(serviceContext, { headers }).catch(err => {
        if ((err as any)?.response?.status !== 401) {
          throw { code: ErrorCode.UNEXPECTED_SESSION_VALIDATION_ERROR, error: err, session };
        }
        setSession(null);
      });
    }
    return Promise.resolve();
  }, [serviceContext, session, setSession]);
}
