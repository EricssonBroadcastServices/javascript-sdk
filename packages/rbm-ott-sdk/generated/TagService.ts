/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AssetType, TagList, TagType } from "./data-contracts.js";
import { QueryParams, ServiceContext, request } from "./http-client.js";

/**
 * @summary Gets a tag by id.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/tag/{tagId}
 * @response `200` `TagType` success
 * @response `404` `void` UNKNOWN_TAG. If a tag with the id cannot be found. UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 */
export async function getTagById({
  tagId,
  headers
}: {
  /** The id of the tag. */
  tagId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/tag/${tagId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<TagType>);
}

/**
 * @summary Lists all unique tags of a given scheme that are referenced by at least one asset.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/tag/asset
 * @response `default` `TagList` success
 */
export async function getUniqueTagsFromAssets({
  headers,
  ..._data
}: {
  tagType: string;
  /** If we should only return assets that are not geo blocking in this country */
  allowedCountry?: string;
  /** The asset type to filter by. */
  assetType?: AssetType;
  /**
   * The optional query to filter by in fields nested under publications.devices. In the
   * elasticsearch query string query format,
   * I.E: "publications.devices.rights.threeGBlocked:false AND
   * publications.devices.os:IOS"
   */
  deviceQuery?: string;
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
  /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
  parentalRatings?: string;
  /** If we should only return assets that have publications on any of these products */
  products?: string[];
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
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/tag/asset`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<TagList>);
}

/**
 * @summary Lists all tags.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/tag
 * @response `200` `TagList` success
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 */
export async function listTags({
  headers,
  ..._data
}: {
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
  /** The scheme of the tags. */
  scheme?: string;
  /** The sort parameter in the format of first,-second. */
  sort?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/tag`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<TagList>);
}

export class TagService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getTagById = getTagById;
  getUniqueTagsFromAssets = getUniqueTagsFromAssets;
  listTags = listTags;
}
