/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AnalyticsBatch } from "./data-contracts";
import { request, ServiceContext } from "./http-client";

/**
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/eventsink/init
 * @response `default` `void` success
 */
export async function intialize(headers?: HeadersInit) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<void>({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/eventsink/init`,
    headers,
    ctx
  });
}
/**
 * @summary Post analytics events.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/eventsink/send
 * @response `default` `void` success
 */
export async function postEvents(data: AnalyticsBatch, headers?: HeadersInit) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<void>({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/eventsink/send`,
    headers,
    ctx,
    body: data
  });
}

export class EventSinkService {
  constructor(private context: ServiceContext) {}
  intialize = intialize;
  postEvents = postEvents;
}
