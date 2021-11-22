import { deserialize, LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";
import React, { useEffect, useState } from "react";
import { IStorage } from ".";
import { StorageKey } from "./util/storageKeys";

/* State handling for app specific stuff, meaning things that do not belong i a
general module that could be shared between multiple apps */

interface IStorageState {
  locale: string | null;
  session: LoginResponse | null;
  ready: boolean;
}

const initialValue: IStorageState = { locale: null, session: null, ready: false };

export const StorageContext = React.createContext<IStorageState>(initialValue);

export function StorageProvider({ children, storage }: { children?: React.ReactNode; storage?: IStorage }) {
  const [state, setState] = useState(initialValue);
  useEffect(() => {
    async function initStorage() {
      if (!storage) return;
      let session: LoginResponse | null = null;
      const persistedSession = await storage.getItem(StorageKey.SESSION);
      const persistedSelectedLanguage = await storage.getItem(StorageKey.LOCALE);
      if (persistedSession) {
        if (!JSON.parse(persistedSession).sessionToken) {
          storage.removeItem(StorageKey.SESSION);
          session = null;
        } else {
          session = deserialize(LoginResponse, JSON.parse(persistedSession));
        }
      }
      setState({
        session,
        locale: persistedSelectedLanguage || null,
        ready: true
      });
    }
    initStorage();
  }, []);
  if (!state.ready) return null;
  return <StorageContext.Provider value={state}>{children}</StorageContext.Provider>;
}
