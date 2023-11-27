/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AutocompleteItem, AutocompleteItem2, EpgSearchHits, MultiSearchResponse, SearchList } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Does prefix autocomplete for a query.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/autocomplete/{query}
 * @response `default` `(AutocompleteItem)[]` success
 */
export async function autocomplete({
  query,
  headers,
  ..._data
}: {
  /** The query to autocomplete. */
  query: string;
  /** The locale to autocomplete in. */
  locale?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/autocomplete/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<AutocompleteItem[]>);
}

/**
 * @description EXPERIMENTAL. May change without notice.
 * @summary Does prefix autocomplete on asset titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/asset/title/autocomplete/{query}
 * @response `default` `(AutocompleteItem2)[]` success
 */
export async function autocompleteAssetTitle({
  query,
  headers,
  ..._data
}: {
  /** The query to autocomplete. */
  query: string;
  /** The locale to autocomplete in. */
  locales?: string[];
  /** Filter on parental rating (format of COUNTRY:RATING,COUNTRY:RATING2) */
  parentalRatings?: string;
  /**
   * The comma separates list of asset types to filter on.
   * @default "MOVIE,TV_SHOW"
   */
  types?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/asset/title/autocomplete/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<AutocompleteItem2[]>);
}

/**
 * @description EXPERIMENTAL. May change without notice.
 * @summary Does prefix autocomplete on tag titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/tag/title/autocomplete/{query}
 * @response `default` `(AutocompleteItem2)[]` success
 */
export async function autocompleteTagTitle({
  query,
  headers,
  ..._data
}: {
  /** The query to autocomplete. */
  query: string;
  /** The locales to autocomplete in. */
  locales?: string[];
  /** The schemes to autocomplete in. */
  scheme?: string[];
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/tag/title/autocomplete/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<AutocompleteItem2[]>);
}

/**
 * @summary Gets spelling suggestions for a key.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/suggestions/{query}
 * @response `default` `(AutocompleteItem)[]` success
 */
export async function getSuggestions({
  query,
  headers,
  ..._data
}: {
  /** The query to autocomplete. */
  query: string;
  /** The locale to autocomplete in. */
  locale?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/suggestions/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<AutocompleteItem[]>);
}

/**
 * @summary Searches for a query.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `default` `SearchList` success
 */
export async function search({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
  allowedCountry?: string;
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<SearchList>);
}

/**
 * @summary Searches for a query.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `default` `SearchList` success
 */
