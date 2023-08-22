import { useCallback } from "react";
import { useSetSession, useUserSession } from "./useUserSession";
import { useExposureApi } from "./useApi";
import { useRedBeeState } from "../RedBeeProvider";
import { ErrorCode } from "../util/error";

export function useLogin() {
  const exposureApi = useExposureApi();
  const { device, customer, businessUnit } = useRedBeeState();
  const setSession = useSetSession();
  return useCallback(
    (username: string, password: string) => {
      if (!device) throw "No device";
      return exposureApi.authentication.login({ customer, businessUnit, username, password, device }).then(session => {
        setSession(session);
      });
    },
    [device, exposureApi, customer, businessUnit]
  );
}

export function useOauthLogin() {
  const exposureApi = useExposureApi();
  const { device, customer, businessUnit } = useRedBeeState();
  const setSession = useSetSession();
  return useCallback(
    (token: string) => {
      if (!device) throw "No device";
      return exposureApi.authentication.loginByOauthToken({ customer, businessUnit, token, device }).then(session => {
        setSession(session);
      });
    },
    [device, exposureApi, customer, businessUnit]
  );
}

export function useLogout() {
  const setSession = useSetSession();
  const exposureApi = useExposureApi();
  return useCallback(() => {
    return exposureApi.authentication.logout({}).finally(async () => {
      setSession(null);
    });
  }, [setSession, exposureApi]);
}

export function useValidateSession() {
  const [session] = useUserSession();
  const exposureApi = useExposureApi();
  const setSession = useSetSession();
  return useCallback(async () => {
    if (session?.sessionToken) {
      return exposureApi.authentication.validateSession({}).catch(err => {
        if ((err as any)?.httpCode !== 401) {
          throw { code: ErrorCode.UNEXPECTED_SESSION_VALIDATION_ERROR, error: err, session };
        }
        setSession(null);
      });
    }
    return Promise.resolve();
  }, [session?.sessionToken, exposureApi, setSession]);
}
