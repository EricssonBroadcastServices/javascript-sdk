import { Season } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { getLocalizedValue } from "./localization";

export function getTitleFromSeason(season: Season, locale: string, defaultLocale?: string) {
  return getLocalizedValue(season.localized, "title", locale, defaultLocale);
}

export const SeasonHelpers = {
  getTitle: getTitleFromSeason
};
