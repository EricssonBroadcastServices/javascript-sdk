import { IProductOffering } from "../interfaces/payment/product-offering";

function getTitle(offering: IProductOffering, locale: string) {
  if (offering.localizedMetadata.length === 0) {
    return "";
  }
  const localized = offering.localizedMetadata.find(metadata => metadata.locale === locale);
  return localized ? localized.name : offering.localizedMetadata[0].name;
}

function getDescription(offering: IProductOffering, locale: string) {
  if (offering.localizedMetadata.length === 0) {
    return "";
  }
  const localized = offering.localizedMetadata.find(metadata => metadata.locale === locale);
  return localized ? localized.description : offering.localizedMetadata[0].description;
}

export const productOfferingUtils = {
  getTitle,
  getDescription
};
