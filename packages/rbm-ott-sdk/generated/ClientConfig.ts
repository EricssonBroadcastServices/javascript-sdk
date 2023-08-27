/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ComponentFilters } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Get user location and the filters to use in calls to the client configuration endpoints.
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/filters
 * @response `default` `ComponentFilters` success
 */
export async function getComponentFilters(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ComponentFilters>({
    method: "GET",
    url: new URL(`/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/filters`, ctx.baseUrl),
    headers: headers
  });
}
/**
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/file/{folder}/{fileName}
 * @response `default` `void` success
 */
export async function getFile(folder: string, fileName: string, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<void>({
    method: "GET",
    url: new URL(
      `/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/file/${folder}/${fileName}`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @summary Get config component
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/config/{configId}/component/{componentId}
 * @response `400` `void` INVALID_FILTERS. If the filters are invalid.
 */
export async function getWLComponent(
  configId: string,
  componentId: string,
  query?: {
    /** Add allowed country parameter to any server side asset searches that are made. */
    allowedCountry?: string;
    /** Comma separated list of filters. I.e: "type:value,type2:value2" */
    filters?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<any>({
    method: "GET",
    url: new URL(
      `/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config/${configId}/component/${componentId}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: query
  });
}
/**
 * @summary Get the top level config object.
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/config/{configId}
 * @response `400` `void` INVALID_FILTERS. If the filters are invalid.
 */
export async function getWLConfig(
  configId: string,
  query?: {
    allowedCountry?: string;
    /** Comma separated list of filters. I.e: "type:value,type2:value2" */
    filters?: string;
    /** @default false */
    paymentMethodPreview?: boolean;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<any>({
    method: "GET",
    url: new URL(
      `/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config/${configId}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: query
  });
}
/**
 * @summary Get the top level config object.
 * @request GET:/v2/whitelabel/origin/{host}/config/{configId}
 * @response `400` `void` INVALID_FILTERS. If the filters are invalid.
 */
export async function getWLConfigWithDomain(
  host: string,
  configId: string,
  query?: {
    allowedCountry?: string;
    /** Comma separated list of filters. I.e: "type:value,type2:value2" */
    filters?: string;
    /** @default false */
    paymentMethodPreview?: boolean;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<any>({
    method: "GET",
    url: new URL(`/v2/whitelabel/origin/${host}/config/${configId}`, ctx.baseUrl),
    headers: headers,
    query: query
  });
}

export const ClientConfigService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getComponentFilters,
    getFile,
    getWLComponent,
    getWLConfig,
    getWLConfigWithDomain
  }) as const;
