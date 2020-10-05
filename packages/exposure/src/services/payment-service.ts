import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { ProductOffering, PromotionResponse } from "../models/product-offering-model";
import { CardPaymentResponse } from "../models/card-payment-response-model";
import { TransactionsWithProductOffering } from "../models/transaction-model";
import { PurchaseResponse } from "../models/purchase-model";
import { PaymentMethod } from "../models/payment-method";

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
      storeCardDetails: boolean;
    };
    voucherCode?: string;
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
}

export interface CancelSubscriptionOptions extends CustomerAndBusinessUnitOptions {
  purchaseId: string;
}

export class PaymentService extends BaseService {
  public getProductOfferingsByVoucherCode({ customer, businessUnit, code }: GetProductOfferingsByVoucherOptions) {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/productofferings/voucher/${code}`,
      this.options.authHeader()
    ).then(data => {
      return deserialize(PromotionResponse, data);
    });
  }
  public getProductOfferingsByCountry({
    customer,
    businessUnit,
    countryCode,
    includeSelectAssetProducts = true
  }: GetProductOfferingsByCountryOptions) {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/productoffering/country/${countryCode}?includeSelectAssetProducts=${includeSelectAssetProducts}`
    ).then(data => {
      const productofferings: ProductOffering[] = data.productOfferings.map(p => deserialize(ProductOffering, p));
      return productofferings;
    });
  }

  public buyProductOffering({ customer, businessUnit, productOfferingId, body }: BuyProductOfferingOptions) {
    return this.post(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/purchase/${productOfferingId}`,
      body,
      this.options.authHeader()
    ).then(data => deserialize(CardPaymentResponse, data));
  }

  public buyWithVoucherCode({ customer, businessUnit, code, assetId, productOfferingId }: BuyWithVoucherCodeOptions) {
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
    ).then(data => deserialize(CardPaymentResponse, data));
  }

  public verifyPurchase({ customer, businessUnit, body, purchaseId }: VerifyPurchaseOptions) {
    return this.post(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/purchase/${purchaseId}/verify`,
      body,
      this.options.authHeader()
    ).then(data => deserialize(CardPaymentResponse, { ...data, purchaseId: purchaseId }));
  }

  public getTransactions({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    // DEPRECATED : not officially in exposure.
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v1/whitelabel",
        customer,
        businessUnit
      })}/store/account/transactions/offerings`,
      this.options.authHeader()
    ).then(data => {
      const transactions: TransactionsWithProductOffering[] = data.transactionsProductOfferingPairs.map(t => {
        return deserialize(TransactionsWithProductOffering, t);
      });
      return transactions;
    });
  }

  public getPurchases({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/purchase`,
      this.options.authHeader()
    ).then(data => deserialize(PurchaseResponse, data));
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

  public getPaymentMethods({ customer, businessUnit }: CustomerAndBusinessUnitOptions): Promise<PaymentMethod[]> {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/paymentmethods`,
      this.options.authHeader()
    ).then(data => data.methods.map(m => deserialize(PaymentMethod, m)));
  }
  public addPaymentMethod({
    customer,
    businessUnit
  }: CustomerAndBusinessUnitOptions): Promise<{ stripe: { clientSecret: string } }> {
    return this.post(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/paymentmethods`,
      null,
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
}
