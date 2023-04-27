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

import {
  AddPaymentMethodRequest,
  AnalyticsBatch,
  ApiActivationCodeResponse,
  ApiActivationRequestV2,
  ApiAnonymousSessionRequest,
  ApiAnonymousSessionResponse,
  ApiApiKeyUserSessionRequest,
  ApiAsset,
  ApiAuthenticationRequest,
  ApiBookkeeperAccount,
  ApiBookkeeperAsset,
  ApiChangeEmailRequest,
  ApiChangePasswordRequest,
  ApiChangePasswordResponse,
  ApiChannelEPGResponse,
  ApiComponentFilters,
  ApiConfirmAccountData,
  ApiConfirmAccountResponse,
  ApiCreateSessionResponse,
  ApiCredentials,
  ApiDeleteUsersSessionsRequest,
  ApiDevicesResponseV2,
  ApiDownloadInfoResponse,
  ApiDownloadResponse,
  ApiEntitleResponseV2,
  APIErrorMessage,
  ApiEventList,
  ApiExternalUserSessionRequest,
  ApiFirebaseAuthenticationRequest,
  ApiGigyaAuthenticationRequest,
  ApiInitialisePayment,
  ApiInitializePaymentResponse,
  ApiLabelFilter,
  ApiLocation,
  ApiLoginResponse,
  ApiOauthAuthenticationRequest,
  ApiPaymentMethods,
  ApiPlayResponseV2,
  ApiPrimetimeAuthenticationRequest,
  ApiProductOfferingPurchases,
  ApiProductOfferingTransactions,
  ApiProductOfferingTransactionsProductOfferingPairList,
  ApiProgramResponse,
  ApiPurchaseRequest,
  ApiPurchaseResponse,
  ApiPurchaseVerificationRequest,
  ApiSearchList,
  ApiSessionResponse,
  ApiSetPasswordWithTokenRequestV2,
  ApiStoreProductOfferings,
  ApiStorePromotionProductOfferings,
  ApiStorePurchaseTransaction,
  ApiSystemConfig,
  ApiUserDetailsUpdateRequest,
  ApiUserProfileCreateRequest,
  ApiUserProfiles,
  ApiUserSelfServiceCreateRequestV2,
  ApiUserSelfServiceCreateResponse,
  ApiUserSelfServiceCreateWithVoucherRequestV2,
  AvailabilityKeys,
  EmptyResponse,
  GetEpgForChannelsV2ParamsStartDateSort,
  GetEpgForChannelV2ParamsStartDateSort,
  GetEpgV2ParamsStartDateSort,
  Map,
  Message,
  SearchV2ParamsFieldSet,
  TimeResponse,
  UpdatePaymentMethodRequest,
  UpdatePrederredPaymentMethodRequest,
  UserDetails
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class V2<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Get the current user's details
   *
   * @tags User
   * @name UserDetailsGetV2
   * @summary Get user details.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/details
   * @secure
   */
  userDetailsGetV2 = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<UserDetails, APIErrorMessage>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/details`,
      method: "GET",
      secure: true,
      format: "json",
      ...params
    });
  /**
   * @description Gets the system confiuration for specified country.
   *
   * @tags System
   * @name GetSystemConfigV2
   * @summary Get System Configuration.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/system/config
   */
  getSystemConfigV2 = (
    customer: string,
    businessUnit: string,
    query: {
      /** countryCode */
      countryCode: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiSystemConfig, APIErrorMessage>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/system/config`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * @description Get location information based on caller IP-address.
   *
   * @tags Location
   * @name Get
   * @summary Get location.
   * @request GET:/v2/location
   */
  get = (params: RequestParams = {}) =>
    this.request<ApiLocation, any>({
      path: `/v2/location`,
      method: "GET",
      ...params
    });
  /**
   * @description Gets the current server UTC time.
   *
   * @tags Time
   * @name Time1
   * @summary Get time.
   * @request GET:/v2/time
   */
  time1 = (params: RequestParams = {}) =>
    this.request<TimeResponse, any>({
      path: `/v2/time`,
      method: "GET",
      ...params
    });
  /**
   * No description
   *
   * @tags PaymentMethod
   * @name GetStoredPaymentMethods
   * @summary Get stored payment methods.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods
   * @secure
   */
  getStoredPaymentMethods = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<ApiPaymentMethods, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/paymentmethods`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags PaymentMethod
   * @name AddPaymentMethod
   * @summary Add payment method.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods
   * @secure
   */
  addPaymentMethod = (
    customer: string,
    businessUnit: string,
    data: AddPaymentMethodRequest,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/paymentmethods`,
      method: "POST",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags PaymentMethod
   * @name UpdatePreferredPaymentMethod
   * @summary Update the preferred payment method.
   * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods/preferred
   * @secure
   */
  updatePreferredPaymentMethod = (
    customer: string,
    businessUnit: string,
    data: UpdatePrederredPaymentMethodRequest,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/paymentmethods/preferred`,
      method: "PUT",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags PaymentMethod
   * @name UpdatePaymentMethod
   * @summary Update payment method.
   * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods/{paymentMethodId}
   * @secure
   */
  updatePaymentMethod = (
    customer: string,
    businessUnit: string,
    paymentMethodId: string,
    data: UpdatePaymentMethodRequest,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/paymentmethods/${paymentMethodId}`,
      method: "PUT",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags PaymentMethod
   * @name DeleteStoredPaymentMethod
   * @summary Delete payment method.
   * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods/{paymentMethodId}
   * @secure
   */
  deleteStoredPaymentMethod = (
    customer: string,
    businessUnit: string,
    paymentMethodId: string,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/paymentmethods/${paymentMethodId}`,
      method: "DELETE",
      secure: true,
      ...params
    });
  /**
   * @description Can be called even when the current session is "overTheDeviceLimit", if so, use this call to let the user select which device to delete.
   *
   * @tags Device
   * @name GetDevicesForAccountV2
   * @summary List devices.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/device
   * @secure
   */
  getDevicesForAccountV2 = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<ApiDevicesResponseV2, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/device`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * @description If the session from which this call is made is marked as "overTheDeviceLimit" this marking will be cleared, which can be checked by validating the session.
   *
   * @tags Device
   * @name DeleteDeviceForAccountV2
   * @summary Delete device.
   * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/device/{deviceId}
   * @secure
   */
  deleteDeviceForAccountV2 = (customer: string, businessUnit: string, deviceId: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/device/${deviceId}`,
      method: "DELETE",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags EventSink
   * @name IntializeV2
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/eventsink/init
   */
  intializeV2 = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/eventsink/init`,
      method: "POST",
      ...params
    });
  /**
   * No description
   *
   * @tags EventSink
   * @name PostEventsV2
   * @summary Post analytics events.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/eventsink/send
   */
  postEventsV2 = (customer: string, businessUnit: string, data: AnalyticsBatch, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/eventsink/send`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * No description
   *
   * @tags ClientConfig
   * @name GetWlConfigV2WithDomain
   * @summary Get the top level config object.
   * @request GET:/v2/whitelabel/origin/{host}/config/{configId}
   */
  getWlConfigV2WithDomain = (
    host: string,
    configId: string,
    query?: {
      /** @default false */
      paymentMethodPreview?: boolean;
      allowedCountry?: string;
      /** Comma separated list of filters. I.e: "type:value,type2:value2" */
      filters?: ref;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/whitelabel/origin/${host}/config/${configId}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags ClientConfig
   * @name GetWlComponentV2
   * @summary Get config component
   * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/config/{configId}/component/{componentId}
   */
  getWlComponentV2 = (
    customer: string,
    businessUnit: string,
    configId: string,
    componentId: string,
    query?: {
      /** Add allowed country parameter to any server side asset searches that are made. */
      allowedCountry?: string;
      /** Comma separated list of filters. I.e: "type:value,type2:value2" */
      filters?: ref;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/whitelabel/customer/${customer}/businessunit/${businessUnit}/config/${configId}/component/${componentId}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags ClientConfig
   * @name GetComponentFilters
   * @summary Get user location and the filters to use in calls to the client configuration endpoints.
   * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/filters
   */
  getComponentFilters = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, ApiComponentFilters>({
      path: `/v2/whitelabel/customer/${customer}/businessunit/${businessUnit}/filters`,
      method: "GET",
      ...params
    });
  /**
   * No description
   *
   * @tags ClientConfig
   * @name GetWlConfig
   * @summary Get the top level config object.
   * @request GET:/v2/whitelabel/customer/{customer}/businessunit/{businessUnit}/config/{configId}
   */
  getWlConfig = (
    customer: string,
    businessUnit: string,
    configId: string,
    query?: {
      /** @default false */
      paymentMethodPreview?: boolean;
      allowedCountry?: string;
      /** Comma separated list of filters. I.e: "type:value,type2:value2" */
      filters?: ref;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/whitelabel/customer/${customer}/businessunit/${businessUnit}/config/${configId}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * @description It will return a file stored on business unit level. The response is a JSON object or array as stored.
   *
   * @tags CustomerConfig
   * @name GetConfigFileV2
   * @summary EXPERIMENTAL Gets a JSON customer specific json file.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/config/{fileName}
   */
  getConfigFileV2 = (customer: string, businessUnit: string, fileName: string, params: RequestParams = {}) =>
    this.request<Map, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/config/${fileName}`,
      method: "GET",
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Event
   * @name GetEventsV2
   * @summary Get events.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/event/date/{date}
   */
  getEventsV2 = (
    customer: string,
    businessUnit: string,
    date: string,
    query?: {
      /**
       * Days back from the date parameter for events to include in the query.
       * @format int32
       * @default 0
       */
      daysBackward?: number;
      /**
       * Days forward from the date parameter for events to include in the query.
       * @format int32
       * @default 0
       */
      daysForward?: number;
      /**
       * The number of items to show per page
       * @format int32
       * @default 50
       */
      pageSize?: number;
      /**
       * The page number.
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /**
       * Hide events that have ended at the time of this request reaching the backend.
       *                           I.e. The from time of the query is set to "now".
       *                           Note: Recently ended events might show up in results for up to the cache time after their end.
       */
      hideEnded?: boolean;
      /** Publication filters applied on publications tagged with service. */
      service?: string;
      /** Only include events that are allowed in provided country. */
      allowedCountry?: string;
      /** Only include events that has the provided products. */
      products?: string[];
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiEventList>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/event/date/${date}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
 * No description
 *
 * @tags Downloads
 * @name Download
 * @summary <p>
 Perform a download operation that will give the client media locators and license information.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/download
 * @secure
 */
  download = (
    customer: string,
    businessUnit: string,
    assetId: string,
    query?: {
      /** The time to be used when checking download info. */
      time?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiDownloadResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/entitlement/${assetId}/download`,
      method: "GET",
      query: query,
      secure: true,
      ...params
    });
  /**
 * @description It will also return information about different download alternatives.
 *
 * @tags Downloads
 * @name DownloadInfo
 * @summary <p>
 Checks if the user is entitled to download the asset.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadinfo
 * @secure
 */
  downloadInfo = (
    customer: string,
    businessUnit: string,
    assetId: string,
    query?: {
      /** The time to be used when checking download info. */
      time?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiDownloadInfoResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/entitlement/${assetId}/downloadinfo`,
      method: "GET",
      query: query,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Downloads
   * @name GetDownloadsForAccount
   * @summary Get information about all downloads done by an account.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/downloads
   * @secure
   */
  getDownloadsForAccount = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, ApiBookkeeperAccount>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/entitlement/downloads`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Downloads
   * @name DeleteDownloadsForAccount
   * @summary Unregister all downloads done by an account.
   * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/downloads
   * @secure
   */
  deleteDownloadsForAccount = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, Message>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/entitlement/downloads`,
      method: "DELETE",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Downloads
   * @name GetDownloadsForAsset
   * @summary Get information for all downloads for an asset done by an account.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloads
   * @secure
   */
  getDownloadsForAsset = (customer: string, businessUnit: string, assetId: string, params: RequestParams = {}) =>
    this.request<any, ApiBookkeeperAsset>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/entitlement/${assetId}/downloads`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Downloads
   * @name DeleteDownloadsForAsset
   * @summary Unregister all downloads for an asset done by an account.
   * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloads
   * @secure
   */
  deleteDownloadsForAsset = (customer: string, businessUnit: string, assetId: string, params: RequestParams = {}) =>
    this.request<any, Message>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/entitlement/${assetId}/downloads`,
      method: "DELETE",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Downloads
   * @name DownloadCompleted
   * @summary Register a completed download of an asset.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadcompleted
   * @secure
   */
  downloadCompleted = (customer: string, businessUnit: string, assetId: string, params: RequestParams = {}) =>
    this.request<any, ApiBookkeeperAsset>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/entitlement/${assetId}/downloadcompleted`,
      method: "POST",
      secure: true,
      ...params
    });
  /**
   * @description This will count as a new download.
   *
   * @tags Downloads
   * @name DownloadRenewed
   * @summary Register license renewed for a downloaded asset.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/downloadrenewed
   * @secure
   */
  downloadRenewed = (customer: string, businessUnit: string, assetId: string, params: RequestParams = {}) =>
    this.request<any, ApiBookkeeperAsset>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/entitlement/${assetId}/downloadrenewed`,
      method: "POST",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Epg
   * @name GetNextProgramv2
   * @summary Gets next program for a specific program for a channel.
   * @request GET:/v2/customer/{customerUnit}/businessunit/{businessUnit}/epg/{channelId}/program/{programId}/next
   */
  getNextProgramv2 = (
    customerUnit: string,
    businessUnit: string,
    channelId: string,
    programId: string,
    params: RequestParams = {}
  ) =>
    this.request<ApiProgramResponse, void>({
      path: `/v2/customer/${customerUnit}/businessunit/${businessUnit}/epg/${channelId}/program/${programId}/next`,
      method: "GET",
      format: "json",
      ...params
    });
  /**
   * @description <p> This endpoint finds all published programs and partitions them in channel buckets. Only channels has programs in the page that has been requested will have a bucket. <p> Programs sorted ascending on startTime by default.
   *
   * @tags Epg
   * @name GetEpgV2
   * @summary Gets epg data for all channels.
   * @request GET:/v2/customer/{customerUnit}/businessunit/{businessUnit}/epg/date/{date}
   */
  getEpgV2 = (
    customerUnit: string,
    businessUnit: string,
    date: ref,
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
       * The number of items to show per page
       * @format int32
       * @default 50
       */
      pageSize?: number;
      /**
       * The page number. Note that pageNumber * pageSize cannot exceed 10000 or an error will occur.
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /**
       * The sort order. Note that pageNumber * pageSize cannot exceed 10000 or an error will occur.
       * @default "ASC"
       */
      startDateSort?: GetEpgV2ParamsStartDateSort;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiChannelEPGResponse[], void>({
      path: `/v2/customer/${customerUnit}/businessunit/${businessUnit}/epg/date/${date}`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * @description If the asset has been showed multiple times there is a unspecified logic to select one program.
   *
   * @tags Epg
   * @name GetNextProgramForAsset2
   * @summary Gets next program for a specific asset.
   * @request GET:/v2/customer/{customerUnit}/businessunit/{businessUnit}/epg/asset/{assetId}/next
   */
  getNextProgramForAsset2 = (customerUnit: string, businessUnit: string, assetId: string, params: RequestParams = {}) =>
    this.request<ApiProgramResponse, void>({
      path: `/v2/customer/${customerUnit}/businessunit/${businessUnit}/epg/asset/${assetId}/next`,
      method: "GET",
      format: "json",
      ...params
    });
  /**
   * @description <p> Programs sorted ascending on startTime by default.
   *
   * @tags Epg
   * @name GetEpgForChannelV2
   * @summary Gets epg data for a specific channel.
   * @request GET:/v2/customer/{customerUnit}/businessunit/{businessUnit}/epg/{channelId}/date/{date}
   */
  getEpgForChannelV2 = (
    customerUnit: string,
    businessUnit: string,
    channelId: string,
    date: ref,
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
       * The number of items to show per page
       * @format int32
       * @default 50
       */
      pageSize?: number;
      /**
       * The page number.
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /**
       * The sort order.
       * @default "ASC"
       */
      startDateSort?: GetEpgForChannelV2ParamsStartDateSort;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiChannelEPGResponse, void>({
      path: `/v2/customer/${customerUnit}/businessunit/${businessUnit}/epg/${channelId}/date/${date}`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * @description <p> Programs sorted ascending on startTime by default.
   *
   * @tags Epg
   * @name GetEpgForChannelsV2
   * @summary Gets epg data for a specific set of channels.
   * @request GET:/v2/customer/{customerUnit}/businessunit/{businessUnit}/epg/{channelIds}/date/{date}
   */
  getEpgForChannelsV2 = (
    customerUnit: string,
    businessUnit: string,
    channelIds: string,
    date: ref,
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
       * The number of items to show per page
       * @format int32
       * @default 50
       */
      pageSize?: number;
      /**
       * The page number.
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /**
       * The sort order.
       * @default "ASC"
       */
      startDateSort?: GetEpgForChannelsV2ParamsStartDateSort;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiChannelEPGResponse[], void>({
      path: `/v2/customer/${customerUnit}/businessunit/${businessUnit}/epg/${channelIds}/date/${date}`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Epg
   * @name GetProgramV2
   * @summary Gets a specific program for a channel by id.
   * @request GET:/v2/customer/{customerUnit}/businessunit/{businessUnit}/epg/{channelId}/program/{programId}
   */
  getProgramV2 = (
    customerUnit: string,
    businessUnit: string,
    channelId: string,
    programId: string,
    query?: {
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiProgramResponse, void>({
      path: `/v2/customer/${customerUnit}/businessunit/${businessUnit}/epg/${channelId}/program/${programId}`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * @description E.g. a redirect flow, where the purchaser has to authenticate to the card issuer. * Also, used to send additional data from the shopper if that's required.
   *
   * @tags Store
   * @name VerifyPayment2
   * @summary Verify a purchase of a productOffering if a "AUTHORIZED/REJECTED"-status is not given directly.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/{purchaseId}/verify
   * @secure
   */
  verifyPayment2 = (
    customer: string,
    businessUnit: string,
    purchaseId: string,
    data: ApiPurchaseVerificationRequest,
    params: RequestParams = {}
  ) =>
    this.request<any, ApiPurchaseResponse>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/purchase/${purchaseId}/verify`,
      method: "POST",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Store
   * @name GetAccountTransactionsWithProductOffering
   * @summary Get all transactions for account paired with product offerings.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/account/transactions/productoffering
   * @secure
   */
  getAccountTransactionsWithProductOffering = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, ApiProductOfferingTransactionsProductOfferingPairList>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/account/transactions/productoffering`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Store
   * @name PurchaseProductOffering2
   * @summary Purchase a productOffering.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/{productOfferingId}
   * @secure
   */
  purchaseProductOffering2 = (
    customer: string,
    businessUnit: string,
    productOfferingId: string,
    data: ApiPurchaseRequest,
    params: RequestParams = {}
  ) =>
    this.request<any, ApiPurchaseResponse>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/purchase/${productOfferingId}`,
      method: "POST",
      body: data,
      secure: true,
      ...params
    });
  /**
 * No description
 *
 * @tags Store
 * @name GetOfferings
 * @summary Get product offerings available in the specified country, which also includes globally available product
 offerings.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productoffering/country/{countryCode}
 */
  getOfferings = (
    customer: string,
    businessUnit: string,
    countryCode: string,
    query?: {
      /**
       * Filter on product offerings that requires assetId upon purchase
       * @default true
       */
      includeSelectAssetProducts?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiStoreProductOfferings>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/productoffering/country/${countryCode}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Store
   * @name GetAccountAssetPurchases
   * @summary Get all active asset purchases for account.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/assets
   * @secure
   */
  getAccountAssetPurchases = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, ApiAsset[]>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/purchase/assets`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Store
   * @name GetAccountPurchases
   * @summary Get all purchases for account including transactions
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/account/purchases
   * @secure
   */
  getAccountPurchases = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, ApiStorePurchaseTransaction[]>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/account/purchases`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * @description The end point will not reduce the offerings if they have unique products. { Product offering 1 -  Products: Animated Movies, Country: SE Product offering 2 - Products: Sci-Fi Movies, Country: Global Product offering 1 & 2 and will be returned. }
   *
   * @tags Store
   * @name GetCountryOfferingsByVoucher
   * @summary Get country product offerings available for the specific voucher code.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productofferings/country/{countryCode}/voucher/{voucherCode}
   */
  getCountryOfferingsByVoucher = (
    customer: string,
    businessUnit: string,
    countryCode: string,
    voucherCode: string,
    params: RequestParams = {}
  ) =>
    this.request<any, ApiStorePromotionProductOfferings[]>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/productofferings/country/${countryCode}/voucher/${voucherCode}`,
      method: "GET",
      ...params
    });
  /**
 * @description Returns valid payment types and price after any discount. Note: The behaviour and the result can change during the time.
 *
 * @tags Store
 * @name Initialize
 * @summary EXPERIMENTAL
 Called to before initiating a new payment.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/initialize
 * @secure
 */
  initialize = (customer: string, businessUnit: string, data: ApiInitialisePayment, params: RequestParams = {}) =>
    this.request<any, ApiInitializePaymentResponse>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/purchase/initialize`,
      method: "POST",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Store
   * @name CancelPurchaseSubscription
   * @summary Cancel a subscription purchase, no more renewals will be done.
   * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/subscriptions/{purchaseId}
   * @secure
   */
  cancelPurchaseSubscription = (
    customer: string,
    businessUnit: string,
    purchaseId: string,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/purchase/subscriptions/${purchaseId}`,
      method: "DELETE",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Store
   * @name GetAccountPurchases2
   * @summary Get currently active purchases of the user's account.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase
   * @secure
   */
  getAccountPurchases2 = (
    customer: string,
    businessUnit: string,
    query?: {
      /** @default false */
      includeOfferingDetails?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiProductOfferingPurchases>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/purchase`,
      method: "GET",
      query: query,
      secure: true,
      ...params
    });
  /**
   * @description This endpoint is to be only used if labels are used, which will be far from normal.
   *
   * @tags Store
   * @name GetOfferingsByLabels
   * @summary Get product offerings available for this account's labels.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productoffering/label/{labelFilterId}
   */
  getOfferingsByLabels = (customer: string, businessUnit: string, labelFilterId: string, params: RequestParams = {}) =>
    this.request<ApiStoreProductOfferings, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/productoffering/label/${labelFilterId}`,
      method: "GET",
      ...params
    });
  /**
   * No description
   *
   * @tags Store
   * @name GetAccountTransactions
   * @summary Get all transactions for account.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/account/transactions
   * @secure
   */
  getAccountTransactions = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, ApiProductOfferingTransactions>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/account/transactions`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * @description EXPERIMENTAL
   *
   * @tags Store
   * @name GetOfferingsByVoucher
   * @summary Get product offerings available for the specific voucher code.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productofferings/voucher/{voucherCode}
   * @secure
   */
  getOfferingsByVoucher = (customer: string, businessUnit: string, voucherCode: string, params: RequestParams = {}) =>
    this.request<any, ApiStorePromotionProductOfferings[]>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/store/productofferings/voucher/${voucherCode}`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Search
   * @name SearchV2
   * @summary EXPERIMENTAL - Free text query in selected fields in assets.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
   */
  searchV2 = (
    customer: string,
    businessUnit: string,
    query: string,
    queryParams?: {
      /** The locales to search in. */
      locale?: string[];
      /**
       * The comma separates list of asset types to filter on.
       * @default "MOVIE,TV_SHOW"
       */
      types?: string;
      /** Tag ids to filter on. */
      tags?: string[];
      /**
       * Filter for material duration. Lower limit.
       * @format int32
       */
      durationLower?: number;
      /**
       * Filter for material duration. Upper limit.
       * @format int32
       */
      durationUpper?: number;
      /** Subtitle filter. Comma separated list of languages. */
      subtitles?: string;
      /** The schemes of tags to search. If no schemes, tags will not be searched. */
      schemes?: string[];
      /** Filter on parental rating (format of COUNTRY:RATING,COUNTRY:RATING2) */
      parentalRatings?: string;
      /**
       * If we should only return assets that are at the moment published
       * @default true
       */
      onlyPublished?: boolean;
      /** Filter on allowed in country. */
      allowedCountry?: string;
      /** Only return assets that has downloadBlocked set to false in a publication. */
      onlyDownloadable?: boolean;
      /**
       * The number of items to show per page
       * @format int32
       * @default 50
       */
      pageSize?: number;
      /**
       * The page number.
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /** The set of fields to include by default. */
      fieldSet?: SearchV2ParamsFieldSet;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiSearchList>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/content/search/query/${query}`,
      method: "GET",
      query: queryParams,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name GetProfiles
   * @summary EXPERIMENTAL Get user profiles.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile
   * @secure
   */
  getProfiles = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<ApiUserProfiles, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/profile`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name AddProfile
   * @summary EXPERIMENTAL Add a user profile.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile
   * @secure
   */
  addProfile = (
    customer: string,
    businessUnit: string,
    data: ApiUserProfileCreateRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiUserProfiles, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/profile`,
      method: "POST",
      body: data,
      secure: true,
      ...params
    });
  /**
   * @description Used if account was created with password. If the body is present with a devivceID in the deviceRegistration, the user will be logged in.
   *
   * @tags User
   * @name ConfirmUserWithTokenV2
   * @summary Confirms a created user.
   * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/signup/confirm/{token}
   */
  confirmUserWithTokenV2 = (
    customer: string,
    businessUnit: string,
    token: string,
    data: ApiConfirmAccountData,
    params: RequestParams = {}
  ) =>
    this.request<ApiConfirmAccountResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/signup/confirm/${token}`,
      method: "PUT",
      body: data,
      ...params
    });
  /**
   * @description The code must have been confirmed in a valid session. This is intended for devices like AppleTV and SmartTVs in which entering credentials is cumbersome. This end point requires the "EH" subscriber management feature.
   *
   * @tags User
   * @name ConsumeActivationCodeV2
   * @summary Consumes an activation code and returns a valid session.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/userActivation/consume
   */
  consumeActivationCodeV2 = (
    customer: string,
    businessUnit: string,
    data: ApiActivationRequestV2,
    params: RequestParams = {}
  ) =>
    this.request<any, ApiLoginResponse>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/userActivation/consume`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * @description If the current user is the account owner, then all users' (profiles') are deleted.
   *
   * @tags User
   * @name DeleteUserDetails
   * @summary Delete personal data.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/user/delete
   * @secure
   */
  deleteUserDetails = (customer: string, businessUnit: string, data: ApiCredentials, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/delete`,
      method: "POST",
      body: data,
      secure: true,
      ...params
    });
  /**
   * @description Else if unConfirmed == false the user is logged in and session details are in the response.
   *
   * @tags User
   * @name CreateNewAccountV2
   * @summary If unConfirmed == true, then the user will receive an email with a confirmation link.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/user/signup
   */
  createNewAccountV2 = (
    customer: string,
    businessUnit: string,
    data: ApiUserSelfServiceCreateRequestV2,
    params: RequestParams = {}
  ) =>
    this.request<ApiUserSelfServiceCreateResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/signup`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * @description The code is to be confirmed in a valid session. After this it can be consumed. This is intended for devices like AppleTV and SmartTVs in which entering credentials is cumbersome. This end point requires the "EH" subscriber management feature.
   *
   * @tags User
   * @name CreateActivationCodeV2
   * @summary Creates an activation code.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/userActivation/activationCode
   */
  createActivationCodeV2 = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, ApiActivationCodeResponse>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/userActivation/activationCode`,
      method: "GET",
      ...params
    });
  /**
   * @description Requirements: accountverification.confirmationRequired = false autoproviion of offering
   *
   * @tags User
   * @name VoucherSignup
   * @summary EXPERIMENTAL.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/user/vouchersignup
   */
  voucherSignup = (
    customer: string,
    businessUnit: string,
    data: ApiUserSelfServiceCreateWithVoucherRequestV2,
    params: RequestParams = {}
  ) =>
    this.request<ApiUserSelfServiceCreateResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/vouchersignup`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name ChangePassword
   * @summary Change password.
   * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/changePassword
   * @secure
   */
  changePassword = (
    customer: string,
    businessUnit: string,
    data: ApiChangePasswordRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiChangePasswordResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/changePassword`,
      method: "PUT",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name UserProfileUpdate
   * @summary EXPERIMENTAL Update user profile.
   * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}
   * @secure
   */
  userProfileUpdate = (
    customer: string,
    businessUnit: string,
    userId: string,
    data: ApiUserDetailsUpdateRequest,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/profile/${userId}`,
      method: "PUT",
      body: data,
      secure: true,
      ...params
    });
  /**
   * @description It's not allowed to delete the profile used in the current session.
   *
   * @tags User
   * @name DeleteUserProfile
   * @summary EXPERIMENTAL Delete a user profile.
   * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}
   * @secure
   */
  deleteUserProfile = (customer: string, businessUnit: string, userId: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/profile/${userId}`,
      method: "DELETE",
      secure: true,
      ...params
    });
  /**
   * @description This can be used in special applications to e.g. get appropriate product offerings.
   *
   * @tags User
   * @name GetAccountLabels
   * @summary Get current accounts labelFilter.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/label/filter
   * @secure
   */
  getAccountLabels = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, ApiLabelFilter>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/label/filter`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * @description The current session token will be replaced.
   *
   * @tags User
   * @name SelectUserProfile
   * @summary EXPERIMENTAL Select a user profile.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}/select
   * @secure
   */
  selectUserProfile = (customer: string, businessUnit: string, userId: string, params: RequestParams = {}) =>
    this.request<ApiLoginResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/profile/${userId}/select`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * @description .Will send a token out of band, which can be used to set a new password.
   *
   * @tags User
   * @name ResetPasswordV2
   * @summary Request reset user's password.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/password/reset/{username}
   */
  resetPasswordV2 = (customer: string, businessUnit: string, username: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/password/reset/${username}`,
      method: "GET",
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name SetPasswordWithTokenV2
   * @summary Sets the users password using a token received at signup (without password) or password reset
   * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/signup/password/{token}
   */
  setPasswordWithTokenV2 = (
    customer: string,
    businessUnit: string,
    token: string,
    data: ApiSetPasswordWithTokenRequestV2,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/signup/password/${token}`,
      method: "PUT",
      body: data,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name ChangeEmail
   * @summary Change email address.
   * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/changeEmail
   * @secure
   */
  changeEmail = (customer: string, businessUnit: string, data: ApiChangeEmailRequest, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/changeEmail`,
      method: "PUT",
      body: data,
      secure: true,
      ...params
    });
  /**
   * @description The code can then be consumed to yield a valid session. This is intended for devices like AppleTV and SmartTVs in which entering credentials is cumbersome. This end point requires the "EH" subscriber management feature.
   *
   * @tags User
   * @name ConfirmActivationCodeV2
   * @summary Confirms an activation code.
   * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/activation/confirm/{code}
   * @secure
   */
  confirmActivationCodeV2 = (customer: string, businessUnit: string, code: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/user/activation/confirm/${code}`,
      method: "PUT",
      secure: true,
      ...params
    });
  /**
   * @description <p> Check if the user is/will be allowed to play using current configuration.
   *
   * @tags Entitlements
   * @name EntitleV2
   * @summary Do an entitlement check.
   * @request GET:/v2/customer/{customerUnit}/businessunit/{businessUnit}/entitlement/{assetId}/entitle
   * @secure
   */
  entitleV2 = (
    customerUnit: string,
    businessUnit: string,
    assetId: string,
    query?: {
      /** The time to be used when checking entitlement. */
      time?: string;
      /** Payment provider. */
      paymentProvider?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiEntitleResponseV2, void>({
      path: `/v2/customer/${customerUnit}/businessunit/${businessUnit}/entitlement/${assetId}/entitle`,
      method: "GET",
      query: query,
      secure: true,
      ...params
    });
  /**
   * @description <p> If the entitlement checks pass it will return the information needed to initialize the player.
   *
   * @tags Entitlements
   * @name PlayV2
   * @summary Do a play call.
   * @request GET:/v2/customer/{customerUnit}/businessunit/{businessUnit}/entitlement/{assetId}/play
   * @secure
   */
  playV2 = (
    customerUnit: string,
    businessUnit: string,
    assetId: string,
    query?: {
      /**
       * To be used if we for one business unit can deliver both persistent and
       *                                  non-persistent
       *                                  licenses.
       */
      persistent?: boolean;
      /**
       * Very special, we can deliver a time shift for smooth. DO NOT USE unless you are
       *                                  told so.
       */
      timeShift?: boolean;
      /**
       * Use this if you really want to play live and does not care about the epg even if
       *                                  one exist.
       *                                  DO NOT USE unless you are told so.
       */
      live?: boolean;
      /**
       * Use this to filter out higher bitrates. Note that this requires backend
       *                                  configuration for
       *                                  your organization.
       */
      maxResolution?: string;
      /**
       * Use this with value true if you only want to include audio tracks in the
       *                                  response.
       * @default false
       */
      audioOnly?: boolean;
      /**
       * Use this if you want to include only video tracks with a max frame rate.
       * @format int32
       */
      maxFrameRate?: number;
      /**
       * Use this to provide a start time when playing a channel. Should be used when
       *                                  there is no
       *                                  epg available.
       *                                  Format: ISO_DATE_TIME example 2021-01-31T00:00:00Z
       *                                  Experimental, do not use unless told so.
       */
      startTime?: string;
      /**
       * Use this to provide an end time when playing a channel. Should be used when there
       *                                  is no epg
       *                                  available.
       *                                  Format: ISO_DATE_TIME example 2021-01-31T00:00:00Z
       *                                  Experimental, do not use unless told so.
       */
      endTime?: string;
      /**
       * Provide GPS based geo-location for location based ad targeting (optional) e.g.
       *                                  latitude=33.543682. Used for SSAI.
       * @format double
       */
      latitude?: number;
      /**
       * Provide GPS based geo-location for location based ad targeting (optional) e.g.
       *                                  longitude=-86.779633. Used for SSAI.
       * @format double
       */
      longitude?: number;
      /** Indicate whether player is muted or not. Used for SSAI. */
      mute?: boolean;
      /**
       * A consent string passed from various Consent Management Platforms (CMP’s). Used
       *                                  for SSAI.
       */
      consent?: string;
      /** Manufacturer of device such as Apple or Samsung. Used for SSAI. */
      deviceMake?: string;
      /** User device ID. Used for SSAI. */
      ifa?: string;
      /** A flag for European Union traffic consenting to advertising. Used for SSAI. */
      gdprOptin?: boolean;
      /** User id. Used for SSAI. */
      uid?: string;
      /**
       * Screen Resolution (width). Used for SSAI.
       * @format int32
       */
      width?: number;
      /**
       * Screen Resolution (height). Used for SSAI.
       * @format int32
       */
      height?: number;
      /** App bundle. Used for SSAI. */
      appBundle?: string;
      /** App name. Used for SSAI. */
      appName?: string;
      /** App store URL. Used for SSAI. */
      appStoreUrl?: string;
      /** Page Url. Used for SSAI. */
      pageUrl?: string;
      /** Channel Partner. Domain where player is embedded. Used for SSAI. */
      domain?: string;
      /** Auto play. Used for SSAI. */
      autoplay?: boolean;
      /** Device type. Used for SSAI. */
      deviceType?: string;
      /** Device model. Used for SSAI. */
      deviceModel?: string;
      /** A flag for US consent for advertising. Used for SSAI. */
      ccpaConsent?: boolean;
      /**
       * A comma-separated priority list for supported formats for playback, first value
       *                                  has highest priority. Supported values are hls, dash, mss, mp3, aac. First value
       *                                  will
       *                                  always be used for SSAI.
       */
      supportedFormats?: string;
      /**
       * A comma-separated list for supported DRM providers for playback.
       *                                  Supported values are widevine, fairplay, playready.
       */
      supportedDrms?: string;
      /** True if the user opted-out of ad tracking. Used for SSAI. */
      limitAdTracking?: boolean;
      /** Provide material profile if you want to play a version used for a specific purpose. You need to know what profile to use. */
      materialProfile?: string;
      /** A comma-seperated list for sending additional custom non-SDK supported SSAI paramaters. Used for SSAI. */
      custom?: string[];
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiPlayResponseV2, void>({
      path: `/v2/customer/${customerUnit}/businessunit/${businessUnit}/entitlement/${assetId}/play`,
      method: "GET",
      query: query,
      secure: true,
      ...params
    });
  /**
   * @description Should at the moment only be used in white label apps on the web. <p> Needs to be formalized and approved before used by any other client than MOTT white label app for the web. Returns two lists. All available products for the organization unit will be in any of them. The account can be null. This means that only products allowed for anonymous will be returned in entitled list. <p> - entitled. Contains all the products the account has access to. - notEntitled. Contains all the products the account has not access to.
   *
   * @tags Entitlements
   * @name AccountProducts
   * @summary EXPERIMENTAL.
   * @request GET:/v2/customer/{customerUnit}/businessunit/{businessUnit}/entitlement/accountproduct
   */
  accountProducts = (
    customerUnit: string,
    businessUnit: string,
    query?: {
      /** The time to be used when checking entitlement. */
      time?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customerUnit}/businessunit/${businessUnit}/entitlement/accountproduct`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Entitlements
   * @name AvailabilityKeys
   * @summary Returns all the availability keys for a given account
   * @request GET:/v2/customer/{customerUnit}/businessunit/{businessUnit}/entitlement/availabilitykey
   */
  availabilityKeys = (
    customerUnit: string,
    businessUnit: string,
    query?: {
      /** The time to be used when checking entitlement. */
      time?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, AvailabilityKeys>({
      path: `/v2/customer/${customerUnit}/businessunit/${businessUnit}/entitlement/availabilitykey`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * @description <p>
   *
   * @tags Authentication
   * @name LoginGigya
   * @summary Performs a login using a Gigya JWT.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/gigyaLogin
   */
  loginGigya = (
    customer: string,
    businessUnit: string,
    data: ApiGigyaAuthenticationRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiLoginResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/gigyaLogin`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name GetOauthAuth
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauth/auth
   */
  getOauthAuth = (
    customer: string,
    businessUnit: string,
    query?: {
      client_id?: string;
      redirect_uri?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/oauth/auth`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name GetOauthRedir
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauth/redir
   */
  getOauthRedir = (
    customer: string,
    businessUnit: string,
    query?: {
      state?: string;
      code?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/oauth/redir`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * @description <p> The password algotithms to use is retrieved vu the System resource, get system configuration API.
   *
   * @tags Authentication
   * @name LoginV2
   * @summary Performs a login.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/login
   */
  loginV2 = (customer: string, businessUnit: string, data: ApiAuthenticationRequest, params: RequestParams = {}) =>
    this.request<ApiLoginResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/login`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name Logout
   * @summary Logout.
   * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/auth/login
   * @secure
   */
  logout = (
    customer: string,
    businessUnit: string,
    query?: {
      /** @default false */
      fromAllDevice?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<EmptyResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/login`,
      method: "DELETE",
      query: query,
      secure: true,
      ...params
    });
  /**
   * @description This request is privileged and thus needs server to server authentication.
   *
   * @tags Authentication
   * @name ExternalUserSession
   * @summary Creates a session for an external user - a user known only by the caller.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/externalusersession
   */
  externalUserSession = (
    customer: string,
    businessUnit: string,
    data: ApiExternalUserSessionRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiCreateSessionResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/externalusersession`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * @description <p>
   *
   * @tags Authentication
   * @name LoginPrimetime
   * @summary Performs a login using a Adobe Primetime media token.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/adobePrimetimeLogin
   */
  loginPrimetime = (
    customer: string,
    businessUnit: string,
    data: ApiPrimetimeAuthenticationRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiLoginResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/adobePrimetimeLogin`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * @description If the user is the account's owner, then all the sessions of the account will be deleted. If a deleted session was created with 'userSession' : true, then the history of that session will not be revealed in any forthcoming sessions with this username. This request is privileged and thus needs server to server authentication.
   *
   * @tags Authentication
   * @name DeleteSessionsV2
   * @summary Deletes all sessions created by a user.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/session/delete
   */
  deleteSessionsV2 = (
    customer: string,
    businessUnit: string,
    data: ApiDeleteUsersSessionsRequest,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/session/delete`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * @description <p>
   *
   * @tags Authentication
   * @name LoginFirebase
   * @summary EXPERIMENTAL Performs a login using a Firebase access token.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/firebaseLogin
   */
  loginFirebase = (
    customer: string,
    businessUnit: string,
    data: ApiFirebaseAuthenticationRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiLoginResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/firebaseLogin`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AnonymousSessionV2
   * @summary Creates an anonymous session.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/anonymous
   */
  anonymousSessionV2 = (
    customer: string,
    businessUnit: string,
    data: ApiAnonymousSessionRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiAnonymousSessionResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/anonymous`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * @description Checks if the session is still valid. If the session is marked "overTheDeviceLimit" ths session is valid but may only be used to list and delete devices. By deleting another device the "overTheDeviceLimit" will be cleared.
   *
   * @tags Authentication
   * @name ValidateSessionToken
   * @summary Validate session.
   * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/auth/session
   * @secure
   */
  validateSessionToken = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<ApiSessionResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/session`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * @description This request is privileged and thus needs server to server authentication.
   *
   * @tags Authentication
   * @name SessionV2
   * @summary Creates a session for a API-Key user.
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/session
   */
  sessionV2 = (customer: string, businessUnit: string, data: ApiApiKeyUserSessionRequest, params: RequestParams = {}) =>
    this.request<ApiCreateSessionResponse, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/session`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name LoginOauth
   * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauthLogin
   */
  loginOauth = (
    customer: string,
    businessUnit: string,
    data: ApiOauthAuthenticationRequest,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v2/customer/${customer}/businessunit/${businessUnit}/auth/oauthLogin`,
      method: "POST",
      body: data,
      ...params
    });
}
