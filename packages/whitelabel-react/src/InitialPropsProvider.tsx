import { deserialize, ExposureApi, IDeviceInfo, LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";
import { DeviceGroup, WhiteLabelService } from "@ericssonbroadcastservices/whitelabel-sdk";
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
  device: IDeviceInfo;
  children?: React.ReactNode;
  deviceGroup: DeviceGroup;
  onSessionValidationError?: (err: unknown) => void;
}

async function getValidatedPersistedSession({
  storage,
  customer,
  businessUnit,
  exposureBaseUrl,
  device
}: {
  customer: string;
  businessUnit: string;
  storage?: IStorage;
  exposureBaseUrl: string;
  device: IDeviceInfo;
}): Promise<[LoginResponse | null, unknown]> {
  let session: LoginResponse | null = null;
  let error: unknown = null;
  const persistedSession = await storage?.getItem(StorageKey.SESSION);
  const tempExposureApi = new ExposureApi({
    customer,
    businessUnit,
    authHeader: () => undefined,
    baseUrl: exposureBaseUrl
  });
  if (persistedSession) {
    const persistedSessionJSON = JSON.parse(persistedSession);
    if (!persistedSessionJSON.sessionToken) {
      storage?.removeItem(StorageKey.SESSION);
      session = null;
    } else {
      session = deserialize(LoginResponse, persistedSessionJSON);
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
      let session: LoginResponse | null = null;
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
      const authHeader = () => (session ? { Authorization: `Bearer ${session.sessionToken}` } : undefined);
      const exposureApi = new ExposureApi({
        customer,
        businessUnit,
        authHeader,
        baseUrl: exposureBaseUrl
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
        exposureApi,
        unavailable: false,
        whiteLabelApi: new WhiteLabelService({
          exposureApi,
          authHeader,
          deviceGroup,
          customer,
          businessUnit,
          baseUrl: exposureBaseUrl
        })
      });
      setIsReady(true);
    }
    initStorage();
  }, []);
  if (!isReady || !state) return null;
  return <InitialPropsContext.Provider value={state}>{children}</InitialPropsContext.Provider>;
}
