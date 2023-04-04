import { IDiscount } from "./price";
import { IOfferingPrice } from "./price";
import { IPurchase } from "./purchase";
interface ILocalizedMetadata {
  locale: string;
  name: string;
  description?: string;
}

export enum ProductOfferingType {
  RENTAL = "rental",
  SUBSCRIPTION = "subscription",
  PURCHASE = "purchase",
  EVENT = "event"
}

export interface IProductOffering {
  id: string;
  productOfferingId: string;
  rentalLength?: string;
  rentalExpiryWindow?: string;
  recurrence?: string;
  localizedMetadata: ILocalizedMetadata[];
  productRequiresSelectAsset: boolean;
  productOfferingType: ProductOfferingType;
  productIds: string[];
  offeringPrice: IOfferingPrice;
  discount?: IDiscount;
  paymentMethodTypes: string[];
  entitlementStart?: string;
  salesStart: string;
  // activePurchase is not part of the exposure response. But is added by the web application
  // once the web removes that hack, this can be removed
  activePurchase?: IPurchase;
  googlePlayReference?: {
    skuId: string;
  };
  appStoreReference?: {
    productId: string;
  };
}
