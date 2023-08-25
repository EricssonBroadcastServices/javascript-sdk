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
    /**
     * The version of the file to get.
     * @format int32
     */
    version?: number;
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ConfigFile>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/config/${fileName}`, ctx.baseUrl),
    headers: params,
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
    /** @format int32 */
    version?: number;
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ConfigFile>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config/${fileName}`, ctx.baseUrl),
    headers: params,
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
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ConfigFile>({
    method: "GET",
    url: new URL(`/v1/config/${fileId}/origin/${host}`, ctx.baseUrl),
    headers: params,
    query: query
  });
}
/**
 * @summary Lists existing configuration files.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/config
 * @response `default` `ConfigFilesResponse` success
 */
export async function getConfigFiles(params: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ConfigFilesResponse>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config`, ctx.baseUrl),
    headers: params
  });
}
/**
 * @summary Lists existing configuration files on customer level.
 * @request GET:/v1/customer/{customer}/config
 * @response `default` `ConfigFilesResponse` success
 */
export async function getConfigFilesCu(params: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ConfigFilesResponse>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/config`, ctx.baseUrl),
    headers: params
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
