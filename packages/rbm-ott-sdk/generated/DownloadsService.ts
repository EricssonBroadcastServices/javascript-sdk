/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import {
  AccountDownload,
  AssetDownload,
  DownloadInfo,
  DownloadResponse,
  DownloadVerified,
  Message
} from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Unregister all downloads done by an account.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/downloads
 * @response `default` `Message` success
 */
export async function deleteDownloadsForAccount({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/downloads`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<Message>);
}

/**
 * @summary Unregister all downloads for an asset done by an account.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloads
 * @response `default` `Message` success
 */
export async function deleteDownloadsForAsset({
  assetId,
  headers
}: {
  /** The id of the asset. */
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloads`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<Message>);
}

/**
 * @summary Perform a download operation that will give the client media locators and license information.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/download
 * @response `200` `DownloadResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `403` `void` MAX_DOWNLOAD_COUNT_LIMIT_REACHED. Max number of downloads for this asset reached. FORBIDDEN. Operation is not allowed.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is no found. UNKNOWN_ASSET. If the asset is not found.
 */
export async function download({
  assetId,
  headers,
  ..._data
}: {
  assetId: string;
  /** The time to be used when checking download info. */
  time?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/download`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<DownloadResponse>);
}

/**
 * @summary Register a completed download of an asset.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadcompleted
 * @response `default` `AssetDownload` success
 */
export async function downloadCompleted({
  assetId,
  headers
}: {
  /** The id of the asset. */
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloadcompleted`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<AssetDownload>);
}

/**
 * @description It will also return information about different download alternatives.
 * @summary Checks if the user is entitled to download the asset.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadinfo
 * @response `200` `DownloadInfo` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `403` `void` MAX_DOWNLOAD_COUNT_LIMIT_REACHED. Max number of downloads for this asset reached. FORBIDDEN. Operation is not allowed.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is no found. UNKNOWN_ASSET. If the asset is not found.
 */
export async function downloadInfo({
  assetId,
  headers,
  ..._data
}: {
  assetId: string;
  /** The time to be used when checking download info. */
  time?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloadinfo`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<DownloadInfo>);
}

/**
 * @description This will count as a new download.
 * @summary Register license renewed for a downloaded asset.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadrenewed
 * @response `default` `AssetDownload` success
 */
export async function downloadRenewed({
  assetId,
  headers
}: {
  /** The id of the asset. */
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloadrenewed`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<AssetDownload>);
}

/**
 * @description Verifies that an asset is still valid for offline play and get when publication ends.
 * @summary Verify a download.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadverified
 * @response `default` `DownloadVerified` success
 */
export async function downloadVerified({
  assetId,
  headers
}: {
  /** The id of the asset. */
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloadverified`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<DownloadVerified>);
}

/**
 * @summary Get information about all downloads done by an account.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/downloads
 * @response `default` `AccountDownload` success
 */
export async function getDownloadsForAccount({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/downloads`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<AccountDownload>);
}

/**
 * @summary Get information for all downloads for an asset done by an account.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloads
 * @response `default` `AssetDownload` success
 */
export async function getDownloadsForAsset({
  assetId,
  headers
}: {
  /** The id of the asset. */
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloads`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<AssetDownload>);
}

export class DownloadsService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  deleteDownloadsForAccount = deleteDownloadsForAccount;
  deleteDownloadsForAsset = deleteDownloadsForAsset;
  download = download;
  downloadCompleted = downloadCompleted;
  downloadInfo = downloadInfo;
  downloadRenewed = downloadRenewed;
  downloadVerified = downloadVerified;
  getDownloadsForAccount = getDownloadsForAccount;
  getDownloadsForAsset = getDownloadsForAsset;
}
