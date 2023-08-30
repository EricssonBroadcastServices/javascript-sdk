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
  GetUserContentRatingResponse,
  PutUserContentRatingRequest
} from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Delete an asset rating given by currently logged in user.
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/rating/asset/{assetId}
 * @secure
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function deleteUserContentRating(
  /** The asset id */
  assetId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "DELETE",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/rating/asset/${assetId}`,
    headers
  });
}
/**
 * @summary Get all ratings for an asset.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/rating/asset/{assetId}/all
 * @response `200` `(GetAllUserContentRatingsForAssetResponse)[]` success
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getAllUserContentRatingsForAsset(
  /** The asset id */
  assetId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<GetAllUserContentRatingsForAssetResponse[]>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/rating/asset/${assetId}/all`,
    headers
  });
}
/**
 * @summary Give all asset ratings given by currently logged in user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/rating/all
 * @secure
 * @response `200` `(GetAllUserContentRatingsForUserResponse)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getAllUserContentRatingsForUser(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<GetAllUserContentRatingsForUserResponse[]>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/rating/all`,
    headers
  });
}
/**
 * @summary Get rating of an asset given by the currently logged in user.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/rating/asset/{assetId}
 * @secure
 * @response `200` `GetUserContentRatingResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getUserContentRating(
  /** The asset id */
  assetId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<GetUserContentRatingResponse>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/rating/asset/${assetId}`,
    headers
  });
}
/**
 * @summary Create/Update a rating for an asset given by currently logged in user.
 * @request PUT:/v1/customer/{customer}/businessunit/{businessUnit}/rating/asset/{assetId}
 * @secure
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 * @response `422` `void` RATING_BELOW_ZERO. If the supplied rating is below 0.0. RATING_ABOVE_ONE. If the supplied rating is above 1.0.
 */
export async function putUserContentRating(
  /** The asset id */
  assetId: string,
  data: PutUserContentRatingRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "PUT",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/rating/asset/${assetId}`,
    headers,
    body: data
  });
}

export class RatingService {
  constructor(private context: ServiceContext) {}
  deleteUserContentRating = deleteUserContentRating;
  getAllUserContentRatingsForAsset = getAllUserContentRatingsForAsset;
  getAllUserContentRatingsForUser = getAllUserContentRatingsForUser;
  getUserContentRating = getUserContentRating;
  putUserContentRating = putUserContentRating;
}
