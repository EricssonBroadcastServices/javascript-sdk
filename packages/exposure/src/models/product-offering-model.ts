import { jsonProperty } from "../decorators/json-property";
import { IPrice, priceUtils } from "./price";
import { Purchase } from "./purchase-model";

interface IVat {
  percentage: number;
  included: boolean;
}

export class Price implements IPrice {
  @jsonProperty()
  public amount: number;
  @jsonProperty()
  public fractionDigits: number;
  @jsonProperty()
  public currency: string;
  /**
   * @deprecated use priceUtils instead
   */
  public getPrice = () => {
    return priceUtils.getPriceString(this);
  };
  /**
   * @deprecated use priceUtils instead
   */
  public getPriceWithCurrency = () => {
    return priceUtils.getPriceStringWithCurrency(this);
  };
}

export class OfferingPrice {
  @jsonProperty({ type: Price })
  public price: Price;
  @jsonProperty()
  public countryCode: string;
  @jsonProperty()
  public vat: IVat;
}

interface ILocalizedMetadata {
  locale: string;
  name: string;
  description: string;
}

export interface IDiscount {
  price?: Price;
  numberOfRecurringPayments: number;
  freePeriod?: string;
}

export class ProductOffering {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public rentalLength?: string;
  @jsonProperty()
  public rentalExpiryWindow?: string;
  @jsonProperty()
  public recurrence?: string;
  @jsonProperty({ type: Object })
  public localizedMetadata: ILocalizedMetadata[];
  @jsonProperty()
  public productRequiresSelectAsset: boolean;
  @jsonProperty({ type: String })
  public productIds: string[];
  @jsonProperty({ type: OfferingPrice })
  public offeringPrice: OfferingPrice;
  @jsonProperty()
  public discount?: IDiscount;
  @jsonProperty({ type: String })
  public paymentMethodTypes: string[];
  @jsonProperty()
  public entitlementStart?: Date;
  @jsonProperty()
  public salesStart: Date;
  public getTitle = (locale: string) => {
    if (this.localizedMetadata.length === 0) {
      return "";
    }
    const localized = this.localizedMetadata.find(metadata => metadata.locale === locale);
    return localized ? localized.name : this.localizedMetadata[0].name;
  };

  public getDescription = (locale = "en") => {
    if (this.localizedMetadata.length === 0) {
      return "";
    }
    const localized = this.localizedMetadata.find(metadata => metadata.locale === locale);
    return localized ? localized.description : this.localizedMetadata[0].description;
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
