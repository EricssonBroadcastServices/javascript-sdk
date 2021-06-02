export interface IExposurePurchase {
  id: string;
  renewal: boolean;
  transactionId: string;
  productOfferingId: string;
  from: string;
  until: string;
  renewAt: string;
  status: string;
  assetId?: string;
}

export interface IPurchase {
  id: string;
  renewal: boolean;
  transactionId: string;
  productOfferingId: string;
  from: Date;
  until: Date;
  renewAt: Date;
  status: string;
  assetId?: string;
}

export interface IExposurePurchaseResponse {
  consumedProductOfferingDiscounts: string[];
  purchases: IExposurePurchase[];
}

export interface IPurchaseResponse extends Omit<IExposurePurchaseResponse, "purchases"> {
  purchases: IPurchase[];
}
