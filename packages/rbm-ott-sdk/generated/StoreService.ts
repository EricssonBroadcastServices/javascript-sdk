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
  AppStorePurchaseInitializeResponse,
  AppStorePurchaseVerifyResponse,
  Asset,
  GooglePlayPurchaseInitializeResponse,
  GooglePlayPurchaseVerifyResponse,
  InitializePaymentResponse,
  JsonAccount,
  PaymentMethod,
  PaymentMethods,
  ProductOfferingPurchases,
  ProductOfferingTransactions,
  ProductOfferingTransactionsProductOfferingPairList,
  PurchaseResponse,
  StoreProductOffering,
  StoreProductOfferings,
  StorePromotionProductOfferings,
  StorePurchaseTransaction,
  StripePurchaseRequest
} from "./data-contracts";
import { request, ServiceContext } from "./http-client";

/**
 * @summary Add payment method
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods
 * @response `200` `AddPaymentMethodResponse` Successful
 * @response `403` `AddPaymentMethodResponse` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION the business unit's CRM is not supported with this operation
 */
export async function addPaymentMethod({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/paymentmethods`,
    headers,
    ctx
  }).then(response => response.json() as Promise<AddPaymentMethodResponse>);
}

/**
 * @summary Cancel a subscription purchase, no more renewals will be done.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/subscriptions/{purchaseId}
 * @response `200` `void` Successful
 */
export async function cancelPurchaseSubscription({
  purchaseId,
  headers
}: {
  /** The purchased subscription to cancel */
  purchaseId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase/subscriptions/${purchaseId}`,
    headers,
    ctx
  }).then(response => response.json() as Promise<void>);
}

/**
 * @summary Delete payment method
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods/{paymentMethodId}
 * @response `200` `void` Successful
 * @response `403` `void` FEATURE_NOT_ENABLED_FOR_BUSINESS_UNIT the business unit is not integrated with a payment provider
 */
export async function deleteStoredPaymentMethod({
  paymentMethodId,
  headers
}: {
  /** The id of the stored payment method */
  paymentMethodId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/paymentmethods/${paymentMethodId}`,
    headers,
    ctx
  }).then(response => response.json() as Promise<void>);
}

/**
 * @summary Get all active asset purchases for account.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/assets
 * @response `default` `(Asset)[]` success
 */
export async function getAccountAssetPurchases({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase/assets`,
    headers,
    ctx
  }).then(response => response.json() as Promise<Asset[]>);
}

/**
 * @summary Get all transactions for account
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/account/transactions
 * @response `200` `ProductOfferingTransactions` Successful
 */
export async function getAccountTransactions({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/account/transactions`,
    headers,
    ctx
  }).then(response => response.json() as Promise<ProductOfferingTransactions>);
}

/**
 * @summary Get all transactions for account paired with product offerings
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/account/transactions/productoffering
 * @response `200` `ProductOfferingTransactionsProductOfferingPairList` Successful
 */
export async function getAccountTransactionsWithProductOffering({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/account/transactions/productoffering`,
    headers,
    ctx
  }).then(response => response.json() as Promise<ProductOfferingTransactionsProductOfferingPairList>);
}

/**
 * @description The end point will not reduce the offerings if they have unique products, for example: Product offering 1 - Products: Animated Movies, Country: SE Product offering 2 - Products: Sci-Fi Movies, Country: Global Product offering 1 & 2 and will be returned.
 * @summary Get country product offerings available for the specific voucher code
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productofferings/country/{countryCode}/voucher/{voucherCode}
 * @response `200` `StorePromotionProductOfferings` Successful
 */
export async function getCountryOfferingsByVoucher({
  countryCode,
  voucherCode,
  headers
}: {
  /** The country code */
  countryCode: string;
  /** The voucher code */
  voucherCode: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/productofferings/country/${countryCode}/voucher/${voucherCode}`,
    headers,
    ctx
  }).then(response => response.json() as Promise<StorePromotionProductOfferings>);
}

/**
 * @summary Get currently active purchases of the user's account
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase
 * @response `200` `ProductOfferingPurchases` Successful
 */
export async function getOfferingPurchases({
  headers,
  ..._data
}: {
  /**
   * Include offering details in response
   * @default false
   */
  includeOfferingDetails?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase`,
    headers,
    ctx,
    query: _data
  }).then(response => response.json() as Promise<ProductOfferingPurchases>);
}

/**
 * @description Get available product offerings for location and payment service
 * @summary Get product offerings.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/store/productoffering/country/{countryCode}
 * @response `200` `(StoreProductOffering)[]` Successful
 */
