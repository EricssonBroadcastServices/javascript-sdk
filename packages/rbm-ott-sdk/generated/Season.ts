/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { Season, SeasonList } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Gets a specific season by id.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season/{seasonId}
 * @response `200` `Season` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getSeasonById(
  seasonId: string,
  query?: {
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    /**
     * The set of fields to include by default.
     * @default "ALL"
     */
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** Set to true to include episodes for the season in the response. */
    includeEpisodes?: boolean;
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
    /** @default true */
    onlyPublished?: boolean;
    service?: string;
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Season>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/season/${seasonId}`,
      ctx.baseUrl
    ),
    headers: params,
    query: query
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
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    /**
     * The set of fields to include by default.
     * @default "ALL"
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
     * @format int32
     * @default 1
     */
    pageNumber?: number;
    /**
     * The number of items to show per page
     * @format int32
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
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<SeasonList>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/season`, ctx.baseUrl),
    headers: params,
    query: query
  });
}

const SeasonService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getSeasonById,
    getSeasons
  }) as const;

export default SeasonService;
