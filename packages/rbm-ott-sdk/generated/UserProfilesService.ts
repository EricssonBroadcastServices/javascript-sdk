/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { LoginResponse, UserProfiles } from "./data-contracts";
import { ServiceContext, request } from "./http-client";

/**
 * @summary Add a user profile
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile
 * @response `200` `UserProfiles` OK
 */
export async function addProfile({
  headers,
  ..._data
}: {
  displayName: string;
  child?: boolean;
  profileType?: string;
  metadata?: Record<string, string>;
  language?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<UserProfiles>);
}

/**
 * @summary Delete a user profile
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}
 * @response `200` `void` OK
 */
export async function deleteProfile({
  userId,
  headers
}: {
  userId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile/${userId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @summary Get user profiles
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile
 * @response `200` `UserProfiles` OK
 */
export async function getProfiles({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<UserProfiles>);
}

/**
 * @description The current session token will be replaced.
 * @summary Select, or switch to, a user profile
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}/select
 * @response `200` `LoginResponse` OK
 */
export async function selectProfile({
  userId,
  headers
}: {
  userId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile/${userId}/select`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @summary Update a user profile
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}
 * @response `200` `void` OK
 */
export async function updateUserProfile({
  userId,
  headers,
  ..._data
}: {
  userId: string;
  /** Name used e.g. as email display name, null if not changed */
  displayName?: string;
  /** Preferred language, null if not changed. */
  language?: string;
  /** True if user is a child. */
  child?: boolean;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration, null if not changed */
  profileType?: string;
  /** Application defined map String->String. Can be used for arbitrary application specific data, null if not changed */
  metadata?: Record<string, string>;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile/${userId}`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  });
}

export class UserProfilesService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  addProfile = addProfile;
  deleteProfile = deleteProfile;
  getProfiles = getProfiles;
  selectProfile = selectProfile;
  updateUserProfile = updateUserProfile;
}
