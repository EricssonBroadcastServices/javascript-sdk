import { ProductOffering, OfferingPrice } from "./product-offering-model";
import { jsonProperty } from "../decorators/json-property";
import { Translations } from "./wl-translations";
import { parseISOStringToDuration } from "../utils/time";

export class WLOfferingPrice extends OfferingPrice {
  public getPriceWithVAT = (translations: Translations) => {
    const vatString =
      this.vat.percentage === 0
        ? ""
        : ` - ${this.vat.percentage}% ${
            this.vat.included ? translations.getText("VAT_INCLUDED") : translations.getText("VAT_NOT_INCLUDED")
          }`;
    return this.price.getPriceWithCurrency() + vatString;
  };
  public getPricelessVAT = (translations: Translations) => {
    const vatString =
      this.vat.percentage === 0
        ? ""
        : `${this.vat.percentage}% ${
            this.vat.included ? translations.getText("VAT_INCLUDED") : translations.getText("VAT_NOT_INCLUDED")
          }`;
    return vatString;
  };
}

export class WLProductOffering extends ProductOffering {
  @jsonProperty({ type: WLOfferingPrice })
  public offeringPrice: WLOfferingPrice;

  public getRentalLengthString = (translations: Translations) => {
    const duration = this.rentalLength
      ? parseISOStringToDuration(this.rentalLength)
      : parseISOStringToDuration(this.recurrence);
    const months = duration.months;
    const days = duration.days;
    const hours = duration.hours;
    const minutes = duration.minutes;

    const monthText = months > 1 ? translations.getText(["DATES", "MONTHS"]) : translations.getText(["DATES", "MONTH"]);
    const dayText = days > 1 ? translations.getText(["DATES", "DAYS"]) : translations.getText(["DATES", "DAY"]);
    const hourText = hours > 1 ? translations.getText(["DATES", "HOURS"]) : translations.getText(["DATES", "HOUR"]);
    const minuteText =
      minutes > 1 ? translations.getText(["DATES", "MINUTES"]) : translations.getText(["DATES", "MINUTE"]);

    return (
      `${months > 0 ? months + ` ${monthText} ` : ""}` +
      `${days > 0 ? days + ` ${dayText}` : ""}` +
      `${hours > 0 ? hours + ` ${hourText} ` : ""}` +
      `${minutes > 0 ? minutes + ` ${minuteText} ` : ""}`
    );
  };
  public getRecurrenceString = (translations: Translations) => {
    if (parseInt(this.getRentalLengthString(translations)) === 1) {
      return this.getRentalLengthString(translations).replace("1", "");
    }
    return this.getRentalLengthString(translations);
  };
}

export class ProductOfferingsResponse {
  @jsonProperty({ type: ProductOffering })
  public productOfferings: ProductOffering[] = [];
}
