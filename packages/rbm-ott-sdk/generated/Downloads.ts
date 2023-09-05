/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { BookkeeperAccount, BookkeeperAsset, DownloadInfoResponse, DownloadResponse, Message } from "./data-contracts";
import { request, ServiceContext } from "./http-client";

/**
 * @summary Unregister all downloads done by an account.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/downloads
 * @response `default` `Message` success
 */
export async function deleteDownloadsForAccount(headers?: HeadersInit) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<Message>({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/downloads`,
    headers,
    ctx
  });
}
/**
 * @summary Unregister all downloads for an asset done by an account.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloads
 * @response `default` `Message` success
 */
export async function deleteDownloadsForAsset(
  /** The id of the asset. */
  assetId: string,
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<Message>({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloads`,
    headers,
    ctx
  });
}
/**
 * @summary Perform a download operation that will give the client media locators and license information.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/download
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
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<DownloadResponse>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/download`,
    headers,
    ctx,
    query: query
  });
}
/**
 * @summary Register a completed download of an asset.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadcompleted
 * @response `default` `BookkeeperAsset` success
 */
export async function downloadCompleted(
  /** The id of the asset. */
  assetId: string,
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<BookkeeperAsset>({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloadcompleted`,
    headers,
    ctx
  });
}
/**
 * @description It will also return information about different download alternatives.
 * @summary Checks if the user is entitled to download the asset.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadinfo
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
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<DownloadInfoResponse>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloadinfo`,
    headers,
    ctx,
    query: query
  });
}
/**
 * @description This will count as a new download.
 * @summary Register license renewed for a downloaded asset.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadrenewed
 * @response `default` `BookkeeperAsset` success
 */
export async function downloadRenewed(
  /** The id of the asset. */
  assetId: string,
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<BookkeeperAsset>({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloadrenewed`,
    headers,
    ctx
  });
}
/**
 * @summary Get information about all downloads done by an account.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/downloads
 * @response `default` `BookkeeperAccount` success
 */
export async function getDownloadsForAccount(headers?: HeadersInit) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<BookkeeperAccount>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/downloads`,
    headers,
    ctx
  });
}
/**
 * @summary Get information for all downloads for an asset done by an account.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloads
 * @response `default` `BookkeeperAsset` success
 */
export async function getDownloadsForAsset(
  /** The id of the asset. */
  assetId: string,
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<BookkeeperAsset>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloads`,
    headers,
    ctx
  });
}

export class DownloadsService {
  constructor(private context: ServiceContext) {}
  deleteDownloadsForAccount = deleteDownloadsForAccount;
  deleteDownloadsForAsset = deleteDownloadsForAsset;
  download = download;
  downloadCompleted = downloadCompleted;
  downloadInfo = downloadInfo;
  downloadRenewed = downloadRenewed;
  getDownloadsForAccount = getDownloadsForAccount;
  getDownloadsForAsset = getDownloadsForAsset;
}
