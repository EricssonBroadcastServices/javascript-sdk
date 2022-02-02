import { useCallback } from "react";
import { StorageKey } from "../util/storageKeys";
import { useSetSession, useUserSession } from "./useUserSession";
import { useExposureApi } from "./useApi";
import { useRedBeeState } from "../RedBeeProvider";
import { deserialize, LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";

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
  return useCallback(
    /**
     * @param {boolean} [fromStorage] - If the session from storage shuld be validated, as opposed to the session in the application state.
     * They would be different in case on a non 401 response on the initial session validation
     */
    async (fromStorage?: boolean) => {
      let session = currentSession;
      if (fromStorage) {
        try {
          const storedSession = await storage?.getItem(StorageKey.SESSION);
          if (storedSession) {
            session = deserialize(LoginResponse, JSON.parse(storedSession));
          }
        } catch (err) {
          console.error(err);
        }
      }
      if (session?.sessionToken) {
        return exposureApi.authentication
          .validateSession({ headers: { Authorization: `Bearer ${session.sessionToken}` } })
          .then(() => {
            if (session?.sessionToken !== currentSession?.sessionToken) {
              setSession(session);
            }
          })
          .catch(err => {
            if ((err as any)?.httpCode === 401) {
              storage?.removeItem(StorageKey.SESSION);
              setSession(null);
            }
            throw err;
          });
      }
      return Promise.resolve();
    },
    [currentSession?.sessionToken, exposureApi, setSession]
  );
}
