import { IUserProfileAttribute } from "../interfaces/user/user-details";

function getAttributeTitle(attribute: IUserProfileAttribute, locale: string): string | null {
  if (!attribute.localized?.length) return null;
  const localizedItem = attribute.localized.find(l => l.locale === locale) || attribute.localized[0];
  return localizedItem?.title || null;
}

function getAttributeDescription(attribute: IUserProfileAttribute, locale: string): string | null {
  if (!attribute.localized?.length) return null;
  const localizedItem = attribute.localized.find(l => l.locale === locale) || attribute.localized[0];
  return localizedItem?.description || null;
}

export const userDetailsUtils = {
  getAttributeTitle,
  getAttributeDescription
};
