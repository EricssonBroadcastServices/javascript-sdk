/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import {
  AssetListItemRequest,
  AssetListItemResponse,
  PreferencesListResponse,
  SetUserPreferenceRequest,
  UserPreferenceResponse
} from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Adds an item to the asset list.
 * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset/{assetId}
 * @secure
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `403` `void` TOO_MANY_PREFERENCES. If the body exceed the configured max number of preferences. TOO_LONG_PREFERENCES. If any item in the body is longer than the max configured length.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured. UNKNOWN_ASSET. If the asset is not found.
 * @response `409` `void` LIMIT_REACHED. If the maximum number of items in the list have been reached.
 */
export async function addToAssetList(
  /** The name of the list. */
  list: string,
  assetId: string,
  data: AssetListItemRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<string>({
    method: "POST",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/asset/${assetId}`,
    headers,
    body: data
  });
}
/**
 * @summary Adds an item to a list.
 * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag/{id}
 * @secure
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `403` `void` TOO_MANY_PREFERENCES. If the body exceed the configured max number of preferences. TOO_LONG_PREFERENCES. If any item in the body is longer than the max configured length.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 * @response `409` `void` LIMIT_REACHED. If the maximum number of items in the list have been reached.
 */
export async function addToList(
  /** The name of the list. */
  list: string,
  /** The list item id */
  id: string,
  data: AssetListItemRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<string>({
    method: "POST",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/tag/${id}`,
    headers,
    body: data
  });
}
/**
 * @summary Deletes an item from the asset list.
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset/{assetId}
 * @secure
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 */
export async function deleteFromAssetList(
  /** The name of the list. */
  list: string,
  assetId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<string>({
    method: "DELETE",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/asset/${assetId}`,
    headers
  });
}
/**
 * @summary Deletes an item from a list.
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag/{id}
 * @secure
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 */
export async function deleteFromList(
  /** The name of the list. */
  list: string,
  /** The id of the item */
  id: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<string>({
    method: "DELETE",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/tag/${id}`,
    headers
  });
}
/**
 * @summary Gets an asset list for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset
 * @secure
 * @response `200` `(AssetListItemResponse)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 */
export async function getAssetList(
  /** The name of the list. */
  list: string,
  query?: {
    /** The maximum number of assets to return. */
    limit?: number;
    service?: string;
    tagIds?: string[];
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<AssetListItemResponse[]>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/asset`,
    headers,
    query: query
  });
}
/**
 * @summary Gets an item from the asset list.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset/{assetId}
 * @secure
 * @response `200` `AssetListItemResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 */
export async function getFromAssetList(
  /** The name of the list. */
  list: string,
  assetId: string,
  query?: {
    service?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<AssetListItemResponse>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/asset/${assetId}`,
    headers,
    query: query
  });
}
/**
 * @summary Gets a list for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag
 * @secure
 * @response `200` `(PreferencesListResponse)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_LIST. If the list is not configured.
 */
export async function getList(
  /** The name of the list. */
  list: string,
  query?: {
    service?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<PreferencesListResponse[]>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences/list/${list}/tag`,
    headers,
    query: query
  });
}
/**
 * @summary Gets key value pair of preferences for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences
 * @secure
 * @response `200` `UserPreferenceResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getPreferences(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<UserPreferenceResponse>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences`,
    headers
  });
}
/**
 * @summary Set key value pair of preferences for a user.
 * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences
 * @secure
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `403` `void` TOO_MANY_PREFERENCES. If the body exceed the configured max number of preferences. TOO_LONG_PREFERENCES. If any item in the body is longer than the max configured length.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function setPreferences(data: SetUserPreferenceRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<string>({
    method: "POST",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/preferences`,
    headers,
    body: data
  });
}

export class PreferencesService {
  constructor(private context: ServiceContext) {}
  addToAssetList = addToAssetList;
  addToList = addToList;
  deleteFromAssetList = deleteFromAssetList;
  deleteFromList = deleteFromList;
  getAssetList = getAssetList;
  getFromAssetList = getFromAssetList;
  getList = getList;
  getPreferences = getPreferences;
  setPreferences = setPreferences;
}
