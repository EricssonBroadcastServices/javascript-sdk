import { Translations } from "../models/wl-translations";
import { isToday, isTomorrow, isYesterday, format } from "date-fns";
// TODO Fix 👆, should import date-fns/* instead of the above
// But Jest & Typescript works like 💩 atm.

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
