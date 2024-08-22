/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { EventList } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Get events.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/event/date/{date}
 * @response `200` `EventList` Successful.
 * @response `400` `APIErrorMessage` User error.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getEvents({
  date,
  headers,
  ..._data
}: {
  date: string;
  allowedCountry?: string;
  /**
   * @default 0
   * @min 0
   * @max 30
   */
  daysBackward?: number;
  /**
   * @default 0
   * @min 0
   * @max 100
   */
  daysForward?: number;
  hideEnded?: boolean;
  /**
   * @default 1
   * @min 1
   */
  pageNumber?: number;
  /**
   * @default 50
   * @min 1
   */
  pageSize?: number;
  products?: string[];
  service?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/event/date/${date}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<EventList>);
}

export class EventService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getEvents = getEvents;
}
