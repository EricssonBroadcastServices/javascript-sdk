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
 * @description This endpoint finds all published programs and partitions them in channel buckets. Only channels has programs in the page that has been requested will have a bucket.
 * @summary Get epg data for all channels.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/date/{date}
 * @response `200` `(ChannelEPGResponse)[]` Successful.
 * @response `400` `APIErrorMessage` User error.
 * @response `404` `APIErrorMessage` Not found
 * @response `422` `APIErrorMessage` Invalid request.
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
   * @min 0
   * @max 30
   */
  daysBackward?: number;
  /**
   * Days forward compared to midnight of the date to get EPG for.
   * @default 0
   * @min 0
   * @max 30
   */
  daysForward?: number;
  /**
   * @default 1
   * @min 1
   */
  pageNumber?: number;
  /**
   * @default 50
   * @min 1
   * @max 10000
   */
  pageSize?: number;
  /** @default "ASC" */
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
 * @description Slugs supported.
 * @summary Get epg data for a channel.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/date/{date}
 * @response `200` `ChannelEPGResponse` Successful.
 * @response `400` `APIErrorMessage` User error
 * @response `404` `APIErrorMessage` Not found
 * @response `422` `APIErrorMessage` Invalid request.
 */
export async function getEpgForChannel({
  channelId,
  date,
  headers,
  ..._data
}: {
  channelId: string;
  date: string;
  /**
   * @default 0
   * @min 0
   * @max 30
   */
  daysBackward?: number;
  /**
   * @default 0
   * @min 0
   * @max 30
   */
  daysForward?: number;
  /**
   * @default 1
   * @min 1
   */
  pageNumber?: number;
  /**
   * @default 50
   * @min 1
   * @max 10000
   */
  pageSize?: number;
  /** @default "ASC" */
  startDateSort?: "ASC" | "DESC";
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelId}/date/${date}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<ChannelEPGResponse>);
}

/**
 * @summary Get epg data for set of channels.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelIds}/date/{date}
 * @response `200` `(ChannelEPGResponse)[]` Successful.
 * @response `400` `APIErrorMessage` User error
 * @response `404` `APIErrorMessage` Not found
 * @response `422` `APIErrorMessage` Invalid request.
 */
export async function getEpgForChannels({
  channelIds,
  date,
  headers,
  ..._data
}: {
  /** Comma separated list of channel ids */
  channelIds: string;
  date: string;
  /**
   * @default 0
   * @min 0
   * @max 30
   */
  daysBackward?: number;
  /**
   * @default 0
   * @min 0
   * @max 30
   */
  daysForward?: number;
  /**
   * @default 1
   * @min 1
   */
  pageNumber?: number;
  /**
   * @default 50
   * @min 1
   * @max 10000
   */
  pageSize?: number;
  /** @default "ASC" */
  startDateSort?: "ASC" | "DESC";
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/epg/${channelIds}/date/${date}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<ChannelEPGResponse[]>);
}

/**
 * @description ...on the same channel relative to a program
 * @summary Get the next program.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/program/{programId}/next
 * @response `200` `ProgramResponse` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getNextProgram({
  channelId,
  programId,
  headers
}: {
  channelId: string;
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
 * @summary Get the next program relative to asset.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/asset/{assetId}/next
 * @response `200` `ProgramResponse` Successful.
 * @response `404` `APIErrorMessage` Not found.
 */
export async function getNextProgramForAsset({
  assetId,
  headers
}: {
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
 * @summary Get a program by id.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/program/{programId}
 * @response `200` `ProgramResponse` Successful.
 * @response `400` `APIErrorMessage` User error
 * @response `404` `APIErrorMessage` Not found
 * @response `422` `APIErrorMessage` Invalid request.
 */
export async function getProgram({
  channelId,
  programId,
  headers,
  ..._data
}: {
  channelId: string;
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

export class EpgService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getEpg = getEpg;
  getEpgForChannel = getEpgForChannel;
  getEpgForChannels = getEpgForChannels;
  getNextProgram = getNextProgram;
  getNextProgramForAsset = getNextProgramForAsset;
  getProgram = getProgram;
}
