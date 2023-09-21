import { Asset as ExposureAsset } from "@ericssonbroadcastservices/rbm-ott-sdk";

export function getTitleFromAsset(asset: ExposureAsset, locale: string) {
  // TODO: decide how to handle fallbacks
  return asset.localized.find(l => l.locale === locale)?.title || "";
}

export const Asset = {
  getTitle: getTitleFromAsset
};
