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

export type TGooglePlayPurchaseStatus = "pending" | "accepted" | "rejected" | "cancelled";

export interface IGooglePlayVerifyResponse {
  transactionStatus: TGooglePlayPurchaseStatus;
}

export interface IGooglePlayVerifyPayload {
  purchaseToken: string;
}
