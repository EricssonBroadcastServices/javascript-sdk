import { Translations } from "../models/wl-translations";
import { format, Locale } from "date-fns";
import * as locales from "date-fns/locale";
// TODO Fix 👆, should import date-fns/* instead of the above
// But Jest & Typescript works like 💩 atm.

function isToday(date: Date) {
  return date.toDateString() === new Date().toDateString();
}

function isTomorrow(date: Date) {
  return date.toDateString() === new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toDateString();
}

function isYesterday(date: Date) {
  return date.toDateString() === new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toDateString();
}

export const getDayLocalized = (date: Date, translations: Translations) => {
  if (isToday(date)) {
    return translations.getText(["DATES", "TODAY"]);
  } else if (isTomorrow(date)) {
    return translations.getText(["DATES", "TOMORROW"]);
  } else if (isYesterday(date)) {
    return translations.getText(["DATES", "YESTERDAY"]);
  }
  return format(date, "dd/MM/yyyy");
};

const availableLocales = [
  { localeCode: "af", clientLocale: "af", specifier: "" },
  { localeCode: "arDZ", clientLocale: "ar", specifier: "DZ" },
  { localeCode: "arMA", clientLocale: "ar", specifier: "MA" },
  { localeCode: "arSA", clientLocale: "ar", specifier: "SA" },
  { localeCode: "az", clientLocale: "az", specifier: "" },
  { localeCode: "be", clientLocale: "be", specifier: "" },
  { localeCode: "bg", clientLocale: "bg", specifier: "" },
  { localeCode: "bn", clientLocale: "bn", specifier: "" },
  { localeCode: "ca", clientLocale: "ca", specifier: "" },
  { localeCode: "cs", clientLocale: "cs", specifier: "" },
  { localeCode: "cy", clientLocale: "cy", specifier: "" },
  { localeCode: "da", clientLocale: "da", specifier: "" },
  { localeCode: "de", clientLocale: "de", specifier: "" },
  { localeCode: "deAT", clientLocale: "de", specifier: "AT" },
  { localeCode: "el", clientLocale: "el", specifier: "" },
  { localeCode: "enGB", clientLocale: "en", specifier: "GB" },
  { localeCode: "enAU", clientLocale: "en", specifier: "AU" },
  { localeCode: "enCA", clientLocale: "en", specifier: "CA" },
  { localeCode: "enIN", clientLocale: "en", specifier: "IN" },
  { localeCode: "enNZ", clientLocale: "en", specifier: "NZ" },
  { localeCode: "enUS", clientLocale: "en", specifier: "US" },
  { localeCode: "enZA", clientLocale: "en", specifier: "ZA" },
  { localeCode: "eo", clientLocale: "eo", specifier: "" },
  { localeCode: "es", clientLocale: "es", specifier: "" },
  { localeCode: "et", clientLocale: "et", specifier: "" },
  { localeCode: "eu", clientLocale: "eu", specifier: "" },
  { localeCode: "faIR", clientLocale: "fa", specifier: "IR" },
  { localeCode: "fi", clientLocale: "fi", specifier: "" },
  { localeCode: "fr", clientLocale: "fr", specifier: "" },
  { localeCode: "frCA", clientLocale: "fr", specifier: "CA" },
  { localeCode: "frCH", clientLocale: "fr", specifier: "CH" },
  { localeCode: "gd", clientLocale: "gd", specifier: "" },
  { localeCode: "gl", clientLocale: "gl", specifier: "" },
  { localeCode: "gu", clientLocale: "gu", specifier: "" },
  { localeCode: "he", clientLocale: "he", specifier: "" },
  { localeCode: "hi", clientLocale: "hi", specifier: "" },
  { localeCode: "hr", clientLocale: "hr", specifier: "" },
  { localeCode: "ht", clientLocale: "ht", specifier: "" },
  { localeCode: "hu", clientLocale: "hu", specifier: "" },
  { localeCode: "hy", clientLocale: "hy", specifier: "" },
  { localeCode: "id", clientLocale: "id", specifier: "" },
  { localeCode: "is", clientLocale: "is", specifier: "" },
  { localeCode: "it", clientLocale: "it", specifier: "" },
  { localeCode: "ja", clientLocale: "ja", specifier: "" },
  { localeCode: "ka", clientLocale: "ka", specifier: "" },
  { localeCode: "kk", clientLocale: "kk", specifier: "" },
  { localeCode: "kn", clientLocale: "kn", specifier: "" },
  { localeCode: "ko", clientLocale: "ko", specifier: "" },
  { localeCode: "lb", clientLocale: "lb", specifier: "" },
  { localeCode: "lt", clientLocale: "lt", specifier: "" },
  { localeCode: "lv", clientLocale: "lv", specifier: "" },
  { localeCode: "mk", clientLocale: "mk", specifier: "" },
  { localeCode: "mn", clientLocale: "mn", specifier: "" },
  { localeCode: "ms", clientLocale: "ms", specifier: "" },
  { localeCode: "mt", clientLocale: "mt", specifier: "" },
  { localeCode: "nb", clientLocale: "nb", specifier: "" },
  { localeCode: "nl", clientLocale: "nl", specifier: "" },
  { localeCode: "nlBE", clientLocale: "nl", specifier: "BE" },
  { localeCode: "nn", clientLocale: "nn", specifier: "" },
  { localeCode: "pl", clientLocale: "pl", specifier: "" },
  { localeCode: "pt", clientLocale: "pt", specifier: "" },
  { localeCode: "ptBR", clientLocale: "pt", specifier: "BR" },
  { localeCode: "ro", clientLocale: "ro", specifier: "" },
  { localeCode: "ru", clientLocale: "ru", specifier: "" },
  { localeCode: "sk", clientLocale: "sk", specifier: "" },
  { localeCode: "sl", clientLocale: "sl", specifier: "" },
  { localeCode: "sq", clientLocale: "sq", specifier: "" },
  { localeCode: "sr", clientLocale: "sr", specifier: "" },
  { localeCode: "srLatn", clientLocale: "sr", specifier: "Latn" },
  { localeCode: "sv", clientLocale: "sv", specifier: "" },
  { localeCode: "ta", clientLocale: "ta", specifier: "" },
  { localeCode: "te", clientLocale: "te", specifier: "" },
  { localeCode: "th", clientLocale: "th", specifier: "" },
  { localeCode: "tr", clientLocale: "tr", specifier: "" },
  { localeCode: "ug", clientLocale: "ug", specifier: "" },
  { localeCode: "uk", clientLocale: "uk", specifier: "" },
  { localeCode: "uz", clientLocale: "uz", specifier: "" },
  { localeCode: "vi", clientLocale: "vi", specifier: "" },
  { localeCode: "zhCN", clientLocale: "zh", specifier: "CN" },
  { localeCode: "zhTW", clientLocale: "zh", specifier: "TW" }
];

