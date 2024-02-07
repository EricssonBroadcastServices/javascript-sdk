/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ContinueUph2Assets, RecommendedAssets, RecommendedWatchNext } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Get list of assets to continue watching
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/recommend/continue
 * @response `200` `ContinueUph2Assets` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getContinueWatching({
  headers,
  ..._data
}: {
  assetTypes?: string[];
  /** If we should only return assets that have publications on this service */
  service?: string;
  tagIds?: string[];
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/recommend/continue`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<ContinueUph2Assets>);
}

/**
 * @description Gets a list of assets to watch next in for example a playlist Not depending on user. Can be used for not logged in.
 * @summary Watch next.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/recommend/watchNext/{assetId}
 * @response `200` `RecommendedWatchNext` success
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getRecommendationsForAsset({
  assetId,
  headers,
  ..._data
}: {
  /** The assetId that you have just played. */
  assetId: string;
  /** Only include assets not geoblocked by given country */
  allowedCountry?: string;
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  /** If we should only return assets that have publications on this service */
  service?: string;
  tagIds?: string[];
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/recommend/watchNext/${assetId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<RecommendedWatchNext>);
}

/**
 * @summary Get recommendations for a user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/recommend/user
 * @response `200` `RecommendedAssets` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getRecommendationsForUser({
  headers,
  ..._data
}: {
  /** Only include assets not geoblocked by given country */
  allowedCountry?: string;
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  /** If we should only return assets that have publications on this service */
  service?: string;
  tagIds?: string[];
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/recommend/user`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<RecommendedAssets>);
}

export class RecommenderService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getContinueWatching = getContinueWatching;
  getRecommendationsForAsset = getRecommendationsForAsset;
  getRecommendationsForUser = getRecommendationsForUser;
}
