import { ITag } from "../interfaces/tag/tag";

function getTitle(tag: ITag, locale: string) {
  if (tag.localized.length === 0) {
    return "";
  }
  const localeItem = tag.localized.find(localizedItem => localizedItem.locale === locale) || tag.localized[0];
  return localeItem.title || "";
}

export const tagUtils = {
  getTitle
};
