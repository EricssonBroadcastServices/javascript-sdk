import { jsonProperty } from "../decorators/json-property";
import { Purchase } from "./purchase-model";

class Vat {
  @jsonProperty()
  public percentage: number;
  @jsonProperty()
  public included: boolean;
}

export class Price {
  @jsonProperty()
  public amount: number;
  @jsonProperty()
  public fractionDigits: number;
  @jsonProperty()
  public currency: string;
  public getPrice = () => {
    const arr = this.amount.toString().split("");
    arr.splice(arr.length - this.fractionDigits, 0, ".");
    if (arr[0] === ".") {
      arr.unshift("0");
    }
    return arr.join("");
  };
  public getPriceWithCurrency = () => {
    return this.getPrice() + " " + this.currency;
  };
}

export class OfferingPrice {
  @jsonProperty({ type: Price })
  public price: Price;
  @jsonProperty()
  public countryCode: string;
  @jsonProperty({ type: Vat })
  public vat: Vat;
}

class LocalizedMetadata {
  @jsonProperty()
  public locale: string;
  @jsonProperty()
  public name: string;
  @jsonProperty()
  public description: string;
}

export class ProductOffering {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public rentalLength?: string;
  @jsonProperty()
  public recurrence?: string;
  @jsonProperty({ type: LocalizedMetadata })
  public localizedMetadata: LocalizedMetadata[];
  @jsonProperty()
  public productRequiresSelectAsset: boolean;
  @jsonProperty({ type: String })
  public productIds: string[];
  @jsonProperty({ type: OfferingPrice })
  public offeringPrice: OfferingPrice;
  public getTitle = (locale: string) => {
    if (this.localizedMetadata.length === 0) {
      return "";
    }
    const localized = this.localizedMetadata.find(
      metadata => metadata.locale === locale
    );
    return localized ? localized.name : this.localizedMetadata[0].name;
  };

  public getDescription = (locale = "en") => {
    if (this.localizedMetadata.length === 0) {
      return "";
    }
    const localized = this.localizedMetadata.find(
      metadata => metadata.locale === locale
    );
    return localized
      ? localized.description
      : this.localizedMetadata[0].description;
  };

  public activePurchase?: Purchase | undefined;
}

export class ProductOfferingsResponse {
  @jsonProperty({ type: ProductOffering })
  public productOfferings: ProductOffering[] = [];
}

class PromotionDiscount {
  @jsonProperty()
  public discountedOfferingPrice: OfferingPrice;
}

export class Promotion {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public discount: PromotionDiscount;
  @jsonProperty()
  public fullDiscountVoucher: boolean;
}

export class PromotionResponse {
  @jsonProperty({ type: ProductOffering })
  public productOfferings: ProductOffering[];
  @jsonProperty()
  public promotion: Promotion;
}
