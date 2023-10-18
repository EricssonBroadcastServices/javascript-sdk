import {
  deserialize as deprecatedDeserialize,
  ExposureApi as DeprecatedExposureApi,
  IDeviceInfo as DeprecatedIDeviceInfo,
  LoginResponse as DeprecatedLoginResponse
} from "@ericssonbroadcastservices/exposure-sdk";
import {
  DeviceGroup as DeprecatedDeviceGroup,
  WhiteLabelService as DeprecatedWLService
} from "@ericssonbroadcastservices/whitelabel-sdk";
import { ServiceContext } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelService as AppService } from "@ericssonbroadcastservices/app-sdk";

import React, { useEffect, useState } from "react";
import { IStorage } from ".";
import { IRedBeeState } from "./RedBeeProvider";
import { ErrorCode } from "./util/error";
import { StorageKey } from "./util/storageKeys";

export const InitialPropsContext = React.createContext<IRedBeeState>({} as IRedBeeState);

interface IInitialPropsProvider {
  storage?: IStorage;
  customer: string;
  businessUnit: string;
  exposureBaseUrl: string;
  device: DeprecatedIDeviceInfo;
  children?: React.ReactNode;
  deviceGroup: DeprecatedDeviceGroup;
  onSessionValidationError?: (err: unknown) => void;
}

async function getValidatedPersistedSession({
  storage,
  customer,
  businessUnit,
  exposureBaseUrl: baseUrl,
  device
}: {
  customer: string;
  businessUnit: string;
  storage?: IStorage;
  exposureBaseUrl: string;
  device: DeprecatedIDeviceInfo;
}): Promise<[DeprecatedLoginResponse | null, unknown]> {
  let session: DeprecatedLoginResponse | null = null;
  let error: unknown = null;
  const persistedSession = await storage?.getItem(StorageKey.SESSION);
  const tempExposureApi = new DeprecatedExposureApi({
    baseUrl,
    customer,
    businessUnit,
    authHeader: () => undefined
  });
  if (persistedSession) {
    const persistedSessionJSON = JSON.parse(persistedSession);
    if (!persistedSessionJSON.sessionToken) {
      storage?.removeItem(StorageKey.SESSION);
      session = null;
    } else {
      session = deprecatedDeserialize(DeprecatedLoginResponse, persistedSessionJSON);
      try {
        // this will throw if session is invalid
        await tempExposureApi.authentication.validateSession({
          customer,
          businessUnit,
          headers: { Authorization: `Bearer ${session.sessionToken}` }
        });
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
      session = await tempExposureApi.authentication.loginAnonymous({ customer, businessUnit, device });
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
  exposureBaseUrl,
  device,
  deviceGroup,
  onSessionValidationError
}: IInitialPropsProvider) {
  const [state, setState] = useState<IRedBeeState | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    async function initStorage() {
      let session: DeprecatedLoginResponse | null = null;
      try {
        const [validatedSession, validationError] = await getValidatedPersistedSession({
          storage,
          customer,
          businessUnit,
          exposureBaseUrl,
          device
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
        baseUrl: exposureBaseUrl
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
        device,
        exposureBaseUrl,
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
