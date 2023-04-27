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

import { AnalyticsBatch } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Eventsink<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags EventSink
   * @name PostEvents
   * @summary Post analytics events.
   * @request POST:/eventsink/send
   */
  postEvents = (data: AnalyticsBatch, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/eventsink/send`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * No description
   *
   * @tags EventSink
   * @name Intialize
   * @request POST:/eventsink/init
   */
  intialize = (params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/eventsink/init`,
      method: "POST",
      ...params
    });
}
