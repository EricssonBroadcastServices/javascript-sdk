export interface IPrice {
  amount: number;
  fractionDigits: number;
  currency: string;
}
interface IVat {
  percentage: number;
  included: boolean;
}
export interface IOfferingPrice {
  price: IPrice;
  countryCode: string;
  vat: IVat;
}
export interface IDiscount {
  price?: IPrice;
  numberOfRecurringPayments: number;
  freePeriod?: string;
}
interface IPromotionDiscount {
  discountedOfferingPrice: IOfferingPrice;
}
export interface IPromotion {
  id: string;
  discount: IPromotionDiscount;
  fullDiscountVoucher: boolean;
}
