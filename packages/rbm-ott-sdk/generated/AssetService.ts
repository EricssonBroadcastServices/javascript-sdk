/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { Asset, AssetList, AssetType, DeviceType, Season, SeasonList } from "./data-contracts";
import { request, ServiceContext } from "./http-client";

/**
 * @summary Gets an asset by asset id.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}
 * @response `200` `Asset` success
 * @response `404` `void` UNKNOWN_ASSET. If the asset cannot be found.
 */
export async function getAsset({
  assetId,
  headers,
  ..._data
}: {
  /** The id of the asset. Slugs supported. */
  assetId: string;
  /** Filter results on if the asset (or episodes) are published in the country specified by this parameter. */
  allowedCountry?: string;
  /**
   * Set to true to include episodes for the asset in the response. Only applicable if the
   * asset is a tv show. Setting this to true will cause seasons to be includeSeasons true.
   */
  includeEpisodes?: boolean;
  /**
   * Set to true to include seasons for the asset in the response. Only applicable if the
   * asset is a tv show.
   */
  includeSeasons?: boolean;
  /** @default true */
  onlyPublished?: boolean;
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
    headers,
    ctx,
    query: { fieldSet: "ALL", ..._data }
  }).then(response => response.json() as Promise<Asset>);
}

/**
 * @summary Gets an asset by asset id.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}
 * @response `200` `Asset` success
 * @response `404` `void` UNKNOWN_ASSET. If the asset cannot be found.
 */
export async function getAssetPartial<T = any>({
  assetId,
  headers,
  ..._data
}: {
  /** The id of the asset. Slugs supported. */
  assetId: string;
  /** Filter results on if the asset (or episodes) are published in the country specified by this parameter. */
  allowedCountry?: string;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /**
   * The set of fields to include by default.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /**
   * Set to true to include episodes for the asset in the response. Only applicable if the
   * asset is a tv show. Setting this to true will cause seasons to be includeSeasons true.
   */
  includeEpisodes?: boolean;
  /** Comma separated list of fields to add to the response. */
  includeFields?: string;
  /**
   * Set to true to include seasons for the asset in the response. Only applicable if the
   * asset is a tv show.
   */
  includeSeasons?: boolean;
  /** @default true */
  onlyPublished?: boolean;
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
    headers,
    ctx,
    query: { fieldSet: "PARTIAL", ..._data }
  }).then(response => response.json() as Promise<T>);
}

/**
 * @description Main endpoint for listing/searching for assets. Make sure that calls to this endpoint are called with a limited set of parameter permutations to allow responses to be served from a cache.
 * @summary Lists assets.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset
 * @response `200` `AssetList` success
 * @response `400` `void` INVALID_QUERY. If the free text query is not a valid elasticsearch query string query. Result window is too large. If the pageSize times the pageNumber is greater than 10000.
 */
