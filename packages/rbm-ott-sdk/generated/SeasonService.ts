/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { Season, SeasonList } from "./data-contracts";
import { request, ServiceContext } from "./http-client";

/**
 * @summary Gets a specific season by id.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season/{seasonId}
 * @response `200` `Season` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getSeasonById({
  seasonId,
  headers,
  ..._data
}: {
  /** The id of the season. Slugs supported. */
  seasonId: string;
  /** Set to true to include episodes for the season in the response. */
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
    headers,
    ctx,
    query: { fieldSet: "ALL", ..._data }
  }).then(response => response.json() as Promise<Season>);
}

/**
 * @summary Gets a specific season by id.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season/{seasonId}
 * @response `200` `Season` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getSeasonByIdPartial<T = any>({
  seasonId,
  headers,
  ..._data
}: {
  /** The id of the season. Slugs supported. */
  seasonId: string;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /**
   * The set of fields to include by default.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Set to true to include episodes for the season in the response. */
  includeEpisodes?: boolean;
  /** Comma separated list of fields to add to the response. */
  includeFields?: string;
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
    headers,
    ctx,
    query: { fieldSet: "PARTIAL", ..._data }
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary Lists seasons
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season
 * @response `200` `SeasonList` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getSeasons({
  headers,
  ..._data
}: {
  /** Set to true to include episodes for the seasons in the response. */
  includeEpisodes?: boolean;
  /** @default true */
  onlyPublished?: boolean;
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
  /**
   * The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2.
   * Currently This only applies to the episodes if includeEpisodes=true. If
   * includeEpisodes = false, then this has no effect.
   */
  parentalRatings?: string;
  /** The season ids to filter by. */
  seasonIds?: string[];
  service?: string;
  /** The sort parameter in the format of first,-second. */
  sort?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/season`,
    headers,
    ctx,
    query: { fieldSet: "ALL", ..._data }
  }).then(response => response.json() as Promise<SeasonList>);
}

/**
 * @summary Lists seasons
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season
 * @response `200` `SeasonList` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getSeasonsPartial<T = any>({
  headers,
  ..._data
}: {
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /**
   * The set of fields to include by default.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Set to true to include episodes for the seasons in the response. */
  includeEpisodes?: boolean;
  /** Comma separated list of fields to add to the response. */
  includeFields?: string;
  /** @default true */
  onlyPublished?: boolean;
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
  /**
   * The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2.
   * Currently This only applies to the episodes if includeEpisodes=true. If
   * includeEpisodes = false, then this has no effect.
   */
  parentalRatings?: string;
  /** The season ids to filter by. */
  seasonIds?: string[];
  service?: string;
  /** The sort parameter in the format of first,-second. */
  sort?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/season`,
    headers,
    ctx,
    query: { fieldSet: "PARTIAL", ..._data }
  }).then(response => response.json() as Promise<T>);
}

export class SeasonService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getSeasonById = getSeasonById;
  getSeasonByIdPartial = getSeasonByIdPartial;
  getSeasons = getSeasons;
  getSeasonsPartial = getSeasonsPartial;
}
