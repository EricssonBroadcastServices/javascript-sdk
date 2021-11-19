import { deserialize, LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";
import { useEffect, useState } from "react";
import { useExposureApi } from "./useApi";
import { useRedBeeState } from "../RedBeeProvider";
import { useSetSelectedLanguage } from "./useSelectedLanguage";
import { StorageKey } from "../util/storageKeys";
import { useSetSession } from "./useUserSession";

export function useInitializePersistedStorage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const setSession = useSetSession();
  const setSelectedLanguage = useSetSelectedLanguage();
  const exposureApi = useExposureApi();
  const { storage } = useRedBeeState();
  useEffect(() => {
    async function initStorage() {
      if (!storage) return;
      const persistedSessionJSON = await storage.getItem(StorageKey.SESSION);
      const persistedSelectedLanguage = await storage.getItem(StorageKey.LOCALE);
      if (persistedSessionJSON) {
        const parsed = JSON.parse(persistedSessionJSON);
        try {
          await exposureApi.authentication.validateSession({
            headers: { Authorization: `Bearer ${parsed.sessionToken}` }
          });
          setSession(deserialize(LoginResponse, parsed));
        } catch (err) {
          console.error(err);
          setSession(null);
        }
      } else {
        setSession(null);
      }
      if (persistedSelectedLanguage) {
        setSelectedLanguage(persistedSelectedLanguage, false);
      }
      setIsInitialized(true);
    }
    initStorage();
  }, []);
  return isInitialized;
}
