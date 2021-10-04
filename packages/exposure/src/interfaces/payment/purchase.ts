import { IProductOffering } from "./product-offering";

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
