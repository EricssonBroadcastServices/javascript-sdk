/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { CreateSessionResponse, DeviceRegistration, JsonNode, LoginResponse, SessionResponse } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @description This request is privileged and thus needs server to server authentication.
 * @summary Deletes all sessions created by or for a user.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/session/delete
 * @response `200` `void` OK
 */
export async function deleteSessions({
  headers,
  ..._data
}: {
  /** The user's (login) username. */
  username: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/session/delete`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  });
}

/**
 * @description This request is privileged and thus needs server to server authentication.
 * @summary Creates a session for an external user - a user known only by the caller
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/externalusersession
 * @response `200` `CreateSessionResponse` OK
 */
export async function externalUserSession({
  headers,
  ..._data
}: {
  /** Will be used as accountId and, if userId is not provided, as userId. */
  accountId: string;
  device: DeviceRegistration;
  /** When the session should expire. */
  expiration: string;
  /** Optional userId, if not provided accountId will be used also as userId. */
  userId?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/externalusersession`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<CreateSessionResponse>);
}

/**
 * @description Limited availability, not for general use.
 * @summary Part of OAuth Login
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauth/auth
 * @response `200` `JsonNode` OK
 */
export async function getOauthAuth({
  headers,
  ..._data
}: {
  client_id: string;
  redirect_uri: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/oauth/auth`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<JsonNode>);
}

/**
 * @description Limited availability, not for general use.
 * @summary Part of OAuth Login
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauth/redir
 * @response `200` `JsonNode` OK
 */
export async function getOauthRedir({
  headers,
  ..._data
}: {
  code: string;
  state: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/oauth/redir`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<JsonNode>);
}

/**
 * @summary Login with username and password.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/auth/login
 * @response `200` `LoginResponse` OK
 */
export async function login({
  headers,
  ..._data
}: {
  /** Username of the user. */
  username: string;
  device: DeviceRegistration;
  /** User's password. */
  password?: string;
  /** true if consent to collect personal information is given. null == false */
  informationCollectionConsentGivenNow?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/login`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @summary Performs a login using a Firebase access token.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/firebaseLogin
 * @response `200` `LoginResponse` OK
 */
export async function loginFirebase({
  headers,
  ..._data
}: {
  /** The user's login name, 'firebase..<uid> */
  username: string;
  device: DeviceRegistration;
  /** The user's email address, if provided it may be used. The email could also be taken from he access token. */
  email?: string;
  /** The user's display name, if provided it may be used. The name could also be taken from he access token's name field. */
  displayName?: string;
  /**
   * Ignored.
   *  * @deprecated
   */
  emailVerified?: boolean;
  /**
   * Ignored.
   *  * @deprecated
   */
  providerId?: string;
  /** Firebase access token. */
  accessToken?: string;
  /** When should the session expire. If omitted system default is applied. */
  expiration?: string;
  /** The user's preferred language. Only used at first login when creating the user. */
  language?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/firebaseLogin`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @summary Performs a login using a Gigya JWT.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/gigyaLogin
 * @response `200` `LoginResponse` OK
 */
export async function loginGigya({
  headers,
  ..._data
}: {
  /** The Gigya JWT. */
  jwt: string;
  device: DeviceRegistration;
  /** The user's preferred language. Only used at first login when creating the user. */
  language?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/gigyaLogin`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @description Limited availability, not for general use.
 * @summary Performs a login using OAuth.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauthLogin
 * @response `200` `LoginResponse` OK
 */
export async function loginOauth({
  headers,
  ..._data
}: {
  /**  OAuth access token. */
  token: string;
  device: DeviceRegistration;
  /** The user's preferred language. Only used at first login when creating the user. */
  language?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/oauthLogin`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @summary Performs a login using either: * an ID token (obtained using the Implicit flow with Form Post) * or a code and an optional code_verifier (obtained using the Authorization Code with PKCE flow)
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oidcLogin
 * @response `200` `LoginResponse` Successful
 * @response `400` `APIErrorMessage` Malformed payload
 */
export async function loginOpenIdConnect({
  headers,
  ..._data
}: {
  device: DeviceRegistration;
  /** ID token */
  jwt?: string;
  /** code from the Authorization Code flow */
  code?: string;
  /** The user's preferred language. Only used at first login when creating the user. */
  language?: string;
  /** challenge used in the Authorization Code with PKCE flow */
  code_verifier?: string;
  /** a valid redirect URI configured on the OP */
  redirect_uri?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/oidcLogin`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @summary Performs a login an Adobe Primetime media token.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/adobePrimetimeLogin
 * @response `200` `LoginResponse` OK
 */
export async function loginPrimetime({
  headers,
  ..._data
}: {
  /** The Adobe Primetime AuthZ media token. */
  mediaToken: string;
  device: DeviceRegistration;
  /** The user's preferred language. Only used at first login when creating the user. */
  language?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/adobePrimetimeLogin`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @summary Log out.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/auth/login
 * @response `200` `void` OK
 */
export async function logout({
  headers,
  ..._data
}: {
  /**
   * If true all sessions are ended.
   * @default false
   */
  fromAllDevice?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/login`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  });
}

/**
 * @description This request is privileged and thus needs server to server authentication.
 * @summary Creates a session for a API-Key user
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/session
 * @response `200` `LoginResponse` OK
 */
export async function session({
  headers,
  ..._data
}: {
  /** Username of the user. */
  username: string;
  device: DeviceRegistration;
  /** When should the session expire. If omitted system default is applied. */
  expiration?: string;
  /** To be true in very special cases and then you will now. */
  sessionUser?: boolean;
  /** true if consent to collect personal information is given. null == false */
  informationCollectionConsentGivenNow?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/session`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @description Checks if the session is still valid. If the session is marked "overTheDeviceLimit" ths session is valid but may only be used to list and delete devices. By deleting another device the "overTheDeviceLimit" will be cleared.
 * @summary Validate session.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/session
 * @response `200` `SessionResponse` OK
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
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
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
  loginFirebase = loginFirebase;
  loginGigya = loginGigya;
  loginOauth = loginOauth;
  loginOpenIdConnect = loginOpenIdConnect;
  loginPrimetime = loginPrimetime;
  logout = logout;
  session = session;
  validateSessionToken = validateSessionToken;
}