export async function searchPartial<T = any>({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
  allowedCountry?: string;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /** @default "PARTIAL" */
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @description EXPERIMENTAL. May change without notice.
 * @summary Prefix search on asset titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/asset/query/{query}
 * @response `default` `SearchList` success
 */
export async function searchAsset({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
  allowedCountry?: string;
  /** The locales to search in. */
  locale?: string[];
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/asset/query/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<SearchList>);
}

/**
 * @description EXPERIMENTAL. May change without notice.
 * @summary Prefix search on asset titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/asset/query/{query}
 * @response `default` `SearchList` success
 */
export async function searchAssetPartial<T = any>({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
  allowedCountry?: string;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /** @default "PARTIAL" */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of fields to add to the response. */
  includeFields?: string;
  /** The locales to search in. */
  locale?: string[];
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/asset/query/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary Searches the epg for a query.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/epg/{query}
 * @response `default` `EpgSearchHits` success
 */
export async function searchEpg({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
  /** The millis to get from. */
  from: number;
  /** The millis to get to. */
  to: number;
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/epg/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<EpgSearchHits>);
}

/**
 * @summary Searches the epg for a query.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/epg/{query}
 * @response `default` `EpgSearchHits` success
 */
export async function searchEpgPartial<T = any>({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
  /** The millis to get from. */
  from: number;
  /** The millis to get to. */
  to: number;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /** @default "PARTIAL" */
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
  service?: string;
  /**
   * The sort parameter in the format of first,-second. Defaults to sorting by
   * relevance.
   */
  sort?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/epg/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary EXPERIMENTAL - List assets - same query params as search
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/content/search/query
 * @response `default` `SearchList` success
 */
export async function searchNoQuery({
  headers,
  ..._data
}: {
  /** Filter on allowed in country. */
  allowedCountry?: string;
  /** Filter for material duration. Lower limit. */
  durationLower?: number;
  /** Filter for material duration. Upper limit. */
  durationUpper?: number;
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
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<SearchList>);
}

/**
 * @summary EXPERIMENTAL - List assets - same query params as search
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/content/search/query
 * @response `default` `SearchList` success
 */
export async function searchNoQueryPartial<T = any>({
  headers,
  ..._data
}: {
  /** Filter on allowed in country. */
  allowedCountry?: string;
  /** Filter for material duration. Lower limit. */
  durationLower?: number;
  /** Filter for material duration. Upper limit. */
  durationUpper?: number;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /**
   * The set of fields to include by default.
   * @default "PARTIAL"
   */
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
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @description EXPERMIENTAL. May change without notice.
 * @summary Prefix search on tag titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/tag/query/{query}
 * @response `default` `SearchList` success
 */
export async function searchTags({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/tag/query/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<SearchList>);
}

/**
 * @description EXPERMIENTAL. May change without notice.
 * @summary Prefix search on tag titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/tag/query/{query}
 * @response `default` `SearchList` success
 */
export async function searchTagsPartial<T = any>({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /** @default "PARTIAL" */
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/tag/query/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary EXPERIMENTAL - Free text query in selected fields in assets.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `default` `SearchList` success
 */
export async function searchV2({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
  /** Filter on allowed in country. */
  allowedCountry?: string;
  /** Filter for material duration. Lower limit. */
  durationLower?: number;
  /** Filter for material duration. Upper limit. */
  durationUpper?: number;
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<SearchList>);
}

/**
 * @summary EXPERIMENTAL - Free text query in selected fields in assets.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `default` `SearchList` success
 */
export async function searchV2Partial<T = any>({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
  /** Filter on allowed in country. */
  allowedCountry?: string;
  /** Filter for material duration. Lower limit. */
  durationLower?: number;
  /** Filter for material duration. Upper limit. */
  durationUpper?: number;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /**
   * The set of fields to include by default.
   * @default "PARTIAL"
   */
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @description EXPERIMENTAL. May change without notice.
 * @summary Prefix search on asset and tags.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `default` `MultiSearchResponse` success
 */
export async function searchV3({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
  /** Filter on allowed in country. */
  allowedCountry?: string;
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<MultiSearchResponse>);
}

/**
 * @description EXPERIMENTAL. May change without notice.
 * @summary Prefix search on asset and tags.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `default` `MultiSearchResponse` success
 */
export async function searchV3Partial<T = any>({
  query,
  headers,
  ..._data
}: {
  /** The query to search for. */
  query: string;
  /** Filter on allowed in country. */
  allowedCountry?: string;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /**
   * The set of fields to include by default.
   * @default "PARTIAL"
   */
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query/${query}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

export class SearchService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  autocomplete = autocomplete;
  autocompleteAssetTitle = autocompleteAssetTitle;
  autocompleteTagTitle = autocompleteTagTitle;
  getSuggestions = getSuggestions;
  search = search;
  searchPartial = searchPartial;
  searchAsset = searchAsset;
  searchAssetPartial = searchAssetPartial;
  searchEpg = searchEpg;
  searchEpgPartial = searchEpgPartial;
  searchNoQuery = searchNoQuery;
  searchNoQueryPartial = searchNoQueryPartial;
  searchTags = searchTags;
  searchTagsPartial = searchTagsPartial;
  searchV2 = searchV2;
  searchV2Partial = searchV2Partial;
  searchV3 = searchV3;
  searchV3Partial = searchV3Partial;
}
