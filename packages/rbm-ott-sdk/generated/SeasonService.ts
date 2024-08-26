/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ParentalRatingsFilter, Season, SeasonList } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Get a season by id or slug.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season/{seasonId}
 * @response `200` `Season` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getSeasonById({
  seasonId,
  headers,
  ..._data
}: {
  seasonId: string;
  includeEpisodes?: boolean;
  /** @default true */
  onlyPublished?: boolean;
  service?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/season/${seasonId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<Season>);
}

/**
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season
 * @response `200` `SeasonList` OK
 */
export async function getSeasons({
  headers,
  ..._data
}: {
  includeEpisodes?: boolean;
  /** @default true */
  onlyPublished?: boolean;
  /**
   * @default 1
   * @min 1
   * @max 200
   */
  pageNumber?: number;
  /**
   * @default 50
   * @min 1
   */
  pageSize?: number;
  parentalRatings?: ParentalRatingsFilter;
  seasonIds?: string[];
  service?: string;
  sort?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/season`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<SeasonList>);
}

/**
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season
 * @response `200` `SeasonList` OK
 */
export async function getSeasonsPartial<T = any>({
  headers,
  ..._data
}: {
  /** Comma separated list of field names to exclude from response. */
  excludeFields?: string;
  /**
   * Field set to return.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  includeEpisodes?: boolean;
  /** Comma separated list of field names to include in response. */
  includeFields?: string;
  /** @default true */
  onlyPublished?: boolean;
  /**
   * @default 1
   * @min 1
   * @max 200
   */
  pageNumber?: number;
  /**
   * @default 50
   * @min 1
   */
  pageSize?: number;
  parentalRatings?: ParentalRatingsFilter;
  seasonIds?: string[];
  service?: string;
  sort?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/season`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

export class SeasonService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getSeasonById = getSeasonById;
  getSeasons = getSeasons;
  getSeasonsPartial = getSeasonsPartial;
}
