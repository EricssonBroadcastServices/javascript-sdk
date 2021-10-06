import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import * as querystring from "query-string";
import { deserialize, IAssetResponse } from "..";
import { Asset, AssetType } from "../models/asset-model";
import { epgDateFormatter } from "../utils/date";
import { IBookmark } from "../interfaces/content/bookmark";
import { SeasonResponse } from "../models/season-model";
import { EpgResponse, OnNowResponse } from "../models/program-model";
import { IEpisodesResponse } from "../interfaces/content/asset-response";
import { IPaginatedResponse } from "../interfaces/content/paginated";

export interface PageinatedRequest {
  pageSize?: number;
  pageNumber?: number;
}

export interface GetAssetByIdOptions extends CustomerAndBusinessUnitOptions {
  assetId: string;
}

export interface GetEpisodesForSeasonOptions extends GetAssetByIdOptions {
  seasonNumber: number;
}

export interface GetAssetsOptions extends CustomerAndBusinessUnitOptions {
  query?: string;
  sort?: string;
  pageSize?: number;
  pageNumber?: number;
  allowedCountry?: string | null;
  assetType?: AssetType;
  onlyPublished?: boolean;
}

export interface GetCollectionEntriesOptions extends CustomerAndBusinessUnitOptions {
  assetId: string;
  onlyPublished?: boolean;
  sort?: string;
  pageSize?: number;
  pageNumber?: number;
}

export interface GetEpgOptions extends CustomerAndBusinessUnitOptions, PageinatedRequest {
  channelId: string;
  date?: Date;
  daysForward?: number;
  daysBackward?: number;
}

export interface GetOnNowByChannelIdOptions extends CustomerAndBusinessUnitOptions {
  channelId: string;
  minutesForward?: number;
}

export interface GetOnNowOptions extends CustomerAndBusinessUnitOptions {
  minutesForward?: number;
  pageSize?: number;
  pageNumber?: number;
  sortingLocale?: string;
}

export interface GetLiveEventsOptions extends CustomerAndBusinessUnitOptions, PageinatedRequest {
  date?: Date;
  daysBackward: number;
  daysForward: number;
}

