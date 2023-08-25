/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { HtmlDocument } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Gets document.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/document
 * @response `200` `HtmlDocument` success
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 * @response `422` `void` BAD_DOCUMENT_ID. Unrecognized documentId. UNKNOWN_LANGUAGE. Unrecognized documentId.
 */
export async function getDocument(
  query: {
    customDocumentName?: string;
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
    /** ISO 639-1 language code. If not stated or not supported fall back to other languages will be performed. */
    preferredLanguage?: string;
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<HtmlDocument>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/document`, ctx.baseUrl),
    headers: params,
    query: query
  });
}

const DocumentService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getDocument
  }) as const;

export default DocumentService;
