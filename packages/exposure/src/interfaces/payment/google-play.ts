import { TPurchaseStatus } from "./purchase";

export interface IGooglePlayInitResponse {
  skuId: string;
  obfuscatedAccountId: string;
  obfuscatedProfileId: string;
  purchaseId: string;
  transactionId: string;
}

export interface IGooglePlayInitPayload {
  assetId?: string;
  voucherCode?: string;
}

export interface IGooglePlayVerifyResponse {
  transactionStatus: TPurchaseStatus;
}

export interface IGooglePlayVerifyPayload {
  purchaseToken: string;
}
