/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { Map } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Docs<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description [OpenApi 3](https://www.openapis.org/) specification of this API
   *
   * @tags Open API
   * @name GetApiDocs
   * @summary Get API definition
   * @request GET:/docs/api-docs/{api}
   */
  getApiDocs = (api: "exposure" | "management", params: RequestParams = {}) =>
    this.request<Map, any>({
      path: `/docs/api-docs/${api}`,
      method: "GET",
      format: "json",
      ...params
    });
}
