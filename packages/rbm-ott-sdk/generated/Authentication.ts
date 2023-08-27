/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import {
  AnonymousSessionRequest,
  AnonymousSessionResponse,
  ApiKeyUserSessionRequest,
  AuthRequestV3,
  AuthenticationRequest,
  CreateSessionResponse,
  DeleteUsersSessionsRequest,
  EmptyResponse,
  ExternalUserSessionRequest,
  FirebaseAuthenticationRequest,
  GigyaAuthenticationRequest,
  LoginResponse,
  OauthAuthenticationRequest,
  PrimetimeAuthenticationRequest,
  SessionResponse
} from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Creates an anonymous session.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/anonymous
 * @response `200` `AnonymousSessionResponse` success
 * @response `401` `void` INVALID_SESSION_TOKEN. If the session token is invalid
 * @response `403` `void` FORBIDDEN. If the business unit is not configured to support anonymous sessions.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function anonymousSession(data: AnonymousSessionRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<AnonymousSessionResponse>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/anonymous`, ctx.baseUrl),
    headers: headers,
    body: data
  });
}
/**
 * @description If the user is the account's owner, then all the sessions of the account will be deleted. If a deleted session was created with 'userSession' : true, then the history of that session will not be revealed in any forthcoming sessions with this username. This request is privileged and thus needs server to server authentication.
 * @summary Deletes all sessions created by a user.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/session/delete
 * @response `400` `void` INVALID_JSON. If JSON received is not valid JSON.
 * @response `403` `void` FORBIDDEN. The calling server is not authenticated using for instance api key.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 * @response `422` `void` JSON_DOES_NOT_FOLLOW_CONTRACT. If the JSON does not follow the contract. I.E. unknown ENUM sent, strings in place of integers, missing values etc.
 */
export async function deleteSessions(data: DeleteUsersSessionsRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<any>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/session/delete`, ctx.baseUrl),
    headers: headers,
    body: data
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
export async function externalUserSession(data: ExternalUserSessionRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<CreateSessionResponse>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/externalusersession`, ctx.baseUrl),
    headers: headers,
    body: data
  });
}
/**
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauth/auth
 * @response `default` `void` success
 */
export async function getOauthAuth(
  query?: {
    client_id?: string;
    redirect_uri?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<void>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/oauth/auth`, ctx.baseUrl),
    headers: headers,
    query: query
  });
}
/**
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauth/redir
 * @response `default` `void` success
 */
export async function getOauthRedir(
  query?: {
    code?: string;
    state?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<void>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/oauth/redir`, ctx.baseUrl),
    headers: headers,
    query: query
  });
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
export async function login(data: AuthRequestV3, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<LoginResponse>({
    method: "POST",
    url: new URL(`/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/login`, ctx.baseUrl),
    headers: headers,
    body: data
  });
}
/**
 * @description The password algotithms to use is retrieved vu the System resource, get system configuration API.
 * @summary Performs a login.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/login
 * @response `200` `LoginResponse` success
 * @response `400` `void` DEVICE_LIMIT_EXCEEDED. If the account has exceeded the number of allowed devices. SESSION_LIMIT_EXCEEDED. If the account has exceeded the number of allowed sessions. UNKNOWN_DEVICE_ID. If the device body is not included and the device id is not found. INVALID_JSON. If JSON received is not valid JSON. THIRD_PARTY_ERROR. If third party login generate error message, for detail error code see field extendedMessage.
 * @response `401` `void` INCORRECT_CREDENTIALS. If the underlying CRM does not deem the credentials valid. MIGRATED_USER. The user is migrated from another platform and has yet no password. The "new user email" has been resent.
 * @response `403` `void` INFORMATION_COLLECTION_CONSENT_MISSING. The user is required to give consent to collect NOT_CONFIGURED. The OU is not configured to use the v2 API e.g EE2
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 * @response `422` `void` If the JSON does not follow the contract. I.E. unknown ENUM sent, strings in place of integers, missing values etc.
 * @response `429` `void` TEMPORARILY_LOCKED. Login is blocked for the account or IP-address for a while due to too many failed login attempts
 */
export async function loginAnonymous(data: AuthenticationRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<LoginResponse>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/login`, ctx.baseUrl),
    headers: headers,
    body: data
  });
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
export async function loginFirebase(data: FirebaseAuthenticationRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<LoginResponse>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/firebaseLogin`, ctx.baseUrl),
    headers: headers,
    body: data
  });
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
export async function loginGigya(data: GigyaAuthenticationRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<LoginResponse>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/gigyaLogin`, ctx.baseUrl),
    headers: headers,
    body: data
  });
}
/**
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauthLogin
 * @response `default` `void` success
 */
export async function loginOauth(data: OauthAuthenticationRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<void>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/oauthLogin`, ctx.baseUrl),
    headers: headers,
    body: data
  });
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
export async function loginPrimetime(data: PrimetimeAuthenticationRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<LoginResponse>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/adobePrimetimeLogin`, ctx.baseUrl),
    headers: headers,
    body: data
  });
}
/**
 * @summary Logout.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/auth/login
 * @secure
 * @response `200` `EmptyResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If Bearer is missing in authorization header.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 */
export async function logout(
  query?: {
    /** @default false */
    fromAllDevice?: boolean;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<EmptyResponse>({
    method: "DELETE",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/login`, ctx.baseUrl),
    headers: headers,
    query: query
  });
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
export async function session(data: ApiKeyUserSessionRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<CreateSessionResponse>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/session`, ctx.baseUrl),
    headers: headers,
    body: data
  });
}
/**
 * @description Checks if the session is still valid. If the session is marked "overTheDeviceLimit" ths session is valid but may only be used to list and delete devices. By deleting another device the "overTheDeviceLimit" will be cleared.
 * @summary Validate session.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/session
 * @secure
 * @response `200` `SessionResponse` success
 * @response `401` `void` INVALID_SESSION_TOKEN. If the session token is invalid
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function validateSessionToken(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<SessionResponse>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/session`, ctx.baseUrl),
    headers: headers
  });
}

export const AuthenticationService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    anonymousSession,
    deleteSessions,
    externalUserSession,
    getOauthAuth,
    getOauthRedir,
    login,
    loginAnonymous,
    loginFirebase,
    loginGigya,
    loginOauth,
    loginPrimetime,
    logout,
    session,
    validateSessionToken
  }) as const;
