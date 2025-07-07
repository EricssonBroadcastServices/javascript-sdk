/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AccountProducts, AvailabilityKeys, EntitleResponse, PaymentProvider, PlayResponse } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @description Returns two lists: 'entitled' and 'notEntitled' products for a given organization unit. The 'entitled' list contains products the account has access to, while the 'notEntitled' list contains products the account has no access to.
 * @summary Get account products for a given organization unit
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/accountproduct
 * @response `200` `AccountProducts` Successful
 * @response `400` `APIErrorMessage` Failed
 */
export async function accountProducts({
  headers,
  ..._data
}: {
  /** The time to be used when checking entitlement. */
  time?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/accountproduct`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<AccountProducts>);
}

/**
 * @description This endpoint retrieves availability keys for a given account.
 * @summary Get availability keys for a given account
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/availabilitykey
 * @response `200` `AvailabilityKeys` Successful
 * @response `400` `APIErrorMessage` Failed
 */
export async function availabilityKeys({
  headers,
  ..._data
}: {
  /** The time to be used when checking entitlement. */
  time?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/availabilitykey`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<AvailabilityKeys>);
}

/**
 * @description Entitle the user to access the asset
 * @summary Entitle a user.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/entitle
 * @response `200` `EntitleResponse` Successful
 * @response `400` `APIErrorMessage` Bad Request
 */
export async function entitle({
  assetId,
  headers,
  ..._data
}: {
  /** The asset id */
  assetId: string;
  /** The payment provider */
  paymentProvider?: PaymentProvider;
  /**
   * Is Proxy. FOR INTERNAL USE
   * @default false
   */
  proxy?: boolean;
  /** The time */
  time?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/entitle`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<EntitleResponse>);
}

/**
 * @description If the entitlement checks pass it will return the information needed to initialize the player.
 * @summary Do a play call.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/play
 * @response `200` `PlayResponse` Successful
 * @response `400` `APIErrorMessage` Failed
 */
export async function play({
  assetId,
  headers,
  ..._data
}: {
  /** The id of the asset to play */
  assetId: string;
  /** App bundle. Used for SSAI. */
  appBundle?: string;
  /** App name. Used for SSAI. */
  appName?: string;
  /** App store URL. Used for SSAI. */
  appStoreUrl?: string;
  /** Use this with value true if you only want to include audio tracks in the response. */
  audioOnly?: boolean;
  /** Auto play. Used for SSAI. */
  autoplay?: boolean;
  /** A flag for US consent for advertising. Used for SSAI. */
  ccpaConsent?: boolean;
  /** A consent string passed from various Consent Management Platforms (CMP’s). Used for SSAI. */
  consent?: string;
  /** A comma-separated list for sending additional custom non-SDK supported SSAI parameters. Used for SSAI. */
  custom?: string[];
  /** Manufacturer of device such as Apple or Samsung. Used for SSAI. */
  deviceMake?: string;
  /** Device model. Used for SSAI. */
  deviceModel?: string;
  /** Device type. Used for SSAI. */
  deviceType?: string;
  /** Channel Partner. Domain where player is embedded. Used for SSAI. */
  domain?: string;
  /** End time in the number of seconds in the playback manifest. */
  end?: number;
  /** Use this to provide an end time when playing a channel. Should be used when there is no EPG available. Format: ISO_DATE_TIME example 2021-01-31T00:00:00Z. Experimental, do not use unless told so. */
  endTime?: string;
  /** Provides the end user IP if there is a proxy in between. */
  forwardedFor?: string;
  /**
   * DEPRECATED: gdpr is now set automatically. A flag for European Union traffic consenting to advertising. Used for SSAI.
   *  * @deprecated
   */
  gdprOptin?: boolean;
  /** Screen Resolution (height). Used for SSAI. */
  height?: number;
  /** User device ID. Used for SSAI. */
  ifa?: string;
  /** Ifa type. Used for SSAI. */
  ifaType?: string;
  /** Provide GPS-based geo-location for location-based ad targeting (optional) e.g. latitude=33.543682. Used for SSAI. */
  latitude?: number;
  /** True if the user opted-out of ad tracking. Used for SSAI. */
  limitAdTracking?: boolean;
  /** Use this if you really want to play live and do not care about the EPG even if one exists. DO NOT USE unless you are told so. */
  live?: boolean;
  /** Provide GPS-based geo-location for location-based ad targeting (optional) e.g. longitude=-86.779633. Used for SSAI. */
  longitude?: number;
  /** Provide material profile if you want to play a version used for a specific purpose. You need to know what profile to use. */
  materialProfile?: string;
  /** Use this if you want to include only video tracks with a max frame rate. */
  maxFrameRate?: number;
  /** Use this to filter out higher bitrates. Note that this requires backend configuration for your organization. */
  maxResolution?: string;
  /** Indicate whether the player is muted or not. Used for SSAI. */
  mute?: boolean;
  /** Page Url. Used for SSAI. */
  pageUrl?: string;
  /** To be used if we can deliver both persistent and non-persistent licenses for one business unit */
  persistent?: boolean;
  /** Start time in the number of seconds in the playback manifest. */
  start?: number;
  /** Use this to provide a start time when playing a channel. Should be used when there is no EPG available. Format: ISO_DATE_TIME example 2021-01-31T00:00:00Z. Experimental, do not use unless told so. */
  startTime?: string;
  /** A comma-separated list for supported DRM providers for playback. Supported values are widevine, fairplay, playready. */
  supportedDrms?: string;
  /** A comma-separated priority list for supported formats for playback, first value has the highest priority. Supported values are hls, dash, mss, mp3, aac. First value will always be used for SSAI. */
  supportedFormats?: string;
  /** Use this if we can deliver a time shift for smooth. DO NOT USE unless you are told so. */
  timeShift?: boolean;
  /** User id. Used for SSAI. */
  uid?: string;
  /** Screen Resolution (width). Used for SSAI. */
  width?: number;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/entitlement/${assetId}/play`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    query: _data as unknown as QueryParams
  }).then(response => response.json() as Promise<PlayResponse>);
}

export class EntitlementsService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  accountProducts = accountProducts;
  availabilityKeys = availabilityKeys;
  entitle = entitle;
  play = play;
}
