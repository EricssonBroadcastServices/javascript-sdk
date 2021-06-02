export enum StripePaymentType {
  CARD = "card",
  IDEAL = "ideal"
}

interface IStripePurchaseResponse {
  clientSecret: string;
  stripeCustomerId: string;
  setupCard: boolean;
  status: string;
  paymentMethodTypes: StripePaymentType[];
}

export enum PurchaseStatus {
  FULFILLED = "FULFILLED",
  PENDING = "PENDING",
  REJECTED = "REJECTED"
}

interface IPurchaseInfo {
  id: string;
  purchaseStatus: PurchaseStatus;
}

export interface ICardPaymentResponse {
  purchaseId: string;
  purchase: IPurchaseInfo;
  apiStripePurchaseResponse: IStripePurchaseResponse;
}
