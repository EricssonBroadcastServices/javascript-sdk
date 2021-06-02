import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { ICardPaymentResponse } from "../models/store/card-payment/i-card-payment";
import {
  IExposureProductOfferingsResponse,
  IProductOffering
} from "../models/store/product-offering/i-product-offering";
import { ProductOfferingUtils } from "../models/store/product-offering/product-offering-utils";
import { IExposurePromotionResponse, IPromotionResponse } from "../models/store/promotion/i-promotion";
import {
  IExposureTransactionsWithProductOffering,
  ITransactionWithProductOffering
} from "../models/store/transaction/i-transaction";
import { TransactionUtils } from "../models/store/transaction/transaction-utils";
import { IExposurePurchaseResponse, IPurchaseResponse } from "../models/store/purchase/i-purchase";
import { PurchaseUtils } from "../models/store/purchase/purchase-utils";
import { IPaymentMethod } from "../models/store/payment-method/i-payment-method";
import { IBraintreeSettings } from "../models/store/braintree-settings/i-braintree-settings";

export interface GetProductOfferingsByCountryOptions extends CustomerAndBusinessUnitOptions {
  countryCode: string;
  includeSelectAssetProducts?: boolean;
}

export interface CardPaymentDetails {
  encryptedCardNumber: string;
  encryptedExpiryMonth: string;
  encryptedExpiryYear: string;
  encryptedSecurityCode: string;
  holderName: string;
}

export interface BuyProductOfferingOptions extends CustomerAndBusinessUnitOptions {
  productOfferingId: string;
  body: {
    assetId?: string;
    adyenCardPurchase?: {
      cardPaymentDetails: CardPaymentDetails;
      browserInfo: {
        userAgent: string;
        acceptHeader: string;
        language: string;
        janaEnabled: boolean;
        colorDepth: number;
        javaEnabled: boolean;
        screenHeight: number;
        screenWidth: number;
        timeZoneOffset: number;
      };
      deviceFingerprint: string;
      purchaseIdPlaceholder: string;
      returnUrl: string;
      channel: string;
      threeDSecure2: {
        allow3DS2: boolean;
        origin: string;
        languageCode: string;
        threeDS2RequestData: {
          challengeIndicator: "noPreference" | " requestNoChallenge" | "requestChallenge" | "requestChallengeAsMandate";
          deviceChannel: string;
          messageVersion: string;
          threeDSRequestorURL: string;
        };
      };
    };
    stripePurchase?: {
      storeCardDetails?: boolean; // deprecated
      paymentMethodId?: string;
    };
    braintreePurchase?: {
      paymentMethodId: string;
      reusedPaymentMethod: boolean;
    };
    voucherCode?: string;
    storePaymentMethod?: boolean;
  };
}

export interface BuyWithVoucherCodeOptions extends CustomerAndBusinessUnitOptions {
  productOfferingId: string;
  assetId?: string;
  code: string;
}

export interface VerifyPurchasePayload {
  md?: string;
  paRes?: string;
  details?: Map<string, string>;
  paymentData?: string;
}

export interface VerifyPurchaseOptions extends CustomerAndBusinessUnitOptions {
  purchaseId: string;
  body: {
    adyenCardPurchaseVerificationRequest?: VerifyPurchasePayload;
  };
}

export interface GetProductOfferingsByVoucherOptions extends CustomerAndBusinessUnitOptions {
  code: string;
  countryCode?: string;
}

export interface CancelSubscriptionOptions extends CustomerAndBusinessUnitOptions {
  purchaseId: string;
}

interface IAddPaymentMethodOptions extends CustomerAndBusinessUnitOptions {
  paymentMethodId?: string;
}

interface IInitializeBraintreeOptions extends CustomerAndBusinessUnitOptions {
  productOfferingId?: string;
  voucherCode?: string;
}

