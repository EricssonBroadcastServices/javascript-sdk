/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { HtmlDocument } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @description Get the requested document.
 * @summary Get Document.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/document
 * @response `200` `HtmlDocument` Successful
 * @response `4xx` `APIErrorMessage` Failed
 */
export async function getDocument({
  headers,
  ..._data
}: {
  documentId:
    | "CUSTOM_DOCUMENT"
    | "END_USER_CONSENT"
    | "END_USER_COOKIE_POLICY"
    | "END_USER_PRIVACY_POLICY"
    | "END_USER_TERMS_AND_CONDITIONS"
    | "custom_document"
    | "end_user_consent"
    | "end_user_cookie_policy"
    | "end_user_privacy_policy"
    | "end_user_terms_and_conditions";
  /** Custom name if documentId == custom_document */
  customDocumentName?: string;
  /** Use user language. If not stated system default is used. */
  preferredLanguage?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/document`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<HtmlDocument>);
}

export class DocumentsService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getDocument = getDocument;
}
