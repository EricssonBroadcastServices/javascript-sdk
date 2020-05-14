import { jsonProperty } from "../decorators/json-property";

export enum AdyenPaymentStatus {
  CHALLENGE_SHOPPER = "CHALLENGE_SHOPPER",
  IDENTIFY_SHOPPER = "IDENTIFY_SHOPPER",
  FULLFILLED = "FULLFILLED",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
  REDIRECTED = "REDIRECTED",
  EMPTY = "EMPTY" // added by client to identify empty responses
}

class AdyenPaymentPurchase {
  @jsonProperty()
  public apiAdyenPurchaseStatus: AdyenPaymentStatus;
}

class AdyenPaymentRedirect {
  @jsonProperty()
  public method: string;
  @jsonProperty()
  public url: string;
}

class StripePurchaseResponse {
  @jsonProperty()
  public clientSecret: string;
  @jsonProperty()
  public stripeCustomerId: string;
  @jsonProperty()
  public status: string;
}

export enum PurchaseStatus {
  FULFILLED = "FULFILLED",
  PENDING = "PENDING",
  REJECTED = "REJECTED"
}

class PurchaseInfo {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public purchaseStatus: PurchaseStatus;
}

export class CardPaymentResponse {
  @jsonProperty()
  public purchaseId: string;
  @jsonProperty()
  public purchase: PurchaseInfo;
  @jsonProperty()
  public apiAdyenCardPurchaseResponse: {
    purchase: AdyenPaymentPurchase;
    redirect: AdyenPaymentRedirect;
    authentication: {
      "threeds2.fingerprintToken": string;
    };
    paymentData: string;
  };

  @jsonProperty()
  public apiStripePurchaseResponse: StripePurchaseResponse;

  public adyenIsEmpty = () => {
    return !(
      this.apiAdyenCardPurchaseResponse &&
      this.apiAdyenCardPurchaseResponse.purchase &&
      this.apiAdyenCardPurchaseResponse.purchase.apiAdyenPurchaseStatus
    );
  };
  public adyenStatus = () =>
    this.adyenIsEmpty()
      ? AdyenPaymentStatus.EMPTY
      : this.apiAdyenCardPurchaseResponse.purchase.apiAdyenPurchaseStatus;
}
