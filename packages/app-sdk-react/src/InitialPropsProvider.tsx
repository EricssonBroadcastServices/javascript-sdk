import {
  DeviceRegistration,
  ServiceContext,
  loginAnonymous,
  validateSessionToken
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelService as AppService, DeviceGroup } from "@ericssonbroadcastservices/app-sdk";

import React, { useEffect, useState } from "react";
import { IStorage } from ".";
import { IRedBeeState } from "./RedBeeProvider";
import { ErrorCode } from "./util/error";
import { StorageKey } from "./util/storageKeys";
import { Session, SessionData } from "./Session";

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
}

async function getValidatedPersistedSession({
  storage,
  customer,
  businessUnit,
  baseUrl,
  deviceRegistration
}: {
  customer: string;
  businessUnit: string;
  storage?: IStorage;
  baseUrl: string;
  deviceRegistration: Required<DeviceRegistration>;
}): Promise<[SessionData | null, unknown]> {
  const ctx = { customer, businessUnit, baseUrl };
  let session: SessionData | null = null;
  let error: unknown = null;
  const persistedSession = await storage?.getItem(StorageKey.SESSION);
  if (persistedSession) {
    const persistedSessionJSON = JSON.parse(persistedSession);
    if (!persistedSessionJSON.sessionToken) {
      storage?.removeItem(StorageKey.SESSION);
      session = null;
    } else {
      session = persistedSessionJSON;
      try {
        // this will throw if session is invalid
        const headers = { Authorization: `Bearer ${persistedSessionJSON.sessionToken}` };
        await validateSessionToken.call(ctx, { headers });
      } catch (err) {
        if ((err as any).response?.status === 401) {
          storage?.removeItem(StorageKey.SESSION);
          session = null;
        } else {
          error = { code: ErrorCode.UNEXPECTED_SESSION_VALIDATION_ERROR, error: err, session };
        }
      }
    }
  }
  if (!session) {
    try {
      const { deviceId, ...device } = deviceRegistration;
      session = new Session({
        ...(await loginAnonymous.call(ctx, { device, deviceId })),
        isAnonymous: true
      });
    } catch (err) {
      throw err;
    }
  }
  return [session, error];
}

export function InitialPropsProvider({
  children,
  storage,
  customer,
  businessUnit,
  baseUrl,
  deviceRegistration,
  deviceGroup,
  onSessionValidationError
}: IInitialPropsProvider) {
  const [state, setState] = useState<IRedBeeState | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    async function initStorage() {
      let session: SessionData | null = null;
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
      const persistedSelectedLanguage = await storage?.getItem(StorageKey.LOCALE);
      const serviceContext: ServiceContext = {
        customer,
        businessUnit,
        baseUrl
      };
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
  }, []);
  if (!isReady || !state) return null;
  return <InitialPropsContext.Provider value={state}>{children}</InitialPropsContext.Provider>;
}
