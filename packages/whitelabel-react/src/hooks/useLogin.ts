import { useCallback } from "react";
import { StorageKey } from "../util/storageKeys";
import { useSetSession, useUserSession } from "./useUserSession";
import { useExposureApi } from "./useApi";
import { useRedBeeState } from "../RedBeeProvider";

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

export function useLogout() {
  const setSession = useSetSession();
  const exposureApi = useExposureApi();
  const { storage } = useRedBeeState();
  return useCallback(() => {
    return exposureApi.authentication
      .logout({})
      .then(async () => {
        if (storage) {
          await storage.removeItem(StorageKey.SESSION);
        }
        setSession(null);
      })
      .catch(async () => {
        // even if we fail to log out the session, we want the app to forget the token
        if (storage) {
          await storage.removeItem(StorageKey.SESSION);
        }
        setSession(null);
      });
  }, [setSession, exposureApi]);
}

export function useValidateSession() {
  const [currentSession] = useUserSession();
  const exposureApi = useExposureApi();
  const setSession = useSetSession();
  const { storage } = useRedBeeState();
  return useCallback(() => {
    if (currentSession?.sessionToken) {
      return exposureApi.authentication.validateSession({}).catch(err => {
        if ((err as any)?.httpCode === 401) {
          storage?.removeItem(StorageKey.SESSION);
          setSession(null);
        }
        throw err;
      });
    }
    return Promise.resolve();
  }, [currentSession?.sessionToken, exposureApi, setSession]);
}
