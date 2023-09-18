/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import {
  AnonymousSessionResponse,
  CreateSessionResponse,
  Device,
  DeviceRegistration,
  EmptyResponse,
  LoginResponse,
  SessionResponse
} from "./data-contracts";
import { request, ServiceContext } from "./http-client";

/**
 * @description If the user is the account's owner, then all the sessions of the account will be deleted. If a deleted session was created with 'userSession' : true, then the history of that session will not be revealed in any forthcoming sessions with this username. This request is privileged and thus needs server to server authentication.
 * @summary Deletes all sessions created by a user.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/session/delete
 * @response `400` `void` INVALID_JSON. If JSON received is not valid JSON.
 * @response `403` `void` FORBIDDEN. The calling server is not authenticated using for instance api key.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 * @response `422` `void` JSON_DOES_NOT_FOLLOW_CONTRACT. If the JSON does not follow the contract. I.E. unknown ENUM sent, strings in place of integers, missing values etc.
 */
export async function deleteSessions({
  headers,
  ..._data
}: {
  /** The users login name */
  username: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/session/delete`,
    headers,
    ctx,
    body: _data
  });
}

/**
 * @description This request is privileged and thus needs server to server authentication.
 * @summary Creates a session for an external user - a user known only by the caller.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/externalusersession
 * @response `200` `CreateSessionResponse` success
 * @response `400` `void` DEVICE_LIMIT_EXCEEDED. If the account has exceeded the number of allowed devices. UNKNOWN_DEVICE_ID. If the device body is not included and the device id is not found. INVALID_JSON. If JSON received is not valid JSON.
 * @response `403` `void` FORBIDDEN. The calling server is not authenticated using for instance api key. NOT_CONFIGURED. The OU is not configured to use the v2 API
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 * @response `422` `void` JSON_DOES_NOT_FOLLOW_CONTRACT. If the JSON does not follow the contract. I.E. unknown ENUM sent, strings in place of integers, missing values etc.
 */
export async function externalUserSession({
  headers,
  ..._data
}: {
  /** Will be used as accountId and, if userId is not provided, as userId */
  accountId: string;
  device: DeviceRegistration;
  /** The time that the session should expire. */
  expiration: string;
  /** Optional userId, if not provided accountId will be used also as userId */
  userId?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/externalusersession`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<CreateSessionResponse>);
}

/**
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauth/auth
 * @response `default` `void` success
 */
export async function getOauthAuth({
  headers,
  ..._data
}: {
  client_id?: string;
  redirect_uri?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/oauth/auth`,
    headers,
    ctx,
    query: _data
  }).then(response => response.json() as Promise<void>);
}

/**
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauth/redir
 * @response `default` `void` success
 */
export async function getOauthRedir({
  headers,
  ..._data
}: {
  code?: string;
  state?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/oauth/redir`,
    headers,
    ctx,
    query: _data
  }).then(response => response.json() as Promise<void>);
}

/**
 * @summary Performs a login.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/auth/login
 * @response `200` `LoginResponse` success
 * @response `400` `void` DEVICE_LIMIT_EXCEEDED. If the account has exceeded the number of allowed devices. SESSION_LIMIT_EXCEEDED. If the account has exceeded the number of allowed sessions. UNKNOWN_DEVICE_ID. If the device body is not included and the device id is not found. INVALID_JSON. If JSON received is not valid JSON. THIRD_PARTY_ERROR. If third party login generate error message, for detail error code see field extendedMessage.
 * @response `401` `void` INCORRECT_CREDENTIALS. If the underlying CRM does not deem the credentials valid. MIGRATED_USER. The user is migrated from another platform and has yet no password. The "new user email" has been resent.
 * @response `403` `void` INFORMATION_COLLECTION_CONSENT_MISSING. The user is required to give consent to collect NOT_CONFIGURED. The OU is not configured to use the v2 API e.g EE2
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 * @response `422` `void` If the JSON does not follow the contract. I.E. unknown ENUM sent, strings in place of integers, missing values etc.
 * @response `429` `void` TEMPORARILY_LOCKED. Login is blocked for the account or IP-address for a while due to too many failed login attempts
 */
