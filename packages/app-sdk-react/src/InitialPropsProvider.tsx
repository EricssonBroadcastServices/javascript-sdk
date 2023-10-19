import { ExposureApi as DeprecatedExposureApi } from "@ericssonbroadcastservices/exposure-sdk";
import {
  DeviceGroup as DeprecatedDeviceGroup,
  WhiteLabelService as DeprecatedWLService
} from "@ericssonbroadcastservices/whitelabel-sdk";
import {
  DeviceRegistration,
  LoginResponse,
  ServiceContext,
  loginAnonymous,
  validateSessionToken
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelService as AppService } from "@ericssonbroadcastservices/app-sdk";

import React, { useEffect, useState } from "react";
import { IStorage } from ".";
import { IRedBeeState } from "./RedBeeProvider";
import { ErrorCode } from "./util/error";
import { StorageKey } from "./util/storageKeys";

export const InitialPropsContext = React.createContext<IRedBeeState>({} as IRedBeeState);

interface IInitialPropsProvider {
  storage?: IStorage;
  baseUrl: string;
  customer: string;
  businessUnit: string;
  deviceRegistration: Required<DeviceRegistration>;
  children?: React.ReactNode;
  deviceGroup: DeprecatedDeviceGroup;
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
}): Promise<[LoginResponse | null, unknown]> {
  const ctx = { customer, businessUnit, baseUrl };
  let session: LoginResponse | null = null;
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
        validateSessionToken.call(ctx, { headers });
      } catch (err) {
        if ((err as any).httpCode === 401) {
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
      session = await loginAnonymous.call(ctx, { device, deviceId });
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
      let session: LoginResponse | null = null;
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
      const deprecatedAuthHeader = () => (session ? { Authorization: `Bearer ${session.sessionToken}` } : undefined);
      const serviceContext: ServiceContext = {
        customer,
        businessUnit,
        baseUrl
      };
      const appService = new AppService({
        ...serviceContext,
        deviceGroup,
        async getAuthToken() {
          return session?.sessionToken;
        }
      });
      const deprecatedExposureApi = new DeprecatedExposureApi({
        ...serviceContext,
        authHeader: deprecatedAuthHeader
      });
      const deprecatedWhiteLabelApi = new DeprecatedWLService({
        ...serviceContext,
        deviceGroup,
        exposureApi: deprecatedExposureApi,
        authHeader: deprecatedAuthHeader
      });
      setState({
        session,
        selectedLanguage: persistedSelectedLanguage || null,
        loading: [],
        customer,
        businessUnit,
        storage: storage || null,
        deviceRegistration,
        baseUrl,
        config: null,
        deviceGroup,
        unavailable: false,
        serviceContext,
        appService,
        deprecatedExposureApi,
        deprecatedWhiteLabelApi
      });
      setIsReady(true);
    }
    initStorage();
  }, []);
  if (!isReady || !state) return null;
  return <InitialPropsContext.Provider value={state}>{children}</InitialPropsContext.Provider>;
}
