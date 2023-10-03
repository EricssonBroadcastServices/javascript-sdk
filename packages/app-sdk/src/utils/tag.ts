import { ImageOrientation, TagType } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { getLocalizedImageByType, getLocalizedValue } from "./localization";

function getTagTitle(tag: TagType, locale: string, defaultLocale?: string) {
  return getLocalizedValue(tag.localized, "title", locale, defaultLocale);
}

function getTagDescription(tag: TagType, locale: string, defaultLocale?: string) {
  return getLocalizedValue(tag.localized, "description", locale, defaultLocale);
}

function getTagImages(tag: TagType, locale: string, defaultLocale?: string) {
  return getLocalizedValue(tag.localized, "images", locale, defaultLocale);
}

export function getLocalizedTagImage(
  tag: TagType,
  imageOrientation: ImageOrientation,
  imageType: string,
  locale: string,
  defaultLocale?: string
) {
  return getLocalizedImageByType(tag.localized, imageOrientation, imageType, locale, defaultLocale);
}

export const TagHelpers = {
  getTitle: getTagTitle,
  getDescription: getTagDescription,
  getImages: getTagImages
};
