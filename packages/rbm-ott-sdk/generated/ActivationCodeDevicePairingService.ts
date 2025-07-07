/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ActivationCodeResponse, DeviceRegistration, LoginResponse } from "./data-contracts";
import { ServiceContext, request } from "./http-client";

/**
 * @description Confirm the code on the web.
 * @summary Confirms an activation code.
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/activation/confirm/{code}
 * @response `200` `void` Successful
 * @response `400` `void` Bad request
 */
export async function confirmActivationCode({
  code,
  headers
}: {
  code: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/activation/confirm/${code}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @description Logs in the big screen with a confirmed code.
 * @summary Consumes an activation code.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/userActivation/consume
 * @response `200` `LoginResponse` Successful
 * @response `401` `APIErrorMessage` Code not yet confirmed or expired. Please confirm the code and try again after 5 seconds.
 */
export async function consumeActivationCode({
  headers,
  ..._data
}: {
  activationCode: string;
  device: DeviceRegistration;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userActivation/consume`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @description Create and display code on big screen.
 * @summary Creates an activation code.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/userActivation/activationCode
 * @response `200` `ActivationCodeResponse` Successful
 * @response `400` `ActivationCodeResponse` Bad request
 */
export async function createActivationCode({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userActivation/activationCode`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<ActivationCodeResponse>);
}

export class ActivationCodeDevicePairingService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  confirmActivationCode = confirmActivationCode;
  consumeActivationCode = consumeActivationCode;
  createActivationCode = createActivationCode;
}
