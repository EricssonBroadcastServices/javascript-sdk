import { StoreProductOffering, StoreProductOfferingPrice } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { Translations } from "./wl-translations";
import { getLocalDateFormat } from "./date";
import { PriceHelpers } from "./price";
import { getDateObjectFromISOString, iso8601ToReadableString } from "./time";

export function getProductOfferingTitle(offering: StoreProductOffering, locale: string) {
  if (offering.localizedMetadata.length === 0) {
    return "";
  }
  const localized = offering.localizedMetadata.find(metadata => metadata.locale === locale);
  return localized ? localized.name : offering.localizedMetadata[0].name;
}

export function getProductOfferingDescription(offering: StoreProductOffering, locale: string) {
  if (offering.localizedMetadata.length === 0) {
    return "";
  }
  const localized = offering.localizedMetadata.find(metadata => metadata.locale === locale);
  return localized ? localized.description : offering.localizedMetadata[0].description;
}

export function getProductOfferingRentalLengthDescription(
  productOffering: StoreProductOffering,
  translations: Translations,
  locale?: string
) {
  if (productOffering.recurrence) {
    return translations
      .getText("VALID_FOR_RECURRENCE")
      .replace("{time}", iso8601ToReadableString(productOffering.recurrence, translations));
  }
  if (productOffering.rentalLength) {
    if (!productOffering.rentalExpiryWindow) {
      if (productOffering.entitlementStart) {
        const entitlementStop = getDateObjectFromISOString(
          productOffering.rentalLength,
          new Date(productOffering.entitlementStart)
        );
        return `${translations.getText("VALID_UNTIL")} ${getLocalDateFormat(entitlementStop, locale)}`;
      }
      return translations
        .getText("VALID_FOR")
        .replace("{time}", iso8601ToReadableString(productOffering.rentalLength, translations));
    } else {
      return translations
        .getText("VALID_FOR_EXPIRY_WINDOW")
        .replace("{time}", iso8601ToReadableString(productOffering.rentalLength, translations))
        .replace("{expiry}", iso8601ToReadableString(productOffering.rentalExpiryWindow, translations));
    }
  }
  return "";
}

export function getProductOfferingPriceWithVATString(
  offeringPrice: StoreProductOfferingPrice,
  translations: Translations
) {
  if (!offeringPrice.vat) return PriceHelpers.getPriceStringWithCurrency(offeringPrice.price);
  const vatString =
    offeringPrice.vat.percentage === 0 ? "" : ` - ${getProductOfferingPricelessVATString(offeringPrice, translations)}`;
  return PriceHelpers.getPriceStringWithCurrency(offeringPrice.price) + vatString;
}

export function getProductOfferingPricelessVATString(
  offeringPrice: StoreProductOfferingPrice,
  translations: Translations
) {
  if (!offeringPrice.vat) return "";
  const vatString =
    offeringPrice.vat.percentage === 0
      ? ""
      : `${offeringPrice.vat.percentage}% ${
          offeringPrice.vat.included ? translations.getText("VAT_INCLUDED") : translations.getText("VAT_NOT_INCLUDED")
        }`;
  return vatString;
}

export const ProductOfferingHelpers = {
  getTitle: getProductOfferingTitle,
  getDescription: getProductOfferingDescription,
  getRentalLengthDescription: getProductOfferingRentalLengthDescription,
  getPriceWithVATString: getProductOfferingPriceWithVATString,
  getPricelessVATString: getProductOfferingPricelessVATString
};
