import {
  DeviceRegistration,
  ServiceContext,
  loginAnonymous,
  validateSessionToken
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { Session, SessionData } from "../Session";
import { IStorage } from "../types/storage";
import { StorageKey } from "./storageKeys";
import { ErrorCode } from "./error";

interface IParsedToken {
  accountId?: string;
  crmToken?: string;
  userId?: string;
  expiration: string;
  deviceId: string;
  isAnonymous: boolean;
}

/** parse a session token and extract values not present in the session validation response */
export function parseSessionToken(token: string): IParsedToken | null {
  const splitted = token.split("|");
  if (splitted.length < 7) return null;
  return {
    deviceId: splitted[7],
    expiration: splitted[5],
    isAnonymous: splitted[6] === "true"
  };
}

interface IValidateAndReconstructSessionFromSessionToken {
  context: ServiceContext;
  sessionToken: string;
}

export async function validateAndReconstructSessionFromSessionToken({
  context,
  sessionToken
}: IValidateAndReconstructSessionFromSessionToken): Promise<Session | null> {
  try {
    const headers = { Authorization: `Bearer ${sessionToken}` };
    const res = await validateSessionToken.call(context, { headers });
    const parsedToken = parseSessionToken(sessionToken);
    // no need to reconstruct anonymous sessions, we can just create a new one
    if (!parsedToken || parsedToken?.isAnonymous) return null;
    const sessionData: SessionData = {
      expirationDateTime: new Date(parseInt(parsedToken.expiration)).toString(),
      sessionToken,
      informationCollectionConsentGiven: new Date().toString(),
      informationCollectionConsentRequiredDate: new Date().toString(),
      isAnonymous: false,
      language: res.userProfile?.language,
      userId: res.userId,
      accountId: res.accountId,
      isOverDeviceLimit: res.overTheDeviceLimit,
      crmToken: parsedToken.crmToken,
      child: false,
      userProfile: res.userProfile
    };

    return new Session(sessionData);
  } catch (err) {
    return null;
  }
}

export async function getValidatedPersistedSession({
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
