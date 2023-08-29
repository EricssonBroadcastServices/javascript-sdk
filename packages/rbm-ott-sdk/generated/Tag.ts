/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AssetType, TagList, TagType } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Gets a tag by id.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/tag/{tagId}
 * @response `200` `TagType` success
 * @response `404` `void` UNKNOWN_TAG. If a tag with the id cannot be found. UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 */
export async function getTagById(tagId: string, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<TagType>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/tag/${tagId}`, ctx.baseUrl),
    headers: headers
  });
}
/**
 * @summary Lists all unique tags of a given scheme that are referenced by at least one asset.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/tag/asset
 * @response `default` `TagList` success
 */
export async function getUniqueTagsFromAssets(
  query: {
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
    tagType: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<TagList>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/tag/asset`, ctx.baseUrl),
    headers: headers,
    query: query
  });
}
/**
 * @summary Lists all tags.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/tag
 * @response `200` `TagList` success
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit cannot be found.
 */
export async function listTags(
  query?: {
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
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<TagList>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/tag`, ctx.baseUrl),
    headers: headers,
    query: query
  });
}

export const TagService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getTagById,
    getUniqueTagsFromAssets,
    listTags
  }) as const;
