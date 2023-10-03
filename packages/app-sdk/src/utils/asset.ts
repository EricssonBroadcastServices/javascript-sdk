import { Asset, ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { PublicationHelpers } from "./publication";
import { getLocalizedImageByType, getLocalizedValue } from "./localization";

export function getTitleFromAsset(asset: Asset, locale: string, defaultLocale?: string) {
  return getLocalizedValue(asset.localized, "title", locale, defaultLocale);
}

export function getShortDescriptionFromAsset(asset: Asset, locale: string, defaultLocale?: string) {
  return getLocalizedValue(asset.localized, "shortDescription", locale, defaultLocale);
}

export function getMediumDescriptionFromAsset(asset: Asset, locale: string, defaultLocale?: string) {
  return getLocalizedValue<"description">(asset.localized, "description", locale, defaultLocale);
}

export function getLongDescriptionFromAsset(asset: Asset, locale: string, defaultLocale?: string) {
  return getLocalizedValue<"longDescription">(asset.localized, "longDescription", locale, defaultLocale);
}

export function getLocalizedAssetImage(
  asset: Asset,
  imageOrientation: ImageOrientation,
  imageType: string,
  locale: string,
  defaultLocale?: string
) {
  return getLocalizedImageByType(asset.localized, imageOrientation, imageType, locale, defaultLocale);
}

export function getAssetEndtime(asset: Asset): Date | null {
  if (asset.event && asset.event.endTime) {
    return new Date(asset.event.endTime);
  }
  if (asset.programs && asset.programs.length === 1) {
    return new Date(asset.programs[0].endTime);
  }
  return null;
}

export function getAssetStartTime(asset: Asset): Date | null {
  if (asset.event && asset.event.startTime) {
    return new Date(asset.event.startTime);
  }
  if (asset.programs && asset.programs.length === 1) {
    return new Date(asset.programs[0].startTime);
  }

  // fallback to use startTime from publication

  if (asset.publications.length === 0) {
    return null;
  }
  const publicationsSortedAscending = asset.publications.sort(PublicationHelpers.sortPublicationsAscending);
  // if we the asset will be published in the future, take the start time from next upcoming publication
  if (PublicationHelpers.allInFuture(asset.publications)) {
    const futurePublications = publicationsSortedAscending.filter(p => PublicationHelpers.inFuture(p));
    if (futurePublications.length) return new Date(futurePublications[0].fromDate);
  }
  // if we have active publications, the start time has already been
  const activePublications = PublicationHelpers.getActivePublications(publicationsSortedAscending);
  if (activePublications.length) {
    return new Date(activePublications[0].fromDate);
  }
  return new Date(publicationsSortedAscending[0].fromDate);
}

export const AssetHelpers = {
  getTitle: getTitleFromAsset,
  getMediumDescription: getMediumDescriptionFromAsset,
  getShortDescription: getShortDescriptionFromAsset,
  getLongDescription: getLongDescriptionFromAsset,
  getStartTime: getAssetStartTime,
  getEndTime: getAssetEndtime,
  getLocalizedImage: getLocalizedAssetImage
};
