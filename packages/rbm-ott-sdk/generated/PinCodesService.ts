/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { PinCodeResponse } from "./data-contracts";
import { ServiceContext, request } from "./http-client";

/**
 * @description The id will be generated. If yoy want to specify the id, then instead create the code using the Update end point.
 * @summary Create a pin code.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode
 * @response `200` `(PinCodeResponse)[]` OK
 */
export async function createPinCode({
  headers,
  ..._data
}: {
  /** PIN in clear text. */
  inClear: string;
  /** List of application specified grants, the grants has no semantics in the backend. These grants will be returned if the PIN is successfully verified. */
  grants: string[];
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<PinCodeResponse[]>);
}

/**
 * @summary Delete a pin code.
 * @request DELETE:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}
 * @response `200` `void` OK
 */
export async function deletePinCode({
  pincodeId,
  headers
}: {
  pincodeId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/pin/${pincodeId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @summary Get pin codes.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode
 * @response `200` `(PinCodeResponse)[]` OK
 */
export async function getPinCodes({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<PinCodeResponse[]>);
}

/**
 * @summary Update (or Create) a pin code.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}
 * @response `200` `(PinCodeResponse)[]` OK
 */
export async function setPinCode({
  pincodeId,
  headers,
  ..._data
}: {
  pincodeId: string;
  /** PIN in clear text. */
  inClear: string;
  /** List of application specified grants, the grants has no semantics in the backend. These grants will be returned if the PIN is successfully verified. */
  grants: string[];
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/pin/${pincodeId}`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<PinCodeResponse[]>);
}

/**
 * @description Returns a list of application specified grants if successfully validated, else an empty list [].
 * @summary Validate a pin code.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}/validate
 * @response `200` `(string)[]` OK
 */
export async function validatePinCode({
  pincodeId,
  headers,
  ..._data
}: {
  pincodeId: string;
  /** PIN in clear text. */
  inClear: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/pin/${pincodeId}/validate`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<string[]>);
}

/**
 * @description Returns a list of application specified grants if successfully validated, else an empty list [].
 * @summary Validate a pin towards all pin codes.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/validate
 * @response `200` `(string)[]` OK
 */
export async function validatePinCodes({
  headers,
  ..._data
}: {
  /** PIN in clear text. */
  inClear: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/validate`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<string[]>);
}

export class PinCodesService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  createPinCode = createPinCode;
  deletePinCode = deletePinCode;
  getPinCodes = getPinCodes;
  setPinCode = setPinCode;
  validatePinCode = validatePinCode;
  validatePinCodes = validatePinCodes;
}
