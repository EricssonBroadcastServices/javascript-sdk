/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AvailabilityKeys, EntitleResponseV2, PaymentProvider, PlayResponseV2 } from "./data-contracts";
import { QueryParams, ServiceContext, request } from "./http-client";

/**
 * @description Should at the moment only be used in white label apps on the web. Needs to be formalized and approved before used by any other client than MOTT white label app for the web. Returns two lists. All available products for the organization unit will be in any of them. The account can be null. This means that only products allowed for anonymous will be returned in entitled list. - entitled. Contains all the products the account has access to. - notEntitled. Contains all the products the account has not access to.
 * @summary EXPERIMENTAL.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/accountproduct
 * @response `default` `void` success
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
  }).then(response => response.json() as Promise<void>);
}

/**
 * @summary Returns all the availability keys for a given account
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/availabilitykey
 * @response `default` `AvailabilityKeys` success
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
 * @description Check if the user is/will be allowed to play using current configuration.
 * @summary Do an entitlement check.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/entitle
 * @response `200` `EntitleResponseV2` success
 * @response `400` `void` INVALID_JSON. If JSON received is not valid JSON.
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid.
 * @response `403` `void` FORBIDDEN. If this business unit has been configured to require server to server authentication, but it is not valid. NOT_AVAILABLE. The asset is not available (playable) even if the asset itself is known. BLOCKED. All play requests for the asset is currently blocked. (for instance blacked out or catchup blocked) GEO_BLOCKED. Play is not allowed in selected region. CONCURRENT_STREAMS_LIMIT_REACHED. Play is not allowed due to concurrent streams limitation. NOT_PUBLISHED. The asset is not published. NOT_ENTITLED. The user does not have access to play the asset.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_ASSET. If the asset is not found.
 * @response `422` `void` JSON_DOES_NOT_FOLLOW_CONTRACT. If the JSON does not follow the contract. I.E. unknown ENUM sent, strings in place of integers, missing values etc.
 * @response `500` `void` INTERNAL_TIMEOUT.
 */
export async function entitle({
  assetId,
  headers,
  ..._data
}: {
  /** The id of the asset to play. */
  assetId: string;
  /** Payment provider. */
  paymentProvider?: PaymentProvider;
  /** The time to be used when checking entitlement. */
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
  }).then(response => response.json() as Promise<EntitleResponseV2>);
}

/**
 * @description If the entitlement checks pass it will return the information needed to initialize the player.
 * @summary Do a play call.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/play
 * @response `200` `PlayResponseV2` success
 * @response `400` `void` INVALID_JSON. If JSON received is not valid JSON. INVALID_START_TIME. Invalid startTime. INVALID_END_TIME. Invalid endTime. END_TIME_WITHOUT_START_TIME_IS_NOT_ALLOWED. Only endTime without startTime is not allowed. START_TIME_MUST_BE_BEFORE_END_TIME. StartTime must be before endTime. START_TIME_OLD. StartTime is not accepted. It is too old. START_TIME_OLD_WHEN_NO_END_TIME. StartTime is not accepted. It is too old when no endTime is provided. START_TIME_IN_THE_FUTURE. StartTime cannot be in the future. START_END_TIME_DURATION_TO_LONG. The duration between startTime and endTime is to long.
 * @response `401` `void` NO_SESSION_TOKEN. If the session token is missing. INVALID_SESSION_TOKEN. If the session token is provided but not valid. INVALID_ADOBE_AUTH. The provided adobe play token is not valid.
 * @response `403` `void` FORBIDDEN. If this business unit has been configured to require server to server authentication, but it is not valid. NOT_AVAILABLE. The asset is not available (playable) even if the asset itself is known. BLOCKED. All play requests for the asset is currently blocked. (for instance blacked out or catchup blocked) GEO_BLOCKED. Play is not allowed in selected region. CONCURRENT_STREAMS_LIMIT_REACHED. Play is not allowed due to concurrent streams limitation. NOT_PUBLISHED. The asset is not published. NOT_ENTITLED. The user does not have access to play the asset.
 * @response `404` `void` UNKNOWN_BUSINESS_UNIT. If the business unit is not found. UNKNOWN_ASSET. If the asset is not found.
 * @response `422` `void` JSON_DOES_NOT_FOLLOW_CONTRACT. If the JSON does not follow the contract. I.E. unknown ENUM sent, strings in place of integers, missing values etc.
 * @response `500` `void` INTERNAL_TIMEOUT.
 */
