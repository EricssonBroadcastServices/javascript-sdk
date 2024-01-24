import { DeviceRegistration, ServiceContext } from "@ericssonbroadcastservices/rbm-ott-sdk";
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

  const persistedSelectedLanguage = await storage?.getItem(StorageKey.LOCALE);

  async function getAuthToken() {
    return session?.sessionToken;
  }
  const appService = new AppService({ ...serviceContext, deviceGroup, getAuthToken });

  const essentialAppData = await appService.getEssentialAppData().catch(() => null);

  return {
    session: session && new Session(session),
    selectedLanguage: persistedSelectedLanguage || null,
    loading: [],
    customer,
    businessUnit,
    storage: storage || null,
    deviceRegistration,
    baseUrl,
    essentialAppData,
    deviceGroup,
    unavailable: !essentialAppData,
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
  baseUrl,
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
    { baseUrl: origin.hostname, deviceGroup, getAuthToken: () => Promise.resolve(undefined) },
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

  const persistedSelectedLanguage = await storage?.getItem(StorageKey.LOCALE);

  async function getAuthToken() {
    return session?.sessionToken;
  }
  const appService = new AppService({ ...context, deviceGroup, getAuthToken });

  return {
    session: session && new Session(session),
    selectedLanguage: persistedSelectedLanguage || null,
    loading: [],
    customer: context.customer,
    businessUnit: context.businessUnit,
    storage: storage || null,
    deviceRegistration,
    baseUrl,
    essentialAppData,
    deviceGroup,
    unavailable: !essentialAppData,
    serviceContext: context,
    appService
  };
}
