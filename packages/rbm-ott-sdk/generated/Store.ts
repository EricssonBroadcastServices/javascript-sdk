/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import {
  AddPaymentMethodResponse,
  AppStorePurchaseInitializeRequest,
  AppStorePurchaseInitializeResponse,
  AppStorePurchaseVerifyRequest,
  AppStorePurchaseVerifyResponse,
  Asset,
  GooglePlayPurchaseInitializeRequest,
  GooglePlayPurchaseInitializeResponse,
  GooglePlayPurchaseVerifyRequest,
  GooglePlayPurchaseVerifyResponse,
  InitialisePayment,
  InitializePaymentResponse,
  JsonAccount,
  PaymentMethod,
  PaymentMethods,
  ProductOfferingPurchases,
  ProductOfferingTransactions,
  ProductOfferingTransactionsProductOfferingPairList,
  PurchaseRequest,
  PurchaseResponse,
  PurchaseVerificationRequest,
  StoreProductOffering,
  StoreProductOfferings,
  StorePromotionProductOfferings,
  StorePurchaseTransaction,
  UpdatePaymentMethodRequest,
  UpdatePrederredPaymentMethodRequest
} from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Add payment method
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods
 * @secure
 * @response `200` `AddPaymentMethodResponse` Successful
 * @response `403` `AddPaymentMethodResponse` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION the business unit's CRM is not supported with this operation
 */
export async function addPaymentMethod(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<AddPaymentMethodResponse>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/paymentmethods`, ctx.baseUrl),
    headers: headers
  });
}
/**
 * @summary Cancel a subscription purchase, no more renewals will be done.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/subscriptions/{purchaseId}
 * @secure
 * @response `default` `void` success
 */
export async function cancelPurchaseSubscription(
  /** The product offering to purchase. */
  purchaseId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<void>({
    method: "DELETE",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase/subscriptions/${purchaseId}`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @summary Delete payment method
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods/{paymentMethodId}
 * @secure
 * @response `200` `void` Successful
 * @response `403` `void` FEATURE_NOT_ENABLED_FOR_BUSINESS_UNIT the business unit is not integrated with a payment provider
 */
export async function deleteStoredPaymentMethod(
  /** The id of the stored payment method */
  paymentMethodId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<void>({
    method: "DELETE",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/paymentmethods/${paymentMethodId}`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @summary Get all active asset purchases for account.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/assets
 * @secure
 * @response `default` `(Asset)[]` success
 */
export async function getAccountAssetPurchases(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<Asset[]>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase/assets`, ctx.baseUrl),
    headers: headers
  });
}
/**
 * @summary Get all transactions for account.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/account/transactions
 * @secure
 * @response `default` `ProductOfferingTransactions` success
 */
export async function getAccountTransactions(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ProductOfferingTransactions>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/account/transactions`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @summary Get all transactions for account paired with product offerings.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/account/transactions/productoffering
 * @secure
 * @response `default` `ProductOfferingTransactionsProductOfferingPairList` success
 */
export async function getAccountTransactionsWithProductOffering(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ProductOfferingTransactionsProductOfferingPairList>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/account/transactions/productoffering`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @description The end point will not reduce the offerings if they have unique products. { Product offering 1 -  Products: Animated Movies, Country: SE Product offering 2 - Products: Sci-Fi Movies, Country: Global Product offering 1 & 2 and will be returned. }
 * @summary Get country product offerings available for the specific voucher code.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productofferings/country/{countryCode}/voucher/{voucherCode}
 * @response `default` `(StorePromotionProductOfferings)[]` success
 */
export async function getCountryOfferingsByVoucher(
  /** The country code. */
  countryCode: string,
  /** The voucher code. */
  voucherCode: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<StorePromotionProductOfferings[]>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/productofferings/country/${countryCode}/voucher/${voucherCode}`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @summary Get currently active purchases of the user's account.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase
 * @secure
 * @response `default` `ProductOfferingPurchases` success
 */
export async function getOfferingPurchases(
  query?: {
    /** @default false */
    includeOfferingDetails?: boolean;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<ProductOfferingPurchases>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase`, ctx.baseUrl),
    headers: headers,
    query: query
  });
}
/**
 * @description Get available product offerings for location and payment service
 * @summary Get product offerings.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/store/productoffering/country/{countryCode}
 * @response `200` `(StoreProductOffering)[]` Successful
 */
