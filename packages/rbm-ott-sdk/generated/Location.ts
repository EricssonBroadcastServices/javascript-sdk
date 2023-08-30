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
export async function getLocation(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<Location>({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/location`,
    headers
  });
}
/**
 * @description Get location information based on caller IP-address.
 * @summary Get location.
 * @request GET:/v2/location
 * @response `200` `Location` Successful
 */
export async function getLocationFromReferer(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<Location>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/location`,
    headers
  });
}

export class LocationService {
  constructor(private context: ServiceContext) {}
  getLocation = getLocation;
  getLocationFromReferer = getLocationFromReferer;
}
