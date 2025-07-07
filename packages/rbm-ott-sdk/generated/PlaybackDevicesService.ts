/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { Device } from "./data-contracts";
import { ServiceContext, request } from "./http-client";

/**
 * @description Remove a device from the list of allowed devices for the logged in account
 * @summary Delete device
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/play/device/{deviceId}
 * @response `200` `void` Successful
 * @response `400` `APIErrorMessage` Failed
 */
export async function deleteDevice({
  deviceId,
  headers
}: {
  /** The device id */
  deviceId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/play/device/${deviceId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @description Get all the information about a single device for the logged in account
 * @summary Get device
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/play/device/{deviceId}
 * @response `200` `Device` Successful
 * @response `400` `APIErrorMessage` Failed
 */
export async function getDevice({
  deviceId,
  headers
}: {
  /** The device id */
  deviceId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/play/device/${deviceId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<Device>);
}

/**
 * @description List all devices where playback is currently allowed for the logged in account
 * @summary List devices
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/play/device
 * @response `200` `(Device)[]` Successful
 * @response `400` `APIErrorMessage` Failed
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
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/play/device`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<Device[]>);
}

export class PlaybackDevicesService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  deleteDevice = deleteDevice;
  getDevice = getDevice;
  getDevices = getDevices;
}
