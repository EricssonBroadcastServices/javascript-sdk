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
 * @summary Deletes an asset from the last viewed asset list
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/lastviewed/asset/{assetId}
 * @response `200` `string` Successful
 * @response `401` `APIErrorMessage` Authorization Error: NO_SESSION_TOKEN - If the session token is missing INVALID_SESSION_TOKEN - If the session token is provided but not valid
 * @response `404` `APIErrorMessage` UNKNOWN_BUSINESS_UNIT - If the business unit is not found.
 */
export async function deleteFromLastViewedAssetList({
  assetId,
  headers
}: {
  /** The asset id */
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userplayhistory/lastviewed/asset/${assetId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<string>);
}

/**
 * @summary EXPERIMENTAL Get the episode in progress
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/continue/tvshow/{tvshowid}
 * @response `200` `WatchedTvShowResponse` Successful
 * @response `401` `APIErrorMessage` Authorization Error: NO_SESSION_TOKEN - If the session token is missing INVALID_SESSION_TOKEN - If the session token is provided but not valid
 * @response `404` `APIErrorMessage` Not found: UNKNOWN_BUSINESS_UNIT - If the business unit is not found.UNKNOWN_ASSET. If the asset with id tvShowId cannot be found.
 */
export async function getEpisodeInProgress({
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
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<WatchedTvShowResponse>);
}

/**
 * @summary Gets last viewed offset for assets for a user
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/lastviewedoffset
 * @response `200` `LastViewedOffsetList` Successful
 * @response `401` `APIErrorMessage` Authorization Error: NO_SESSION_TOKEN - If the session token is missing INVALID_SESSION_TOKEN - If the session token is provided but not valid.
 * @response `404` `APIErrorMessage` UNKNOWN_BUSINESS_UNIT - If the business unit is not found.
 */
export async function getLastViewedOffsetList({
  headers,
  ..._data
}: {
  /**
   * Return all bookmarks for the account and not only the ones for current user. Default value false.
   * @default false
   */
  account?: boolean;
  /**
   * Return all active bookmarks for the account, if the value is false results will include soft deleted bookmarks. Default value true.
   * @default true
   */
  active?: boolean;
  /** The asset ids to filter by */
  assetIds?: string[];
  /**
   * The page number
   * @default "1"
   */
  pageNumber?: string;
  /**
   * The number of items to show per page
   * @default "200"
   */
  pageSize?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userplayhistory/lastviewedoffset`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<LastViewedOffsetList>);
}

export class UserPlayHistoryService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  deleteFromLastViewedAssetList = deleteFromLastViewedAssetList;
  getEpisodeInProgress = getEpisodeInProgress;
  getLastViewedOffsetList = getLastViewedOffsetList;
}
