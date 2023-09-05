/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ComponentFilters } from "./data-contracts";
import { request, ServiceContext } from "./http-client";

/**
 * @summary Get user location and the filters to use in calls to the client configuration endpoints.
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/filters
 * @response `default` `ComponentFilters` success
 */
export async function getComponentFilters(headers?: HeadersInit) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<ComponentFilters>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/filters`,
    headers,
    ctx
  });
}
/**
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/file/{folder}/{fileName}
 * @response `default` `void` success
 */
export async function getFile(folder: string, fileName: string, headers?: HeadersInit) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<void>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/file/${folder}/${fileName}`,
    headers,
    ctx
  });
}
/**
 * @summary Get config component
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/config/{configId}/component/{componentId}
 * @response `400` `void` INVALID_FILTERS. If the filters are invalid.
 */
export async function getWLComponent(
  /** The config id. */
  configId: string,
  /** The component id. */
  componentId: string,
  query?: {
    /** Add allowed country parameter to any server side asset searches that are made. */
    allowedCountry?: string;
    /** Comma separated list of filters. I.e: "type:value,type2:value2" */
    filters?: string;
  },
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config/${configId}/component/${componentId}`,
    headers,
    ctx,
    query: query
  });
}
/**
 * @summary Get the top level config object.
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/config/{configId}
 * @response `400` `void` INVALID_FILTERS. If the filters are invalid.
 */
export async function getWLConfig(
  /** The id of the config. */
  configId: string,
  query?: {
    allowedCountry?: string;
    /** Comma separated list of filters. I.e: "type:value,type2:value2" */
    filters?: string;
    /** @default false */
    paymentMethodPreview?: boolean;
  },
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config/${configId}`,
    headers,
    ctx,
    query: query
  });
}
/**
 * @summary Get the top level config object.
 * @request GET:/v2/whitelabel/origin/{host}/config/{configId}
 * @response `400` `void` INVALID_FILTERS. If the filters are invalid.
 */
export async function getWLConfigWithDomain(
  /** The host that will be mapped to a business unit. */
  host: string,
  /** The id of the config. */
  configId: string,
  query?: {
    allowedCountry?: string;
    /** Comma separated list of filters. I.e: "type:value,type2:value2" */
    filters?: string;
    /** @default false */
    paymentMethodPreview?: boolean;
  },
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/whitelabel/origin/${host}/config/${configId}`,
    headers,
    ctx,
    query: query
  });
}

export class ClientConfigService {
  constructor(private context: ServiceContext) {}
  getComponentFilters = getComponentFilters;
  getFile = getFile;
  getWLComponent = getWLComponent;
  getWLConfig = getWLConfig;
  getWLConfigWithDomain = getWLConfigWithDomain;
}
