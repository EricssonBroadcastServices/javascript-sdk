import { Translations } from "../models/wl-translations";
import { isToday, isTomorrow, isYesterday, format } from "date-fns";
// TODO Fix 👆, should import date-fns/* instead of the above
// But Jest & Typescript works like 💩 atm.


export const epgDateFormatter = (date: Date) => {
  const monthNum = date.getMonth() + 1;
  const dayNum = date.getDate();
  const month = monthNum < 10 ? `0${monthNum}` : monthNum;
  const day = dayNum < 10 ? `0${dayNum}` : dayNum;
  return `${date.getFullYear()}-${month}-${day}`;
};

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
