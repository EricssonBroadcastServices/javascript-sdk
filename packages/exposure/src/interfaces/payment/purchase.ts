import { IProductOffering } from "./product-offering";

export type TPurchaseStatus = "pending" | "accepted" | "rejected" | "cancelled";

export interface IPurchase {
  id: string;
  renewal: boolean;
  transactionId: string;
  productOfferingId: string;
  from: string;
  until: string;
  renewAt?: string;
  status: string;
  assetId?: string;
  apiStoreProductOffering?: IProductOffering;
}

export interface IPurchaseResponse {
  consumedProductOfferingDiscounts: string[];
  purchases: IPurchase[];
}

export interface IAccountPurchase {
  productOfferingId: string;
  productOfferingType?: string;
  productIds: string[];
  assetId?: string;
  // All these dates (created, from, until, renewAt) are in Date.toISOString format
  from: string;
  until: string;
  created?: string;
  renewAt?: string;
  status: string; // not same type as transaction status, ex can be "fulfilled"
  transactions: {
    transactionId: string;
    amount: string;
    completedTime: string;
    refunded: boolean;
    status: TPurchaseStatus;
    receiptUrl?: string;
    paymentProviderRequestId?: string;
    paymentProviderTransactionId?: string;
    paymentProviderType?: string;
    productOfferingId?: string;
  }[];
  voucherCode?: string;
  // Only new purchases will have localizedAsset and localizedProductOffering
  localizedAsset: {
    locale: string;
    title: string;
  }[];
  localizedProductOffering: {
    locale: string;
    name: string;
  }[];
}
