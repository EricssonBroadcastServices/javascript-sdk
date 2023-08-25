/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ActiveChannels, ChannelEPGResponse, ChannelStatus, ProgramResponse } from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @description Status of a channel includes whether it is available (in the case of virtual channels) and the currently playing assets. This endpoint only considers active virtual channels.
 * @summary Get active channel statuses.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/channel/onnow
 * @response `200` `ActiveChannels` success
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found.
 */
export async function getActiveChannels(
  query?: {
    /**
     * Include future assets that start sooner than this many minutes ahead. Default value 0 returns only the currently playing asset of each channel
     * @format int32
     * @default 0
     */
    minutesForward?: number;
    /**
     * Page number. Currently only supports one page
     * @format int32
     * @default 1
     */
    pageNumber?: number;
    /**
     * Number of channels per page
     * @format int32
     * @default 100
     */
    pageSize?: number;
    /** Sort by the sorting title property of the given locale */
    sortingLocale?: string;
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ActiveChannels>({
    method: "GET",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/channel/onnow`, ctx.baseUrl),
    headers: params,
    query: query
  });
}
/**
 * @description Status of a channel includes whether it is available (in the case of virtual channels) and the currently playing assets.
 * @summary Gets channel status.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/channel/onnow/{channelId}
 * @response `200` `ChannelStatus` success
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. CHANNEL_STATUS_NOT_FOUND. Channel is personalized or the channel type could not be found.
 */
export async function getChannelStatus(
  channelId: string,
  query?: {
    /**
     * Include future assets that start sooner than this many minutes ahead. Default value 0 returns only the currently playing asset of each channel
     * @format int32
     * @default 0
     */
    minutesForward?: number;
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ChannelStatus>({
    method: "GET",
    url: new URL(
      `/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/channel/onnow/${channelId}`,
      ctx.baseUrl
    ),
    headers: params,
    query: query
  });
}
/**
 * @description This endpoint finds all published programs and partitions them in channel buckets. Only channels has programs in the page that has been requested will have a bucket. Programs sorted ascending on startTime by default.
 * @summary Gets epg data for all channels.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/date/{date}
 * @response `200` `(ChannelEPGResponse)[]` success
 * @response `400` `void` Result window is too large. If the pageSize * pageNumber is greater than 10000.
 * @response `422` `void` DATE_REQUESTED_OUTSIDE_VALID_WINDOW. If the date requested is outside the valid EPG window.
 */
export async function getEpg(
  date: string,
  query?: {
    /**
     * Days back compared to midnight of the date to get EPG for.
     * @format int32
     * @default 0
     */
    daysBackward?: number;
    /**
     * Days forward compared to midnight of the date to get EPG for.
     * @format int32
     * @default 0
     */
    daysForward?: number;
    /**
     * The page number. Note that pageNumber * pageSize cannot exceed 10000 or an error will occur.
     * @format int32
     * @default 1
     */
    pageNumber?: number;
    /**
     * The number of items to show per page
     * @format int32
     * @default 50
     */
    pageSize?: number;
    /**
     * The sort order. Note that pageNumber * pageSize cannot exceed 10000 or an error will occur.
     * @default "ASC"
     */
    startDateSort?: "ASC" | "DESC";
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ChannelEPGResponse[]>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/date/${date}`, ctx.baseUrl),
    headers: params,
    query: query
  });
}
/**
 * @description Programs sorted ascending on startTime by default.
 * @summary Gets epg data for a specific channel.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/date/{date}
 * @response `200` `ChannelEPGResponse` success
 * @response `422` `void` DATE_REQUESTED_OUTSIDE_VALID_WINDOW. If the date requested is outside the valid EPG window.
 */
