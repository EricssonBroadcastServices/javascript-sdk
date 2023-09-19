/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { SystemConfig } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @description paymentType. accountConfirmationRequired, if true, the user need to confirm the self service created user with token from mail/sms. allowAccessWithoutLogin, if true, the user may get limited access without being logged in. currencies, valid currencies. displayLocales, valid locales. informationCollectionConsentDate, date which teh user should hav give consent after. environment, PRESTAGE or PRODUCTION
 * @summary Get system configuration for bu.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/systemConfig
 * @response `default` `SystemConfig` success
 */
export async function getSystemConfig({
  headers,
  ..._data
}: {
  /** @default false */
  paymentMethodPreview?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/systemConfig`,
    headers,
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<SystemConfig>);
}

/**
 * @description Gets the system confiuration for specified country.
 * @summary Get System Configuration.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/system/config
 * @response `200` `SystemConfig` Successful
 * @response `4xx` `APIErrorMessage` Failed
 */
export async function getSystemConfigV2({
  headers,
  ..._data
}: {
  /** countryCode */
  countryCode: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/system/config`,
    headers,
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<SystemConfig>);
}

export class SystemService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getSystemConfig = getSystemConfig;
  getSystemConfigV2 = getSystemConfigV2;
}
