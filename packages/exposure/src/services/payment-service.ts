import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { ICardPaymentResponse } from "../interfaces/card-payment-response";
import { ITransactionsWithProductOffering } from "../interfaces/transaction";
import { IPaymentMethod } from "../interfaces/payment-method";
import { IPrice, IPromotion } from "../interfaces/price";
import { IProductOffering } from "../interfaces/product-offering";
import { IPurchaseResponse } from "../interfaces/purchase";

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

export interface GetPurchasesOptions extends CustomerAndBusinessUnitOptions {
  includeOfferingDetails?: boolean;
}
interface IPurchaseMethodType {
  name: string;
  price: IPrice;
  recurring: boolean;
}
export interface IPurchaseSettings {
  clientToken: string;
  braintreePaymentMethods?: {
    card?: {
      vault?: {
        vaultCard: boolean;
        allowVaultCardOverride: boolean;
      };
    };
    applePay?: {
      paymentRequest: {
        total: {
          amount: string;
          label: string;
        };
      };
    };
    googlePay?: {
      merchantId: string;
      allowedPaymentMethods: [
        {
          type: string;
        }
      ];
      googlePayVersion: number;
      transactionInfo: {
        totalPrice: string;
        totalPriceStatus: string;
        currencyCode: string;
      };
    };
    paypal?: {
      amount?: number;
      currency?: string;
      flow: string;
    };
  };
  stripe?: {
    methodTypes: IPurchaseMethodType[];
    wallets?: IPurchaseMethodType[];
  };
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
  }: GetProductOfferingsByVoucherOptions): Promise<{
    productOfferings: IProductOffering[];
    promotion: IPromotion;
  }> {
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

    return this.get(url, this.options.authHeader());
  }
  public getProductOfferingsByCountry({
    customer,
    businessUnit,
    countryCode,
    includeSelectAssetProducts = true
  }: GetProductOfferingsByCountryOptions): Promise<{
    productOfferings: IProductOffering[];
  }> {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/productoffering/country/${countryCode}?includeSelectAssetProducts=${includeSelectAssetProducts}`
    ).then(data => data.productOfferings);
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
  }: CustomerAndBusinessUnitOptions): Promise<ITransactionsWithProductOffering[]> {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/account/transactions/productoffering`,
      this.options.authHeader()
    ).then(data => {
      const transactions: ITransactionsWithProductOffering[] = data.transactionsProductOfferingPairs;
      return transactions;
    });
  }

  public getPurchases({
    customer,
    businessUnit,
    includeOfferingDetails = false
  }: GetPurchasesOptions): Promise<IPurchaseResponse> {
    const queryParameters = new URLSearchParams();
    queryParameters.set("includeOfferingDetails", includeOfferingDetails ? "true" : "false");
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/store/purchase?${queryParameters.toString()}`,
      this.options.authHeader()
    );
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

  public initializePurchase({
    customer,
    businessUnit,
    productOfferingId,
    voucherCode
  }: IInitializeBraintreeOptions): Promise<IPurchaseSettings> {
    return this.post(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v2" })}/store/purchase/initialize`,
      { productOfferingId, voucherCode },
      { ...this.options.authHeader() }
    );
  }
}
