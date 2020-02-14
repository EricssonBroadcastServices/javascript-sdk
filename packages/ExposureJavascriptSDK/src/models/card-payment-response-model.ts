import { jsonProperty } from "../decorators/json-property";

export enum PaymentStatus {
  CHALLENGE_SHOPPER = "CHALLENGE_SHOPPER",
  IDENTIFY_SHOPPER = "IDENTIFY_SHOPPER",
  FULLFILLED = "FULLFILLED",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
  REDIRECTED = "REDIRECTED",
  EMPTY = "EMPTY" // added by client to identify empty responses
}

class PaymentPurchase {
  @jsonProperty()
  public apiAdyenPurchaseStatus: PaymentStatus;
}

class PaymentRedirect {
  @jsonProperty()
  public method: string;
  @jsonProperty()
  public url: string;
}

export class CardPaymentResponse {
  @jsonProperty()
  public purchaseId: string;
  @jsonProperty()
  public apiAdyenCardPurchaseResponse: {
    purchase: PaymentPurchase;
    redirect: PaymentRedirect;
    authentication: {
      "threeds2.fingerprintToken": string;
    };
    paymentData: string;
  };

  public isEmpty = () => {
    return !(
      this.apiAdyenCardPurchaseResponse &&
      this.apiAdyenCardPurchaseResponse.purchase &&
      this.apiAdyenCardPurchaseResponse.purchase.apiAdyenPurchaseStatus
    );
  };
  public status = () =>
    this.isEmpty()
      ? PaymentStatus.EMPTY
      : this.apiAdyenCardPurchaseResponse.purchase.apiAdyenPurchaseStatus;
}
