/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { Carousel } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Gets a specific carousel by id.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/carouselgroup/{groupId}/carousel/{carouselId}
 * @response `default` `(Carousel)[]` success
 */
export async function getCarousel(
  groupId: string,
  carouselId: string,
  query?: {
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    /**
     * The set of fields to include by default.
     * @default "PARTIAL"
     */
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
    /**
     * If we should only return assets that are at the moment published. Default = false, of compatibility reasons
     * @default false
     */
    onlyPublished?: boolean;
    /**
     * The page number.
     * @format int32
     * @default 1
     */
    pageNumber?: number;
    /**
     * The number of items to show per page
     * @format int32
     * @default 20
     */
    pageSize?: number;
    /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
    parentalRatings?: string;
    /** If we should only return assets that have publications on this service */
    service?: string;
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Carousel[]>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/carouselgroup/${groupId}/carousel/${carouselId}`,
      ctx.baseUrl
    ),
    headers: params,
    query: query
  });
}
/**
 * @summary Gets all groups that have been created for this business unit.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/carouselgroup
 * @response `default` `(string)[]` success
 */
export async function getCarouselGroups(params: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<string[]>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/carouselgroup`, ctx.baseUrl),
    headers: params
  });
}
/**
 * @description A carousel is a filter on the assets. A group can be anything that is grouping the carousels, such as the "index page" etc.
 * @summary Gets carousels.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/carouselgroup/{groupId}
 * @response `default` `(Carousel)[]` success
 */
export async function getCarouselsForGroup(
  groupId: string,
  query?: {
    /** Comma separated list of fields to remove from the response. */
    excludeFields?: string;
    /**
     * The set of fields to include by default.
     * @default "PARTIAL"
     */
    fieldSet?: "ALL" | "NONE" | "PARTIAL";
    /** Comma separated list of fields to add to the response. */
    includeFields?: string;
    /**
     * If we should only return assets that are at the moment published. Default = false, of compatibility reasons
     * @default false
     */
    onlyPublished?: boolean;
    /**
     * The page number.
     * @format int32
     * @default 1
     */
    pageNumber?: number;
    /**
     * The number of items to show per page. This controls the number of items in each
     * carousel, all carousels are always returned.
     * @format int32
     * @default 20
     */
    pageSize?: number;
    /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
    parentalRatings?: string;
    /** If we should only return assets that have publications on this service */
    service?: string;
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Carousel[]>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/carouselgroup/${groupId}`, ctx.baseUrl),
    headers: params,
    query: query
  });
}

const CarouselService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getCarousel,
    getCarouselGroups,
    getCarouselsForGroup
  }) as const;

export default CarouselService;
