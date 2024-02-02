import { Season } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { getLocalizedValue } from "./localization.js";

export function getTitleFromSeason(season: Season, language: string, defaultLanguage?: string) {
  return getLocalizedValue(season.localized, "title", language, defaultLanguage);
}

export const SeasonHelpers = {
  getTitle: getTitleFromSeason
};
