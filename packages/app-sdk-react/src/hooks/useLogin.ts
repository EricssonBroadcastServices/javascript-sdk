import { useCallback } from "react";
import { useSetSession, useUserSession } from "./useUserSession";
import { useDeprecatedExposureApi } from "./useApi";
import { useRedBeeState } from "../RedBeeProvider";
import { ErrorCode } from "../util/error";

export function useLogin() {
  const deprecatedExposureApi = useDeprecatedExposureApi();
  const { device, customer, businessUnit } = useRedBeeState();
  const setSession = useSetSession();
  return useCallback(
    (username: string, password: string) => {
      if (!device) throw "No device";
      return deprecatedExposureApi.authentication
        .login({ customer, businessUnit, username, password, device })
        .then(session => {
          setSession(session);
        });
    },
    [device, deprecatedExposureApi, customer, businessUnit]
  );
}

export function useOauthLogin() {
  const deprecatedExposureApi = useDeprecatedExposureApi();
  const { device, customer, businessUnit } = useRedBeeState();
  const setSession = useSetSession();
  return useCallback(
    (token: string) => {
      if (!device) throw "No device";
      return deprecatedExposureApi.authentication
        .loginByOauthToken({ customer, businessUnit, token, device })
        .then(session => {
          setSession(session);
        });
    },
    [device, deprecatedExposureApi, customer, businessUnit]
  );
}

export function useLogout() {
  const setSession = useSetSession();
  const deprecatedExposureApi = useDeprecatedExposureApi();
  return useCallback(() => {
    return deprecatedExposureApi.authentication.logout({}).finally(async () => {
      setSession(null);
    });
  }, [setSession, deprecatedExposureApi]);
}

export function useValidateSession() {
  const [session] = useUserSession();
  const deprecatedExposureApi = useDeprecatedExposureApi();
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
  }, [session?.sessionToken, deprecatedExposureApi, setSession]);
}
