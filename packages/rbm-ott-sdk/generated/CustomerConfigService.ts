/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ConfigFile, ConfigFilesResponse } from "./data-contracts";
import { request, ServiceContext } from "./http-client";

/**
 * @summary Gets a JSON configuration file stored on customer level.
 * @request GET:/v1/customer/{customer}/config/{fileName}
 * @response `default` `ConfigFile` success
 */
export async function getConfigCuFile({
  fileName,
  headers,
  ..._data
}: {
  /** The file to get. */
  fileName: string;
  /** The version of the file to get. */
  version?: number;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/config/${fileName}`,
    headers,
    ctx,
    query: _data
  }).then(response => response.json() as Promise<ConfigFile>);
}

/**
 * @summary Gets a JSON configuration file.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/config/{fileName}
 * @response `default` `ConfigFile` success
 */
export async function getConfigFile({
  fileName,
  headers,
  ..._data
}: {
  /** The file to get. */
  fileName: string;
  /** @default false */
  paymentMethodPreview?: boolean;
  version?: number;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config/${fileName}`,
    headers,
    ctx,
    query: _data
  }).then(response => response.json() as Promise<ConfigFile>);
}

/**
 * @description Uses the host parameter to figure out the business unit.
 * @summary Gets a JSON configuration file.
 * @request GET:/v1/config/{fileId}/origin/{host}
 * @response `default` `ConfigFile` success
 */
export async function getConfigFileCustomDomainInPath({
  fileId,
  host,
  headers,
  ..._data
}: {
  /** The file to get. */
  fileId: string;
  /** The host that will be mapped to a business unit. */
  host: string;
  /** @default false */
  paymentMethodPreview?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/config/${fileId}/origin/${host}`,
    headers,
    ctx,
    query: _data
  }).then(response => response.json() as Promise<ConfigFile>);
}

/**
 * @summary Lists existing configuration files.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/config
 * @response `default` `ConfigFilesResponse` success
 */
export async function getConfigFiles({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config`,
    headers,
    ctx
  }).then(response => response.json() as Promise<ConfigFilesResponse>);
}

/**
 * @summary Lists existing configuration files on customer level.
 * @request GET:/v1/customer/{customer}/config
 * @response `default` `ConfigFilesResponse` success
 */
export async function getConfigFilesCu({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/config`,
    headers,
    ctx
  }).then(response => response.json() as Promise<ConfigFilesResponse>);
}

export class CustomerConfigService {
  constructor(private context: ServiceContext) {}
  getConfigCuFile = getConfigCuFile;
  getConfigFile = getConfigFile;
  getConfigFileCustomDomainInPath = getConfigFileCustomDomainInPath;
  getConfigFiles = getConfigFiles;
  getConfigFilesCu = getConfigFilesCu;
}
