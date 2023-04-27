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
  ApiAppStorePurchaseInitializeRequest,
  ApiAppStorePurchaseInitializeResponse,
  ApiAppStorePurchaseVerifyRequest,
  ApiAppStorePurchaseVerifyResponse,
  ApiAutocompleteItem2,
  ApiChangeEmailAndUserNameV3,
  ApiChangeEmailRequestV3,
  ApiChangePasswordResponse,
  ApiChangePwdV3,
  ApiCredentialsV3,
  APIErrorMessage,
  ApiGooglePlayPurchaseInitializeRequest,
  ApiGooglePlayPurchaseInitializeResponse,
  ApiGooglePlayPurchaseVerifyRequest,
  ApiGooglePlayPurchaseVerifyResponse,
  ApiMultiSearchResponse,
  ApiPinCodeResponse,
  ApiPinCodeSetRequest,
  ApiPinCodeValidationRequest,
  ApiSearchList,
  ApiSetPwdWithTokenV3,
  ApiStoreProductOffering,
  ApiUserAttributeRequest,
  ApiUserDetailsResponse,
  ApiUserSelfServiceCreateResponse,
  ApiUserSignupRequestV3,
  GetOfferingsV3ParamsPaymentProvider,
  LoginRequest,
  LoginResponse,
  SearchAssetV3ParamsFieldSet,
  SearchTagsV3ParamsFieldSet,
  SearchV3ParamsFieldSet,
  String
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class V3<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Login a registered user and get a valid sessionToken
   *
   * @tags Authentication
   * @name LoginV3
   * @summary Login user with username/password.
   * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/auth/login
   */
  loginV3 = (customer: string, businessUnit: string, data: LoginRequest, params: RequestParams = {}) =>
    this.request<LoginResponse, APIErrorMessage>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params
    });
  /**
   * @description Verifies that the purchase was successful and makes entilement if so.
   *
   * @tags Store
   * @name VerifyGooglePlayPurchase
   * @summary Verify a Google Play purchase
   * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/googleplay/purchase/{purchaseId}/verify
   * @secure
   */
  verifyGooglePlayPurchase = (
    customer: string,
    businessUnit: string,
    purchaseId: string,
    data: ApiGooglePlayPurchaseVerifyRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiGooglePlayPurchaseVerifyResponse, ApiGooglePlayPurchaseVerifyResponse>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/store/googleplay/purchase/${purchaseId}/verify`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params
    });
  /**
   * @description Set up a purchase of specified Product Offering, using Google Play. If the Product Offerings field productRequiresSelectAsset is true then a assetId must be provided.
   *
   * @tags Store
   * @name InitializeGooglePlayPurchase
   * @summary Initialize a Google Play purchase
   * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/googleplay/purchase/init/{productOfferingId}
   * @secure
   */
  initializeGooglePlayPurchase = (
    customer: string,
    businessUnit: string,
    productOfferingId: string,
    data: ApiGooglePlayPurchaseInitializeRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiGooglePlayPurchaseInitializeResponse, ApiGooglePlayPurchaseInitializeResponse>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/store/googleplay/purchase/init/${productOfferingId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params
    });
  /**
   * @description Verifies that the purchase was successful and makes entilement if so.
   *
   * @tags Store
   * @name VerifyAppStorePurchase
   * @summary Verify a App Store purchase
   * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/appstore/purchase/{purchaseId}/verify
   * @secure
   */
  verifyAppStorePurchase = (
    customer: string,
    businessUnit: string,
    purchaseId: string,
    data: ApiAppStorePurchaseVerifyRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiAppStorePurchaseVerifyResponse, ApiAppStorePurchaseVerifyResponse>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/store/appstore/purchase/${purchaseId}/verify`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params
    });
  /**
   * @description Set up a purchase of specified Product Offering, using App Store. If the Product Offerings field productRequiresSelectAsset is true then a assetId must be provided.
   *
   * @tags Store
   * @name InitializeAppStorePurchase
   * @summary Initialize a App Store purchase
   * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/appstore/purchase/init/{productOfferingId}
   * @secure
   */
  initializeAppStorePurchase = (
    customer: string,
    businessUnit: string,
    productOfferingId: string,
    data: ApiAppStorePurchaseInitializeRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiAppStorePurchaseInitializeResponse, ApiAppStorePurchaseInitializeResponse>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/store/appstore/purchase/init/${productOfferingId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params
    });
  /**
   * @description Get available product offerings for location and payment service
   *
   * @tags Store
   * @name GetOfferingsV3
   * @summary Get product offerings.
   * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/store/productoffering/country/{countryCode}
   */
  getOfferingsV3 = (
    customer: string,
    businessUnit: string,
    countryCode: string,
    query?: {
      /**
       * Include product offerings that requires AssetId at purchase
       * @default true
       */
      includeSelectAssetProducts?: boolean;
      /** Payment provider */
      paymentProvider?: GetOfferingsV3ParamsPaymentProvider;
    },
    params: RequestParams = {}
  ) =>
    this.request<ApiStoreProductOffering[], any>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/store/productoffering/country/${countryCode}`,
      method: "GET",
      query: query,
      format: "json",
      ...params
    });
  /**
   * @description EXPERIMENTAL. May change without notice.
   *
   * @tags Search
   * @name SearchAssetV3
   * @summary Prefix search on asset titles.
   * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/asset/query/{query}
   */
  searchAssetV3 = (
    customer: string,
    businessUnit: string,
    query: string,
    queryParams?: {
      /** The locales to search in. */
      locales?: string[];
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
      fieldSet?: SearchAssetV3ParamsFieldSet;
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
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/content/search/asset/query/${query}`,
      method: "GET",
      query: queryParams,
      ...params
    });
  /**
   * @description EXPERIMENTAL. May change without notice.
   *
   * @tags Search
   * @name SearchV3
   * @summary Prefix search on asset and tags.
   * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/query/{query}
   */
  searchV3 = (
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
      service?: string;
      tagResultSort?: string;
      /**
       * The number of items to show per page
       * @format int32
       * @default 50
       */
      pageSize?: number;
      /** The set of fields to include by default. */
      fieldSet?: SearchV3ParamsFieldSet;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiMultiSearchResponse>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/content/search/query/${query}`,
      method: "GET",
      query: queryParams,
      ...params
    });
  /**
   * @description EXPERMIENTAL. May change without notice.
   *
   * @tags Search
   * @name SearchTagsV3
   * @summary Prefix search on tag titles.
   * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/tag/query/{query}
   */
  searchTagsV3 = (
    customer: string,
    businessUnit: string,
    query: string,
    queryParams?: {
      /** The locales to search in. */
      locales?: string[];
      /** The schemes to autocomplete in. */
      scheme?: string[];
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
      fieldSet?: SearchTagsV3ParamsFieldSet;
      /** Comma separated list of fields to add to the response. */
      includeFields?: string;
      /** Comma separated list of fields to remove from the response. */
      excludeFields?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiSearchList>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/content/search/tag/query/${query}`,
      method: "GET",
      query: queryParams,
      ...params
    });
  /**
   * @description EXPERIMENTAL. May change without notice.
   *
   * @tags Search
   * @name AutocompleteAssetTitleV3
   * @summary Does prefix autocomplete on asset titles.
   * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/asset/title/autocomplete/{query}
   */
  autocompleteAssetTitleV3 = (
    customer: string,
    businessUnit: string,
    query: string,
    queryParams?: {
      /** The locale to autocomplete in. */
      locales?: string[];
      /**
       * The comma separates list of asset types to filter on.
       * @default "MOVIE,TV_SHOW"
       */
      types?: string;
      /** Filter on parental rating (format of COUNTRY:RATING,COUNTRY:RATING2) */
      parentalRatings?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiAutocompleteItem2[]>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/content/search/asset/title/autocomplete/${query}`,
      method: "GET",
      query: queryParams,
      ...params
    });
  /**
   * @description EXPERIMENTAL. May change without notice.
   *
   * @tags Search
   * @name AutocompleteTagTitleV3
   * @summary Does prefix autocomplete on tag titles.
   * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/content/search/tag/title/autocomplete/{query}
   */
  autocompleteTagTitleV3 = (
    customer: string,
    businessUnit: string,
    query: string,
    queryParams?: {
      /** The locales to autocomplete in. */
      locales?: string[];
      /** The schemes to autocomplete in. */
      scheme?: string[];
    },
    params: RequestParams = {}
  ) =>
    this.request<any, ApiAutocompleteItem2[]>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/content/search/tag/title/autocomplete/${query}`,
      method: "GET",
      query: queryParams,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name ChangeEmailV3
   * @summary Change email address that is not used as username.
   * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changeEmail
   * @secure
   */
  changeEmailV3 = (customer: string, businessUnit: string, data: ApiChangeEmailRequestV3, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/changeEmail`,
      method: "PUT",
      body: data,
      secure: true,
      ...params
    });
  /**
   * @description The provided code is matched with all defined pin codes. Returns a list of application specified grants of all successfully validated pin codes, if no one matches an empty list [] is returned.
   *
   * @tags User
   * @name ValidatePinCodes
   * @summary Validate all pin codes.
   * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/validate
   * @secure
   */
  validatePinCodes = (
    customer: string,
    businessUnit: string,
    data: ApiPinCodeValidationRequest,
    params: RequestParams = {}
  ) =>
    this.request<String[], void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/pincode/validate`,
      method: "POST",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name SetPasswordWithTokenV3
   * @summary Sets the users password using a token received at signup (without password) or password reset
   * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/signup/password/{token}
   */
  setPasswordWithTokenV3 = (
    customer: string,
    businessUnit: string,
    token: string,
    data: ApiSetPwdWithTokenV3,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/signup/password/${token}`,
      method: "PUT",
      body: data,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name GetPinCodes
   * @summary Get pin codes.
   * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode
   * @secure
   */
  getPinCodes = (customer: string, businessUnit: string, params: RequestParams = {}) =>
    this.request<ApiPinCodeResponse[], void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/pincode`,
      method: "GET",
      secure: true,
      ...params
    });
  /**
   * @description The id will be generated. If yoy want to specify the id, then instead create the code using the Update end point.
   *
   * @tags User
   * @name CreatePinCode
   * @summary Create a pin code.
   * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode
   * @secure
   */
  createPinCode = (customer: string, businessUnit: string, data: ApiPinCodeSetRequest, params: RequestParams = {}) =>
    this.request<ApiPinCodeResponse[], void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/pincode`,
      method: "POST",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name ChangeEmailAndUsernameV3
   * @summary Change email address and username.
   * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changeEmailAndUsername
   * @secure
   */
  changeEmailAndUsernameV3 = (
    customer: string,
    businessUnit: string,
    data: ApiChangeEmailAndUserNameV3,
    params: RequestParams = {}
  ) =>
    this.request<any, void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/changeEmailAndUsername`,
      method: "PUT",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name SetPinCode
   * @summary Update (or Create) a pin code.
   * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}
   * @secure
   */
  setPinCode = (
    customer: string,
    businessUnit: string,
    pincodeId: string,
    data: ApiPinCodeSetRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApiPinCodeResponse[], void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/pincode/pin/${pincodeId}`,
      method: "PUT",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name DeletePinCode
   * @summary Delete a pin code.
   * @request DELETE:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}
   * @secure
   */
  deletePinCode = (customer: string, businessUnit: string, pincodeId: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/pincode/pin/${pincodeId}`,
      method: "DELETE",
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name DeleteUserDetailsV3
   * @summary Delete personal data.
   * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/delete
   * @secure
   */
  deleteUserDetailsV3 = (customer: string, businessUnit: string, data: ApiCredentialsV3, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/delete`,
      method: "POST",
      body: data,
      secure: true,
      ...params
    });
  /**
   * @description Else if unConfirmed == false the user is logged in and session details are in the response.
   *
   * @tags User
   * @name CreateNewAccountV3
   * @summary If unConfirmed == true, then the user will receive an email with a confirmation link.
   * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/signup
   */
  createNewAccountV3 = (
    customer: string,
    businessUnit: string,
    data: ApiUserSignupRequestV3,
    params: RequestParams = {}
  ) =>
    this.request<ApiUserSelfServiceCreateResponse, void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/signup`,
      method: "POST",
      body: data,
      ...params
    });
  /**
   * @description Attributes NOT in the provided list will be untouched.
   *
   * @tags User
   * @name PutUserAttributes
   * @summary Update provided user attributes.
   * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/attributes
   * @secure
   */
  putUserAttributes = (
    customer: string,
    businessUnit: string,
    data: ApiUserAttributeRequest[],
    params: RequestParams = {}
  ) =>
    this.request<ApiUserDetailsResponse, void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/attributes`,
      method: "PUT",
      body: data,
      secure: true,
      ...params
    });
  /**
   * @description Returns a list of application specified grants if successfully validated, else an empty list [].
   *
   * @tags User
   * @name ValidatePinCode
   * @summary Validate a pin code.
   * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}/validate
   * @secure
   */
  validatePinCode = (
    customer: string,
    businessUnit: string,
    pincodeId: string,
    data: ApiPinCodeValidationRequest,
    params: RequestParams = {}
  ) =>
    this.request<String[], void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/pincode/pin/${pincodeId}/validate`,
      method: "POST",
      body: data,
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags User
   * @name ChangePasswordV3
   * @summary Change password.
   * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changePassword
   * @secure
   */
  changePasswordV3 = (customer: string, businessUnit: string, data: ApiChangePwdV3, params: RequestParams = {}) =>
    this.request<ApiChangePasswordResponse, void>({
      path: `/v3/customer/${customer}/businessunit/${businessUnit}/user/changePassword`,
      method: "PUT",
      body: data,
      secure: true,
      ...params
    });
}