export async function login({
  headers,
  ..._data
}: {
  /** The users login name, e.g. email */
  username: string;
  device: DeviceRegistration;
  /** Password. */
  password?: string;
  /**
   * TRUE: Consent to collect personal information is given.
   * FALSE or null: consent is not given now. This may be fine if consent already is given.
   */
  informationCollectionConsentGivenNow?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/login`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @summary Creates an anonymous session.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/anonymous
 * @response `200` `AnonymousSessionResponse` success
 * @response `401` `void` INVALID_SESSION_TOKEN. If the session token is invalid
 * @response `403` `void` FORBIDDEN. If the business unit is not configured to support anonymous sessions.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function loginAnonymous({
  headers,
  ..._data
}: {
  device: Device;
  /** The device id. */
  deviceId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/anonymous`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<AnonymousSessionResponse>);
}

/**
 * @summary EXPERIMENTAL Performs a login using a Firebase access token.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/firebaseLogin
 * @response `200` `LoginResponse` success
 * @response `400` `void` DEVICE_LIMIT_EXCEEDED. If the account has exceeded the number of allowed devices. SESSION_LIMIT_EXCEEDED. If the account has exceeded the number of allowed sessions. UNKNOWN_DEVICE_ID. If the device body is not included and the device id is not found. INVALID_JSON. If JSON received is not valid JSON. THIRD_PARTY_ERROR. If third party login generate error message, for detail error code see field extendedMessage.
 * @response `403` `void` INFORMATION_COLLECTION_CONSENT_MISSING. The user is required to give consent to collect NOT_CONFIGURED. The OU is not configured to use the v2 API e.g EE2 USERNAME_ALREADY_IN_USE. The email address is used by another account
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 * @response `422` `void` If the JSON does not follow the contract. I.E. unknown ENUM sent, strings in place of integers, missing values etc.
 * @response `429` `void` TEMPORARILY_LOCKED. Login is blocked for the account or IP-address for a while due to too many failed login attempts
 */
