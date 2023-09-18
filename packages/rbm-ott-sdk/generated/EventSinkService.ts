/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { request, ServiceContext } from "./http-client";

/**
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/eventsink/init
 * @response `default` `void` success
 */
export async function intialize({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/eventsink/init`,
    headers,
    ctx
  }).then(response => response.json() as Promise<void>);
}

/**
 * @summary Post analytics events.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/eventsink/send
 * @response `default` `void` success
 */
export async function postEvents({
  headers,
  ..._data
}: {
  DispatchTime: number;
  AccountId?: string;
  BusinessUnit?: string;
  ClientIp?: string;
  ClockOffset?: number;
  Customer?: string;
  Payload?: string;
  SessionId?: string;
  UserId?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/eventsink/send`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<void>);
}

export class EventSinkService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  intialize = intialize;
  postEvents = postEvents;
}
