/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ChannelEPGResponse, ProgramResponse } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @description This endpoint finds all published programs and partitions them in channel buckets. Only channels has programs in the page that has been requested will have a bucket. Programs sorted ascending on startTime by default.
 * @summary Gets epg data for all channels.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/date/{date}
 * @response `200` `(ChannelEPGResponse)[]` success
 * @response `400` `void` Result window is too large. If the pageSize * pageNumber is greater than 10000.
 * @response `422` `void` DATE_REQUESTED_OUTSIDE_VALID_WINDOW. If the date requested is outside the valid EPG window.
 */
export async function getEpg({
  date,
  headers,
  ..._data
}: {
  /** The date */
  date: Date;
  /**
   * Days back compared to midnight of the date to get EPG for.
   * @default 0
   */
  daysBackward?: number;
  /**
   * Days forward compared to midnight of the date to get EPG for.
   * @default 0
   */
  daysForward?: number;
  /**
   * The page number. Note that pageNumber * pageSize cannot exceed 10000 or an error will occur.
   * @default 1
   */
  pageNumber?: number;
  /**
   * The number of items to show per page
   * @default 50
   */
  pageSize?: number;
  /**
   * The sort order. Note that pageNumber * pageSize cannot exceed 10000 or an error will occur.
   * @default "ASC"
   */
  startDateSort?: "ASC" | "DESC";
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/date/${date.toISOString().substring(0, 10)}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<ChannelEPGResponse[]>);
}

/**
 * @description Programs sorted ascending on startTime by default.
 * @summary Gets epg data for a specific channel.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/date/{date}
 * @response `200` `ChannelEPGResponse` success
 * @response `422` `void` DATE_REQUESTED_OUTSIDE_VALID_WINDOW. If the date requested is outside the valid EPG window.
 */
export async function getEpgForChannel({
  channelId,
  date,
  headers,
  ..._data
}: {
  /** The id of the channel to get EPG for. Slugs supported. */
  channelId: string;
  /** The date */
  date: Date;
  /**
   * Days back compared to midnight of the date to get EPG for.
   * @default 0
   */
  daysBackward?: number;
  /**
   * Days forward compared to midnight of the date to get EPG for.
   * @default 0
   */
  daysForward?: number;
  /**
   * The page number.
   * @default 1
   */
  pageNumber?: number;
  /**
   * The number of items to show per page
   * @default 50
   */
  pageSize?: number;
  /**
   * The sort order.
   * @default "ASC"
   */
  startDateSort?: "ASC" | "DESC";
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelId}/date/${date.toISOString().substring(0, 10)}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<ChannelEPGResponse>);
}

/**
 * @description Programs sorted ascending on startTime by default.
 * @summary Gets epg data for a specific set of channels.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelIds}/date/{date}
 * @response `200` `(ChannelEPGResponse)[]` success
 * @response `422` `void` DATE_REQUESTED_OUTSIDE_VALID_WINDOW. If the date requested is outside the valid EPG window.
 */
export async function getEpgForChannels({
  channelIds,
  date,
  headers,
  ..._data
}: {
  /** The comma separated list of the ids the channels to get EPG for. */
  channelIds: string;
  /** The date */
  date: Date;
  /**
   * Days back compared to midnight of the date to get EPG for.
   * @default 0
   */
  daysBackward?: number;
  /**
   * Days forward compared to midnight of the date to get EPG for.
   * @default 0
   */
  daysForward?: number;
  /**
   * The page number.
   * @default 1
   */
  pageNumber?: number;
  /**
   * The number of items to show per page
   * @default 50
   */
  pageSize?: number;
  /**
   * The sort order.
   * @default "ASC"
   */
  startDateSort?: "ASC" | "DESC";
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelIds}/date/${date.toISOString().substring(0, 10)}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<ChannelEPGResponse[]>);
}

/**
 * @summary Gets next program for a specific program for a channel.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/program/{programId}/next
 * @response `200` `ProgramResponse` success
 * @response `404` `void` PROGRAM_NOT_FOUND. If the program cannot be found. NEXT_PROGRAM_NOT_FOUND. If the next program cannot be found.
 */
export async function getNextProgram({
  channelId,
  programId,
  headers
}: {
  /** The id of the channel. */
  channelId: string;
  /** The id of the program. */
  programId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelId}/program/${programId}/next`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<ProgramResponse>);
}

/**
 * @description If the asset has been showed multiple times there is a unspecified logic to select one program.
 * @summary Gets next program for a specific asset.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/asset/{assetId}/next
 * @response `200` `ProgramResponse` success
 * @response `404` `void` PROGRAM_NOT_FOUND. If the program cannot be found. NEXT_PROGRAM_NOT_FOUND. If the next program cannot be found.
 */
export async function getNextProgramForAsset({
  assetId,
  headers
}: {
  /** The asset id */
  assetId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/asset/${assetId}/next`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<ProgramResponse>);
}

/**
 * @summary Gets a specific program for a channel by id.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/program/{programId}
 * @response `200` `ProgramResponse` success
 * @response `404` `void` UNKNOWN_PROGRAM. If the program cannot be found.
 */
export async function getProgram({
  channelId,
  programId,
  headers,
  ..._data
}: {
  /** The id of the channel. */
  channelId: string;
  /** The id of the program. */
  programId: string;
  service?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelId}/program/${programId}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<ProgramResponse>);
}

/**
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/onnow
 * @response `200` `ChannelEPGResponse` OK
 */
export async function onNow({
  channelId,
  headers
}: {
  channelId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelId}/onnow`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<ChannelEPGResponse>);
}

export class EpgService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getEpg = getEpg;
  getEpgForChannel = getEpgForChannel;
  getEpgForChannels = getEpgForChannels;
  getNextProgram = getNextProgram;
  getNextProgramForAsset = getNextProgramForAsset;
  getProgram = getProgram;
  onNow = onNow;
}