export async function getEpgForChannel(
  channelId: string,
  date: string,
  query?: {
    /**
     * Days back compared to midnight of the date to get EPG for.
     * @format int32
     * @default 0
     */
    daysBackward?: number;
    /**
     * Days forward compared to midnight of the date to get EPG for.
     * @format int32
     * @default 0
     */
    daysForward?: number;
    /**
     * The page number.
     * @format int32
     * @default 1
     */
    pageNumber?: number;
    /**
     * The number of items to show per page
     * @format int32
     * @default 50
     */
    pageSize?: number;
    /**
     * The sort order.
     * @default "ASC"
     */
    startDateSort?: "ASC" | "DESC";
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ChannelEPGResponse>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelId}/date/${date}`,
      ctx.baseUrl
    ),
    headers: params,
    query: query
  });
}
/**
 * @description Programs sorted ascending on startTime by default.
 * @summary Gets epg data for a specific set of channels.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelIds}/date/{date}
 * @response `200` `(ChannelEPGResponse)[]` success
 * @response `422` `void` DATE_REQUESTED_OUTSIDE_VALID_WINDOW. If the date requested is outside the valid EPG window.
 */
export async function getEpgForChannels(
  channelIds: string,
  date: string,
  query?: {
    /**
     * Days back compared to midnight of the date to get EPG for.
     * @format int32
     * @default 0
     */
    daysBackward?: number;
    /**
     * Days forward compared to midnight of the date to get EPG for.
     * @format int32
     * @default 0
     */
    daysForward?: number;
    /**
     * The page number.
     * @format int32
     * @default 1
     */
    pageNumber?: number;
    /**
     * The number of items to show per page
     * @format int32
     * @default 50
     */
    pageSize?: number;
    /**
     * The sort order.
     * @default "ASC"
     */
    startDateSort?: "ASC" | "DESC";
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ChannelEPGResponse[]>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelIds}/date/${date}`,
      ctx.baseUrl
    ),
    headers: params,
    query: query
  });
}
/**
 * @summary Gets next program for a specific program for a channel.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/program/{programId}/next
 * @response `200` `ProgramResponse` success
 * @response `404` `void` PROGRAM_NOT_FOUND. If the program cannot be found. NEXT_PROGRAM_NOT_FOUND. If the next program cannot be found.
 */
export async function getNextProgram(channelId: string, programId: string, params: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ProgramResponse>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelId}/program/${programId}/next`,
      ctx.baseUrl
    ),
    headers: params
  });
}
/**
 * @description If the asset has been showed multiple times there is a unspecified logic to select one program.
 * @summary Gets next program for a specific asset.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/asset/{assetId}/next
 * @response `200` `ProgramResponse` success
 * @response `404` `void` PROGRAM_NOT_FOUND. If the program cannot be found. NEXT_PROGRAM_NOT_FOUND. If the next program cannot be found.
 */
export async function getNextProgramForAsset(assetId: string, params: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ProgramResponse>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/asset/${assetId}/next`,
      ctx.baseUrl
    ),
    headers: params
  });
}
/**
 * @summary Gets a specific program for a channel by id.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/program/{programId}
 * @response `200` `ProgramResponse` success
 * @response `404` `void` UNKNOWN_PROGRAM. If the program cannot be found.
 */
export async function getProgram(
  channelId: string,
  programId: string,
  query?: {
    service?: string;
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ProgramResponse>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelId}/program/${programId}`,
      ctx.baseUrl
    ),
    headers: params,
    query: query
  });
}
/**
 * @summary Gets epg data for a specific channel in XML TV format.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/xmltv
 * @response `default` `ChannelEPGResponse` success
 */
export async function getXmlTvEpgForChannel(
  channelId: string,
  query?: {
    /**
     * Days back compared to midnight of the date to get EPG for.
     * @format int32
     * @default 0
     */
    daysBackward?: number;
    /**
     * Days forward compared to midnight of the date to get EPG for.
     * @format int32
     * @default 10
     */
    daysForward?: number;
  },
  params: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ChannelEPGResponse>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelId}/xmltv`, ctx.baseUrl),
    headers: params,
    query: query
  });
}

export const EpgService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    getActiveChannels,
    getChannelStatus,
    getEpg,
    getEpgForChannel,
    getEpgForChannels,
    getNextProgram,
    getNextProgramForAsset,
    getProgram,
    getXmlTvEpgForChannel
  }) as const;
