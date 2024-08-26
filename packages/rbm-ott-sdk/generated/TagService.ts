/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AssetType, ParentalRatingsFilter, TagList, TagType } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @summary Get tag.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/tag/{tagId}
 * @response `200` `TagType` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getTagById({
  tagId,
  headers
}: {
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
 * @response `200` `TagList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getUniqueTagsFromAssets({
  headers,
  ..._data
}: {
  tagType: string;
  assetType?: AssetType;
  /** @default true */
  onlyPublished?: boolean;
  parentalRatings?: ParentalRatingsFilter;
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
 * @summary List tags.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/tag
 * @response `200` `TagList` Successful
 * @response `404` `APIErrorMessage` Not found.
 */
export async function listTags({
  headers,
  ..._data
}: {
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
  scheme?: string;
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
