/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { SystemConfig } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @description paymentType. accountConfirmationRequired, if true, the user need to confirm the self service created user with token from mail/sms. allowAccessWithoutLogin, if true, the user may get limited access without being logged in. currencies, valid currencies. displayLocales, valid locales. informationCollectionConsentDate, date which teh user should hav give consent after. environment, PRESTAGE or PRODUCTION
 * @summary Get system configuration for bu.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/systemConfig
 * @response `default` `SystemConfig` success
 */
export async function getSystemConfig(
  query?: {
    /** @default false */
    paymentMethodPreview?: boolean;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<SystemConfig>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/systemConfig`, ctx.baseUrl),
    headers,
    query: query
  });
}
/**
 * @description Gets the system confiuration for specified country.
 * @summary Get System Configuration.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/system/config
 * @response `200` `SystemConfig` Successful
 * @response `4xx` `APIErrorMessage` Failed
 */
export async function getSystemConfigV2(
  query: {
    /** countryCode */
    countryCode: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<SystemConfig>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/system/config`, ctx.baseUrl),
    headers,
    query: query
  });
}

export const SystemService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getSystemConfig,
    getSystemConfigV2
  }) as const;
