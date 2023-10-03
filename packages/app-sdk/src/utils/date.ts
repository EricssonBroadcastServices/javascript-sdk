import { Translations } from "./wl-translations";

const oneDayInMS = 1000 * 60 * 60 * 24;

function isToday(date: Date) {
  return date.toDateString() === new Date().toDateString();
}

function isTomorrow(date: Date) {
  const tomorrow = new Date(Date.now() + oneDayInMS);
  return date.toDateString() === tomorrow.toDateString();
}

function isYesterday(date: Date) {
  const yesterday = new Date(Date.now() - oneDayInMS);
  return date.toDateString() === yesterday.toDateString();
}

export const getDayLocalized = (date: Date, translations: Translations) => {
  if (isToday(date)) {
    return translations.getText(["DATES", "TODAY"]);
  } else if (isTomorrow(date)) {
    return translations.getText(["DATES", "TOMORROW"]);
  } else if (isYesterday(date)) {
    return translations.getText(["DATES", "YESTERDAY"]);
  }
  return getLocalDateFormat(date);
};

export function getLocalDateFormat(date: Date, locale?: string) {
  return new Intl.DateTimeFormat(locale).format(date);
}

function dateIntervalIsNow(startTime: Date, endTime: Date, now = Date.now()) {
  if (endTime.getTime() > now && startTime.getTime() <= now) {
    return true;
  }
  return false;
}

export function getIndexOfLiveOrClosestUpcomingDateInterval<T extends { startTime: Date; endTime: Date }[]>(
  dateIntervals: T,
  now = Date.now()
): number {
  const isLive = dateIntervals.find(({ startTime, endTime }) => dateIntervalIsNow(startTime, endTime, now));
  if (isLive) {
    return dateIntervals.indexOf(isLive) || 0;
  }
  const closest = dateIntervals
    .filter(({ startTime }) => startTime.getTime() > now)
    .sort((a, b) => {
      return a.startTime.getTime() - now - (b.startTime.getTime() - now);
    });
  return dateIntervals.indexOf(closest[0]) > 0 ? dateIntervals.indexOf(closest[0]) : 0;
}
