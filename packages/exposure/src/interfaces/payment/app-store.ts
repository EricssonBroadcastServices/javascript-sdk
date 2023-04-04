export interface IAppStoreInitResponse {
  appAccountToken: string; // UUID
  purchaseId: string;
  transactionId: string;
}

export interface IAppStoreInitPayload {
  assetId: string;
}

export type TAppStorePurchaseStatus = "pending" | "accepted" | "rejected" | "cancelled";

export interface IAppStoreVerifyResponse {
  transactionStatus: TAppStorePurchaseStatus;
}

export interface IAppStoreVerifyPayload {
  transaction: string;
}
