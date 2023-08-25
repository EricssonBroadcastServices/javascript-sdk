/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AnalyticsBatch } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/eventsink/init
 * @response `default` `void` success
 */
export async function intialize(params: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<void>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/eventsink/init`, ctx.baseUrl),
    headers: params
  });
}
/**
 * @summary Post analytics events.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/eventsink/send
 * @response `default` `void` success
 */
export async function postEvents(data: AnalyticsBatch, params: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<void>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/eventsink/send`, ctx.baseUrl),
    headers: params,
    body: data
  });
}

export const EventSinkService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    intialize,
    postEvents
  }) as const;
