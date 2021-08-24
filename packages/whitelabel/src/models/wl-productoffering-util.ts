import { ProductOffering } from "../../../exposure/dist";
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

export const wlProductOfferingUtils = {
  getRentalLengthDescription
}