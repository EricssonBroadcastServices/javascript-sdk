/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { LastViewedOffsetList, WatchedTvShowResponse } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Deletes an asset from the last viewed asset list.
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/lastviewed/asset/{assetId}
 * @secure
 * @response `200` `string` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function deleteFromLastViewedAssetList(assetId: string, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<string>({
    method: "DELETE",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userplayhistory/lastviewed/asset/${assetId}`,
      ctx.baseUrl
    ),
    headers
  });
}
/**
 * @summary EXPERIMENTAL
Get the episode in progress
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/continue/tvshow/{tvshowid}
 * @secure
 * @response `200` `WatchedTvShowResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_ASSET. If the asset with id tvShowId cannot be found.
 */
export async function getContinueWatchingTvShow(
  /** The tvShowId */
  tvshowid: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<WatchedTvShowResponse>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userplayhistory/continue/tvshow/${tvshowid}`,
      ctx.baseUrl
    ),
    headers
  });
}
/**
 * @summary Gets last viewed offset for assets for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/lastviewedoffset
 * @secure
 * @response `200` `(LastViewedOffsetList)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getLastViewedOffsetList(
  query?: {
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
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<LastViewedOffsetList[]>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userplayhistory/lastviewedoffset`,
      ctx.baseUrl
    ),
    headers,
    query: query
  });
}

export class UserPlayHistoryService {
  constructor(private context: ServiceContext) {}
  deleteFromLastViewedAssetList = deleteFromLastViewedAssetList;
  getContinueWatchingTvShow = getContinueWatchingTvShow;
  getLastViewedOffsetList = getLastViewedOffsetList;
}
