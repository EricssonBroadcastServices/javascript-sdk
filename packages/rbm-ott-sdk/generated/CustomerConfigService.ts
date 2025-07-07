/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ConfigFile } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Get a configuration file.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/config/{fileName}
 * @response `200` `ConfigFile` Successful.
 * @response `404` `APIErrorMessage` Not found
 */
export async function getConfigFile({
  fileName,
  headers,
  ..._data
}: {
  fileName: string;
  /** @default false */
  paymentMethodPreview?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config/${fileName}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<ConfigFile>);
}

/**
 * @summary Get a customer level configuration file.
 * @request GET:/v1/customer/{customer}/config/{fileName}
 * @response `200` `ConfigFile` Successful.
 * @response `404` `APIErrorMessage` Not found
 */
export async function getConfigFileCu({
  fileName,
  headers
}: {
  fileName: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/config/${fileName}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<ConfigFile>);
}

export class CustomerConfigService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getConfigFile = getConfigFile;
  getConfigFileCu = getConfigFileCu;
}
