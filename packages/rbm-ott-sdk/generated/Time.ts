/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { TimeResponse } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @description Gets the current server UTC time.
 * @summary Get time.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/time
 * @response `200` `TimeResponse` Successful
 * @response `4xx` `APIErrorMessage` Failed
 */
export async function getTime(params: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<TimeResponse>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/time`, ctx.baseUrl),
    headers: params
  });
}
/**
 * @description Gets the current server UTC time.
 * @summary Get time.
 * @request GET:/v2/time
 * @response `200` `TimeResponse` Successful
 */
export async function getTimeAnonymous(params: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<TimeResponse>({
    method: "GET",
    url: new URL(`/v2/time`, ctx.baseUrl),
    headers: params
  });
}

export const TimeService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getTime,
    getTimeAnonymous
  }) as const;