export class PaymentService extends BaseService {
  public getProductOfferingsByVoucherCode({
    customer,
    businessUnit,
    code,
    countryCode
  }: GetProductOfferingsByVoucherOptions): Promise<IPromotionResponse> {
    const url = countryCode
      ? `${this.cuBuUrl({
          apiVersion: "v2",
          customer,
          businessUnit
        })}/store/productofferings/country/${countryCode}/voucher/${code}`
      : `${this.cuBuUrl({
          apiVersion: "v2",
          customer,
          businessUnit
        })}/store/productofferings/voucher/${code}`;

    return this.get(url, this.options.authHeader()).then((data: IExposurePromotionResponse) => {
      return {
        ...data,
        productOfferings: data?.productOfferings.map(p => ProductOfferingUtils.build(p)) || []
      };
    });
  }
  public getProductOfferingsByCountry({
    customer,
    businessUnit,
    countryCode,
    includeSelectAssetProducts = true
  }: GetProductOfferingsByCountryOptions): Promise<IProductOffering[]> {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/productoffering/country/${countryCode}?includeSelectAssetProducts=${includeSelectAssetProducts}`
    ).then((data: IExposureProductOfferingsResponse) => {
      return data.productOfferings.map(p => ProductOfferingUtils.build(p));
    });
  }

  public buyProductOffering({
    customer,
    businessUnit,
    productOfferingId,
    body
  }: BuyProductOfferingOptions): Promise<ICardPaymentResponse> {
    return this.post(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/purchase/${productOfferingId}`,
      body,
      this.options.authHeader()
    );
  }

  public buyWithVoucherCode({
    customer,
    businessUnit,
    code,
    assetId,
    productOfferingId
  }: BuyWithVoucherCodeOptions): Promise<ICardPaymentResponse> {
    return this.post(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/purchase/${productOfferingId}`,
      {
        assetId,
        voucherCode: code
      },
      this.options.authHeader()
    );
  }

  public verifyPurchase({
    customer,
    businessUnit,
    body,
    purchaseId
  }: VerifyPurchaseOptions): Promise<ICardPaymentResponse> {
    return this.post(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/purchase/${purchaseId}/verify`,
      body,
      this.options.authHeader()
    ).then(data => ({ ...data, purchaseId: purchaseId }));
  }

  public getTransactions({
    customer,
    businessUnit
  }: CustomerAndBusinessUnitOptions): Promise<ITransactionWithProductOffering[]> {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/account/transactions/productoffering`,
      this.options.authHeader()
    ).then((data: IExposureTransactionsWithProductOffering) => {
      return data.transactionsProductOfferingPairs.map(item => ({
        transactions: TransactionUtils.build(item.transactions),
        productOffering: ProductOfferingUtils.build(item.productOffering)
      }));
    });
  }

  public getPurchases({ customer, businessUnit }: CustomerAndBusinessUnitOptions): Promise<IPurchaseResponse> {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/purchase`,
      this.options.authHeader()
    ).then((data: IExposurePurchaseResponse) => ({
      ...data,
      purchases: data.purchases.map(p => PurchaseUtils.build(p))
    }));
  }

  public cancelSubscription({ customer, businessUnit, purchaseId }: CancelSubscriptionOptions) {
    return this.delete(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/purchase/subscriptions/${purchaseId}`,
      this.options.authHeader()
    );
  }

  public getPaymentMethods({ customer, businessUnit }: CustomerAndBusinessUnitOptions): Promise<IPaymentMethod[]> {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/paymentmethods`,
      this.options.authHeader()
    ).then(data => data.methods);
  }
  public addPaymentMethod({
    customer,
    businessUnit,
    paymentMethodId
  }: IAddPaymentMethodOptions): Promise<{ stripe: { clientSecret: string } }> {
    const payload = paymentMethodId ? { paymentMethodId } : {};
    return this.post(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/paymentmethods`,
      payload,
      this.options.authHeader()
    );
  }
  public deletePaymentMethod({
    customer,
    businessUnit,
    paymentMethodId
  }: CustomerAndBusinessUnitOptions & { paymentMethodId: string }) {
    return this.delete(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/paymentmethods/${paymentMethodId}`,
      this.options.authHeader()
    );
  }

  public setPreferredPaymentMethod({
    customer,
    businessUnit,
    paymentMethodId
  }: CustomerAndBusinessUnitOptions & { paymentMethodId: string }) {
    return this.put(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/paymentmethods/preferred`,
      {
        paymentMethodId
      },
      this.options.authHeader()
    );
  }

  public initializeBraintree({
    customer,
    businessUnit,
    productOfferingId,
    voucherCode
  }: IInitializeBraintreeOptions): Promise<IBraintreeSettings> {
    return this.post(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v2" })}/store/purchase/initialize`,
      { productOfferingId, voucherCode },
      { ...this.options.authHeader() }
    );
  }
}
