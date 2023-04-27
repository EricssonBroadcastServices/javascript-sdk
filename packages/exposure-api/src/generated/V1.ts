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
  ApiActiveChannels,
  ApiAsset,
  ApiAssetList,
  ApiAssetListBulk,
  ApiAssetListItemRequest,
  ApiAssetListItemResponse,
  ApiAutocompleteItem,
  ApiCarousel,
  ApiChannelStatus,
  ApiConfigFile,
  ApiConfigFilesResponse,
  ApiContinueUph2Assets,
  ApiEpgSearchHits,
  APIErrorMessage,
  ApiGetAllUserContentRatingsForAssetResponse,
  ApiGetAllUserContentRatingsForUserResponse,
  ApiGetUserContentRatingResponse,
  ApiHtmlDocument,
  ApiLastViewedOffsetList,
  ApiLocation,
  ApiPreferencesListResponse,
  ApiPutUserContentRatingRequest,
  ApiRecommendedAssets,
  ApiRecommendedWatchNext,
  ApiSearchList,
  ApiSeason,
  ApiSeasonList,
  ApiSetUserPreferenceRequest,
  ApiSystemConfig,
  ApiTagList,
  ApiTagType,
  ApiUserPreferenceResponse,
  ExportAssetsParamsAssetType,
  GetAssetParamsFieldSet,
  GetAssetsParamsAssetType,
  GetAssetsParamsDeviceType,
  GetAssetsParamsFieldSet,
  GetCarouselParamsFieldSet,
  GetCarouselsForGroupParamsFieldSet,
  GetCollectionEntriesParamsFieldSet,
  GetCollectionEntriesParamsSortOrder,
  GetDocumentParamsDocumentId,
  GetEpisodesParamsFieldSet,
  GetSeasonByIdParamsFieldSet,
  GetSeasonParamsFieldSet,
  GetSeasonsForTvShowParamsFieldSet,
  GetSeasonsParamsFieldSet,
  GetUniqueTagsFromAssetsParamsAssetType,
  SearchEpgParamsFieldSet,
  SearchParamsFieldSet,
  String,
  TimeResponse,
  WatchedTvShowResponse
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class V1<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Gets the current server UTC time.
   *
   * @tags Time
   * @name Time
   * @summary Get time.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/time
   */
  time = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<TimeResponse, APIErrorMessage>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/time`,
      method: "GET",
      ...params
    });
  /**
   * @description Get location information based on caller IP-address.
   *
   * @tags Location
   * @name Get1
   * @summary Get location.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/location
   */
  get1 = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<ApiLocation, any>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/location`,
      method: "GET",
      ...params
    });
  /**
   * No description
   *
   * @tags Tag
   * @name GetTagById
   * @summary Gets a tag by id.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/tag/{tagId}
   */
  getTagById = (customer: string, businessUnit: string, tagId: string, params: RequestParams = {}) =>
    this.request<ApiTagType, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/tag/${tagId}`,
      method: "GET",
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Tag
   * @name GetUniqueTagsFromAssets
   * @summary Lists all unique tags of a given scheme that are referenced by at least one asset.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/tag/asset
   */
  getUniqueTagsFromAssets = (
    customer: string,
    businessUnit: string,
    query: {
      tagType: string;
      /** If we should only return assets that have publications on this service */
      service?: string;
      /**
       * The optional query to filter by. In the elasticsearch query string query format,
       *                               I.E: "tags.genres:action AND localized.en-us.title:armageddon"
       */
      query?: string;
      /** The asset type to filter by. */
      assetType?: GetUniqueTagsFromAssetsParamsAssetType;
      /** If we should only return assets that are not geo blocking in this country */
      allowedCountry?: string;
      /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
      parentalRatings?: string;
      /**
       * The optional query to filter by in fields nested under publications.devices. In the
       *                               elasticsearch query string query format,
       *                               I.E: "publications.devices.rights.threeGBlocked:false AND
       *                               publications.devices.os:IOS"
       */
      deviceQuery?: string;
      /**
       * The optional query to filter by in fields nested under publications except
       *                               publications.devices. In the elasticsearch query string query format,
       *                               I.E: "publications.rights.wifiBlocked:true"
       */
      publicationQuery?: string;
      /** If we should only return assets that have publications on any of these products */
      products?: string[];
      /**
       * If we should only return assets that are at the moment published
       * @default true
       */
      onlyPublished?: boolean;
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
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiTagList>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/tag/asset`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Tag
   * @name ListTags
   * @summary Lists all tags.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/tag
   */
  listTags = (
    customer: string,
    businessUnit: string,
    query?: {
      /** The scheme of the tags. */
      scheme?: string;
      /** The sort parameter in the format of first,-second. */
      sort?: string;
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
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiTagList, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/tag`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Document
   * @name GetDocument
   * @summary Gets document.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/document
   */
  getDocument = (
    customer: string,
    businessUnit: string,
    query: {
      /** Which document to fetch */
      documentId: GetDocumentParamsDocumentId;
      customDocumentName?: string;
      /** ISO 639-1 language code. If not stated or not supported fall back to other languages will be performed. */
      preferredLanguage?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiHtmlDocument, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/document`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * @description paymentType. accountConfirmationRequired, if true, the user need to confirm the self service created user with token from mail/sms. allowAccessWithoutLogin, if true, the user may get limited access without being logged in. currencies, valid currencies. displayLocales, valid locales. informationCollectionConsentDate, date which teh user should hav give consent after. environment, PRESTAGE or PRODUCTION
   *
   * @tags System
   * @name GetSystemConfig
   * @summary Get system configuration for bu.
   * @request GET:/v1/customer/{customerUnit}/businessunit/{businessUnit}/systemConfig
   */
  getSystemConfig = (
    customerUnit: string,
    businessUnit: string,
    query?: {
      /** @default false */
      paymentMethodPreview?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiSystemConfig>({
      path: `/v1/customer/${customerUnit}/businessunit/${businessUnit}/systemConfig`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags CustomerConfig
   * @name GetConfigFile
   * @summary Gets a JSON configuration file.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/config/{fileName}
   */
  getConfigFile = (
    customer: string,
    businessUnit: string,
    fileName: string,
    query?: {
      /** @format int32 */
      version?: number;
      /** @default false */
      paymentMethodPreview?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiConfigFile>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/config/${fileName}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags CustomerConfig
   * @name GetConfigCuFile
   * @summary Gets a JSON configuration file stored on customer level.
   * @request GET:/v1/customer/{customer}/config/{fileName}
   */
  getConfigCuFile = (
    customer: string,
    fileName: string,
    query?: {
      /**
       * The version of the file to get.
       * @format int32
       */
      version?: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiConfigFile>({
      path: `/v1/customer/${customer}/config/${fileName}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags CustomerConfig
   * @name GetConfigFilesCu
   * @summary Lists existing configuration files on customer level.
   * @request GET:/v1/customer/{customer}/config
   */
  getConfigFilesCu = (customer: string, params: RequestParams = {}) =>
    this.request<any, ApiConfigFilesResponse>({
      path: `/v1/customer/${customer}/config`,
      method: "GET",
      ...params
    });
  /**
   * @description Uses the host parameter to figure out the business unit.
   *
   * @tags CustomerConfig
   * @name GetConfigFileCustomDomainInPath
   * @summary Gets a JSON configuration file.
   * @request GET:/v1/config/{fileId}/origin/{host}
   */
  getConfigFileCustomDomainInPath = (
    fileId: string,
    host: string,
    query?: {
      /** @default false */
      paymentMethodPreview?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiConfigFile>({
      path: `/v1/config/${fileId}/origin/${host}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags CustomerConfig
   * @name GetConfigFiles
   * @summary Lists existing configuration files.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/config
   */
  getConfigFiles = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, ApiConfigFilesResponse>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/config`,
      method: "GET",
      ...params
    });
  /**
   * No description
   *
   * @tags Rating
   * @name GetUserContentRating
   * @summary Get rating of an asset given by the currently logged in user.
   * @request GET:/v1/customer/{customerUnit}/businessunit/{businessUnit}/rating/asset/{assetId}
   * @secure
   */
  getUserContentRating = (customerUnit: string, businessUnit: string, assetId: string, params: RequestParams = {}) =>
    this.request<ApiGetUserContentRatingResponse, void>({
      path: `/v1/customer/${customerUnit}/businessunit/${businessUnit}/rating/asset/${assetId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Rating
   * @name PutUserContentRating
   * @summary Create/Update a rating for an asset given by currently logged in user.
   * @request PUT:/v1/customer/{customerUnit}/businessunit/{businessUnit}/rating/asset/{assetId}
   * @secure
   */
  putUserContentRating = (
    customerUnit: string,
    businessUnit: string,
    assetId: string,
    data: ApiPutUserContentRatingRequest,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v1/customer/${customerUnit}/businessunit/${businessUnit}/rating/asset/${assetId}`,
      method: "PUT",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Rating
   * @name DeleteUserContentRating
   * @summary Delete an asset rating given by currently logged in user.
   * @request DELETE:/v1/customer/{customerUnit}/businessunit/{businessUnit}/rating/asset/{assetId}
   * @secure
   */
  deleteUserContentRating = (customerUnit: string, businessUnit: string, assetId: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v1/customer/${customerUnit}/businessunit/${businessUnit}/rating/asset/${assetId}`,
      method: "DELETE",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Rating
   * @name GetAllUserContentRatingsForAsset
   * @summary Get all ratings for an asset.
   * @request GET:/v1/customer/{customerUnit}/businessunit/{businessUnit}/rating/asset/{assetId}/all
   */
  getAllUserContentRatingsForAsset = (
    customerUnit: string,
    businessUnit: string,
    assetId: string,
    params: RequestParams = {}
  ) =>
    this.request<ApiGetAllUserContentRatingsForAssetResponse[], void>({
      path: `/v1/customer/${customerUnit}/businessunit/${businessUnit}/rating/asset/${assetId}/all`,
      method: "GET",
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Rating
   * @name GetAllUserContentRatingsForUser
   * @summary Give all asset ratings given by currently logged in user.
   * @request GET:/v1/customer/{customerUnit}/businessunit/{businessUnit}/rating/all
   * @secure
   */
  getAllUserContentRatingsForUser = (customerUnit: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<ApiGetAllUserContentRatingsForUserResponse[], void>({
      path: `/v1/customer/${customerUnit}/businessunit/${businessUnit}/rating/all`,
      method: "GET",
      secure: true,
      format: "json",
      ...params
    });
  /**
   * @description This request is privileged and thus needs server to server authentication.
   *
   * @tags Xport
   * @name ExportAssets
   * @summary Get all assets.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/export/asset
   */
  exportAssets = (
    customer: string,
    businessUnit: string,
    query?: {
      /** The asset type to filter by. */
      assetType?: ExportAssetsParamsAssetType;
      /**
       * The number of items to show per page
       * @format int32
       * @default 1000
       */
      pageSize?: number;
      /**
       * Created time (epoch millis) to start listing from.
       * @format int64
       */
      createdAfter?: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiAssetListBulk>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/export/asset`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Preferences
   * @name GetPreferences
   * @summary Gets key value pair of preferences for a user.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences
   * @secure
   */
  getPreferences = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<ApiUserPreferenceResponse, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/preferences`,
      method: "GET",
      secure: true,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Preferences
   * @name SetPreferences
   * @summary Set key value pair of preferences for a user.
   * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences
   * @secure
   */
  setPreferences = (
    customer: string,
    businessUnit: string,
    data: ApiSetUserPreferenceRequest,
    params: RequestParams = {}
  ) =>
    this.request<String, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/preferences`,
      method: "POST",
      body: data,
      secure: true,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Preferences
   * @name AddToList
   * @summary Adds an item to a list.
   * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag/{id}
   * @secure
   */
  addToList = (
    customer: string,
    businessUnit: string,
    list: string,
    id: string,
    data: ApiAssetListItemRequest,
    params: RequestParams = {}
  ) =>
    this.request<String, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/preferences/list/${list}/tag/${id}`,
      method: "POST",
      body: data,
      secure: true,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Preferences
   * @name DeleteFromList
   * @summary Deletes an item from a list.
   * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag/{id}
   * @secure
   */
  deleteFromList = (customer: string, businessUnit: string, list: string, id: string, params: RequestParams = {}) =>
    this.request<String, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/preferences/list/${list}/tag/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Preferences
   * @name GetList
   * @summary Gets a list for a user.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag
   * @secure
   */
  getList = (
    customer: string,
    businessUnit: string,
    list: string,
    query?: {
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiPreferencesListResponse[], void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/preferences/list/${list}/tag`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Preferences
   * @name GetAssetList
   * @summary Gets an asset list for a user.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset
   * @secure
   */
  getAssetList = (
    customer: string,
    businessUnit: string,
    list: string,
    query?: {
      /**
       * The maximum number of assets to return.
       * @format int32
       */
      limit?: number;
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiAssetListItemResponse[], void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/preferences/list/${list}/asset`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Preferences
   * @name GetFromAssetList
   * @summary Gets an item from the asset list.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset/{assetId}
   * @secure
   */
  getFromAssetList = (
    customer: string,
    businessUnit: string,
    list: string,
    assetId: string,
    query?: {
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiAssetListItemResponse, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/preferences/list/${list}/asset/${assetId}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Preferences
   * @name AddToAssetList
   * @summary Adds an item to the asset list.
   * @request POST:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset/{assetId}
   * @secure
   */
  addToAssetList = (
    customer: string,
    businessUnit: string,
    list: string,
    assetId: string,
    data: ApiAssetListItemRequest,
    params: RequestParams = {}
  ) =>
    this.request<String, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/preferences/list/${list}/asset/${assetId}`,
      method: "POST",
      body: data,
      secure: true,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Preferences
   * @name DeleteFromAssetList
   * @summary Deletes an item from the asset list.
   * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/asset/{assetId}
   * @secure
   */
  deleteFromAssetList = (
    customer: string,
    businessUnit: string,
    list: string,
    assetId: string,
    params: RequestParams = {}
  ) =>
    this.request<String, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/preferences/list/${list}/asset/${assetId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Season
   * @name GetSeasonById
   * @summary Gets a specific season by id.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season/{seasonId}
   */
  getSeasonById = (
    customer: string,
    businessUnit: string,
    seasonId: string,
    query?: {
      /** Set to true to include episodes for the season in the response. */
      includeEpisodes?: boolean;
      /**
       * The set of fields to include by default.
       * @default "ALL"
       */
      fieldSet?: GetSeasonByIdParamsFieldSet;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** @default true */
      onlyPublished?: boolean;
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiSeason, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/season/${seasonId}`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Season
   * @name GetSeasons
   * @summary Lists seasons
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/season
   */
  getSeasons = (
    customer: string,
    businessUnit: string,
    query?: {
      /** Set to true to include episodes for the seasons in the response. */
      includeEpisodes?: boolean;
      /** The season ids to filter by. */
      seasonIds?: string[];
      /** The sort parameter in the format of first,-second. */
      sort?: string;
      /**
       * The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2.
       *                               Currently This only applies to the episodes if includeEpisodes=true. If
       *                               includeEpisodes = false, then this has no effect.
       */
      parentalRatings?: string;
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
       * The set of fields to include by default.
       * @default "ALL"
       */
      fieldSet?: GetSeasonsParamsFieldSet;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** @default true */
      onlyPublished?: boolean;
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiSeasonList, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/season`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * @description A carousel is a filter on the assets. A group can be anything that is grouping the carousels, such as the "index page" etc.
   *
   * @tags Carousel
   * @name GetCarouselsForGroup
   * @summary Gets carousels.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/carouselgroup/{groupId}
   */
  getCarouselsForGroup = (
    customer: string,
    businessUnit: string,
    groupId: string,
    query?: {
      /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
      parentalRatings?: string;
      /**
       * The number of items to show per page. This controls the number of items in each
       *                               carousel, all carousels are always returned.
       * @format int32
       * @default 20
       */
      pageSize?: number;
      /**
       * The page number.
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /**
       * The set of fields to include by default.
       * @default "PARTIAL"
       */
      fieldSet?: GetCarouselsForGroupParamsFieldSet;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** If we should only return assets that have publications on this service */
      service?: string;
      /**
       * If we should only return assets that are at the moment published. Default = false, of compatibility reasons
       * @default false
       */
      onlyPublished?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiCarousel[]>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/carouselgroup/${groupId}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Carousel
   * @name GetCarouselGroups
   * @summary Gets all groups that have been created for this business unit.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/carouselgroup
   */
  getCarouselGroups = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, String[]>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/carouselgroup`,
      method: "GET",
      ...params
    });
  /**
   * No description
   *
   * @tags Carousel
   * @name GetCarousel
   * @summary Gets a specific carousel by id.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/carouselgroup/{groupId}/carousel/{carouselId}
   */
  getCarousel = (
    customer: string,
    businessUnit: string,
    groupId: string,
    carouselId: string,
    query?: {
      /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
      parentalRatings?: string;
      /**
       * The number of items to show per page
       * @format int32
       * @default 20
       */
      pageSize?: number;
      /**
       * The page number.
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /**
       * The set of fields to include by default.
       * @default "PARTIAL"
       */
      fieldSet?: GetCarouselParamsFieldSet;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** If we should only return assets that have publications on this service */
      service?: string;
      /**
       * If we should only return assets that are at the moment published. Default = false, of compatibility reasons
       * @default false
       */
      onlyPublished?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiCarousel[]>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/carouselgroup/${groupId}/carousel/${carouselId}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * @description <p> Status of a channel includes whether it is available (in the case of virtual channels) and the currently playing assets.
   *
   * @tags Epg
   * @name GetChannelStatus
   * @summary Gets channel status.
   * @request GET:/v1/customer/{customerUnit}/businessunit/{businessUnit}/channel/onnow/{channelId}
   */
  getChannelStatus = (
    customerUnit: string,
    businessUnit: string,
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
  ) =>
    this.request<ApiChannelStatus, void>({
      path: `/v1/customer/${customerUnit}/businessunit/${businessUnit}/channel/onnow/${channelId}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * @description <p> Status of a channel includes whether it is available (in the case of virtual channels) and the currently playing assets. This endpoint only considers active virtual channels.
   *
   * @tags Epg
   * @name GetActiveChannels
   * @summary Get active channel statuses.
   * @request GET:/v1/customer/{customerUnit}/businessunit/{businessUnit}/channel/onnow
   */
  getActiveChannels = (
    customerUnit: string,
    businessUnit: string,
    query?: {
      /**
       * Include future assets that start sooner than this many minutes ahead. Default value 0 returns only the currently playing asset of each channel
       * @format int32
       * @default 0
       */
      minutesForward?: number;
      /**
       * Number of channels per page
       * @format int32
       * @default 100
       */
      pageSize?: number;
      /**
       * Page number. Currently only supports one page
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /** Sort by the sorting title property of the given locale */
      sortingLocale?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiActiveChannels, void>({
      path: `/v1/customer/${customerUnit}/businessunit/${businessUnit}/channel/onnow`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Asset
   * @name GetAsset
   * @summary Gets an asset by asset id.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}
   */
  getAsset = (
    customer: string,
    businessUnit: string,
    assetId: string,
    query?: {
      /**
       * Set to true to include episodes for the asset in the response. Only applicable if the
       *                         asset is a tv show. Setting this to true will cause seasons to be includeSeasons true.
       */
      includeEpisodes?: boolean;
      /**
       * Set to true to include seasons for the asset in the response. Only applicable if the
       *                         asset is a tv show.
       */
      includeSeasons?: boolean;
      /**
       * The set of fields to include by default.
       * @default "ALL"
       */
      fieldSet?: GetAssetParamsFieldSet;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** @default true */
      onlyPublished?: boolean;
      parentalRatings?: string;
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiAsset, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Asset
   * @name GetPreviousCollectionEntry
   * @summary Gets the next entry of a collection.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{collectionId}/collectionentries/{referenceEntryId}/previous
   */
  getPreviousCollectionEntry = (
    customer: string,
    businessUnit: string,
    collectionId: string,
    referenceEntryId: string,
    params: RequestParams = {}
  ) =>
    this.request<ApiAsset, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${collectionId}/collectionentries/${referenceEntryId}/previous`,
      method: "GET",
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Asset
   * @name GetNextCollectionEntry
   * @summary Gets the next entry of a collection.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{collectionId}/collectionentries/{referenceEntryId}/next
   */
  getNextCollectionEntry = (
    customer: string,
    businessUnit: string,
    collectionId: string,
    referenceEntryId: string,
    params: RequestParams = {}
  ) =>
    this.request<ApiAsset, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${collectionId}/collectionentries/${referenceEntryId}/next`,
      method: "GET",
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Asset
   * @name GetEpisodes
   * @summary Gets episodes for a season.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}/episode
   */
  getEpisodes = (
    customer: string,
    businessUnit: string,
    assetId: string,
    season: number,
    query?: {
      /**
       * The set of fields to include by default.
       * @default "PARTIAL"
       */
      fieldSet?: GetEpisodesParamsFieldSet;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
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
      /** @default true */
      onlyPublished?: boolean;
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiAssetList, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}/season/${season}/episode`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Asset
   * @name GetCollectionEntries
   * @summary Gets the entries of a collection.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/collectionentries
   */
  getCollectionEntries = (
    customer: string,
    businessUnit: string,
    assetId: string,
    query?: {
      /**
       * The set of fields to include by default.
       * @default "PARTIAL"
       */
      fieldSet?: GetCollectionEntriesParamsFieldSet;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
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
      /** @default true */
      onlyPublished?: boolean;
      service?: string;
      /**
       * Sort entries by the sort order parameter on the collection reference. Sort parameter is the
       *                        tiebreaker.
       */
      sortOrder?: GetCollectionEntriesParamsSortOrder;
      /** Sort order. Used as tiebreaker if naturalSortOrder is specified. */
      sort?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiAssetList, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}/collectionentries`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * @description The thumbnail will be generated from the video belonging to the asset and based on provided time. This endpoint will always return a 307 redirect to another url where the thumbnail is actually available.
   *
   * @tags Asset
   * @name GetAssetThumbnail
   * @summary Get a thumbnail for an asset.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/thumbnail
   */
  getAssetThumbnail = (
    customer: string,
    businessUnit: string,
    assetId: string,
    query?: {
      /**
       * The time to use when creating the thumbnail. It can have two different formats. It can be
       *                      a wall clock time like '2021-02-02T10:53:35.400Z'. This assumes that the
       *                      asset has a wall clock time. It can also be a duration, like PT30M20S, and
       *                      then it will be used as an actual time in th video.
       */
      time?: string;
      /**
       * An optional width.
       * @format int32
       */
      w?: number;
      /**
       * An optional height
       * @format int32
       */
      h?: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}/thumbnail`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Asset
   * @name GetSeasonsForTvShow
   * @summary Gets seasons for an asset.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season
   */
  getSeasonsForTvShow = (
    customer: string,
    businessUnit: string,
    assetId: string,
    query?: {
      /**
       * @format int32
       * @default 50
       */
      pageSize?: number;
      /**
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      sort?: string;
      includeEpisodes?: boolean;
      /**
       * The set of fields to include by default.
       * @default "PARTIAL"
       */
      fieldSet?: GetSeasonsForTvShowParamsFieldSet;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** @default true */
      onlyPublished?: boolean;
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiSeasonList>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}/season`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Asset
   * @name GetSeason
   * @summary Gets a specific season.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/season/{season}
   */
  getSeason = (
    customer: string,
    businessUnit: string,
    assetId: string,
    season: number,
    query?: {
      /**
       * The set of fields to include by default.
       * @default "ALL"
       */
      fieldSet?: GetSeasonParamsFieldSet;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** @default true */
      onlyPublished?: boolean;
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiSeason, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}/season/${season}`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Asset
   * @name GetNextEpisode
   * @summary Gets the next episode relative to an episode.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/next
   */
  getNextEpisode = (customer: string, businessUnit: string, assetId: string, params: RequestParams = {}) =>
    this.request<ApiAsset, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}/next`,
      method: "GET",
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Asset
   * @name GetPreviousEpisode
   * @summary Gets the previous episode relative to an episode.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/previous
   */
  getPreviousEpisode = (customer: string, businessUnit: string, assetId: string, params: RequestParams = {}) =>
    this.request<ApiAsset, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}/previous`,
      method: "GET",
      format: "json",
      ...params
    });
  /**
   * @description <p> Main endpoint for listing/searching for assets. Make sure that calls to this endpoint are called with a limited set of parameter permutations to allow responses to be served from a cache.
   *
   * @tags Asset
   * @name GetAssets
   * @summary Lists assets.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/asset
   */
  getAssets = (
    customer: string,
    businessUnit: string,
    query?: {
      /** The asset type to filter by. */
      assetType?: GetAssetsParamsAssetType;
      /** The sort parameter in the format of first,-second. */
      sort?: string;
      /**
       * The optional query to filter by. In the elasticsearch query string query format,
       *                               I.E: "tags.genres:action AND localized.en-us.title:armageddon"
       */
      query?: string;
      /** The asset ids to filter by. */
      assetIds?: string[];
      /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
      parentalRatings?: string;
      /**
       * The number of items to show per page. Note that pageNumber * pageSize cannot exceed
       *                               10000 or an error will occur.
       * @format int32
       * @default 50
       */
      pageSize?: number;
      /**
       * The page number. Note that pageNumber * pageSize cannot exceed 10000 or an error
       *                               will occur.
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /**
       * The set of fields to include by default.
       * @default "PARTIAL"
       */
      fieldSet?: GetAssetsParamsFieldSet;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /**
       * If we should only return assets that are at the moment published
       * @default true
       */
      onlyPublished?: boolean;
      /**
       * Only return assets that are playable (has a publication.from) earlier than from
       *                               now+X hours and are published at the moment.
       * @format int32
       */
      playableWithinHours?: number;
      /** If we should only return assets that have publications on this service */
      service?: string;
      /** If we should only return assets that are not geo blocking in this country */
      allowedCountry?: string;
      /** If we should only return assets that are allowed to play on this device */
      deviceType?: GetAssetsParamsDeviceType;
      /**
       * The optional query to filter by in fields nested under publications.devices. In the
       *                               elasticsearch query string query format,
       *                               I.E: "publications.devices.rights.threeGBlocked:false AND
       *                               publications.devices.os:IOS"
       */
      deviceQuery?: string;
      /**
       * The optional query to filter by in fields nested under publications except
       *                               publications.devices. In the elasticsearch query string query format,
       *                               I.E: "publications.rights.wifiBlocked:true"
       */
      publicationQuery?: string;
      /** If we should only return assets that have publications on any of these products */
      products?: string[];
      /** Will only return assets that has an empty value in the field specified in this field */
      missingFieldsFilter?: string;
      /** @default false */
      includeTvShow?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiAssetList, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * No description
   *
   * @tags Recommender
   * @name GetRecommendationsForUser
   * @summary Get recommendations for a user.
   * @request GET:/v1/customer/{customerUnit}/businessunit/{businessUnit}/recommend/user
   * @secure
   */
  getRecommendationsForUser = (
    customerUnit: string,
    businessUnit: string,
    query?: {
      /** If we should only return assets that have publications on this service */
      service?: string;
      /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
      parentalRatings?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiRecommendedAssets, void>({
      path: `/v1/customer/${customerUnit}/businessunit/${businessUnit}/recommend/user`,
      method: "GET",
      query: query,
      secure: true,
      ...params
    });
  /**
   * @description Gets a list of assets to watch next in for example a playlist Not depending on user. Can be used for not logged in.
   *
   * @tags Recommender
   * @name GetRecommendationsForAsset
   * @summary Watch next.
   * @request GET:/v1/customer/{customerUnit}/businessunit/{businessUnit}/recommend/watchNext/{assetId}
   */
  getRecommendationsForAsset = (
    customerUnit: string,
    businessUnit: string,
    assetId: string,
    query?: {
      /** If we should only return assets that have publications on this service */
      service?: string;
      /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
      parentalRatings?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiRecommendedWatchNext, void>({
      path: `/v1/customer/${customerUnit}/businessunit/${businessUnit}/recommend/watchNext/${assetId}`,
      method: "GET",
      query: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Recommender
   * @name GetContinueWatching
   * @summary Get list of assets to continue watching
   * @request GET:/v1/customer/{customerUnit}/businessunit/{businessUnit}/recommend/continue
   * @secure
   */
  getContinueWatching = (
    customerUnit: string,
    businessUnit: string,
    query?: {
      /** If we should only return assets that have publications on this service */
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiContinueUph2Assets, void>({
      path: `/v1/customer/${customerUnit}/businessunit/${businessUnit}/recommend/continue`,
      method: "GET",
      query: query,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Search
   * @name Search
   * @summary Searches for a query.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
   */
  search = (
    customer: string,
    businessUnit: string,
    query: string,
    queryParams?: {
      /** The locale to search in. */
      locale?: string;
      /**
       * The comma separates list of types to search in.
       * @default "MOVIE,TV_SHOW"
       */
      types?: string;
      /**
       * The sort parameter in the format of first,-second. Defaults to sorting by
       *                               relevance.
       */
      sort?: string;
      /** The parental rating filter in the format of COUNTRY:RATING,COUNTRY:RATING2 */
      parentalRatings?: string;
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
      fieldSet?: SearchParamsFieldSet;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** @default true */
      onlyPublished?: boolean;
      allowedCountry?: string;
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiSearchList>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/search/query/${query}`,
      method: "GET",
      query: queryParams,
      ...params
    });
  /**
   * No description
   *
   * @tags Search
   * @name SearchEpg
   * @summary Searches the epg for a query.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/epg/{query}
   */
  searchEpg = (
    customer: string,
    businessUnit: string,
    query: string,
    queryParams: {
      /**
       * The millis to get from.
       * @format int64
       */
      from: number;
      /**
       * The millis to get to.
       * @format int64
       */
      to: number;
      /** The locale to search in. */
      locale?: string;
      /**
       * The sort parameter in the format of first,-second. Defaults to sorting by
       *                        relevance.
       */
      sort?: string;
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
      /** @default "PARTIAL" */
      fieldSet?: SearchEpgParamsFieldSet;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
      /** @default true */
      onlyPublished?: boolean;
      service?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiEpgSearchHits>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/search/epg/${query}`,
      method: "GET",
      query: queryParams,
      ...params
    });
  /**
   * No description
   *
   * @tags Search
   * @name Autocomplete
   * @summary Does prefix autocomplete for a query.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/autocomplete/{query}
   */
  autocomplete = (
    customer: string,
    businessUnit: string,
    query: string,
    queryParams?: {
      /** The locale to autocomplete in. */
      locale?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiAutocompleteItem[]>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/search/autocomplete/${query}`,
      method: "GET",
      query: queryParams,
      ...params
    });
  /**
   * No description
   *
   * @tags Search
   * @name GetSuggestions
   * @summary Gets spelling suggestions for a key.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/content/search/suggestions/{query}
   */
  getSuggestions = (
    customer: string,
    businessUnit: string,
    query: string,
    queryParams?: {
      /** The locale to autocomplete in. */
      locale?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiAutocompleteItem[]>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/content/search/suggestions/${query}`,
      method: "GET",
      query: queryParams,
      ...params
    });
  /**
   * @description The user has given consent to collection of personal information.
   *
   * @tags User
   * @name GiveConsent
   * @summary EXPERIMENTAL.
   * @request PUT:/v1/customer/{customer}/businessunit/{businessUnit}/user/consent
   * @secure
   */
  giveConsent = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/user/consent`,
      method: "PUT",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags UserPlayHistory
   * @name DeleteFromLastViewedAssetList
   * @summary Deletes an asset from the last viewed asset list.
   * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/lastviewed/asset/{assetId}
   * @secure
   */
  deleteFromLastViewedAssetList = (
    customer: string,
    businessUnit: string,
    assetId: string,
    params: RequestParams = {}
  ) =>
    this.request<String, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/userplayhistory/lastviewed/asset/${assetId}`,
      method: "DELETE",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags UserPlayHistory
   * @name GetLastViewedOffsetList
   * @summary Gets last viewed offset for assets for a user.
   * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/lastviewedoffset
   * @secure
   */
  getLastViewedOffsetList = (
    customer: string,
    businessUnit: string,
    query?: {
      /** The asset ids to filter by. */
      assetIds?: string[];
      /**
       * Return all bookmarks for the account and not only the ones for current user.
       *                        Default value false.
       * @default false
       */
      account?: boolean;
      /**
       * The number of items to show per page. Default value is 200.
       * @format int32
       * @default 200
       */
      pageSize?: number;
      /**
       * The page number. Default is 1.
       * @format int32
       * @default 1
       */
      pageNumber?: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiLastViewedOffsetList[], void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/userplayhistory/lastviewedoffset`,
      method: "GET",
      query: query,
      secure: true,
      ...params
    });
  /**
 * No description
 *
 * @tags UserPlayHistory
 * @name GetContinueWatchingTvShow
 * @summary EXPERIMENTAL
 Get the episode in progress
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/continue/tvshow/{tvshowid}
 * @secure
 */
  getContinueWatchingTvShow = (customer: string, businessUnit: string, tvshowid: string, params: RequestParams = {}) =>
    this.request<WatchedTvShowResponse, void>({
      path: `/v1/customer/${customer}/businessunit/${businessUnit}/userplayhistory/continue/tvshow/${tvshowid}`,
      method: "GET",
      secure: true,
      ...params
    });
}
