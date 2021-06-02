import { IExposureProductOffering, IOfferingPrice, IProductOffering } from "../product-offering/i-product-offering";

export interface IPromotionDiscount {
  discountedOfferingPrice: IOfferingPrice;
}

export interface IPromotion {
  id: string;
  discount: IPromotionDiscount;
  fullDiscountVoucher: boolean;
}

export interface IExposurePromotionResponse {
  promotion: IPromotion;
  productOfferings: IExposureProductOffering[];
}

export interface IPromotionResponse extends Omit<IExposurePromotionResponse, "productOfferings"> {
  productOfferings: IProductOffering[];
}
