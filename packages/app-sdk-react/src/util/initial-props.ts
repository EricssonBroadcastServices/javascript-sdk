import { DeviceRegistration, ServiceContext, SystemConfig } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { getValidatedPersistedSession, validateAndReconstructSessionFromSessionToken } from "./session-token";
import { Session, SessionData } from "../Session";
import { IStorage } from "../types/storage";
import { IRedBeeState } from "../RedBeeProvider";
import { StorageKey } from "./storageKeys";
import {
  DeviceGroup,
  WhiteLabelService as AppService,
  getEssentialAppDataByOrigin,
  GetEssentialAppDataByOriginOptions
} from "@ericssonbroadcastservices/app-sdk";

async function selectValidLangauge(systemConfig: SystemConfig, storage?: IStorage) {
  const persistedSelectedLanguage = await storage?.getItem(StorageKey.LOCALE);

  let selectedLanguage = systemConfig.localization.defaultLocale;

  if (persistedSelectedLanguage && systemConfig.localization.displayLocales.includes(persistedSelectedLanguage)) {
    selectedLanguage = persistedSelectedLanguage;
  }

  if (selectedLanguage !== persistedSelectedLanguage) {
    storage?.setItem(StorageKey.LOCALE, selectedLanguage);
  }

  return selectedLanguage;
}

/** @description get an initial state based on customer/businessUnit/baseUrl and the provided storage module */
export async function getInitialStateByCustomerAndBusinessUnit({
  customer,
  businessUnit,
  baseUrl,
  sessionToken,
  storage,
  deviceRegistration,
  onSessionValidationError,
  deviceGroup
}: {
  customer: string;
  businessUnit: string;
  baseUrl: string;
  sessionToken?: string;
  storage?: IStorage;
  deviceRegistration: Required<DeviceRegistration>;
  deviceGroup: DeviceGroup;
  onSessionValidationError?: (err: unknown) => void;
}): Promise<IRedBeeState> {
  const serviceContext: ServiceContext = {
    customer,
    businessUnit,
    baseUrl
  };

  let session: SessionData | null = null;

  // if a sessionToken has been passed in: use that if possible
  if (sessionToken) {
    session = await validateAndReconstructSessionFromSessionToken({
      context: serviceContext,
      sessionToken,
      storage
    });
  }
  // if there still is no session, use one from storage, if possible
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

  async function getAuthToken() {
    return session?.sessionToken;
  }
  const appService = new AppService({ ...serviceContext, deviceGroup, getAuthToken });

  const essentialAppData = await appService.getEssentialAppData();

  const selectedLanguage = await selectValidLangauge(essentialAppData.systemConfig, storage);

  return {
    session: session && new Session(session),
    selectedLanguage,
    loading: [],
    customer,
    businessUnit,
    storage: storage || null,
    deviceRegistration,
    baseUrl,
    essentialAppData,
    deviceGroup,
    serviceContext,
    appService
  };
}

/** @description get an initial state based on the hostname provided.
 * The hostname should be an domain name configured in the RedBee backend to map to a customer and businessUnit.
 * The hostname will be used for the initial request to the backend, and will automagically figure out it's own context
 * */
export async function getInitialStateByOrigin({
  origin,
  sessionToken,
  storage,
  deviceRegistration,
  onSessionValidationError,
  deviceGroup
}: {
  origin: GetEssentialAppDataByOriginOptions;
  baseUrl: string;
  sessionToken?: string;
  storage?: IStorage;
  deviceRegistration: Required<DeviceRegistration>;
  deviceGroup: DeviceGroup;
  onSessionValidationError?: (err: unknown) => void;
}): Promise<IRedBeeState> {
  const { context, ...essentialAppData } = await getEssentialAppDataByOrigin(
    { baseUrl: origin.origin, deviceGroup, getAuthToken: () => Promise.resolve(undefined) },
    origin
  );

  let session: SessionData | null = null;

  // if a sessionToken has been passed in: use that if possible
  if (sessionToken) {
    session = await validateAndReconstructSessionFromSessionToken({
      context: context,
      sessionToken,
      storage
    });
  }
  // if there still is no session, use one from storage, if possible
  if (!session) {
    try {
      const [validatedSession, validationError] = await getValidatedPersistedSession({
        storage,
        customer: context.customer,
        businessUnit: context.businessUnit,
        baseUrl: context.baseUrl,
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

  const selectedLanguage = await selectValidLangauge(essentialAppData.systemConfig, storage);

  async function getAuthToken() {
    return session?.sessionToken;
  }
  const appService = new AppService({ ...context, deviceGroup, getAuthToken });

  return {
    session: session && new Session(session),
    selectedLanguage: selectedLanguage,
    loading: [],
    customer: context.customer,
    businessUnit: context.businessUnit,
    storage: storage || null,
    deviceRegistration,
    baseUrl: context.baseUrl,
    essentialAppData,
    deviceGroup,
    serviceContext: context,
    appService
  };
}
