/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import {
  AutocompleteItem,
  AutocompleteItem2,
  EpgSearchHits,
  MultiSearchResponse,
  ParentalRatingsFilter,
  SearchList,
  TagSearchList
} from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Does prefix autocomplete for a query.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/autocomplete/{query}
 * @response `200` `(AutocompleteItem)[]` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function autocomplete({
  query,
  headers,
  ..._data
}: {
  query: string;
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
 * @summary Autocomplete of asset titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/asset/title/autocomplete/{query}
 * @response `200` `(AutocompleteItem2)[]` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function autocompleteAssetTitle({
  query,
  headers,
  ..._data
}: {
  query: string;
  locales?: string[];
  parentalRatings?: ParentalRatingsFilter;
  /** @default "MOVIE,TV_SHOW" */
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
 * @summary Autocomplete V3 of asset titles.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/tag/title/autocomplete/{query}
 * @response `200` `(AutocompleteItem2)[]` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function autocompleteTagTitle({
  query,
  headers,
  ..._data
}: {
  query: string;
  locale?: string[];
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
 * @response `200` `(AutocompleteItem)[]` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getSuggestions({
  query,
  headers,
  ..._data
}: {
  query: string;
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
 * @summary Title search V1.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `200` `SearchList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function search({
  query,
  headers,
  ..._data
}: {
  query: string;
  allowedCountry?: string;
  locale?: string;
  /** @default true */
  onlyPublished?: boolean;
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
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  service?: string;
  sort?: string;
  /**
   * Comma separated list of types.
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
 * @summary Title search V1.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `200` `SearchList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function searchPartial<T = any>({
  query,
  headers,
  ..._data
}: {
  query: string;
  allowedCountry?: string;
  /** Comma separated list of field names to exclude from response. */
  excludeFields?: string;
  /**
   * Field set to return.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of field names to include in response. */
  includeFields?: string;
  locale?: string;
  /** @default true */
  onlyPublished?: boolean;
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
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  service?: string;
  sort?: string;
  /**
   * Comma separated list of types.
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
 * @description Prefix search on asset titles.
 * @summary Asset search V3.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/asset/query/{query}
 * @response `200` `SearchList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function searchAssets({
  query,
  headers,
  ..._data
}: {
  query: string;
  allowedCountry?: string;
  locale?: string[];
  /** @default true */
  onlyPublished?: boolean;
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
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  products?: string[];
  service?: string;
  sort?: string;
  /** @default "MOVIE,TV_SHOW" */
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
 * @description Prefix search on asset titles.
 * @summary Asset search V3.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/asset/query/{query}
 * @response `200` `SearchList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function searchAssetsPartial<T = any>({
  query,
  headers,
  ..._data
}: {
  query: string;
  allowedCountry?: string;
  /** Comma separated list of field names to exclude from response. */
  excludeFields?: string;
  /**
   * Field set to return.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of field names to include in response. */
  includeFields?: string;
  locale?: string[];
  /** @default true */
  onlyPublished?: boolean;
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
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  products?: string[];
  service?: string;
  sort?: string;
  /** @default "MOVIE,TV_SHOW" */
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
 * @description I.e. list assets with same query params as search.
 * @summary Search V2 with empty query
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/content/search/query/
 * @response `200` `SearchList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function searchNoQuery({
  headers,
  ..._data
}: {
  allowedCountry?: string;
  durationLower?: number;
  durationUpper?: number;
  onlyDownloadable?: boolean;
  /** @default true */
  onlyPublished?: boolean;
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
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  service?: string;
  subtitles?: string;
  tags?: string[];
  /** @default "MOVIE,TV_SHOW" */
  types?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query/`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<SearchList>);
}

/**
 * @description I.e. list assets with same query params as search.
 * @summary Search V2 with empty query
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/content/search/query/
 * @response `200` `SearchList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function searchNoQueryPartial<T = any>({
  headers,
  ..._data
}: {
  allowedCountry?: string;
  durationLower?: number;
  durationUpper?: number;
  /** Comma separated list of field names to exclude from response. */
  excludeFields?: string;
  /**
   * Field set to return.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of field names to include in response. */
  includeFields?: string;
  onlyDownloadable?: boolean;
  /** @default true */
  onlyPublished?: boolean;
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
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  service?: string;
  subtitles?: string;
  tags?: string[];
  /** @default "MOVIE,TV_SHOW" */
  types?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/search/query/`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @description Prefix search on tag titles.
 * @summary Tag search V3.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/tag/query/{query}
 * @response `200` `TagSearchList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function searchTags({
  query,
  headers,
  ..._data
}: {
  query: string;
  locales?: string[];
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
  }).then(response => response.json() as Promise<TagSearchList>);
}

/**
 * @description Prefix search on tag titles.
 * @summary Tag search V3.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/tag/query/{query}
 * @response `200` `TagSearchList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function searchTagsPartial<T = any>({
  query,
  headers,
  ..._data
}: {
  query: string;
  /** Comma separated list of field names to exclude from response. */
  excludeFields?: string;
  /**
   * Field set to return.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of field names to include in response. */
  includeFields?: string;
  locales?: string[];
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
 * @description Free text query in selected fields in assets.
 * @summary Search V2
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `200` `SearchList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function searchV2({
  query,
  headers,
  ..._data
}: {
  query: string;
  allowedCountry?: string;
  durationLower?: number;
  durationUpper?: number;
  locale?: string[];
  onlyDownloadable?: boolean;
  /** @default true */
  onlyPublished?: boolean;
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
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  schemes?: string[];
  service?: string;
  subtitles?: string;
  tags?: string[];
  /**
   * Comma separated list of types.
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
 * @description Free text query in selected fields in assets.
 * @summary Search V2
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `200` `SearchList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function searchV2Partial<T = any>({
  query,
  headers,
  ..._data
}: {
  query: string;
  allowedCountry?: string;
  durationLower?: number;
  durationUpper?: number;
  /** Comma separated list of field names to exclude from response. */
  excludeFields?: string;
  /**
   * Field set to return.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of field names to include in response. */
  includeFields?: string;
  locale?: string[];
  onlyDownloadable?: boolean;
  /** @default true */
  onlyPublished?: boolean;
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
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  schemes?: string[];
  service?: string;
  subtitles?: string;
  tags?: string[];
  /**
   * Comma separated list of types.
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
 * @description Prefix search on assets and tags.
 * @summary Multi search V3.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `200` `MultiSearchResponse` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function searchV3({
  query,
  headers,
  ..._data
}: {
  query: string;
  allowedCountry?: string;
  locale?: string[];
  /** @default true */
  onlyPublished?: boolean;
  /**
   * @default 50
   * @min 1
   */
  pageSize?: number;
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  products?: string[];
  /** The schemes of tags to search. If no schemes, tags will not be searched. */
  schemes?: string[];
  service?: string;
  /**
   * Comma separated list of types.
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
 * @description Prefix search on assets and tags.
 * @summary Multi search V3.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
 * @response `200` `MultiSearchResponse` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function searchV3Partial<T = any>({
  query,
  headers,
  ..._data
}: {
  query: string;
  allowedCountry?: string;
  /** Comma separated list of field names to exclude from response. */
  excludeFields?: string;
  /**
   * Field set to return.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of field names to include in response. */
  includeFields?: string;
  locale?: string[];
  /** @default true */
  onlyPublished?: boolean;
  /**
   * @default 50
   * @min 1
   */
  pageSize?: number;
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  products?: string[];
  /** The schemes of tags to search. If no schemes, tags will not be searched. */
  schemes?: string[];
  service?: string;
  /**
   * Comma separated list of types.
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
  searchAssets = searchAssets;
  searchAssetsPartial = searchAssetsPartial;
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
