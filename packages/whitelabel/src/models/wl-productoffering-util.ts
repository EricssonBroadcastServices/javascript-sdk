import { ProductOffering, priceUtils } from "@ericssonbroadcastservices/exposure-sdk";
import { FORMAT, getLocalDateFormat } from "../utils/date";
import { getDateObjectFromISOString, iso8601ToReadableString } from "../utils/time";
import { Translations } from "./wl-translations";

export function getRentalLengthDescription(productOffering: ProductOffering, translations: Translations, locale?: string) {
  if (productOffering.recurrence) {
    return translations.getText("VALID_FOR_RECURRENCE").replace("{time}", iso8601ToReadableString(productOffering.recurrence, translations));
  }
  if (productOffering.rentalLength) {
    if (!productOffering.rentalExpiryWindow) {
      if (productOffering.entitlementStart) {
        const entitlementStop = getDateObjectFromISOString(productOffering.rentalLength, productOffering.salesStart)
        return `${translations.getText("VALID_UNTIL")} ${getLocalDateFormat(
              entitlementStop,
              FORMAT.MEDIUM_DATE,
              locale
            )}`;
        
      }
      return translations.getText("VALID_FOR").replace("{time}", iso8601ToReadableString(productOffering.rentalLength, translations));
    } else {
      return translations.getText("VALID_FOR_EXPIRY_WINDOW")
        .replace("{time}", iso8601ToReadableString(productOffering.rentalLength, translations))
        .replace("{expiry}", iso8601ToReadableString(productOffering.rentalExpiryWindow, translations))
    } 
  }
  return "";
}

function getPriceWithVATString({ offeringPrice, ...rest }: ProductOffering, translations: Translations) {
  const vatString =
  offeringPrice.vat.percentage === 0
      ? ""
      : ` - ${getPricelessVATString({ offeringPrice, ...rest }, translations)}`;
  return priceUtils.getPriceStringWithCurrency(offeringPrice.price) + vatString;
};

function getPricelessVATString({ offeringPrice }: ProductOffering, translations: Translations) {
  const vatString =
    offeringPrice.vat.percentage === 0
      ? ""
      : `${offeringPrice.vat.percentage}% ${offeringPrice.vat.included ? translations.getText("VAT_INCLUDED") : translations.getText("VAT_NOT_INCLUDED")
      }`;
  return vatString;
}

export const wlProductOfferingUtils = {
  getRentalLengthDescription,
  getPriceWithVATString,
  getPricelessVATString
}