/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AutocompleteItem, AutocompleteItem2, EpgSearchHits, MultiSearchResponse, SearchList } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Does prefix autocomplete for a query.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/autocomplete/{query}
 * @response `default` `(AutocompleteItem)[]` success
 */
export async function autocomplete(
  query: string,
  queryParams?: {
    /** The locale to autocomplete in. */
    locale?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<AutocompleteItem[]>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/autocomplete/${query}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: queryParams
  });
}
/**
 * @description EXPERIMENTAL. May change without notice.
 * @summary Does prefix autocomplete on asset titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/asset/title/autocomplete/{query}
 * @response `default` `(AutocompleteItem2)[]` success
 */
export async function autocompleteAssetTitle(
  query: string,
  queryParams?: {
    /** The locale to autocomplete in. */
    locales?: string[];
    /** Filter on parental rating (format of COUNTRY:RATING,COUNTRY:RATING2) */
    parentalRatings?: string;
    /**
     * The comma separates list of asset types to filter on.
     * @default "MOVIE,TV_SHOW"
     */
    types?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<AutocompleteItem2[]>({
    method: "GET",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/asset/title/autocomplete/${query}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: queryParams
  });
}
/**
 * @description EXPERIMENTAL. May change without notice.
 * @summary Does prefix autocomplete on tag titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/tag/title/autocomplete/{query}
 * @response `default` `(AutocompleteItem2)[]` success
 */
export async function autocompleteTagTitle(
  query: string,
  queryParams?: {
    /** The locales to autocomplete in. */
    locales?: string[];
    /** The schemes to autocomplete in. */
    scheme?: string[];
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<AutocompleteItem2[]>({
    method: "GET",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/tag/title/autocomplete/${query}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: queryParams
  });
}
/**
 * @summary Gets spelling suggestions for a key.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/suggestions/{query}
 * @response `default` `(AutocompleteItem)[]` success
 */
export async function getSuggestions(
  query: string,
  queryParams?: {
    /** The locale to autocomplete in. */
    locale?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<AutocompleteItem[]>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/suggestions/${query}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: queryParams
  });
}
/**
 * @summary Searches for a query.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `default` `SearchList` success
 */
export async function search(
  query: string,
  queryParams?: {
    allowedCountry?: string;
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
    /** The locale to search in. */
    locale?: string;
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
    /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
    parentalRatings?: string;
    service?: string;
    /**
     * The sort parameter in the format of first,-second. Defaults to sorting by
     * relevance.
     */
    sort?: string;
    /**
     * The comma separates list of types to search in.
     * @default "MOVIE,TV_SHOW"
     */
    types?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<SearchList>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query/${query}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: queryParams
  });
}
/**
 * @description EXPERIMENTAL. May change without notice.
 * @summary Prefix search on asset titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/asset/query/{query}
 * @response `default` `SearchList` success
 */
export async function searchAsset(
  query: string,
  queryParams?: {
    allowedCountry?: string;
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
    /** The locales to search in. */
    locales?: string[];
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
    /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
    parentalRatings?: string;
    service?: string;
    /**
     * The sort parameter in the format of first,-second. Defaults to sorting by
     * relevance.
     */
    sort?: string;
    /**
     * The comma separates list of types to search in.
     * @default "MOVIE,TV_SHOW"
     */
    types?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<SearchList>({
    method: "GET",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/asset/query/${query}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: queryParams
  });
}
/**
 * @summary Searches the epg for a query.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/epg/{query}
 * @response `default` `EpgSearchHits` success
 */
export async function searchEpg(
  query: string,
  queryParams: {
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    /** @default "PARTIAL" */
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** The millis to get from. */
    from: number;
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
    /** The locale to search in. */
    locale?: string;
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
    service?: string;
    /**
     * The sort parameter in the format of first,-second. Defaults to sorting by
     * relevance.
     */
    sort?: string;
    /** The millis to get to. */
    to: number;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<EpgSearchHits>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/epg/${query}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: queryParams
  });
}
/**
 * @summary EXPERIMENTAL - List assets - same query params as search
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/content/search/query
 * @response `default` `SearchList` success
 */
