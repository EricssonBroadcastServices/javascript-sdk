import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { ProductOffering } from "../models/product-offering-model";
import { CardPaymentResponse } from "../models/card-payment-response-model";
import { TransactionsWithProductOffering } from "../models/transaction-model";
import { PurchaseResponse } from "../models/purchase-model";

export interface GetProductOfferingsByCountryOptions
  extends CustomerAndBusinessUnitOptions {
  countryCode: string;
}

export interface CardPaymentDetails {
  encryptedCardNumber: string;
  encryptedExpiryMonth: string;
  encryptedExpiryYear: string;
  encryptedSecurityCode: string;
  holderName: string;
}

export interface BuyProductOfferingOptions
  extends CustomerAndBusinessUnitOptions {
  productOfferingId: string;
  body: {
    adyenCardPurchase: {
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
          challengeIndicator:
            | "noPreference"
            | " requestNoChallenge"
            | "requestChallenge"
            | "requestChallengeAsMandate";
          deviceChannel: string;
          messageVersion: string;
          threeDSRequestorURL: string;
        };
      };
    };
  };
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
    adyenCardPurchaseVerificationRequest: VerifyPurchasePayload;
  };
}

export class PaymentService extends BaseService {
  public getProductOfferingsByCountry({
    customer,
    businessUnit,
    countryCode
  }: GetProductOfferingsByCountryOptions) {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/productoffering/country/${countryCode}`
    ).then(data => {
      const productofferings: ProductOffering[] = data.productOfferings.map(p =>
        deserialize(ProductOffering, p)
      );
      return productofferings;
    });
  }

  public buyProductOffering({
    customer,
    businessUnit,
    productOfferingId,
    body
  }: BuyProductOfferingOptions) {
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

  public verifyPurchase({
    customer,
    businessUnit,
    body,
    purchaseId
  }: VerifyPurchaseOptions) {
    return this.post(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/purchase/${purchaseId}/verify`,
      body,
      this.options.authHeader()
    ).then(data =>
      deserialize(CardPaymentResponse, { ...data, purchaseId: purchaseId })
    );
  }

  public getTransactions({
    customer,
    businessUnit
  }: CustomerAndBusinessUnitOptions) {
    // DEPRECATED : not officially in exposure.
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v1/whitelabel",
        customer,
        businessUnit
      })}/store/account/transactions/offerings`,
      this.options.authHeader()
    ).then(data => {
      const transactions: TransactionsWithProductOffering[] = data.transactionsProductOfferingPairs.map(
        t => {
          return deserialize(TransactionsWithProductOffering, t);
        }
      );
      return transactions;
    });
  }

  public getPurchases({
    customer,
    businessUnit
  }: CustomerAndBusinessUnitOptions) {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/purchase`,
      this.options.authHeader()
    ).then(data => deserialize(PurchaseResponse, data));
  }
}
