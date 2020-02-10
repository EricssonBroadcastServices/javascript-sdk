import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import * as querystring from "query-string";
import { deserialize } from "../decorators/property-mapper";
import { AssetResponseModel, AssetModel, EpisodesResponse } from "../models/asset";
import { epgDateFormatter } from "../utils/date";
import { Bookmark } from "../models/Bookmark";
import { SeasonResponse } from "../models/Season";

export interface PageinatedRequest {
  pageSize?: number;
  pageNumber: number;
}

export interface GetAssetByIdV1Options extends CustomerAndBusinessUnitOptions {
  assetId: string;
}

export interface GetEpisodesForSeasonOptions extends GetAssetByIdV1Options {
  seasonNumber: number;
}

export interface GetAssetsV1Options extends CustomerAndBusinessUnitOptions {
  query?: string;
  sort?: string;
  pageSize?: number;
  pageNumber?: number;
  allowedCountry?: string | null;
}

export interface GetEpgV2Options
  extends CustomerAndBusinessUnitOptions,
    PageinatedRequest {
  channelId: string;
  date?: Date;
  daysForward?: number;
  daysBackward?: number;
}

export interface GetLiveEventsV2Options
  extends CustomerAndBusinessUnitOptions,
    PageinatedRequest {
  date?: Date;
  daysBackward: number;
  daysForward: number;
}

export class ContentService extends BaseService {
  public getAssetByIdV1({
    customer,
    businessUnit,
    assetId,
    headers
  }: GetAssetByIdV1Options) {
    const requestQuery = {
      fieldSet: "ALL"
    };
    return this.get(
      `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}?${querystring.stringify(
        requestQuery
      )}`,
      headers
    ).then(data => deserialize(AssetModel, data));
  }
  public getAssetsV1({
    customer,
    businessUnit,
    query,
    sort,
    pageNumber,
    pageSize,
    allowedCountry,
    headers
  }: GetAssetsV1Options) {
    const requestQuery = {
      query,
      sort,
      pageSize: pageSize || 30,
      pageNumber: pageNumber || 1,
      fieldSet: "ALL",
      onlyPublished: true,
      allowedCountry
    };
    return this.get(
      `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset?${querystring.stringify(
        requestQuery
      )}`,
      headers
    ).then(data => deserialize(AssetResponseModel, data));
  }
  public getEpgV2({
    daysForward,
    daysBackward,
    pageNumber,
    pageSize,
    channelId,
    customer,
    businessUnit,
    date
  }: GetEpgV2Options) {
    const requestQuery = {
      daysBackward: daysBackward || 1,
      daysForward: daysForward || 1,
      pageSize: pageSize || 500,
      pageNumber: pageNumber || 1
    };
    date = date || new Date();
    const formattedDate = epgDateFormatter(date);
    return this.get(
      `/v2/customer/${customer}/businessunit/${businessUnit}/epg/${channelId}/date/${formattedDate}?${querystring.stringify(
        requestQuery
      )}`
    );
  }
  public getLiveEventsV2({
    daysBackward,
    daysForward,
    customer,
    businessUnit,
    pageSize,
    pageNumber,
    date
  }: GetLiveEventsV2Options) {
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
      `/v2/customer/${customer}/businessunit/${businessUnit}/event/date/${formattedDate}?${querystring.stringify(
        requestQuery
      )}`
    );
  }

  public getRecentlyWatched({ customer, businessUnit } : CustomerAndBusinessUnitOptions) {
    const requestQuery = {
      pageSize: 24,
      fieldSet: "ALL"
    };
    const headers = this.options.authHeader();
    return this.get(
      `/v1/customer/${customer}/businessunit/${businessUnit}/userplayhistory/lastviewed?${querystring.stringify(
        requestQuery
      )}`,
      headers
    ).then(data => deserialize(AssetResponseModel, data));
  }

  public getContinueWatching({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    const requestQuery = {
      limit: 10
    };
    return this.get(
      `/v1/customer/${customer}/businessunit/${businessUnit}/recommend/continue?${querystring.stringify(
        requestQuery
      )}`,
      this.options.authHeader()
    ).then(data => deserialize(AssetResponseModel, data));
  }

  public getRecommended({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    return this.get(
      `/v1/customer/${customer}/businessunit/${businessUnit}/recommend/user`,
      this.options.authHeader()
    ).then(data => deserialize(AssetResponseModel, data));
  }

  public getBookmarks({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    return this.get(
      `/v1/customer/${customer}/businessunit/${businessUnit}/userplayhistory/lastviewedoffset`,
      this.options.authHeader()
    ).then(data => data.map(b => deserialize(Bookmark, b)));
  }

  public getSeasonsForSeries({ customer, businessUnit, assetId }: GetAssetByIdV1Options) {
    return this.get(`/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}/season`).then(
      data => {
        const seriesResponse = deserialize(SeasonResponse, data.response);
        seriesResponse.series = assetId;
        return seriesResponse;
      }
    );
  }

  public getEpisodesForSeason({ customer, businessUnit, assetId, seasonNumber }: GetEpisodesForSeasonOptions) {
    const requestQuery = {
      fieldSet: "ALL",
      onlyPublished: true
    };
    return this.get(
      `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}/season/${seasonNumber}/episode?` +
        querystring.stringify(requestQuery)
    ).then(data => {
      const seriesResponse = deserialize(EpisodesResponse, data.response);
      seriesResponse.seriesId = assetId;
      seriesResponse.seasonNumber = seasonNumber;
      return seriesResponse;
    });
  }
}
