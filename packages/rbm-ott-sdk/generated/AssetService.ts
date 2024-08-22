/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { Asset, AssetList, AssetType, DeviceType, Season, SeasonList } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Get an asset by asset id or slug.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}
 * @response `200` `Asset` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getAsset({
  assetId,
  headers,
  ..._data
}: {
  assetId: string;
  allowedCountry?: string;
  includeEpisodes?: boolean;
  includeSeasons?: boolean;
  /** @default true */
  onlyPublished?: boolean;
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  service?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<Asset>);
}

/**
 * @summary Get an asset by asset id or slug.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}
 * @response `200` `Asset` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getAssetPartial<T = any>({
  assetId,
  headers,
  ..._data
}: {
  assetId: string;
  allowedCountry?: string;
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
  includeSeasons?: boolean;
  /** @default true */
  onlyPublished?: boolean;
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  service?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @description Main endpoint for listing/searching for assets. Make sure that calls to this endpoint are called with a limited set of parameter permutations to allow responses to be served from a cache.
 * @summary Lists assets.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset
 * @response `200` `AssetList` Successful.
 * @response `400` `APIErrorMessage` User error.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getAssets({
  headers,
  ..._data
}: {
  allowedCountry?: string;
  assetIds?: string[];
  assetType?: AssetType;
  deviceQuery?: string;
  deviceType?: DeviceType;
  includeTvShow?: boolean;
  missingFieldsFilter?: string;
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
   * @max 200
   */
  pageSize?: number;
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  /** @min 0 */
  playableWithinHours?: number;
  products?: string[];
  programsOnChannelIds?: string;
  /** @min 0 */
  publicationEndsWithinDays?: number;
  publicationQuery?: string;
  /** @min 0 */
  publicationStartsWithinDays?: number;
  /** The optional query to filter by. In the elasticsearch query string query format, I.E: "tagsIds:action AND localized.en-us.title:armageddon" */
  query?: string;
  service?: string;
  sort?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<AssetList>);
}

