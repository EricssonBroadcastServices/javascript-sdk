/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { Location } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @description Get location information based on caller IP-address.
 * @summary Get location.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/location
 * @response `200` `Location` Successful
 */
export async function getLocation(params: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Location>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/location`, ctx.baseUrl),
    headers: params
  });
}
/**
 * @description Get location information based on caller IP-address.
 * @summary Get location.
 * @request GET:/v2/location
 * @response `200` `Location` Successful
 */
export async function getLocationFromReferer(params: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Location>({
    method: "GET",
    url: new URL(`/v2/location`, ctx.baseUrl),
    headers: params
  });
}

const LocationService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getLocation,
    getLocationFromReferer
  }) as const;

export default LocationService;
