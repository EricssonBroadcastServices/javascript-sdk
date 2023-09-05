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
export async function getSeasonById(
  /** The id of the season. Slugs supported. */
  seasonId: string,
  query?: {
    /** Set to true to include episodes for the season in the response. */
    includeEpisodes?: boolean;
    /** @default true */
    onlyPublished?: boolean;
    service?: string;
  },
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<Season>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/season/${seasonId}`,
    headers,
    ctx,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}
/**
 * @summary Gets a specific season by id.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season/{seasonId}
 * @response `200` `Season` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getSeasonByIdPartial<T = any>(
  /** The id of the season. Slugs supported. */
  seasonId: string,
  query?: {
    /** Set to true to include episodes for the season in the response. */
    includeEpisodes?: boolean;
    /** @default true */
    onlyPublished?: boolean;
    service?: string;
    /**
     *The set of fields to include by default.
     * @default "ALL"
     */
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
  },
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<T>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/season/${seasonId}`,
    headers,
    ctx,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}
/**
 * @summary Lists seasons
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season
 * @response `200` `SeasonList` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getSeasons(
  query?: {
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
  },
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<SeasonList>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/season`,
    headers,
    ctx,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}
/**
 * @summary Lists seasons
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season
 * @response `200` `SeasonList` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getSeasonsPartial<T = any>(
  query?: {
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
    /**
     *The set of fields to include by default.
     * @default "ALL"
     */
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
  },
  headers?: HeadersInit
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<T>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/season`,
    headers,
    ctx,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}

export class SeasonService {
  constructor(private context: ServiceContext) {}
  getSeasonById = getSeasonById;
  getSeasonByIdPartial = getSeasonByIdPartial;
  getSeasons = getSeasons;
  getSeasonsPartial = getSeasonsPartial;
}
