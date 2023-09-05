/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { TimeResponse } from "./data-contracts";
import { request, ServiceContext } from "./http-client";

/**
 * @description Gets the current server UTC time.
 * @summary Get time.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/time
 * @response `200` `TimeResponse` Successful
 * @response `4xx` `APIErrorMessage` Failed
 */
export async function getTime(headers?: HeadersInit) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<TimeResponse>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/time`,
    headers,
    ctx
  });
}
/**
 * @description Gets the current server UTC time.
 * @summary Get time.
 * @request GET:/v2/time
 * @response `200` `TimeResponse` Successful
 */
export async function getTimeAnonymous(headers?: HeadersInit) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<TimeResponse>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/time`,
    headers,
    ctx
  });
}

export class TimeService {
  constructor(private context: ServiceContext) {}
  getTime = getTime;
  getTimeAnonymous = getTimeAnonymous;
}
