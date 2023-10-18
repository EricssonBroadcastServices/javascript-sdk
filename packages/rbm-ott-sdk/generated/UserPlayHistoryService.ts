/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { LastViewedOffsetList, WatchedTvShowResponse } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Deletes an asset from the last viewed asset list.
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/lastviewed/asset/{assetId}
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function deleteFromLastViewedAssetList({
  assetId,
  headers
}: {
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userplayhistory/lastviewed/asset/${assetId}`,
    headers,
    ctx
  }).then(response => response.json() as Promise<string>);
}

/**
 * @summary EXPERIMENTAL
Get the episode in progress
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/continue/tvshow/{tvshowid}
 * @response `200` `WatchedTvShowResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_ASSET. If the asset with id tvShowId cannot be found.
 */
export async function getContinueWatchingTvShow({
  tvshowid,
  headers
}: {
  /** The tvShowId */
  tvshowid: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userplayhistory/continue/tvshow/${tvshowid}`,
    headers,
    ctx
  }).then(response => response.json() as Promise<WatchedTvShowResponse>);
}

/**
 * @summary Gets last viewed offset for assets for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/lastviewedoffset
 * @response `200` `LastViewedOffsetList` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getLastViewedOffsetList({
  headers,
  ..._data
}: {
  /**
   * Return all bookmarks for the account and not only the ones for current user.
   * Default value false.
   * @default false
   */
  account?: boolean;
  /** The asset ids to filter by. */
  assetIds?: string[];
  /**
   * The page number. Default is 1.
   * @default 1
   */
  pageNumber?: number;
  /**
   * The number of items to show per page. Default value is 200.
   * @default 200
   */
  pageSize?: number;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userplayhistory/lastviewedoffset`,
    headers,
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<LastViewedOffsetList>);
}

export class UserPlayHistoryService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  deleteFromLastViewedAssetList = deleteFromLastViewedAssetList;
  getContinueWatchingTvShow = getContinueWatchingTvShow;
  getLastViewedOffsetList = getLastViewedOffsetList;
}
