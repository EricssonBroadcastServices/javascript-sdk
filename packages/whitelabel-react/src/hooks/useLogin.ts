import { useCallback } from "react";
import { StorageKey } from "../util/storageKeys";
import { useSetSession, useUserSession } from "./useUserSession";
import { useExposureApi } from "./useApi";
import { useRedBeeState } from "../RedBeeProvider";

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
  return useCallback(() => {
    if (currentSession?.sessionToken) {
      return exposureApi.authentication.validateSession({}).catch(() => {
        setSession(null);
      });
    }
    return Promise.resolve();
  }, [currentSession?.sessionToken, exposureApi, setSession]);
}
