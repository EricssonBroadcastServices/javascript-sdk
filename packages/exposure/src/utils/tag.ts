import { IImage } from "..";
import { ITag } from "../interfaces/tag/tag";

function getTitle(tag: ITag, locale: string, defaultLocale?: string) {
  if (tag.localized.length === 0) {
    return "";
  }
  const localeItem =
    tag.localized.find(localizedItem => localizedItem.locale === locale) ||
    tag.localized.find(localizedItem => localizedItem.locale === defaultLocale) ||
    tag.localized[0];
  return localeItem.title || "";
}

function getDescription(tag: ITag, locale: string, defaultLocale?: string) {
  if (tag.localized.length === 0) {
    return "";
  }
  const localeItem =
    tag.localized.find(localizedItem => localizedItem.locale === locale) ||
    tag.localized.find(localizedItem => localizedItem.locale === defaultLocale) ||
    tag.localized[0];
  return localeItem.description || "";
}

function getImages(tag: ITag, locale: string, defaultLocale?: string) {
  if (tag.localized.length === 0) {
    return [];
  }
  let images: IImage[] = [];
  if (tag.localized.find(localizedItem => localizedItem.locale === locale)?.images.length) {
    images = tag.localized.find(localizedItem => localizedItem.locale === locale)?.images as IImage[];
  } else if (tag.localized.find(localizedItem => localizedItem.locale === defaultLocale)?.images.length) {
    images = tag.localized.find(localizedItem => localizedItem.locale === defaultLocale)?.images as IImage[];
  }
  return images;
}

export const tagUtils = {
  getTitle,
  getDescription,
  getImages
};
