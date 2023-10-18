import { useCallback } from "react";
import { useSetSession } from "./useUserSession";
import { useRedBeeState } from "../RedBeeProvider";
import { ErrorCode } from "../util/error";

export function useLogin() {
  const { session, device, customer, businessUnit, deprecatedExposureApi } = useRedBeeState();
  const setSession = useSetSession();
  return useCallback(
    async (username: string, password: string) => {
      if (!device) throw "No device";
      return deprecatedExposureApi.authentication
        .login({ customer, businessUnit, username, password, device })
        .then(setSession);
    },
    [session?.sessionToken]
  );
}

export function useOauthLogin() {
  const { session, device, customer, businessUnit, deprecatedExposureApi } = useRedBeeState();
  const setSession = useSetSession();
  return useCallback(
    async (token: string) => {
      if (!device) throw "No device";
      return deprecatedExposureApi.authentication
        .loginByOauthToken({ customer, businessUnit, token, device })
        .then(setSession);
    },
    [session?.sessionToken]
  );
}

export function useLogout() {
  const { session, deprecatedExposureApi } = useRedBeeState();
  const setSession = useSetSession();
  return useCallback(async () => {
    return deprecatedExposureApi.authentication.logout({}).finally(async () => setSession(null));
  }, [session?.sessionToken]);
}

export function useValidateSession() {
  const { session, deprecatedExposureApi } = useRedBeeState();
  const setSession = useSetSession();
  return useCallback(async () => {
    if (session?.sessionToken) {
      return deprecatedExposureApi.authentication.validateSession({}).catch(err => {
        if ((err as any)?.httpCode !== 401) {
          throw { code: ErrorCode.UNEXPECTED_SESSION_VALIDATION_ERROR, error: err, session };
        }
        setSession(null);
      });
    }
    return Promise.resolve();
  }, [session?.sessionToken]);
}