export async function play({
  assetId,
  headers,
  ..._data
}: {
  /** The id of the asset to play. */
  assetId: string;
  AdSID?: string;
  AdZID?: string;
  /** App bundle. Used for SSAI. */
  appBundle?: string;
  /** App name. Used for SSAI. */
  appName?: string;
  /** App store URL. Used for SSAI. */
  appStoreUrl?: string;
  /**
   * Use this with value true if you only want to include audio tracks in the
   * response.
   * @default false
   */
  audioOnly?: boolean;
  /** Auto play. Used for SSAI. */
  autoplay?: boolean;
  /** A flag for US consent for advertising. Used for SSAI. */
  ccpaConsent?: boolean;
  /**
   * A consent string passed from various Consent Management Platforms (CMP’s). Used
   * for SSAI.
   */
  consent?: string;
  /** A comma-seperated list for sending additional custom non-SDK supported SSAI paramaters. Used for SSAI. */
  custom?: string[];
  /** Manufacturer of device such as Apple or Samsung. Used for SSAI. */
  deviceMake?: string;
  /** Device model. Used for SSAI. */
  deviceModel?: string;
  /** Device type. Used for SSAI. */
  deviceType?: string;
  /** Channel Partner. Domain where player is embedded. Used for SSAI. */
  domain?: string;
  /** End time in number of seconds in the playback manifest. */
  end?: number;
  /**
   * Use this to provide an end time when playing a channel. Should be used when there
   * is no epg
   * available.
   * Format: ISO_DATE_TIME example 2021-01-31T00:00:00Z
   * Experimental, do not use unless told so.
   */
  endTime?: string;
  /** A flag for European Union traffic consenting to advertising. Used for SSAI. */
  gdprOptin?: boolean;
  /** Screen Resolution (height). Used for SSAI. */
  height?: number;
  /** User device ID. Used for SSAI. */
  ifa?: string;
  /**
   * Provide GPS based geo-location for location based ad targeting (optional) e.g.
   * latitude=33.543682. Used for SSAI.
   */
  latitude?: number;
  /** True if the user opted-out of ad tracking. Used for SSAI. */
  limitAdTracking?: boolean;
  /**
   * Use this if you really want to play live and does not care about the epg even if
   * one exist.
   * DO NOT USE unless you are told so.
   */
  live?: boolean;
  /**
   * Provide GPS based geo-location for location based ad targeting (optional) e.g.
   * longitude=-86.779633. Used for SSAI.
   */
  longitude?: number;
  /** Provide material profile if you want to play a version used for a specific purpose. You need to know what profile to use. */
  materialProfile?: string;
  /** Use this if you want to include only video tracks with a max frame rate. */
  maxFrameRate?: number;
  /**
   * Use this to filter out higher bitrates. Note that this requires backend
   * configuration for
   * your organization.
   */
  maxResolution?: string;
  /** Indicate whether player is muted or not. Used for SSAI. */
  mute?: boolean;
  /** Page Url. Used for SSAI. */
  pageUrl?: string;
  /**
   * To be used if we for one business unit can deliver both persistent and
   * non-persistent
   * licenses.
   */
  persistent?: boolean;
  /** Start time in number of seconds in the playback manifest. */
  start?: number;
  /**
   * Use this to provide a start time when playing a channel. Should be used when
   * there is no
   * epg available.
   * Format: ISO_DATE_TIME example 2021-01-31T00:00:00Z
   * Experimental, do not use unless told so.
   */
  startTime?: string;
  /**
   * A comma-separated list for supported DRM providers for playback.
   * Supported values are widevine, fairplay, playready.
   */
  supportedDrms?: string;
  /**
   * A comma-separated priority list for supported formats for playback, first value
   * has highest priority. Supported values are hls, dash, mss, mp3, aac. First value
   * will
   * always be used for SSAI.
   */
  supportedFormats?: string;
  /**
   * Very special, we can deliver a time shift for smooth. DO NOT USE unless you are
   * told so.
   */
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
  }).then(response => response.json() as Promise<PlayResponseV2>);
}

export class EntitlementsService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  accountProducts = accountProducts;
  availabilityKeys = availabilityKeys;
  entitle = entitle;
  play = play;
}
