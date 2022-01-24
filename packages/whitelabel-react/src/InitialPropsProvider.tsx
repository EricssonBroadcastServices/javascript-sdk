import { deserialize, ExposureApi, IDeviceInfo, LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";
import { DeviceGroup, WhiteLabelService } from "@ericssonbroadcastservices/whitelabel-sdk";
import React, { useEffect, useState } from "react";
import { IStorage } from ".";
import { IRedBeeState } from "./RedBeeProvider";
import { StorageKey } from "./util/storageKeys";

export const InitialPropsContext = React.createContext<IRedBeeState>({} as IRedBeeState);

interface IInitialPropsProvider {
  storage?: IStorage;
  customer: string;
  businessUnit: string;
  exposureBaseUrl: string;
  device: IDeviceInfo;
  children?: React.ReactNode;
  internalApiUrl: string;
  deviceGroup: DeviceGroup;
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
}) {
  let session: LoginResponse | null = null;
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
        if ((err as any)?.httpCode === 401) {
          storage?.removeItem(StorageKey.SESSION);
        }
        console.error(err);
        session = null;
      }
    }
  }
  if (!session) {
    try {
      session = await tempExposureApi.authentication.loginAnonymous({ customer, businessUnit, device });
    } catch (err) {
      console.error(err);
      session = null;
    }
  }
  return session;
}

export function InitialPropsProvider({
  children,
  storage,
  customer,
  businessUnit,
  exposureBaseUrl,
  device,
  internalApiUrl,
  deviceGroup
}: IInitialPropsProvider) {
  const [state, setState] = useState<IRedBeeState | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    async function initStorage() {
      const session = await getValidatedPersistedSession({ storage, customer, businessUnit, exposureBaseUrl, device });
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
        internalApiUrl,
        config: null,
        deviceGroup,
        exposureApi,
        whiteLabelApi: new WhiteLabelService({
          exposureApi,
          authHeader,
          deviceGroup,
          customer,
          businessUnit,
          baseUrl: internalApiUrl
        })
      });
      setIsReady(true);
    }
    initStorage();
  }, []);
  if (!isReady || !state) return null;
  return <InitialPropsContext.Provider value={state}>{children}</InitialPropsContext.Provider>;
}
