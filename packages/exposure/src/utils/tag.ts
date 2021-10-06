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
  const localeItem =
    tag.localized.find(localizedItem => localizedItem.locale === locale) ||
    tag.localized.find(localizedItem => localizedItem.locale === defaultLocale) ||
    tag.localized[0];
  return localeItem.images || [];
}

export const tagUtils = {
  getTitle,
  getDescription,
  getImages
};