export async function loginFirebase({
  headers,
  ..._data
}: {
  /** The users login name, 'firebase..&lt;uid&gt;' */
  username: string;
  device: DeviceRegistration;
  /** Email, used for Firebase user creation. */
  email?: string;
  /** Display name, used for Firebase user creation. */
  displayName?: string;
  /** Email verified, used for Firebase user creation. */
  emailVerified?: boolean;
  /** Firebase provider, used for Firebase user creation. */
  providerId?: string;
  /** Firebase access token. */
  accessToken?: string;
  /**
   * When should the session created by this authentication request expire
   * and force the user to log in again.
   */
  expiration?: string;
  /** The user's preferred language. Only used if first login when creating the user */
  language?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/firebaseLogin`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @summary Performs a login using a Gigya JWT.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/gigyaLogin
 * @response `200` `LoginResponse` success
 * @response `400` `void` DEVICE_LIMIT_EXCEEDED. If the account has exceeded the number of allowed devices. SESSION_LIMIT_EXCEEDED. If the account has exceeded the number of allowed sessions. UNKNOWN_DEVICE_ID. If the device body is not included and the device id is not found. INVALID_JSON. If JSON received is not valid JSON. THIRD_PARTY_ERROR. If third party login generate error message, for detail error code see field extendedMessage.
 * @response `403` `void` INFORMATION_COLLECTION_CONSENT_MISSING. The user is required to give consent to collect NOT_CONFIGURED. The OU is not configured to use Gigya.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 * @response `422` `void` If the JSON does not follow the contract. I.E. unknown ENUM sent, strings in place of integers, missing values etc.
 */
export async function loginGigya({
  headers,
  ..._data
}: {
  /** Gigya JWT. */
  jwt: string;
  device: DeviceRegistration;
  /** The user's preferred language. Only used if first login when creating the user */
  language?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/gigyaLogin`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauthLogin
 * @response `default` `void` success
 */
export async function loginOauth({
  headers,
  ..._data
}: {
  /** OAuth access token. */
  token: string;
  device: DeviceRegistration;
  /** The user's preferred language. Only used if firebase login creating the user */
  language?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/oauthLogin`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<void>);
}

/**
 * @summary Performs a login using a Adobe Primetime media token.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/adobePrimetimeLogin
 * @response `200` `LoginResponse` success
 * @response `400` `void` DEVICE_LIMIT_EXCEEDED. If the account has exceeded the number of allowed devices. SESSION_LIMIT_EXCEEDED. If the account has exceeded the number of allowed sessions. UNKNOWN_DEVICE_ID. If the device body is not included and the device id is not found. INVALID_JSON. If JSON received is not valid JSON. THIRD_PARTY_ERROR. If third party login generate error message, for detail error code see field extendedMessage.
 * @response `403` `void` INFORMATION_COLLECTION_CONSENT_MISSING. The user is required to give consent to collect NOT_CONFIGURED. The OU is not configured to use Primetime.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 * @response `422` `void` If the JSON does not follow the contract. I.E. unknown ENUM sent, strings in place of integers, missing values etc.
 * @response `429` `void` TEMPORARILY_LOCKED. Login is blocked for the account or IP-address for a while due to too many failed login attempts
 */
export async function loginPrimetime({
  headers,
  ..._data
}: {
  /** Adobe Primetime AuthZ media token. */
  mediaToken: string;
  device: DeviceRegistration;
  /** The user's preferred language. Only used if first login when creating the user */
  language?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/adobePrimetimeLogin`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @summary Logout.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/auth/login
 * @response `200` `EmptyResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If Bearer is missing in authorization header.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 */
export async function logout({
  headers,
  ..._data
}: {
  /** @default false */
  fromAllDevice?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/login`,
    headers,
    ctx,
    query: _data
  }).then(response => response.json() as Promise<EmptyResponse>);
}

/**
 * @description This request is privileged and thus needs server to server authentication.
 * @summary Creates a session for a API-Key user.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/session
 * @response `200` `CreateSessionResponse` success
 * @response `400` `void` DEVICE_LIMIT_EXCEEDED. If the account has exceeded the number of allowed devices. UNKNOWN_DEVICE_ID. If the device body is not included and the device id is not found. INVALID_JSON. If JSON received is not valid JSON.
 * @response `403` `void` FORBIDDEN. The calling server is not authenticated using for instance api key. NOT_CONFIGURED. The OU is not configured to use the v2 API
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 * @response `422` `void` JSON_DOES_NOT_FOLLOW_CONTRACT. If the JSON does not follow the contract. I.E. unknown ENUM sent, strings in place of integers, missing values etc.
 */
export async function session({
  headers,
  ..._data
}: {
  /** The users login name */
  username: string;
  device: DeviceRegistration;
  /**
   * When should the session created by this authentication request expire
   * and force the user to log in again.
   */
  expiration?: string;
  /**
   * Should the session be unique or connected to a userId.
   * If true the session will only be connected to an account but not to a user
   */
  sessionUser?: boolean;
  /**
   * TRUE: Consent to collect personal information is given.
   * FALSE or null: consent is not given now. This may be fine if consent already is given.
   */
  informationCollectionConsentGivenNow?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/session`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<CreateSessionResponse>);
}

/**
 * @description Checks if the session is still valid. If the session is marked "overTheDeviceLimit" ths session is valid but may only be used to list and delete devices. By deleting another device the "overTheDeviceLimit" will be cleared.
 * @summary Validate session.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/session
 * @response `200` `SessionResponse` success
 * @response `401` `void` INVALID_SESSION_TOKEN. If the session token is invalid
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function validateSessionToken({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/session`,
    headers,
    ctx
  }).then(response => response.json() as Promise<SessionResponse>);
}

export class AuthenticationService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  deleteSessions = deleteSessions;
  externalUserSession = externalUserSession;
  getOauthAuth = getOauthAuth;
  getOauthRedir = getOauthRedir;
  login = login;
  loginAnonymous = loginAnonymous;
  loginFirebase = loginFirebase;
  loginGigya = loginGigya;
  loginOauth = loginOauth;
  loginPrimetime = loginPrimetime;
  logout = logout;
  session = session;
  validateSessionToken = validateSessionToken;
}
