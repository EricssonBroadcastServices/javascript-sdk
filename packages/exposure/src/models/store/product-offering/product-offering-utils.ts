import { PurchaseUtils } from "../purchase/purchase-utils";
import { IExposureProductOffering, IProductOffering, IPrice } from "./i-product-offering";

export class ProductOfferingUtils {
  static build(json: IExposureProductOffering): IProductOffering {
    return {
      ...json,
      activePurchase: json.activePurchase && PurchaseUtils.build(json.activePurchase)
    };
  }

  static getTitle = (offering: IProductOffering, locale: string) => {
    if (offering.localizedMetadata.length === 0) {
      return "";
    }
    const localized = offering.localizedMetadata.find(metadata => metadata.locale === locale);
    return localized ? localized.name : offering.localizedMetadata[0].name;
  };

  static getDescription = (offering: IProductOffering, locale = "en") => {
    if (offering.localizedMetadata.length === 0) {
      return "";
    }
    const localized = offering.localizedMetadata.find(metadata => metadata.locale === locale);
    return localized ? localized.description : offering.localizedMetadata[0].description;
  };

  static getPrice = (price: IPrice) => {
    const arr = price.amount.toString().split("");
    arr.splice(arr.length - price.fractionDigits, 0, ".");
    if (arr[0] === ".") {
      arr.unshift("0");
    }
    return arr.join("");
  };
  static getPriceWithCurrency = (price: IPrice) => {
    return ProductOfferingUtils.getPrice(price) + " " + price.currency;
  };
}
