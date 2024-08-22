/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { Component, ComponentFilters, Config } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @description This response also includes the user location so there is no need to make an extra call to fetch that.
 * @summary Get the filters to use in calls to the client configuration endpoints.
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/filters
 * @response `200` `ComponentFilters` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getComponentFilters({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/filters`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<ComponentFilters>);
}

/**
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/file/{folder}/{fileName}
 * @response `default` `void` success
 */
export async function getFile({
  folder,
  fileName,
  headers
}: {
  folder: string;
  fileName: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/file/${folder}/${fileName}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @summary Get component.
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/config/{configId}/component/{componentId}
 * @response `200` `Component` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getWLComponent({
  configId,
  componentId,
  headers,
  ..._data
}: {
  configId: string;
  componentId: string;
  allowedCountry?: string;
  /** Comma separated list of filters. I.e: "type:value,type2:value2" */
  filters?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config/${configId}/component/${componentId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<Component>);
}

/**
 * @description This endpoint uses the hostname instead of explicit customer/business unit pair to identify the business unit.
 * @summary Get the top level config object, hostname version.
 * @request GET:/v2/whitelabel/origin/{host}/config/{configId}
 * @response `200` `Config` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getWlConfig({
  host,
  configId,
  headers,
  ..._data
}: {
  host: string;
  configId: string;
  allowedCountry?: string;
  /** Comma separated list of filters. I.e: "type:value,type2:value2" */
  filters?: string;
  /** @default false */
  paymentMethodPreview?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/whitelabel/origin/${host}/config/${configId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<Config>);
}

/**
 * @description This endpoint uses the hostname instead of explicit customer/business unit pair to identify the business unit.
 * @summary Get the top level config object.
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/config/{configId}
 * @response `200` `Config` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getWLConfig({
  configId,
  headers,
  ..._data
}: {
  configId: string;
  allowedCountry?: string;
  /** Comma separated list of filters. I.e: "type:value,type2:value2" */
  filters?: string;
  /** @default false */
  paymentMethodPreview?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config/${configId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<Config>);
}

export class ClientConfigService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getComponentFilters = getComponentFilters;
  getFile = getFile;
  getWLComponent = getWLComponent;
  getWlConfig = getWlConfig;
  getWLConfig = getWLConfig;
}
