import { IExposurePurchase, IPurchase } from "../purchase/i-purchase";

interface IVat {
  percentage: number;
  included: boolean;
}

export interface IPrice {
  amount: number;
  fractionDigits: number;
  currency: string;
}

export interface IOfferingPrice {
  price: IPrice;
  countryCode: string;
  vat: IVat;
}

interface ILocalizedMetadata {
  locale: string;
  name?: string;
  description?: string;
}

interface IDiscount {
  price: IPrice;
  numberOfRecurringPayments: number;
  freePeriod?: string;
}

export interface IExposureProductOffering {
  id: string;
  rentalLength?: string;
  recurrence?: string;
  localizedMetadata: ILocalizedMetadata[];
  productRequiresSelectAsset: boolean;
  productIds: string[];
  offeringPrice: IOfferingPrice;
  discount?: IDiscount;
  paymentMethodTypes: string[];
  activePurchase?: IExposurePurchase;
}

export interface IExposureProductOfferingsResponse {
  productOfferings: IExposureProductOffering[];
}

export interface IProductOffering extends Omit<IExposureProductOffering, "activePurchase"> {
  id: string;
  rentalLength?: string;
  recurrence?: string;
  localizedMetadata: ILocalizedMetadata[];
  productRequiresSelectAsset: boolean;
  productIds: string[];
  offeringPrice: IOfferingPrice;
  discount?: IDiscount;
  paymentMethodTypes: string[];
  activePurchase?: IPurchase;
}
