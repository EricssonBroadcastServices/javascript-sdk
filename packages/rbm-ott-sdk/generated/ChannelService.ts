/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ActiveChannels, ChannelStatus } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @description Status of a channel includes whether it is available (in the case of virtual channels) and the currently playing assets. This endpoint only considers active channels.
 * @summary Get active channel statuses
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/channel/onnow
 * @response `200` `ActiveChannels` Successful
 * @response `404` `APIErrorMessage` Not found: UNKNOWN_BUSINESS_UNIT - If the business unit is not found. CHANNEL_STATUS_NOT_FOUND - Channel is personalized or the channel type could not be found.
 */
export async function getActiveChannels({
  headers,
  ..._data
}: {
  /**
   * Include future assets that start sooner than this many minutes ahead. Default value 0 returns only the currently playing asset of each channel
   * @default 0
   */
  minutesForward?: number;
  /**
   * Page number. Currently only supports one page
   * @default 1
   */
  pageNumber?: number;
  /**
   * Number of channels per page
   * @default 100
   */
  pageSize?: number;
  /**
   * Sort by the sorting title property of the given locale
   * @default ""
   */
  sortingLocale?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/channel/onnow`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<ActiveChannels>);
}

/**
 * @summary Gets the status of a specific channel
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/channel/onnow/{channelId}
 * @response `200` `ChannelStatus` Successful
 * @response `404` `APIErrorMessage` Not found: UNKNOWN_BUSINESS_UNIT - If the business unit is not found. CHANNEL_STATUS_NOT_FOUND - Channel is personalized or the channel type could not be found.
 */
export async function getChannelStatus({
  channelId,
  headers,
  ..._data
}: {
  /** The channel id */
  channelId: string;
  /**
   * Include future assets that start sooner than this many minutes ahead. Default value 0 returns only the currently playing asset of each channel
   * @default 0
   */
  minutesForward?: number;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/channel/onnow/${channelId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<ChannelStatus>);
}

export class ChannelService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getActiveChannels = getActiveChannels;
  getChannelStatus = getChannelStatus;
}
