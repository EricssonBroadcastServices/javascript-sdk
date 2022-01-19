import { deserialize, ExposureApi, IDeviceInfo, LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";
import { DeviceGroup, WhiteLabelService, WLConfig } from "@ericssonbroadcastservices/whitelabel-sdk";
import React, { useEffect, useState } from "react";
import { IStorage } from ".";
import { IRedBeeState } from "./RedBeeProvider";
import { StorageKey } from "./util/storageKeys";

export const InitialPropsContext = React.createContext<IRedBeeState>({} as IRedBeeState);

interface IInitialPropsProvider {
  storage?: IStorage;
  customer?: string;
  businessUnit?: string;
  origin?: string;
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

interface IResolveCustomerAndBusinessUnit {
  customer?: string;
  businessUnit?: string;
  origin?: string;
  exposureBaseUrl: string;
  internalApiUrl: string;
  deviceGroup: DeviceGroup;
}

async function resolveCustomerAndBusinessUnit({ customer, businessUnit, origin, exposureBaseUrl, deviceGroup, internalApiUrl }: IResolveCustomerAndBusinessUnit): Promise<{ customer: string; businessUnit: string; config: WLConfig | null }> {
  if (customer && businessUnit) {
    return { customer, businessUnit, config: null };
  }
  if (origin) {
    const tempWlApi = new WhiteLabelService({
      exposureApi: new ExposureApi({
        authHeader: () => undefined,
        baseUrl: exposureBaseUrl
      }),
      authHeader: () => undefined,
      deviceGroup,
      baseUrl: internalApiUrl
    })
    const config = await tempWlApi.getConfig({ origin });
    return { customer: config.customer, businessUnit: config.businessUnit, config };
  }
  throw "Either customer and businessUnit, or origin is required";
}

export function InitialPropsProvider({
  children,
  storage,
  customer,
  businessUnit,
  exposureBaseUrl,
  device,
  internalApiUrl,
  deviceGroup,
  origin
}: IInitialPropsProvider) {
  const [state, setState] = useState<IRedBeeState | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    async function initStorage() {
      const { config, ...rest } =  await resolveCustomerAndBusinessUnit({ customer, businessUnit, origin, exposureBaseUrl, internalApiUrl, deviceGroup });
      const session = await getValidatedPersistedSession({ storage, customer: rest.customer, businessUnit: rest.businessUnit, exposureBaseUrl, device });
      const persistedSelectedLanguage = await storage?.getItem(StorageKey.LOCALE);
      const authHeader = () => (session ? { Authorization: `Bearer ${session.sessionToken}` } : undefined);
      const exposureApi = new ExposureApi({
        customer: rest.customer,
        businessUnit: rest.businessUnit,
        authHeader,
        baseUrl: exposureBaseUrl
      });
      setState({
        session,
        selectedLanguage: persistedSelectedLanguage || null,
        loading: [],
        customer: rest.customer,
        businessUnit: rest.businessUnit,
        storage: storage || null,
        device,
        exposureBaseUrl,
        internalApiUrl,
        config,
        deviceGroup,
        exposureApi,
        whiteLabelApi: new WhiteLabelService({
          exposureApi,
          authHeader,
          deviceGroup,
          customer: rest.customer,
          businessUnit: rest.businessUnit,
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
