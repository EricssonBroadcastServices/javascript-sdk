/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @request POST:/v2/license/customer/{customer}/businessunit/{businessUnit}/fairplay
 * @response `200` `string` OK
 */
export async function fairplay({
  headers,
  ..._data
}: {
  contentId: string;
  keyId: string;
  license: string;
  ls_session: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/license/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/fairplay`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<string>);
}

/**
 * @request GET:/v2/license/fairplay/certificate
 * @response `200` `string` OK
 */
export async function fairplayCertificate({
  headers,
  ..._data
}: {
  hash: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/license/fairplay/certificate`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<string>);
}

/**
 * @request POST:/v2/license/customer/{customer}/businessunit/{businessUnit}/playready
 * @response `200` `string` OK
 */
export async function playready({
  headers,
  ..._data
}: {
  contentId: string;
  license: string;
  ls_session: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/license/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/playready`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<string>);
}

/**
 * @request POST:/v2/license/customer/{customer}/businessunit/{businessUnit}/widevine
 * @response `200` `string` OK
 */
export async function widevine({
  headers,
  ..._data
}: {
  contentId: string;
  license: string;
  ls_session: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/license/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/widevine`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<string>);
}

export class LicenseControllerV2Service {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  fairplay = fairplay;
  fairplayCertificate = fairplayCertificate;
  playready = playready;
  widevine = widevine;
}
