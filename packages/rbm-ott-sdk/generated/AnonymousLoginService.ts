/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AnonymousSessionResponse, Device } from "./data-contracts";
import { ServiceContext, request } from "./http-client";

/**
 * @description May provide anonymous access to the service.
 * @summary Creates an anonymous session.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/anonymous
 * @response `200` `AnonymousSessionResponse` Successful
 * @response `400` `AnonymousSessionResponse` Bad request
 */
export async function loginAnonymous({
  headers,
  ..._data
}: {
  device: Device;
  /** A unique ID of the device. */
  deviceId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/auth/anonymous`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<AnonymousSessionResponse>);
}

export class AnonymousLoginService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  loginAnonymous = loginAnonymous;
}
