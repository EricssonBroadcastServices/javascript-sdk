import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import * as querystring from "query-string";
import { deserialize } from "../decorators/property-mapper";
import { AssetResponse, Asset } from "../models/asset";
import { epgDateFormatter } from "../utils/date";

export interface PageinatedRequest {
  pageSize?: number;
  pageNumber: number;
}

export interface GetAssetByIdV1Options extends CustomerAndBusinessUnitOptions {
  assetId: string;
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
  cu: string;
  bu: string;
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
    ).then(data => deserialize(Asset, data));
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
    ).then(data => deserialize(AssetResponse, data));
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
    const formattedDate = epgDateFormatter(date || new Date());
    return this.get(
      `/v2/customer/${customer}/businessunit/${businessUnit}/event/date/${formattedDate}?${querystring.stringify(
        requestQuery
      )}`
    );
  }
}
