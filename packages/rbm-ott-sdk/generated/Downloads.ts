/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { BookkeeperAccount, BookkeeperAsset, DownloadInfoResponse, DownloadResponse, Message } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Unregister all downloads done by an account.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/downloads
 * @secure
 * @response `default` `Message` success
 */
export async function deleteDownloadsForAccount(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Message>({
    method: "DELETE",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/downloads`, ctx.baseUrl),
    headers
  });
}
/**
 * @summary Unregister all downloads for an asset done by an account.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloads
 * @secure
 * @response `default` `Message` success
 */
export async function deleteDownloadsForAsset(
  /** The id of the asset. */
  assetId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Message>({
    method: "DELETE",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloads`,
      ctx.baseUrl
    ),
    headers
  });
}
/**
 * @summary Perform a download operation that will give the client media locators and license information.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/download
 * @secure
 * @response `200` `DownloadResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `403` `void` MAX_DOWNLOAD_COUNT_LIMIT_REACHED. Max number of downloads for this asset reached. FORBIDDEN. Operation is not allowed.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is no found. UNKNOWN_ASSET. If the asset is not found.
 */
export async function download(
  assetId: string,
  query?: {
    /** The time to be used when checking download info. */
    time?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<DownloadResponse>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/download`,
      ctx.baseUrl
    ),
    headers,
    query: query
  });
}
/**
 * @summary Register a completed download of an asset.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadcompleted
 * @secure
 * @response `default` `BookkeeperAsset` success
 */
export async function downloadCompleted(
  /** The id of the asset. */
  assetId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<BookkeeperAsset>({
    method: "POST",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloadcompleted`,
      ctx.baseUrl
    ),
    headers
  });
}
/**
 * @description It will also return information about different download alternatives.
 * @summary Checks if the user is entitled to download the asset.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadinfo
 * @secure
 * @response `200` `DownloadInfoResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `403` `void` MAX_DOWNLOAD_COUNT_LIMIT_REACHED. Max number of downloads for this asset reached. FORBIDDEN. Operation is not allowed.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is no found. UNKNOWN_ASSET. If the asset is not found.
 */
export async function downloadInfo(
  assetId: string,
  query?: {
    /** The time to be used when checking download info. */
    time?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<DownloadInfoResponse>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloadinfo`,
      ctx.baseUrl
    ),
    headers,
    query: query
  });
}
/**
 * @description This will count as a new download.
 * @summary Register license renewed for a downloaded asset.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadrenewed
 * @secure
 * @response `default` `BookkeeperAsset` success
 */
export async function downloadRenewed(
  /** The id of the asset. */
  assetId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<BookkeeperAsset>({
    method: "POST",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloadrenewed`,
      ctx.baseUrl
    ),
    headers
  });
}
/**
 * @summary Get information about all downloads done by an account.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/downloads
 * @secure
 * @response `default` `BookkeeperAccount` success
 */
export async function getDownloadsForAccount(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<BookkeeperAccount>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/downloads`, ctx.baseUrl),
    headers
  });
}
/**
 * @summary Get information for all downloads for an asset done by an account.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloads
 * @secure
 * @response `default` `BookkeeperAsset` success
 */
export async function getDownloadsForAsset(
  /** The id of the asset. */
  assetId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<BookkeeperAsset>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloads`,
      ctx.baseUrl
    ),
    headers
  });
}

export const DownloadsService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    deleteDownloadsForAccount,
    deleteDownloadsForAsset,
    download,
    downloadCompleted,
    downloadInfo,
    downloadRenewed,
    getDownloadsForAccount,
    getDownloadsForAsset
  }) as const;