export async function getOfferings({
  countryCode,
  headers,
  ..._data
}: {
  /** Current location ISO 3166 alpha-2 */
  countryCode: string;
  /**
   * Include product offerings that requires AssetId at purchase
   * @default true
   */
  includeSelectAssetProducts?: boolean;
  /** Payment provider */
  paymentProvider?: "appstore" | "external" | "googleplay" | "stripe";
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/productoffering/country/${countryCode}`,
    headers,
    ctx,
    query: _data
  }).then(response => response.json() as Promise<StoreProductOffering[]>);
}

/**
 * @summary Get product offerings available in the specified country, also includes global product offerings.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productoffering/country/{countryCode}
 * @response `200` `StoreProductOfferings` Successful
 */
export async function getOfferingsByCountry({
  countryCode,
  headers,
  ..._data
}: {
  /** The country code */
  countryCode: string;
  /**
   * Filter on product offerings that requires assetId upon purchase
   * @default true
   */
  includeSelectAssetProducts?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/productoffering/country/${countryCode}`,
    headers,
    ctx,
    query: _data
  }).then(response => response.json() as Promise<StoreProductOfferings>);
}

/**
 * @description This endpoint is to be only used if labels are used, which will be far from normal.
 * @summary Get product offerings available for this account's labels.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productoffering/label/{labelFilterId}
 * @response `200` `StoreProductOfferings` success
 * @response `404` `void` LABEL_FILTER_NOT_FOUND The provided labelFilterId was not found
 */
export async function getOfferingsByLabels({
  labelFilterId,
  headers
}: {
  /** The labelFilterId received with the Label Resource. */
  labelFilterId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/productoffering/label/${labelFilterId}`,
    headers,
    ctx
  }).then(response => response.json() as Promise<StoreProductOfferings>);
}

/**
 * @summary Get product offerings available for the specific voucher code. EXPERIMENTAL
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/productofferings/voucher/{voucherCode}
 * @response `200` `StorePromotionProductOfferings` Successful
 */
export async function getOfferingsByVoucher({
  voucherCode,
  headers
}: {
  /** The voucher code */
  voucherCode: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/productofferings/voucher/${voucherCode}`,
    headers,
    ctx
  }).then(response => response.json() as Promise<StorePromotionProductOfferings>);
}

/**
 * @summary Get all purchases for account including transactions
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/store/account/purchases
 * @response `200` `(StorePurchaseTransaction)[]` Successful
 */
export async function getPurchaseTransactions({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/account/purchases`,
    headers,
    ctx
  }).then(response => response.json() as Promise<StorePurchaseTransaction[]>);
}

/**
 * @summary Get stored payment methods
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods
 * @response `200` `PaymentMethods` Successful
 * @response `403` `PaymentMethods` FEATURE_NOT_ENABLED_FOR_BUSINESS_UNIT the business unit is not integrated with a payment provider
 */
export async function getStoredPaymentMethods({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/paymentmethods`,
    headers,
    ctx
  }).then(response => response.json() as Promise<PaymentMethods>);
}

/**
 * @description EXPERIMENTAL Called to before initiating a new payment. Returns valid payment types and price after any discount. * Note: The behaviour and the result can change during the time.
 * @summary Returns valid payment types and price after any discount
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/initialize
 * @response `200` `InitializePaymentResponse` Successful
 * @response `401` `InitializePaymentResponse` TO_MANY_DEVICES Session is over device limit
 */
export async function initialize({
  headers,
  ..._data
}: {
  /** id of the product offering to get methods and price for. */
  productOfferingId?: string;
  /** Optional voucher code. */
  voucherCode?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase/initialize`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<InitializePaymentResponse>);
}

/**
 * @description Set up a purchase of specified Product Offering, using App Store. If the Product Offerings field productRequiresSelectAsset is true then a assetId must be provided.
 * @summary Initialize a App Store purchase
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/appstore/purchase/init/{productOfferingId}
 * @response `200` `AppStorePurchaseInitializeResponse` Successful
 * @response `400` `AppStorePurchaseInitializeResponse` Bad request
 */
export async function initializeAppStorePurchase({
  productOfferingId,
  headers,
  ..._data
}: {
  /** Id of product offering to purchase */
  productOfferingId: string;
  /** Single asset id that the purchase will entitle. Requires that the product offering requires "direct asset purchases". */
  assetId?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/appstore/purchase/init/${productOfferingId}`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<AppStorePurchaseInitializeResponse>);
}

/**
 * @description Set up a purchase of specified Product Offering, using Google Play. If the Product Offerings field productRequiresSelectAsset is true then a assetId must be provided.
 * @summary Initialize a Google Play purchase
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/googleplay/purchase/init/{productOfferingId}
 * @response `200` `GooglePlayPurchaseInitializeResponse` Successful
 * @response `400` `GooglePlayPurchaseInitializeResponse` Bad request
 */
export async function initializeGooglePlayPurchase({
  productOfferingId,
  headers,
  ..._data
}: {
  /** Id of product offering to purchase */
  productOfferingId: string;
  /** Single asset id that the purchase will entitle. Requires that the product offering requires "direct asset purchases". */
  assetId?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/googleplay/purchase/init/${productOfferingId}`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<GooglePlayPurchaseInitializeResponse>);
}

/**
 * @summary Purchase a productOffering
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/{productOfferingId}
 * @response `200` `PurchaseResponse` Successful
 * @response `401` `PurchaseResponse` TO_MANY_DEVICES Session is over device limit
 */
export async function purchaseProductOffering({
  productOfferingId,
  headers,
  ..._data
}: {
  /** The product offering to purchase */
  productOfferingId: string;
  stripePurchase?: StripePurchaseRequest;
  /** Voucher code that should be applied to the purchase */
  voucherCode?: string;
  /**
   * Single asset id that the purchase will entitle.
   * Requires that the product offering requires "direct asset purchases"
   */
  assetId?: string;
  /**
   * Store payment method for future usage.
   * The details is stored within the used payment provider.
   */
  storePaymentMethod?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase/${productOfferingId}`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<PurchaseResponse>);
}

