/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { DevicesResponseV2 } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @description If the session from which this call is made is marked as "overTheDeviceLimit" this marking will be cleared, which can be checked by validating the session.
 * @summary Delete device.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/device/{deviceId}
 * @secure
 * @response `401` `void` INVALID_SESSION_TOKEN. If the session token is invalid
 * @response `403` `void` DELETE_SELF_NOT_ALLOWED. The device of this session may not be deleted.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function deleteDeviceForAccount(deviceId: string, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/device/${deviceId}`,
    headers,
    ctx
  });
}
/**
 * @description Can be called even when the current session is "overTheDeviceLimit", if so, use this call to let the user select which device to delete.
 * @summary List devices.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/device
 * @secure
 * @response `200` `DevicesResponseV2` success
 * @response `401` `void` INVALID_SESSION_TOKEN. If the session token is invalid
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getDevicesForAccount(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<DevicesResponseV2>({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/device`,
    headers,
    ctx
  });
}

export class DeviceService {
  constructor(private context: ServiceContext) {}
  deleteDeviceForAccount = deleteDeviceForAccount;
  getDevicesForAccount = getDevicesForAccount;
}
