/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import {
  AssetListItemResponse,
  PreferencesListResponse,
  PreferencesResponse,
  UserPreferenceResponse
} from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Add a tag to a list.
 * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag/{tagId}
 * @response `200` `PreferencesResponse` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function addTagToPreferencesList({
  list,
  tagId,
  headers,
  ..._data
}: {
  list: string;
  tagId: string;
  metadata?: Record<string, string>;
  order?: number;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/tag/${tagId}`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<PreferencesResponse>);
}

/**
 * @summary Adds an item to the asset list
 * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset/{assetId}
 * @response `200` `PreferencesResponse` Successful
 * @response `403` `APIErrorMessage` Forbidden.
 * @response `404` `APIErrorMessage` Not found.
 * @response `409` `APIErrorMessage` Limit reached.
 */
export async function addToAssetList({
  list,
  assetId,
  headers,
  ..._data
}: {
  list: string;
  assetId: string;
  metadata?: Record<string, string>;
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
  }).then(response => response.json() as Promise<PreferencesResponse>);
}

/**
 * @summary Deletes an item from the asset list.
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset/{assetId}
 * @response `200` `PreferencesResponse` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function deleteFromAssetList({
  list,
  assetId,
  headers
}: {
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
  }).then(response => response.json() as Promise<PreferencesResponse>);
}

/**
 * @summary Deletes an item from a list.
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag/{tagId}
 * @response `200` `PreferencesResponse` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function deleteTagFromPreferencesList({
  list,
  tagId,
  headers
}: {
  list: string;
  tagId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/tag/${tagId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<PreferencesResponse>);
}

/**
 * @summary Gets an asset list for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset
 * @response `200` `(AssetListItemResponse)[]` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getAssetList({
  list,
  headers,
  ..._data
}: {
  list: string;
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
 * @response `200` `AssetListItemResponse` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getFromAssetList({
  list,
  assetId,
  headers,
  ..._data
}: {
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
 * @summary Get key value pair of preferences for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences
 * @response `200` `UserPreferenceResponse` Successful
 * @response `404` `APIErrorMessage` Not found.
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
 * @summary Get a tag list for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag
 * @response `200` `PreferencesListResponse` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getTagsFromPreferencesList({
  list,
  headers
}: {
  list: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/tag`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<PreferencesListResponse>);
}

/**
 * @summary Set key value pair of preferences for a user.
 * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences
 * @response `200` `PreferencesResponse` Successful
 * @response `403` `APIErrorMessage` Forbidden.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function setPreferences({
  headers,
  ..._data
}: {
  preferences: Record<string, string>;
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
  }).then(response => response.json() as Promise<PreferencesResponse>);
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
