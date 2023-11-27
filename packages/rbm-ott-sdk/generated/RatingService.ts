/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import {
  GetAllUserContentRatingsForAssetResponse,
  GetAllUserContentRatingsForUserResponse,
  GetUserContentRatingResponse
} from "./data-contracts";
import { ServiceContext, request } from "./http-client";

/**
 * @summary Delete an asset rating given by currently logged in user.
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/rating/asset/{assetId}
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function deleteUserContentRating({
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
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/rating/asset/${assetId}`,
    headers: new Headers({ ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @summary Get all ratings for an asset.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/rating/asset/{assetId}/all
 * @response `200` `(GetAllUserContentRatingsForAssetResponse)[]` success
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getAllUserContentRatingsForAsset({
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
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/rating/asset/${assetId}/all`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<GetAllUserContentRatingsForAssetResponse[]>);
}

/**
 * @summary Give all asset ratings given by currently logged in user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/rating/all
 * @response `200` `(GetAllUserContentRatingsForUserResponse)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getAllUserContentRatingsForUser({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/rating/all`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<GetAllUserContentRatingsForUserResponse[]>);
}

/**
 * @summary Get rating of an asset given by the currently logged in user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/rating/asset/{assetId}
 * @response `200` `GetUserContentRatingResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getUserContentRating({
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
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/rating/asset/${assetId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<GetUserContentRatingResponse>);
}

/**
 * @summary Create/Update a rating for an asset given by currently logged in user.
 * @request PUT:/v1/customer/{customer}/businessunit/{businessUnit}/rating/asset/{assetId}
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 * @response `422` `void` RATING_BELOW_ZERO. If the supplied rating is below 0.0. RATING_ABOVE_ONE. If the supplied rating is above 1.0.
 */
export async function putUserContentRating({
  assetId,
  headers,
  ..._data
}: {
  /** The asset id */
  assetId: string;
  rating?: number;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/rating/asset/${assetId}`,
    headers: new Headers({ "content-type": "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    body: _data
  });
}

export class RatingService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  deleteUserContentRating = deleteUserContentRating;
  getAllUserContentRatingsForAsset = getAllUserContentRatingsForAsset;
  getAllUserContentRatingsForUser = getAllUserContentRatingsForUser;
  getUserContentRating = getUserContentRating;
  putUserContentRating = putUserContentRating;
}
