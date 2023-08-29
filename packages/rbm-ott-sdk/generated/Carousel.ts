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
    /**
     * If we should only return assets that are at the moment published. Default = false, of compatibility reasons
     * @default false
     */
    onlyPublished?: boolean;
    /**
     * The page number.
     * @default 1
     */
    pageNumber?: number;
    /**
     * The number of items to show per page
     * @default 20
     */
    pageSize?: number;
    /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
    parentalRatings?: string;
    /** If we should only return assets that have publications on this service */
    service?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Carousel[]>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/carouselgroup/${groupId}/carousel/${carouselId}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}
/**
 * @summary Gets all groups that have been created for this business unit.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/carouselgroup
 * @response `default` `(string)[]` success
 */
export async function getCarouselGroups(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<string[]>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/carouselgroup`, ctx.baseUrl),
    headers: headers
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
    /**
     * If we should only return assets that are at the moment published. Default = false, of compatibility reasons
     * @default false
     */
    onlyPublished?: boolean;
    /**
     * The page number.
     * @default 1
     */
    pageNumber?: number;
    /**
     * The number of items to show per page. This controls the number of items in each
     * carousel, all carousels are always returned.
     * @default 20
     */
    pageSize?: number;
    /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
    parentalRatings?: string;
    /** If we should only return assets that have publications on this service */
    service?: string;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Carousel[]>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/carouselgroup/${groupId}`, ctx.baseUrl),
    headers: headers,
    query: { fieldSet: "ALL", ...(query || {}) }
  });
}

export const CarouselService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getCarousel,
    getCarouselGroups,
    getCarouselsForGroup
  }) as const;
