/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { DevicesResponseV2 } from "./data-contracts";
import { ServiceContext, request } from "./http-client";

/**
 * @description Log out from another specified device.
 * @summary Delete another device.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/device/{deviceId}
 * @response `200` `void` OK
 */
export async function deleteDevice({
  deviceId,
  headers
}: {
  deviceId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/device/${deviceId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @summary List devices
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/device
 * @response `200` `DevicesResponseV2` OK
 */
export async function getDevices({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/device`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<DevicesResponseV2>);
}

export class DevicesService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  deleteDevice = deleteDevice;
  getDevices = getDevices;
}
