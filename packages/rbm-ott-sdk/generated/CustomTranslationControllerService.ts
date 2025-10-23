/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { JsonNode } from "./data-contracts";
import { ServiceContext, request } from "./http-client";

/**
 * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/translations/{language}/{configId}
 * @response `200` `JsonNode` OK
 */
export async function getTranslationTemplate({
  language,
  configId,
  headers
}: {
  language: string;
  configId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/whitelabel/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/translations/${language}/${configId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<JsonNode>);
}

export class CustomTranslationControllerService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getTranslationTemplate = getTranslationTemplate;
}