export async function getOfferings(
  /** Current location ISO 3166 alpha-2 */
  countryCode: string,
  query?: {
    /**
     * Include product offerings that requires AssetId at purchase
     * @default true
     */
    includeSelectAssetProducts?: boolean;
    /** Payment provider */
    paymentProvider?: "appstore" | "external" | "googleplay" | "stripe";
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<StoreProductOffering[]>({
    method: "GET",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/productoffering/country/${countryCode}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: query
  });
}
/**
 * @summary Get product offerings available in the specified country, which also includes globally available product
offerings.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productoffering/country/{countryCode}
 * @response `default` `StoreProductOfferings` success
 */
export async function getOfferingsByCountry(
  /** The country code received with the location resource. */
  countryCode: string,
  query?: {
    /**
     * Filter on product offerings that requires assetId upon purchase
     * @default true
     */
    includeSelectAssetProducts?: boolean;
  },
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<StoreProductOfferings>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/productoffering/country/${countryCode}`,
      ctx.baseUrl
    ),
    headers: headers,
    query: query
  });
}
/**
 * @description This endpoint is to be only used if labels are used, which will be far from normal.
 * @summary Get product offerings available for this account's labels.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productoffering/label/{labelFilterId}
 * @response `200` `StoreProductOfferings` success
 * @response `404` `void` LABEL_FILTER_NOT_FOUND The provided labelFilterId was not found
 */
export async function getOfferingsByLabels(
  /** The labelFilterId received with the Label Resource. */
  labelFilterId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<StoreProductOfferings>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/productoffering/label/${labelFilterId}`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @description EXPERIMENTAL
 * @summary Get product offerings available for the specific voucher code.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productofferings/voucher/{voucherCode}
 * @secure
 * @response `default` `(StorePromotionProductOfferings)[]` success
 */
export async function getOfferingsByVoucher(
  /** The voucher code. */
  voucherCode: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<StorePromotionProductOfferings[]>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/productofferings/voucher/${voucherCode}`,
      ctx.baseUrl
    ),
    headers: headers
  });
}
/**
 * @summary Get all purchases for account including transactions
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/account/purchases
 * @secure
 * @response `default` `(StorePurchaseTransaction)[]` success
 */
export async function getPurchaseTransactions(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<StorePurchaseTransaction[]>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/account/purchases`, ctx.baseUrl),
    headers: headers
  });
}
/**
 * @summary Get stored payment methods
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods
 * @secure
 * @response `200` `PaymentMethods` Successful
 * @response `403` `PaymentMethods` FEATURE_NOT_ENABLED_FOR_BUSINESS_UNIT the business unit is not integrated with a payment provider
 */
export async function getStoredPaymentMethods(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<PaymentMethods>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/paymentmethods`, ctx.baseUrl),
    headers: headers
  });
}
/**
 * @description Returns valid payment types and price after any discount. Note: The behaviour and the result can change during the time.
 * @summary EXPERIMENTAL
Called to before initiating a new payment.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/initialize
 * @secure
 * @response `default` `InitializePaymentResponse` success
 */
export async function initialize(data: InitialisePayment, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<InitializePaymentResponse>({
    method: "POST",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase/initialize`,
      ctx.baseUrl
    ),
    headers: headers,
    body: data
  });
}
/**
 * @description Set up a purchase of specified Product Offering, using App Store. If the Product Offerings field productRequiresSelectAsset is true then a assetId must be provided.
 * @summary Initialize a App Store purchase
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/appstore/purchase/init/{productOfferingId}
 * @secure
 * @response `200` `AppStorePurchaseInitializeResponse` Successful
 * @response `400` `AppStorePurchaseInitializeResponse` Bad request
 */
export async function initializeAppStorePurchase(
  /** Id of product offering to purchase */
  productOfferingId: string,
  data: AppStorePurchaseInitializeRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<AppStorePurchaseInitializeResponse>({
    method: "POST",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/appstore/purchase/init/${productOfferingId}`,
      ctx.baseUrl
    ),
    headers: headers,
    body: data
  });
}
/**
 * @description Set up a purchase of specified Product Offering, using Google Play. If the Product Offerings field productRequiresSelectAsset is true then a assetId must be provided.
 * @summary Initialize a Google Play purchase
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/googleplay/purchase/init/{productOfferingId}
 * @secure
 * @response `200` `GooglePlayPurchaseInitializeResponse` Successful
 * @response `400` `GooglePlayPurchaseInitializeResponse` Bad request
 */
export async function initializeGooglePlayPurchase(
  /** Id of product offering to purchase */
  productOfferingId: string,
  data: GooglePlayPurchaseInitializeRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<GooglePlayPurchaseInitializeResponse>({
    method: "POST",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/googleplay/purchase/init/${productOfferingId}`,
      ctx.baseUrl
    ),
    headers: headers,
    body: data
  });
}
/**
 * @summary Purchase a productOffering.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/{productOfferingId}
 * @secure
 * @response `default` `PurchaseResponse` success
 */