export enum FORMAT {
  LONG = "PPPPpppp",
  MEDIUM = "PP, p",
  SHORT = "Pp",
  LONG_DATE = "PPPP",
  MEDIUM_DATE = "PPP",
  SHORT_DATE = "P",
  LONG_TIME = "pppp",
  MEDIUM_TIME = "pp",
  SHORT_TIME = "p"
}

interface IAvailableLocales {
  localeCode: string;
  clientLocale: string;
  specifier: string;
}

export function getLocalDateFormat(date: Date, stringFormat: string, clientLocale?: string, specifier?: string) {
  let locale: Locale | undefined;
  let existingLocale: IAvailableLocales | undefined;

  if (!clientLocale) {
    //defaults to browser settings.
    return format(date, stringFormat);
  }
  if (specifier) {
    existingLocale = availableLocales.find(
      existingLocale => existingLocale.specifier.toLowerCase() === specifier.toLowerCase()
    );
  } else {
    existingLocale = availableLocales.find(
      existingLocale => existingLocale.clientLocale.toLowerCase() === clientLocale.toLowerCase()
    );
  }
  if (existingLocale) {
    //If existingLocal is undefined, due to mispelling or other reasons, defaults to browser settings
    locale = locales[existingLocale.localeCode];
  }
  return format(date, stringFormat, { locale });
}

function dateIntervalIsNow(startTime: Date, endTime: Date) {
  const now = new Date();
  return endTime > now && startTime <= now;
}

export function getIndexOfLiveOrClosestUpcomingDateInterval<T extends { startTime: Date; endTime: Date }[]>(
  dateIntervals: T,
  now = Date.now()
): number {
  const isLive = dateIntervals.find(({ startTime, endTime }) => dateIntervalIsNow(startTime, endTime));
  if (isLive) {
    return dateIntervals.indexOf(isLive) || 0;
  }
  const closest = dateIntervals
    .filter(({ startTime }) => startTime.getTime() > now)
    .sort((a, b) => {
      return a.startTime.getTime() - now - (b.startTime.getTime() - now);
    });
  return dateIntervals.indexOf(closest[0]) || 0;
}
