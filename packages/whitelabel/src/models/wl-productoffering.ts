import { Translations } from "./wl-translations";
import { parseISOStringToDuration } from "../utils/time";
import { IOfferingPrice, IProductOffering, ProductOfferingUtils} from "@ericssonbroadcastservices/exposure-sdk";

export class WLProductOfferingUtils extends ProductOfferingUtils {
  static getPriceWithVAT = (offeringPrice: IOfferingPrice, translations: Translations) => {
    const vatString =
    offeringPrice.vat.percentage === 0
        ? ""
        : ` - ${offeringPrice.vat.percentage}% ${
          offeringPrice.vat.included ? translations.getText("VAT_INCLUDED") : translations.getText("VAT_NOT_INCLUDED")
          }`;
    return ProductOfferingUtils.getPriceWithCurrency(offeringPrice.price) + vatString;
  };
  static getPricelessVAT = (offeringPrice: IOfferingPrice, translations: Translations) => {
    const vatString =
    offeringPrice.vat.percentage === 0
        ? ""
        : `${offeringPrice.vat.percentage}% ${
          offeringPrice.vat.included ? translations.getText("VAT_INCLUDED") : translations.getText("VAT_NOT_INCLUDED")
          }`;
    return vatString;
  };

  static getRentalLengthString = (offering: IProductOffering, translations: Translations) => {
    const duration = offering.rentalLength
      ? parseISOStringToDuration(offering.rentalLength)
      : parseISOStringToDuration(offering.recurrence);
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

  static getRecurrenceString = (offering: IProductOffering, translations: Translations) => {
    
    if (parseInt(WLProductOfferingUtils.getRentalLengthString(offering, translations)) === 1) {
      return WLProductOfferingUtils.getRentalLengthString(offering, translations).replace("1", "");
    }
    return WLProductOfferingUtils.getRentalLengthString(offering, translations);
  };
}

