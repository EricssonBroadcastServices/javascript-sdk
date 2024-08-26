/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { LabelFilter } from "./data-contracts";
import { ServiceContext, request } from "./http-client";

/**
 * @description This can be used in special applications to e.g. get appropriate product offerings
 * @summary Get current accounts labelFilter
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/label/filter
 * @response `200` `LabelFilter` OK
 */
export async function getAccountLabels({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/label/filter`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<LabelFilter>);
}

export class AccountLabelsService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getAccountLabels = getAccountLabels;
}
