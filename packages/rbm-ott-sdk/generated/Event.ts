/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { EventList } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Get events.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/event/date/{date}
 * @response `default` `EventList` success
 */
export async function getEvents(
  /** The date for which to base the event query. (Format: yyyy-mm-dd). */
  date: string,
  query?: {
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
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<EventList>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/event/date/${date}`, ctx.baseUrl),
    headers: headers,
    query: query
  });
}

export const EventService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getEvents
  }) as const;
