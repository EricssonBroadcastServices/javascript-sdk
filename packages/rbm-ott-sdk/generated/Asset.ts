/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { Asset, AssetList, AssetType, DeviceType, Season, SeasonList } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Gets an asset by asset id.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}
 * @response `200` `Asset` success
 * @response `404` `void` UNKNOWN_ASSET. If the asset cannot be found.
 */
export async function getAsset(
  assetId: string,
  query?: {
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
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Asset>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}`, ctx.baseUrl),
    headers: headers,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}
/**
 * @description Main endpoint for listing/searching for assets. Make sure that calls to this endpoint are called with a limited set of parameter permutations to allow responses to be served from a cache.
 * @summary Lists assets.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset
 * @response `200` `AssetList` success
 * @response `400` `void` INVALID_QUERY. If the free text query is not a valid elasticsearch query string query. Result window is too large. If the pageSize times the pageNumber is greater than 10000.
 */
export async function getAssets(
  query?: {
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
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<AssetList>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset`, ctx.baseUrl),
    headers: headers,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}
/**
 * @description The thumbnail will be generated from the video belonging to the asset and based on provided time. This endpoint will always return a 307 redirect to another url where the thumbnail is actually available.
 * @summary Get a thumbnail for an asset.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/thumbnail
 * @response `400` `void` INVALID_TIME_DURATION. The provided time is not a valid duration. INVALID_TIME_WALL_CLOCK. The provided time is not a valid wall clock time.
 * @response `404` `void` UNKNOWN_ASSET. If the asset cannot be found.
 */
export async function getAssetThumbnail(
  assetId: string,
  query?: {
    /** An optional height */
    h?: number;
    /**
     * The time to use when creating the thumbnail. It can have two different formats. It can be
     * a wall clock time like '2021-02-02T10:53:35.400Z'. This assumes that the
     * asset has a wall clock time. It can also be a duration, like PT30M20S, and
     * then it will be used as an actual time in th video.
     */
    time?: string;
    /** An optional width. */
    w?: number;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<any>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/thumbnail`,
      ctx.baseUrl
    ),
    headers: headers,
    query: query
  });
}
/**
 * @summary Gets the entries of a collection.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/collectionentries
 * @response `200` `AssetList` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getCollectionEntries(
  assetId: string,
  query?: {
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
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<AssetList>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/collectionentries`,
      ctx.baseUrl
    ),
    headers: headers,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}
/**
 * @summary Gets episodes for a season.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}/episode
 * @response `200` `AssetList` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getEpisodes(
  assetId: string,
  season: number,
  query?: {
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
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<AssetList>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season/${season}/episode`,
      ctx.baseUrl
    ),
    headers: headers,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}
/**
 * @summary Gets the next entry of a collection.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{collectionId}/collectionentries/{referenceEntryId}/next
 * @response `200` `Asset` success
 * @response `404` `void` NO_ENTRY_FOUND. If the provided episode does not exist, or if there is no next episode available.
 */
export async function getNextCollectionEntry(
  collectionId: string,
  referenceEntryId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Asset>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${collectionId}/collectionentries/${referenceEntryId}/next`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @summary Gets the next episode relative to an episode.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/next
 * @response `200` `Asset` success
 * @response `404` `void` NO_EPISODE_FOUND. If the provided episode does not exist, or if there is no next episode available.
 */
export async function getNextEpisode(assetId: string, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Asset>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/next`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @summary Gets the previous entry of a collection.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{collectionId}/collectionentries/{referenceEntryId}/previous
 * @response `200` `Asset` success
 * @response `404` `void` NO_ENTRY_FOUND. If the provided episode does not exist, or if there is no next episode available.
 */
export async function getPreviousCollectionEntry(
  collectionId: string,
  referenceEntryId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Asset>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${collectionId}/collectionentries/${referenceEntryId}/previous`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @summary Gets the previous episode relative to an episode.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/previous
 * @response `200` `Asset` success
 * @response `404` `void` NO_EPISODE_FOUND. If the provided episode does not exist or if there is no previous episode available.
 */
export async function getPreviousEpisode(assetId: string, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Asset>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/previous`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @summary Gets a specific season.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}
 * @response `200` `Season` success
 * @response `404` `void` UNKNOWN_SEASON. If the season is not found.
 */
export async function getSeason(
  assetId: string,
  season: number,
  query?: {
    /** @default true */
    onlyPublished?: boolean;
    service?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Season>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season/${season}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}
/**
 * @summary Gets seasons for an asset.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season
 * @response `default` `SeasonList` success
 */
export async function getSeasonsForTvShow(
  assetId: string,
  query?: {
    includeEpisodes?: boolean;
    /** @default true */
    onlyPublished?: boolean;
    /** @default 1 */
    pageNumber?: number;
    /** @default 50 */
    pageSize?: number;
    service?: string;
    sort?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<SeasonList>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/content/asset/${assetId}/season`,
      ctx.baseUrl
    ),
    headers: headers,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}

export const AssetService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getAsset,
    getAssets,
    getAssetThumbnail,
    getCollectionEntries,
    getEpisodes,
    getNextCollectionEntry,
    getNextEpisode,
    getPreviousCollectionEntry,
    getPreviousEpisode,
    getSeason,
    getSeasonsForTvShow
  }) as const;
