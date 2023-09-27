import { StoreProductOffering } from "@ericssonbroadcastservices/rbm-ott-sdk";

function getProductOfferingTitle(offering: StoreProductOffering, locale: string) {
  if (offering.localizedMetadata.length === 0) {
    return "";
  }
  const localized = offering.localizedMetadata.find(metadata => metadata.locale === locale);
  return localized ? localized.name : offering.localizedMetadata[0].name;
}

function getProductOfferingDescription(offering: StoreProductOffering, locale: string) {
  if (offering.localizedMetadata.length === 0) {
    return "";
  }
  const localized = offering.localizedMetadata.find(metadata => metadata.locale === locale);
  return localized ? localized.description : offering.localizedMetadata[0].description;
}

export const ProductOfferingHelpers = {
  getTitle: getProductOfferingTitle,
  getDescription: getProductOfferingDescription
};