export async function purchaseProductOffering(
  /** The product offering to purchase. */
  productOfferingId: string,
  data: PurchaseRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<PurchaseResponse>({
    method: "POST",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase/${productOfferingId}`,
      ctx.baseUrl
    ),
    headers: headers,
    body: data
  });
}
/**
 * @summary Update payment method
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods/{paymentMethodId}
 * @secure
 * @response `200` `PaymentMethod` Successful
 * @response `403` `PaymentMethod` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION the business unit's CRM is not supported with this operation
 */
export async function updatePaymentMethod(
  /** The id of the stored payment method */
  paymentMethodId: string,
  data: UpdatePaymentMethodRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<PaymentMethod>({
    method: "PUT",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/paymentmethods/${paymentMethodId}`,
      ctx.baseUrl
    ),
    headers: headers,
    body: data
  });
}
/**
 * @summary Update the preferred payment method
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods/preferred
 * @secure
 * @response `200` `JsonAccount` Successful
 * @response `403` `JsonAccount` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION the business unit's CRM is not supported with this operation
 */
export async function updatePreferredPaymentMethod(
  data: UpdatePrederredPaymentMethodRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<JsonAccount>({
    method: "PUT",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/paymentmethods/preferred`, ctx.baseUrl),
    headers: headers,
    body: data
  });
}
/**
 * @description Verifies that the purchase was successful and makes entilement if so.
 * @summary Verify a App Store purchase
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/appstore/purchase/{purchaseId}/verify
 * @secure
 * @response `200` `AppStorePurchaseVerifyResponse` Successful
 * @response `400` `AppStorePurchaseVerifyResponse` Bad request
 */
export async function verifyAppStorePurchase(
  /** The purchase id */
  purchaseId: string,
  data: AppStorePurchaseVerifyRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<AppStorePurchaseVerifyResponse>({
    method: "POST",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/appstore/purchase/${purchaseId}/verify`,
      ctx.baseUrl
    ),
    headers: headers,
    body: data
  });
}
/**
 * @description Verifies that the purchase was successful and makes entilement if so.
 * @summary Verify a Google Play purchase
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/googleplay/purchase/{purchaseId}/verify
 * @secure
 * @response `200` `GooglePlayPurchaseVerifyResponse` Successful
 * @response `400` `GooglePlayPurchaseVerifyResponse` Bad request
 */
export async function verifyGooglePlayPurchase(
  /** The purchase id */
  purchaseId: string,
  data: GooglePlayPurchaseVerifyRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<GooglePlayPurchaseVerifyResponse>({
    method: "POST",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/googleplay/purchase/${purchaseId}/verify`,
      ctx.baseUrl
    ),
    headers: headers,
    body: data
  });
}
/**
 * @description E.g. a redirect flow, where the purchaser has to authenticate to the card issuer. * Also, used to send additional data from the shopper if that's required.
 * @summary Verify a purchase of a productOffering if a "AUTHORIZED/REJECTED"-status is not given directly.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/{purchaseId}/verify
 * @secure
 * @response `default` `PurchaseResponse` success
 */
export async function verifyPayment(
  /** The purchase id. */
  purchaseId: string,
  data: PurchaseVerificationRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this[Symbol.for("_rbm_ctx_")] || this.context || this) as ServiceContext;
  return request<PurchaseResponse>({
    method: "POST",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase/${purchaseId}/verify`,
      ctx.baseUrl
    ),
    headers: headers,
    body: data
  });
}

export const StoreService = (context: ServiceContext) =>
  ({
    [Symbol.for("_rbm_ctx_")]: context,
    addPaymentMethod,
    cancelPurchaseSubscription,
    deleteStoredPaymentMethod,
    getAccountAssetPurchases,
    getAccountTransactions,
    getAccountTransactionsWithProductOffering,
    getCountryOfferingsByVoucher,
    getOfferingPurchases,
    getOfferings,
    getOfferingsByCountry,
    getOfferingsByLabels,
    getOfferingsByVoucher,
    getPurchaseTransactions,
    getStoredPaymentMethods,
    initialize,
    initializeAppStorePurchase,
    initializeGooglePlayPurchase,
    purchaseProductOffering,
    updatePaymentMethod,
    updatePreferredPaymentMethod,
    verifyAppStorePurchase,
    verifyGooglePlayPurchase,
    verifyPayment
  }) as const;
