import { TPurchaseStatus } from "./purchase";

export interface IAppStoreInitResponse {
  appAccountToken: string; // UUID
  purchaseId: string;
  transactionId: string;
}

export interface IAppStoreInitPayload {
  assetId?: string;
}

export interface IAppStoreVerifyResponse {
  transactionStatus: TPurchaseStatus;
}

export interface IAppStoreVerifyPayload {
  transaction: TPurchaseStatus;
}
