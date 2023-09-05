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
export async function getConfigCuFile(
  /** The file to get. */
  fileName: string,
  query?: {
    /** The version of the file to get. */
    version?: number;
  },
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<ConfigFile>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/config/${fileName}`,
    headers,
    ctx,
    query: query
  });
}
/**
 * @summary Gets a JSON configuration file.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/config/{fileName}
 * @response `default` `ConfigFile` success
 */
export async function getConfigFile(
  /** The file to get. */
  fileName: string,
  query?: {
    /** @default false */
    paymentMethodPreview?: boolean;
    version?: number;
  },
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<ConfigFile>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config/${fileName}`,
    headers,
    ctx,
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
  /** The file to get. */
  fileId: string,
  /** The host that will be mapped to a business unit. */
  host: string,
  query?: {
    /** @default false */
    paymentMethodPreview?: boolean;
  },
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<ConfigFile>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/config/${fileId}/origin/${host}`,
    headers,
    ctx,
    query: query
  });
}
/**
 * @summary Lists existing configuration files.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/config
 * @response `default` `ConfigFilesResponse` success
 */
export async function getConfigFiles(headers?: HeadersInit) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<ConfigFilesResponse>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/config`,
    headers,
    ctx
  });
}
/**
 * @summary Lists existing configuration files on customer level.
 * @request GET:/v1/customer/{customer}/config
 * @response `default` `ConfigFilesResponse` success
 */
export async function getConfigFilesCu(headers?: HeadersInit) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<ConfigFilesResponse>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/config`,
    headers,
    ctx
  });
}

export class CustomerConfigService {
  constructor(private context: ServiceContext) {}
  getConfigCuFile = getConfigCuFile;
  getConfigFile = getConfigFile;
  getConfigFileCustomDomainInPath = getConfigFileCustomDomainInPath;
  getConfigFiles = getConfigFiles;
  getConfigFilesCu = getConfigFilesCu;
}
