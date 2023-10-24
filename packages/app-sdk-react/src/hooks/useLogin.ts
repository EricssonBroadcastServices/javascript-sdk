import { useCallback } from "react";
import { useSetSession, useUserSession } from "./useUserSession";
import { useRedBeeState } from "../RedBeeProvider";
import { ErrorCode } from "../util/error";
import { login, loginOauth, logout, validateSessionToken } from "@ericssonbroadcastservices/rbm-ott-sdk";

export function useLogin() {
  const { deviceRegistration, serviceContext } = useRedBeeState();
  const [session] = useUserSession();
  const setSession = useSetSession();
  return useCallback(
    async (username: string, password: string) => {
      setSession(
        await login.call(serviceContext, {
          username,
          password,
          device: deviceRegistration,
          informationCollectionConsentGivenNow: false
        })
      );
    },
    [session?.sessionToken]
  );
}

export function useOauthLogin() {
  const { deviceRegistration, serviceContext } = useRedBeeState();
  const [session] = useUserSession();
  const setSession = useSetSession();
  return useCallback(
    async (token: string) => {
      setSession(await loginOauth.call(serviceContext, { token, device: deviceRegistration }));
    },
    [session?.sessionToken]
  );
}

export function useLogout() {
  const setSession = useSetSession();
  const { serviceContext } = useRedBeeState();
  const [session] = useUserSession();
  return useCallback(async () => {
    if (!session?.sessionToken) {
      return;
    }
    const headers = { Authorization: `Bearer ${session?.sessionToken}` };
    return logout.call(serviceContext, { headers, fromAllDevice: false }).finally(async () => setSession(null));
  }, [session?.sessionToken]);
}

export function useValidateSession() {
  const { serviceContext } = useRedBeeState();
  const [session] = useUserSession();
  const setSession = useSetSession();
  return useCallback(async () => {
    if (session?.sessionToken) {
      return validateSessionToken.call(serviceContext).catch(err => {
        if ((err as any)?.httpCode !== 401) {
          throw { code: ErrorCode.UNEXPECTED_SESSION_VALIDATION_ERROR, error: err, session };
        }
        setSession(null);
      });
    }
    return Promise.resolve();
  }, [session?.sessionToken]);
}
