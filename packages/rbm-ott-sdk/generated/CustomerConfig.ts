/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ConfigFile, ConfigFilesResponse } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Gets a JSON configuration file stored on customer level.
 * @request GET:/v1/customer/{customer}/config/{fileName}
 * @response `default` `ConfigFile` success
 */
export async function getConfigCuFile(
  fileName: string,
  query?: {
    /** The version of the file to get. */
    version?: number;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ConfigFile>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/config/${fileName}`, ctx.baseUrl),
    headers: headers,
    query: query
  });
}
/**
 * @summary Gets a JSON configuration file.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/config/{fileName}
 * @response `default` `ConfigFile` success
 */
export async function getConfigFile(
  fileName: string,
  query?: {
    /** @default false */
    paymentMethodPreview?: boolean;
    version?: number;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ConfigFile>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config/${fileName}`, ctx.baseUrl),
    headers: headers,
    query: query
  });
}
/**
 * @description Uses the host parameter to figure out the business unit.
 * @summary Gets a JSON configuration file.
 * @request GET:/v1/config/{fileId}/origin/{host}
 * @response `default` `ConfigFile` success
 */
export async function getConfigFileCustomDomainInPath(
  fileId: string,
  host: string,
  query?: {
    /** @default false */
    paymentMethodPreview?: boolean;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ConfigFile>({
    method: "GET",
    url: new URL(`/v1/config/${fileId}/origin/${host}`, ctx.baseUrl),
    headers: headers,
    query: query
  });
}
/**
 * @summary Lists existing configuration files.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/config
 * @response `default` `ConfigFilesResponse` success
 */
export async function getConfigFiles(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ConfigFilesResponse>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config`, ctx.baseUrl),
    headers: headers
  });
}
/**
 * @summary Lists existing configuration files on customer level.
 * @request GET:/v1/customer/{customer}/config
 * @response `default` `ConfigFilesResponse` success
 */
export async function getConfigFilesCu(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ConfigFilesResponse>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/config`, ctx.baseUrl),
    headers: headers
  });
}

export const CustomerConfigService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getConfigCuFile,
    getConfigFile,
    getConfigFileCustomDomainInPath,
    getConfigFiles,
    getConfigFilesCu
  }) as const;