/**
 * @description Main endpoint for listing/searching for assets. Make sure that calls to this endpoint are called with a limited set of parameter permutations to allow responses to be served from a cache.
 * @summary Lists assets.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset
 * @response `200` `AssetList` Successful.
 * @response `400` `APIErrorMessage` User error.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getAssetsPartial<T = any>({
  headers,
  ..._data
}: {
  allowedCountry?: string;
  assetIds?: string[];
  assetType?: AssetType;
  deviceQuery?: string;
  deviceType?: DeviceType;
  /** Comma separated list of field names to exclude from response. */
  excludeFields?: string;
  /**
   * Field set to return.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of field names to include in response. */
  includeFields?: string;
  includeTvShow?: boolean;
  missingFieldsFilter?: string;
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
   * @max 200
   */
  pageSize?: number;
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  /** @min 0 */
  playableWithinHours?: number;
  products?: string[];
  programsOnChannelIds?: string;
  /** @min 0 */
  publicationEndsWithinDays?: number;
  publicationQuery?: string;
  /** @min 0 */
  publicationStartsWithinDays?: number;
  /** The optional query to filter by. In the elasticsearch query string query format, I.E: "tagsIds:action AND localized.en-us.title:armageddon" */
  query?: string;
  service?: string;
  sort?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary Get the entries of a collection.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/collectionentries
 * @response `200` `AssetList` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getCollectionEntries({
  assetId,
  headers,
  ..._data
}: {
  /** Collection id. Slugs supported. */
  assetId: string;
  allowedCountry?: string;
  deviceType?: DeviceType;
  /** @default true */
  onlyPublished?: boolean;
  /**
   * @default 1
   * @min 1
   */
  pageNumber?: number;
  /** @default 50 */
  pageSize?: number;
  products?: string[];
  service?: string;
  sort?: string;
  sortOrder?: "ASC" | "DESC";
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/collectionentries`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<AssetList>);
}

/**
 * @summary Get the entries of a collection.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/collectionentries
 * @response `200` `AssetList` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getCollectionEntriesPartial<T = any>({
  assetId,
  headers,
  ..._data
}: {
  /** Collection id. Slugs supported. */
  assetId: string;
  allowedCountry?: string;
  deviceType?: DeviceType;
  /** Comma separated list of field names to exclude from response. */
  excludeFields?: string;
  /**
   * Field set to return.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of field names to include in response. */
  includeFields?: string;
  /** @default true */
  onlyPublished?: boolean;
  /**
   * @default 1
   * @min 1
   */
  pageNumber?: number;
  /** @default 50 */
  pageSize?: number;
  products?: string[];
  service?: string;
  sort?: string;
  sortOrder?: "ASC" | "DESC";
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/collectionentries`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary Get episodes for a season.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}/episode
 * @response `200` `AssetList` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getEpisodes({
  assetId,
  season,
  headers,
  ..._data
}: {
  assetId: string;
  season: number;
  /** @default true */
  onlyPublished?: boolean;
  /**
   * @default 1
   * @min 1
   */
  pageNumber?: number;
  /** @default 50 */
  pageSize?: number;
  service?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season/${season}/episode`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<AssetList>);
}

/**
 * @summary Get episodes for a season.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}/episode
 * @response `200` `AssetList` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getEpisodesPartial<T = any>({
  assetId,
  season,
  headers,
  ..._data
}: {
  assetId: string;
  season: number;
  /** Comma separated list of field names to exclude from response. */
  excludeFields?: string;
  /**
   * Field set to return.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of field names to include in response. */
  includeFields?: string;
  /** @default true */
  onlyPublished?: boolean;
  /**
   * @default 1
   * @min 1
   */
  pageNumber?: number;
  /** @default 50 */
  pageSize?: number;
  service?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season/${season}/episode`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary Get the next entry of a collection.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{collectionId}/collectionentries/{referenceEntryId}/next
 * @response `200` `Asset` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getNextCollectionEntry({
  collectionId,
  referenceEntryId,
  headers,
  ..._data
}: {
  collectionId: string;
  referenceEntryId: string;
  allowedCountry?: string;
  deviceType?: DeviceType;
  products?: string[];
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${collectionId}/collectionentries/${referenceEntryId}/next`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<Asset>);
}

/**
 * @summary Get the next episode of a tv show.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/next
 * @response `200` `Asset` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getNextEpisode({
  assetId,
  headers
}: {
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/next`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<Asset>);
}

/**
 * @summary Get the previous entry of a collection.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{collectionId}/collectionentries/{referenceEntryId}/previous
 * @response `200` `Asset` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getPreviousCollectionEntry({
  collectionId,
  referenceEntryId,
  headers,
  ..._data
}: {
  collectionId: string;
  referenceEntryId: string;
  allowedCountry?: string;
  deviceType?: DeviceType;
  products?: string[];
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${collectionId}/collectionentries/${referenceEntryId}/previous`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<Asset>);
}

/**
 * @summary Get the previous episode of a tv show.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/previous
 * @response `200` `Asset` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getPreviousEpisode({
  assetId,
  headers
}: {
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/previous`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<Asset>);
}

/**
 * @summary Get a season of a tv show.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}
 * @response `200` `Season` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getSeason({
  assetId,
  season,
  headers,
  ..._data
}: {
  assetId: string;
  season: number;
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
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season/${season}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<Season>);
}

/**
 * @summary Get a season of a tv show.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}
 * @response `200` `Season` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getSeasonPartial<T = any>({
  assetId,
  season,
  headers,
  ..._data
}: {
  assetId: string;
  season: number;
  /** Comma separated list of field names to exclude from response. */
  excludeFields?: string;
  /**
   * Field set to return.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of field names to include in response. */
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
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season/${season}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary Get seasons of a tv show.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season
 * @response `200` `SeasonList` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getSeasonsForTvShow({
  assetId,
  headers,
  ..._data
}: {
  assetId: string;
  includeEpisodes?: boolean;
  /** @default true */
  onlyPublished?: boolean;
  /**
   * @default 1
   * @min 1
   */
  pageNumber?: number;
  /** @default 50 */
  pageSize?: number;
  service?: string;
  sort?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "ALL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<SeasonList>);
}

/**
 * @summary Get seasons of a tv show.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season
 * @response `200` `SeasonList` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getSeasonsForTvShowPartial<T = any>({
  assetId,
  headers,
  ..._data
}: {
  assetId: string;
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
   */
  pageNumber?: number;
  /** @default 50 */
  pageSize?: number;
  service?: string;
  sort?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: { fieldSet: "PARTIAL", ..._data } as unknown as QueryParams
  }).then(response => response.json() as Promise<T>);
}

export class AssetService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getAsset = getAsset;
  getAssetPartial = getAssetPartial;
  getAssets = getAssets;
  getAssetsPartial = getAssetsPartial;
  getCollectionEntries = getCollectionEntries;
  getCollectionEntriesPartial = getCollectionEntriesPartial;
  getEpisodes = getEpisodes;
  getEpisodesPartial = getEpisodesPartial;
  getNextCollectionEntry = getNextCollectionEntry;
  getNextEpisode = getNextEpisode;
  getPreviousCollectionEntry = getPreviousCollectionEntry;
  getPreviousEpisode = getPreviousEpisode;
  getSeason = getSeason;
  getSeasonPartial = getSeasonPartial;
  getSeasonsForTvShow = getSeasonsForTvShow;
  getSeasonsForTvShowPartial = getSeasonsForTvShowPartial;
}