export async function getAssets({
  headers,
  ..._data
}: {
  /** If we should only return assets that are not geo blocking in this country */
  allowedCountry?: string;
  /** The asset ids to filter by. */
  assetIds?: string[];
  /** The asset type to filter by. */
  assetType?: AssetType;
  /**
   * The optional query to filter by in fields nested under publications.devices. In the
   * elasticsearch query string query format,
   * I.E: "publications.devices.rights.threeGBlocked:false AND
   * publications.devices.os:IOS"
   */
  deviceQuery?: string;
  /** If we should only return assets that are allowed to play on this device */
  deviceType?: DeviceType;
  /** @default false */
  includeTvShow?: boolean;
  /** Will only return assets that has an empty value in the field specified in this field */
  missingFieldsFilter?: string;
  /**
   * If we should only return assets that are at the moment published
   * @default true
   */
  onlyPublished?: boolean;
  /**
   * The page number. Note that pageNumber * pageSize cannot exceed 10000 or an error
   * will occur.
   * @default 1
   */
  pageNumber?: number;
  /**
   * The number of items to show per page. Note that pageNumber * pageSize cannot exceed
   * 10000 or an error will occur.
   * @default 50
   */
  pageSize?: number;
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  /**
   * Only return assets that are playable (has a publication.from) earlier than from
   * now+X hours and are published at the moment.
   */
  playableWithinHours?: number;
  /** If we should only return assets that have publications on any of these products */
  products?: string[];
  /** Only return assets that if they have programs, only have programs on provided channel ids. Comma separated list. */
  programsOnChannelIds?: string;
  /**
   * The optional query to filter by in fields nested under publications except
   * publications.devices. In the elasticsearch query string query format,
   * I.E: "publications.rights.wifiBlocked:true"
   */
  publicationQuery?: string;
  /**
   * The optional query to filter by. In the elasticsearch query string query format,
   * I.E: "tags.genres:action AND localized.en-us.title:armageddon"
   */
  query?: string;
  /** If we should only return assets that have publications on this service */
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
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset`,
    headers,
    ctx,
    query: { fieldSet: "ALL", ..._data }
  }).then(response => response.json() as Promise<AssetList>);
}

/**
 * @description Main endpoint for listing/searching for assets. Make sure that calls to this endpoint are called with a limited set of parameter permutations to allow responses to be served from a cache.
 * @summary Lists assets.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset
 * @response `200` `AssetList` success
 * @response `400` `void` INVALID_QUERY. If the free text query is not a valid elasticsearch query string query. Result window is too large. If the pageSize times the pageNumber is greater than 10000.
 */
export async function getAssetsPartial<T = any>({
  headers,
  ..._data
}: {
  /** If we should only return assets that are not geo blocking in this country */
  allowedCountry?: string;
  /** The asset ids to filter by. */
  assetIds?: string[];
  /** The asset type to filter by. */
  assetType?: AssetType;
  /**
   * The optional query to filter by in fields nested under publications.devices. In the
   * elasticsearch query string query format,
   * I.E: "publications.devices.rights.threeGBlocked:false AND
   * publications.devices.os:IOS"
   */
  deviceQuery?: string;
  /** If we should only return assets that are allowed to play on this device */
  deviceType?: DeviceType;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /**
   * The set of fields to include by default.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  /** Comma separated list of fields to add to the response. */
  includeFields?: string;
  /** @default false */
  includeTvShow?: boolean;
  /** Will only return assets that has an empty value in the field specified in this field */
  missingFieldsFilter?: string;
  /**
   * If we should only return assets that are at the moment published
   * @default true
   */
  onlyPublished?: boolean;
  /**
   * The page number. Note that pageNumber * pageSize cannot exceed 10000 or an error
   * will occur.
   * @default 1
   */
  pageNumber?: number;
  /**
   * The number of items to show per page. Note that pageNumber * pageSize cannot exceed
   * 10000 or an error will occur.
   * @default 50
   */
  pageSize?: number;
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  /**
   * Only return assets that are playable (has a publication.from) earlier than from
   * now+X hours and are published at the moment.
   */
  playableWithinHours?: number;
  /** If we should only return assets that have publications on any of these products */
  products?: string[];
  /** Only return assets that if they have programs, only have programs on provided channel ids. Comma separated list. */
  programsOnChannelIds?: string;
  /**
   * The optional query to filter by in fields nested under publications except
   * publications.devices. In the elasticsearch query string query format,
   * I.E: "publications.rights.wifiBlocked:true"
   */
  publicationQuery?: string;
  /**
   * The optional query to filter by. In the elasticsearch query string query format,
   * I.E: "tags.genres:action AND localized.en-us.title:armageddon"
   */
  query?: string;
  /** If we should only return assets that have publications on this service */
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
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset`,
    headers,
    ctx,
    query: { fieldSet: "PARTIAL", ..._data }
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary Gets the entries of a collection.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/collectionentries
 * @response `200` `AssetList` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getCollectionEntries({
  assetId,
  headers,
  ..._data
}: {
  /** The id of the collection. Slugs supported. */
  assetId: string;
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
  /** Sort order. Used as tiebreaker if naturalSortOrder is specified. */
  sort?: string;
  /**
   * Sort entries by the sort order parameter on the collection reference. Sort parameter is the
   * tiebreaker.
   */
  sortOrder?: "ASC" | "DESC";
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/collectionentries`,
    headers,
    ctx,
    query: { fieldSet: "ALL", ..._data }
  }).then(response => response.json() as Promise<AssetList>);
}

/**
 * @summary Gets the entries of a collection.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/collectionentries
 * @response `200` `AssetList` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getCollectionEntriesPartial<T = any>({
  assetId,
  headers,
  ..._data
}: {
  /** The id of the collection. Slugs supported. */
  assetId: string;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /**
   * The set of fields to include by default.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
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
  service?: string;
  /** Sort order. Used as tiebreaker if naturalSortOrder is specified. */
  sort?: string;
  /**
   * Sort entries by the sort order parameter on the collection reference. Sort parameter is the
   * tiebreaker.
   */
  sortOrder?: "ASC" | "DESC";
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/collectionentries`,
    headers,
    ctx,
    query: { fieldSet: "PARTIAL", ..._data }
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary Gets episodes for a season.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}/episode
 * @response `200` `AssetList` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getEpisodes({
  assetId,
  season,
  headers,
  ..._data
}: {
  /** The id of the tv show. Slugs supported. */
  assetId: string;
  /** An integer season number. */
  season: number;
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season/${season}/episode`,
    headers,
    ctx,
    query: { fieldSet: "ALL", ..._data }
  }).then(response => response.json() as Promise<AssetList>);
}

/**
 * @summary Gets episodes for a season.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}/episode
 * @response `200` `AssetList` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getEpisodesPartial<T = any>({
  assetId,
  season,
  headers,
  ..._data
}: {
  /** The id of the tv show. Slugs supported. */
  assetId: string;
  /** An integer season number. */
  season: number;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /**
   * The set of fields to include by default.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
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
  service?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season/${season}/episode`,
    headers,
    ctx,
    query: { fieldSet: "PARTIAL", ..._data }
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary Gets the next entry of a collection.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{collectionId}/collectionentries/{referenceEntryId}/next
 * @response `200` `Asset` success
 * @response `404` `void` NO_ENTRY_FOUND. If the provided episode does not exist, or if there is no next episode available.
 */
export async function getNextCollectionEntry({
  collectionId,
  referenceEntryId,
  headers
}: {
  /** The id of the collection. */
  collectionId: string;
  /** The id of reference collection entry. */
  referenceEntryId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${collectionId}/collectionentries/${referenceEntryId}/next`,
    headers,
    ctx
  }).then(response => response.json() as Promise<Asset>);
}

/**
 * @summary Gets the next episode relative to an episode.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/next
 * @response `200` `Asset` success
 * @response `404` `void` NO_EPISODE_FOUND. If the provided episode does not exist, or if there is no next episode available.
 */
export async function getNextEpisode({
  assetId,
  headers
}: {
  /** The id of the current episode. */
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/next`,
    headers,
    ctx
  }).then(response => response.json() as Promise<Asset>);
}

/**
 * @summary Gets the previous entry of a collection.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{collectionId}/collectionentries/{referenceEntryId}/previous
 * @response `200` `Asset` success
 * @response `404` `void` NO_ENTRY_FOUND. If the provided episode does not exist, or if there is no next episode available.
 */
export async function getPreviousCollectionEntry({
  collectionId,
  referenceEntryId,
  headers
}: {
  /** The id of the collection. */
  collectionId: string;
  /** The id of reference collection entry. */
  referenceEntryId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${collectionId}/collectionentries/${referenceEntryId}/previous`,
    headers,
    ctx
  }).then(response => response.json() as Promise<Asset>);
}

/**
 * @summary Gets the previous episode relative to an episode.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/previous
 * @response `200` `Asset` success
 * @response `404` `void` NO_EPISODE_FOUND. If the provided episode does not exist or if there is no previous episode available.
 */
export async function getPreviousEpisode({
  assetId,
  headers
}: {
  /** The id of the current episode. */
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/previous`,
    headers,
    ctx
  }).then(response => response.json() as Promise<Asset>);
}

/**
 * @summary Gets a specific season.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}
 * @response `200` `Season` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getSeason({
  assetId,
  season,
  headers,
  ..._data
}: {
  /** The id of the tv show. Slugs supported. */
  assetId: string;
  /** An integer season number. */
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
    headers,
    ctx,
    query: { fieldSet: "ALL", ..._data }
  }).then(response => response.json() as Promise<Season>);
}

