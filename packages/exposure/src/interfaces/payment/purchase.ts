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
