/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AdRollConfig } from "./data-contracts.js";
import { QueryParams, ServiceContext, request } from "./http-client.js";

/**
 * @description Retrieve AdRoll configuration for a specific business unit.
 * @summary Get AdRoll configuration
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/mrss/adrolls
 * @response `200` `AdRollConfig` OK
 */
export async function getAdRollConfig({
  headers,
  ..._data
}: {
  /** The channel ID */
  channelId?: string;
  /** The tenant ID */
  tenantId?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/mrss/adrolls`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<AdRollConfig>);
}

/**
 * @description Retrieve MRSS for a specific business unit with optional parameters.
 * @summary Get MRSS for a specific business unit
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/asset/{assetId}/mrss
 * @response `200` `string` OK
 */
export async function getMRssForBu({
  assetId,
  headers,
  ..._data
}: {
  /** The asset ID */
  assetId: string;
  /** The material ID */
  materialId?: string;
  /** The session parameter */
  session?: string;
  /** Whether to use ads */
  useAds?: boolean;
  /** Whether to use a bumper */
  useBumper?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/asset/${assetId}/mrss`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<string>);
}

/**
 * @description Retrieve MRSS for a customer with optional parameters.
 * @summary Get MRSS for a customer
 * @request GET:/v1/customer/{customer}/asset/{assetId}/mrss
 * @response `200` `string` OK
 */
export async function getMRssForCu({
  assetId,
  headers,
  ..._data
}: {
  /** The asset ID */
  assetId: string;
  /** The material ID */
  materialId?: string;
  /** The session parameter */
  session?: string;
  /** Whether to use ads */
  useAds?: boolean;
  /** Whether to use a bumper */
  useBumper?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/asset/${assetId}/mrss`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<string>);
}

export class MrssService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getAdRollConfig = getAdRollConfig;
  getMRssForBu = getMRssForBu;
  getMRssForCu = getMRssForCu;
}