/**
 * @summary Gets a specific season.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}
 * @response `200` `Season` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getSeasonPartial<T = any>({
  assetId,
  season,
  headers,
  ..._data
}: {
  /** The id of the tv show. Slugs supported. */
  assetId: string;
  /** An integer season number. */
  season: number;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /**
   * The set of fields to include by default.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
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
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season/${season}`,
    headers,
    ctx,
    query: { fieldSet: "PARTIAL", ..._data }
  }).then(response => response.json() as Promise<T>);
}

/**
 * @summary Gets seasons for an asset.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season
 * @response `default` `SeasonList` success
 */
export async function getSeasonsForTvShow({
  assetId,
  headers,
  ..._data
}: {
  /** The id of the asset. Slugs supported. */
  assetId: string;
  includeEpisodes?: boolean;
  /** @default true */
  onlyPublished?: boolean;
  /** @default 1 */
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
    headers,
    ctx,
    query: { fieldSet: "ALL", ..._data }
  }).then(response => response.json() as Promise<SeasonList>);
}

/**
 * @summary Gets seasons for an asset.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season
 * @response `default` `SeasonList` success
 */
export async function getSeasonsForTvShowPartial<T = any>({
  assetId,
  headers,
  ..._data
}: {
  /** The id of the asset. Slugs supported. */
  assetId: string;
  /** Comma separated list of fields to remove from the response. */
  excludeFields?: string;
  /**
   * The set of fields to include by default.
   * @default "PARTIAL"
   */
  fieldSet?: "ALL" | "NONE" | "PARTIAL";
  includeEpisodes?: boolean;
  /** Comma separated list of fields to add to the response. */
  includeFields?: string;
  /** @default true */
  onlyPublished?: boolean;
  /** @default 1 */
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
    headers,
    ctx,
    query: { fieldSet: "PARTIAL", ..._data }
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
