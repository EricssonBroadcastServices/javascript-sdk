import { DeviceRegistration, ServiceContext } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelService as AppService, DeviceGroup } from "@ericssonbroadcastservices/app-sdk";

import React, { useEffect, useState } from "react";
import { IStorage } from ".";
import { IRedBeeState } from "./RedBeeProvider";
import { StorageKey } from "./util/storageKeys";
import { Session, SessionData } from "./Session";
import { getValidatedPersistedSession, validateAndReconstructSessionFromSessionToken } from "./util/session-token";

export const InitialPropsContext = React.createContext<IRedBeeState>({} as IRedBeeState);

interface IInitialPropsProvider {
  storage?: IStorage;
  baseUrl: string;
  customer: string;
  businessUnit: string;
  deviceRegistration: Required<DeviceRegistration>;
  children?: React.ReactNode;
  deviceGroup: DeviceGroup;
  onSessionValidationError?: (err: unknown) => void;
  sessionToken?: string;
}

export function InitialPropsProvider({
  children,
  storage,
  customer,
  businessUnit,
  baseUrl,
  deviceRegistration,
  deviceGroup,
  onSessionValidationError,
  sessionToken
}: IInitialPropsProvider) {
  const [state, setState] = useState<IRedBeeState | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    async function initStorage() {
      const serviceContext: ServiceContext = {
        customer,
        businessUnit,
        baseUrl
      };

      let session: SessionData | null = null;

      // if a sessionToken has been pass in: use that if possible
      if (sessionToken) {
        session = await validateAndReconstructSessionFromSessionToken({ context: serviceContext, sessionToken });
      }
      if (!session) {
        try {
          const [validatedSession, validationError] = await getValidatedPersistedSession({
            storage,
            customer,
            businessUnit,
            baseUrl,
            deviceRegistration
          });
          session = validatedSession;
          if (validationError) {
            onSessionValidationError?.(validationError);
          }
        } catch (err) {
          session = null;
        }
      }

      const persistedSelectedLanguage = await storage?.getItem(StorageKey.LOCALE);

      async function getAuthToken() {
        return session?.sessionToken;
      }
      const appService = new AppService({ ...serviceContext, deviceGroup, getAuthToken });
      setState({
        session: session && new Session(session),
        selectedLanguage: persistedSelectedLanguage || null,
        loading: [],
        customer,
        businessUnit,
        storage: storage || null,
        deviceRegistration,
        baseUrl,
        essentialAppData: null,
        deviceGroup,
        unavailable: false,
        serviceContext,
        appService
      });
      setIsReady(true);
    }
    initStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isReady || !state) return null;
  return <InitialPropsContext.Provider value={state}>{children}</InitialPropsContext.Provider>;
}
