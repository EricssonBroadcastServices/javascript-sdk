import { UserAttributeResponse } from "@ericssonbroadcastservices/rbm-ott-sdk";

function getUserDetailsAttributeTitle(attribute: UserAttributeResponse, locale: string): string | null {
  if (!attribute.localized.length) return null;
  const localizedItem = attribute.localized.find(l => l.locale === locale) || attribute.localized[0];
  return localizedItem?.title || null;
}

function getUserDetailsAttributeDescription(attribute: UserAttributeResponse, locale: string): string | null {
  if (!attribute.localized.length) return null;
  const localizedItem = attribute.localized.find(l => l.locale === locale) || attribute.localized[0];
  return localizedItem?.description || null;
}

export const UserDetailsHelpers = {
  getAttributeTitle: getUserDetailsAttributeTitle,
  getAttributeDescription: getUserDetailsAttributeDescription
};
