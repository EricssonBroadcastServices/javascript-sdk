/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { EventList } from "./data-contracts";
import { request, ServiceContext } from "./http-client";

/**
 * @summary Get events.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/event/date/{date}
 * @response `default` `EventList` success
 */
export async function getEvents({
  date,
  headers,
  ..._data
}: {
  /** The date for which to base the event query. */
  date: Date;
  /** Only include events that are allowed in provided country. */
  allowedCountry?: string;
  /**
   * Days back from the date parameter for events to include in the query.
   * @default 0
   */
  daysBackward?: number;
  /**
   * Days forward from the date parameter for events to include in the query.
   * @default 0
   */
  daysForward?: number;
  /**
   * Hide events that have ended at the time of this request reaching the backend.
   * I.e. The from time of the query is set to "now".
   * Note: Recently ended events might show up in results for up to the cache time after their end.
   */
  hideEnded?: boolean;
  /**
   * The page number.
   * @default 1
   */
  pageNumber?: number;
  /**
   * The number of items to show per page
   * @default 50
   */
  pageSize?: number;
  /** Only include events that has the provided products. */
  products?: string[];
  /** Publication filters applied on publications tagged with service. */
  service?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<EventList>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/event/date/${date
      .toISOString()
      .substring(0, 10)}`,
    headers,
    ctx,
    query: _data
  });
}

export class EventService {
  constructor(private context: ServiceContext) {}
  getEvents = getEvents;
}
