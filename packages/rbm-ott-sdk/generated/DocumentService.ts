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
 * @summary Gets document.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/document
 * @response `200` `HtmlDocument` success
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 * @response `422` `void` BAD_DOCUMENT_ID. Unrecognized documentId. UNKNOWN_LANGUAGE. Unrecognized documentId.
 */
export async function getDocument({
  headers,
  ..._data
}: {
  /** Which document to fetch */
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
  customDocumentName?: string;
  /** ISO 639-1 language code. If not stated or not supported fall back to other languages will be performed. */
  preferredLanguage?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/document`,
    headers,
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<HtmlDocument>);
}

export class DocumentService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getDocument = getDocument;
}