export async function searchNoQuery(
  query?: {
    /** Filter on allowed in country. */
    allowedCountry?: string;
    /** Filter for material duration. Lower limit. */
    durationLower?: number;
    /** Filter for material duration. Upper limit. */
    durationUpper?: number;
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    /** The set of fields to include by default. */
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
    /** Only return assets that has downloadBlocked set to false in a publication. */
    onlyDownloadable?: boolean;
    /**
     * If we should only return assets that are at the moment published
     * @default true
     */
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
    /** Filter on parental rating (format of COUNTRY:RATING,COUNTRY:RATING2) */
    parentalRatings?: string;
    service?: string;
    /** Subtitle filter. Comma separated list of languages. */
    subtitles?: string;
    /** Tag ids to filter on. */
    tags?: string[];
    /**
     * The comma separates list of asset types to filter on.
     * @default "MOVIE,TV_SHOW"
     */
    types?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<SearchList>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query`, ctx.baseUrl),
    headers: headers,
    query: query
  });
}
/**
 * @description EXPERMIENTAL. May change without notice.
 * @summary Prefix search on tag titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/tag/query/{query}
 * @response `default` `SearchList` success
 */
export async function searchTags(
  query: string,
  queryParams?: {
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
    /** The locales to search in. */
    locales?: string[];
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
    /** The schemes to autocomplete in. */
    scheme?: string[];
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<SearchList>({
    method: "GET",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/tag/query/${query}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: queryParams
  });
}
/**
 * @summary EXPERIMENTAL - Free text query in selected fields in assets.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `default` `SearchList` success
 */
export async function searchV2(
  query: string,
  queryParams?: {
    /** Filter on allowed in country. */
    allowedCountry?: string;
    /** Filter for material duration. Lower limit. */
    durationLower?: number;
    /** Filter for material duration. Upper limit. */
    durationUpper?: number;
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    /** The set of fields to include by default. */
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
    /** The locales to search in. */
    locale?: string[];
    /** Only return assets that has downloadBlocked set to false in a publication. */
    onlyDownloadable?: boolean;
    /**
     * If we should only return assets that are at the moment published
     * @default true
     */
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
    /** Filter on parental rating (format of COUNTRY:RATING,COUNTRY:RATING2) */
    parentalRatings?: string;
    /** The schemes of tags to search. If no schemes, tags will not be searched. */
    schemes?: string[];
    service?: string;
    /** Subtitle filter. Comma separated list of languages. */
    subtitles?: string;
    /** Tag ids to filter on. */
    tags?: string[];
    /**
     * The comma separates list of asset types to filter on.
     * @default "MOVIE,TV_SHOW"
     */
    types?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<SearchList>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query/${query}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: queryParams
  });
}
/**
 * @description EXPERIMENTAL. May change without notice.
 * @summary Prefix search on asset and tags.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `default` `MultiSearchResponse` success
 */
export async function searchV3(
  query: string,
  queryParams?: {
    /** Filter on allowed in country. */
    allowedCountry?: string;
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    /** The set of fields to include by default. */
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
    /** The locales to search in. */
    locale?: string[];
    /**
     * If we should only return assets that are at the moment published
     * @default true
     */
    onlyPublished?: boolean;
    /**
     * The number of items to show per page
     * @default 50
     */
    pageSize?: number;
    /** Filter on parental rating (format of COUNTRY:RATING,COUNTRY:RATING2) */
    parentalRatings?: string;
    /** The schemes of tags to search. If no schemes, tags will not be searched. */
    schemes?: string[];
    service?: string;
    tagResultSort?: string;
    /**
     * The comma separates list of asset types to filter on.
     * @default "MOVIE,TV_SHOW"
     */
    types?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<MultiSearchResponse>({
    method: "GET",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query/${query}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: queryParams
  });
}

export const SearchService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    autocomplete,
    autocompleteAssetTitle,
    autocompleteTagTitle,
    getSuggestions,
    search,
    searchAsset,
    searchEpg,
    searchNoQuery,
    searchTags,
    searchV2,
    searchV3
  }) as const;
