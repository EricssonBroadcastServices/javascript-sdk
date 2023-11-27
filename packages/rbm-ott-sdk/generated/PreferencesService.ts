/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AssetListItemResponse, PreferencesListResponse, UserPreferenceResponse } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Adds an item to a list.
 * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag/{id}
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `403` `void` TOO_MANY_PREFERENCES. If the body exceed the configured max number of preferences. TOO_LONG_PREFERENCES. If any item in the body is longer than the max configured length.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 * @response `409` `void` LIMIT_REACHED. If the maximum number of items in the list have been reached.
 */
export async function addTagToPreferencesList({
  list,
  id,
  headers,
  ..._data
}: {
  /** The name of the list. */
  list: string;
  /** The list item id */
  id: string;
  /** A key value object */
  metadata?: object;
  /** The order to sort by. */
  order?: number;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/tag/${id}`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<string>);
}

/**
 * @summary Adds an item to the asset list.
 * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset/{assetId}
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `403` `void` TOO_MANY_PREFERENCES. If the body exceed the configured max number of preferences. TOO_LONG_PREFERENCES. If any item in the body is longer than the max configured length.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured. UNKNOWN_ASSET. If the asset is not found.
 * @response `409` `void` LIMIT_REACHED. If the maximum number of items in the list have been reached.
 */
export async function addToAssetList({
  list,
  assetId,
  headers,
  ..._data
}: {
  /** The name of the list. */
  list: string;
  assetId: string;
  /** A key value object */
  metadata?: object;
  /** The order to sort by. */
  order?: number;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/asset/${assetId}`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<string>);
}

/**
 * @summary Deletes an item from the asset list.
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset/{assetId}
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 */
export async function deleteFromAssetList({
  list,
  assetId,
  headers
}: {
  /** The name of the list. */
  list: string;
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/asset/${assetId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<string>);
}

/**
 * @summary Deletes an item from a list.
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag/{id}
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 */
export async function deleteTagFromPreferencesList({
  list,
  id,
  headers
}: {
  /** The name of the list. */
  list: string;
  /** The id of the item */
  id: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/tag/${id}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<string>);
}

/**
 * @summary Gets an asset list for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset
 * @response `200` `(AssetListItemResponse)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 */
export async function getAssetList({
  list,
  headers,
  ..._data
}: {
  /** The name of the list. */
  list: string;
  /** The maximum number of assets to return. */
  limit?: number;
  service?: string;
  tagIds?: string[];
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/asset`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<AssetListItemResponse[]>);
}

/**
 * @summary Gets an item from the asset list.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset/{assetId}
 * @response `200` `AssetListItemResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 */
export async function getFromAssetList({
  list,
  assetId,
  headers,
  ..._data
}: {
  /** The name of the list. */
  list: string;
  assetId: string;
  service?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/asset/${assetId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<AssetListItemResponse>);
}

/**
 * @summary Gets key value pair of preferences for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences
 * @response `200` `UserPreferenceResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getPreferences({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<UserPreferenceResponse>);
}

/**
 * @summary Gets a list for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag
 * @response `200` `PreferencesListResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 */
export async function getTagsFromPreferencesList({
  list,
  headers,
  ..._data
}: {
  /** The name of the list. */
  list: string;
  service?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/tag`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<PreferencesListResponse>);
}

/**
 * @summary Set key value pair of preferences for a user.
 * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `403` `void` TOO_MANY_PREFERENCES. If the body exceed the configured max number of preferences. TOO_LONG_PREFERENCES. If any item in the body is longer than the max configured length.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function setPreferences({
  headers,
  ..._data
}: {
  /** A key value object */
  preferences: object;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<string>);
}

export class PreferencesService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  addTagToPreferencesList = addTagToPreferencesList;
  addToAssetList = addToAssetList;
  deleteFromAssetList = deleteFromAssetList;
  deleteTagFromPreferencesList = deleteTagFromPreferencesList;
  getAssetList = getAssetList;
  getFromAssetList = getFromAssetList;
  getPreferences = getPreferences;
  getTagsFromPreferencesList = getTagsFromPreferencesList;
  setPreferences = setPreferences;
}