export class ContentService extends BaseService {
  public getAssetById({ customer, businessUnit, assetId, headers }: GetAssetByIdOptions) {
    const requestQuery = {
      fieldSet: "ALL"
    };
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/content/asset/${assetId}?${querystring.stringify(requestQuery)}`,
      headers
    ).then(data => deserialize(Asset, data));
  }
  public getAssets({
    customer,
    businessUnit,
    query,
    sort,
    pageNumber,
    pageSize,
    allowedCountry,
    headers,
    assetType,
    onlyPublished = true
  }: GetAssetsOptions): Promise<IAssetResponse> {
    const requestQuery = {
      query,
      sort,
      pageSize: pageSize || 30,
      pageNumber: pageNumber || 1,
      fieldSet: "ALL",
      onlyPublished,
      allowedCountry,
      assetType
    };
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/content/asset?${querystring.stringify(requestQuery)}`,
      headers
    ).then(data => ({ ...data, items: data.items.map(asset => deserialize(Asset, asset)) }));
  }

  public async getAllAssets({ customer, businessUnit }: CustomerAndBusinessUnitOptions): Promise<Asset[]> {
    const { totalCount, items, pageSize } = await this.getAssets({
      customer,
      businessUnit,
      pageSize: 100,
      pageNumber: 1
    });
    const numberOfPages = Math.ceil(totalCount / pageSize) - 1; // minus the one we already fetched;
    // Create array of remaining pageNumbers to fetch. +1 for mapping 0 => 1, + 1 for skipping the one we already fetched
    const pageNumberArr = new Array(numberOfPages).fill("").map((item, index) => index + 2);
    const combinedAssetResponses = await Promise.all(
      pageNumberArr.map(pageNumber => {
        return this.getAssets({ customer, businessUnit, pageSize, pageNumber }).then(res => res.items);
      })
    );
    return [items, ...combinedAssetResponses].flatMap(arr => [...arr]);
  }

  public getCollectionEntries({
    customer,
    businessUnit,
    assetId,
    headers,
    pageSize,
    pageNumber,
    sort,
    onlyPublished = true
  }: GetCollectionEntriesOptions): Promise<IAssetResponse> {
    const requestQuery = {
      fieldSet: "ALL",
      pageSize,
      pageNumber,
      sort,
      onlyPublished
    };
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/content/asset/${assetId}/collectionentries?${querystring.stringify(requestQuery)}`,
      headers
    ).then(data => ({ ...data, items: data.items.map(asset => deserialize(Asset, asset)) }));
  }

  public getEpg({
    daysForward,
    daysBackward,
    pageNumber,
    pageSize,
    channelId,
    customer,
    businessUnit,
    date
  }: GetEpgOptions) {
    const requestQuery = {
      daysBackward: daysBackward || 1,
      daysForward: daysForward || 1,
      pageSize: pageSize || 500,
      pageNumber: pageNumber || 1
    };
    date = date || new Date();
    const formattedDate = epgDateFormatter(date);
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/epg/${channelId}/date/${formattedDate}?${querystring.stringify(requestQuery)}`
    ).then(data => deserialize(EpgResponse, data));
  }

  public getOnNowByChannelId({ channelId, minutesForward, customer, businessUnit }: GetOnNowByChannelIdOptions) {
    const requestQuery = {
      minutesForward: minutesForward || 0
    };
    return this.get(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/channel/onnow/${channelId}?${querystring.stringify(
        requestQuery
      )}`
    ).then(data => deserialize(OnNowResponse, data));
  }

  public getOnNow({
    minutesForward = 0,
    customer,
    businessUnit,
    pageNumber = 1,
    pageSize = 100,
    sortingLocale
  }: GetOnNowOptions): Promise<{ apiChannelStatuses: OnNowResponse[] }> {
    const requestQuery = {
      minutesForward: minutesForward,
      pageNumber,
      pageSize,
      sortingLocale
    };
    return this.get(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/channel/onnow?${querystring.stringify(
        requestQuery
      )}`
    ).then(data => ({
      ...data,
      apiChannelStatuses: data.apiChannelStatuses.map(item => deserialize(OnNowResponse, item))
    }));
  }

  public getLiveEvents({
    daysBackward,
    daysForward,
    customer,
    businessUnit,
    pageSize,
    pageNumber,
    date
  }: GetLiveEventsOptions): Promise<{ items: Asset[] } & IPaginatedResponse> {
    const requestQuery = {
      daysBackward,
      daysForward,
      pageSize: pageSize || 500,
      pageNumber: pageNumber || 1,
      sort: "startTime"
    };
    date = date || new Date();
    const formattedDate = epgDateFormatter(date);
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/event/date/${formattedDate}?${querystring.stringify(requestQuery)}`
    ).then(({ items, pageSize, pageNumber, totalCount }) => {
      const assetItems = items.map(item => {
        return deserialize(Asset, {
          startTime: item.startTime,
          endTime: item.endTime,
          ...item.asset
        });
      });
      return { items: assetItems, pageSize, pageNumber, totalCount };
    });
  }

  public getRecentlyWatched({ customer, businessUnit }: CustomerAndBusinessUnitOptions): Promise<IAssetResponse> {
    const requestQuery = {
      pageSize: 24,
      fieldSet: "ALL"
    };
    const headers = this.options.authHeader();
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/userplayhistory/lastviewed?${querystring.stringify(requestQuery)}`,
      headers
    ).then(data => ({ ...data, items: data.items.map(asset => deserialize(Asset, asset)) }));
  }

  public getContinueWatching({ customer, businessUnit }: CustomerAndBusinessUnitOptions): Promise<{ items: Asset[] }> {
    const requestQuery = {
      limit: 10
    };
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/recommend/continue?${querystring.stringify(requestQuery)}`,
      this.options.authHeader()
    ).then(data => ({ ...data, items: data.items.map(asset => deserialize(Asset, asset)) }));
  }

  public getRecommendationsForAsset({
    customer,
    businessUnit,
    assetId
  }: GetAssetByIdOptions): Promise<{ items: Asset[] }> {
    return this.get(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/recommend/watchNext/${assetId}`
    ).then(response => ({ items: response.items.map(i => deserialize(Asset, i)) }));
  }

  public getNextEpisode({ customer, businessUnit, assetId }: GetAssetByIdOptions): Promise<Asset> {
    return this.get(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/content/asset/${assetId}/next`
    ).then(res => deserialize(Asset, res));
  }

  public getPreviousEpisode({ customer, businessUnit, assetId }: GetAssetByIdOptions): Promise<Asset> {
    return this.get(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/content/asset/${assetId}/previous`
    ).then(res => deserialize(Asset, res));
  }

  public getRecommended({ customer, businessUnit }: CustomerAndBusinessUnitOptions): Promise<{ items: Asset[] }> {
    // TODO: better name?
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/recommend/user`,
      this.options.authHeader()
    ).then(data => ({ items: data.items.map(i => deserialize(Asset, i)) }));
  }

  public getBookmarks({ customer, businessUnit }: CustomerAndBusinessUnitOptions): Promise<IBookmark[]> {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/userplayhistory/lastviewedoffset`,
      this.options.authHeader()
    ).then(data => data.items);
  }

  public getSeasonsForSeries({ customer, businessUnit, assetId }: GetAssetByIdOptions) {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/content/asset/${assetId}/season`
    ).then(data => {
      const seriesResponse = deserialize(SeasonResponse, data);
      seriesResponse.series = assetId;
      return seriesResponse;
    });
  }

  public getEpisodesForSeason({
    customer,
    businessUnit,
    assetId,
    seasonNumber
  }: GetEpisodesForSeasonOptions): Promise<IEpisodesResponse> {
    const requestQuery = {
      fieldSet: "ALL",
      onlyPublished: true
    };
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/content/asset/${assetId}/season/${seasonNumber}/episode?` + querystring.stringify(requestQuery)
    ).then(data => {
      const items = data.items.map(asset => deserialize(Asset, asset));
      return { items, ...data, seriesId: assetId, seasonNumber: seasonNumber };
    });
  }
}