/**
 * @summary Update payment method
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods/{paymentMethodId}
 * @response `200` `PaymentMethod` Successful
 * @response `403` `PaymentMethod` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION the business unit's CRM is not supported with this operation
 */
export async function updatePaymentMethod({
  paymentMethodId,
  newPaymentMethodId,
  headers,
  ..._data
}: {
  /** The id of the stored payment method */
  paymentMethodId: string;
  expiryMonth?: number;
  expiryYear?: number;
  newPaymentMethodId?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/paymentmethods/${paymentMethodId}`,
    headers,
    ctx,
    body: { newPaymentMethodId: paymentMethodId, ..._data }
  }).then(response => response.json() as Promise<PaymentMethod>);
}

/**
 * @summary Update the preferred payment method
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/paymentmethods/preferred
 * @response `200` `JsonAccount` Successful
 * @response `403` `JsonAccount` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION the business unit's CRM is not supported with this operation
 */
export async function updatePreferredPaymentMethod({
  headers,
  ..._data
}: {
  paymentMethodId?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/paymentmethods/preferred`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<JsonAccount>);
}

/**
 * @description Verifies that the purchase was successful and makes entilement if so.
 * @summary Verify a App Store purchase
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/appstore/purchase/{purchaseId}/verify
 * @response `200` `AppStorePurchaseVerifyResponse` Successful
 * @response `400` `AppStorePurchaseVerifyResponse` Bad request
 */
export async function verifyAppStorePurchase({
  purchaseId,
  headers,
  ..._data
}: {
  /** The purchase id */
  purchaseId: string;
  /** As received in the App Store Purchase. */
  transaction: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/appstore/purchase/${purchaseId}/verify`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<AppStorePurchaseVerifyResponse>);
}

/**
 * @description Verifies that the purchase was successful and makes entilement if so.
 * @summary Verify a Google Play purchase
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/store/googleplay/purchase/{purchaseId}/verify
 * @response `200` `GooglePlayPurchaseVerifyResponse` Successful
 * @response `400` `GooglePlayPurchaseVerifyResponse` Bad request
 */
export async function verifyGooglePlayPurchase({
  purchaseId,
  headers,
  ..._data
}: {
  /** The purchase id */
  purchaseId: string;
  /** As received in the Google Play Purchase. */
  purchaseToken: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/googleplay/purchase/${purchaseId}/verify`,
    headers,
    ctx,
    body: _data
  }).then(response => response.json() as Promise<GooglePlayPurchaseVerifyResponse>);
}

/**
 * @description Verify a purchase of a productOffering if a "AUTHORIZED/REJECTED"-status is not given directly. E.g. a redirect flow, where the purchaser has to authenticate to the card issuer. Also, used to send additional data from the shopper if that's required.
 * @summary Verify a purchase of a productOffering
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase/{purchaseId}/verify
 * @response `200` `PurchaseResponse` Successful
 * @response `401` `PurchaseResponse` TO_MANY_DEVICES Session is over device limit
 */
export async function verifyPayment({
  purchaseId,
  headers
}: {
  /** The purchased id to verify */
  purchaseId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/store/purchase/${purchaseId}/verify`,
    headers,
    ctx
  }).then(response => response.json() as Promise<PurchaseResponse>);
}

export class StoreService {
  constructor(private context: ServiceContext) {}
  addPaymentMethod = addPaymentMethod;
  cancelPurchaseSubscription = cancelPurchaseSubscription;
  deleteStoredPaymentMethod = deleteStoredPaymentMethod;
  getAccountAssetPurchases = getAccountAssetPurchases;
  getAccountTransactions = getAccountTransactions;
  getAccountTransactionsWithProductOffering = getAccountTransactionsWithProductOffering;
  getCountryOfferingsByVoucher = getCountryOfferingsByVoucher;
  getOfferingPurchases = getOfferingPurchases;
  getOfferings = getOfferings;
  getOfferingsByCountry = getOfferingsByCountry;
  getOfferingsByLabels = getOfferingsByLabels;
  getOfferingsByVoucher = getOfferingsByVoucher;
  getPurchaseTransactions = getPurchaseTransactions;
  getStoredPaymentMethods = getStoredPaymentMethods;
  initialize = initialize;
  initializeAppStorePurchase = initializeAppStorePurchase;
  initializeGooglePlayPurchase = initializeGooglePlayPurchase;
  purchaseProductOffering = purchaseProductOffering;
  updatePaymentMethod = updatePaymentMethod;
  updatePreferredPaymentMethod = updatePreferredPaymentMethod;
  verifyAppStorePurchase = verifyAppStorePurchase;
  verifyGooglePlayPurchase = verifyGooglePlayPurchase;
  verifyPayment = verifyPayment;
}
