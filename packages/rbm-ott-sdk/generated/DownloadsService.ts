/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AccountDownload, AssetDownload, Download, DownloadInfo, DownloadVerified, Message } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @description Unregister all downloads completed by an account.
 * @summary Unregister all downloads done by an account
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/downloads
 * @response `200` `Message` OK
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
 * @description Unregister all downloads for a specific asset completed by an account.
 * @summary Unregister all downloads for an asset done by an account
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloads
 * @response `200` `Message` OK
 */
export async function deleteDownloadsForAsset({
  assetId,
  headers
}: {
  /** The asset ID */
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
 * @description Initiate the download of an asset for offline play.
 * @summary Download Asset
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/download
 * @response `200` `Download` OK
 */
export async function download({
  assetId,
  headers,
  ..._data
}: {
  /** The asset ID */
  assetId: string;
  /**
   * Is Proxy. FOR INTERNAL USE
   * @default false
   */
  proxy?: boolean;
  /** The time to be used when checking entitlement */
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
  }).then(response => response.json() as Promise<Download>);
}

/**
 * @description Register that a download of an asset has been completed.
 * @summary Register a completed download of an asset
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadcompleted
 * @response `200` `AssetDownload` OK
 */
export async function downloadCompleted({
  assetId,
  headers
}: {
  /** The asset ID */
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
 * @description Retrieve download information for a specific asset.
 * @summary Get download info
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadinfo
 * @response `200` `DownloadInfo` OK
 */
export async function downloadInfo({
  assetId,
  headers,
  ..._data
}: {
  /** The asset ID */
  assetId: string;
  /**
   * Is Proxy. FOR INTERNAL USE
   * @default false
   */
  proxy?: boolean;
  /** The time to be used when checking entitlement */
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
 * @description Register that a downloaded asset's license has been renewed.
 * @summary Register license renewed for a downloaded asset
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadrenewed
 * @response `200` `AssetDownload` OK
 */
export async function downloadRenewed({
  assetId,
  headers
}: {
  /** The asset ID */
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
 * @summary Verify a download
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadverified
 * @response `200` `DownloadVerified` OK
 */
export async function downloadVerified({
  assetId,
  headers,
  ..._data
}: {
  /** The asset ID */
  assetId: string;
  /**
   * Is Proxy. FOR INTERNAL USE
   * @default false
   */
  proxy?: boolean;
  /** The time to be used when checking entitlement */
  time?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/downloadverified`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<DownloadVerified>);
}

/**
 * @description Retrieve information about all downloads completed by an account.
 * @summary Get information about all downloads done by an account
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/downloads
 * @response `200` `AccountDownload` OK
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
 * @description Retrieve information about all downloads for a specific asset completed by an account.
 * @summary Get information for all downloads for an asset done by an account
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloads
 * @response `200` `AssetDownload` OK
 */
export async function getDownloadsForAsset({
  assetId,
  headers
}: {
  /** The asset ID */
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
