import { parse } from "iso8601-duration";
import format from "date-fns/format";
import humanizeDuration from "humanize-duration";

export interface Duration {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const oneMinuteSec = 60;
const oneHourSec = oneMinuteSec * 60;
const oneDaySec = oneHourSec * 24;
/**
 * parseSecondsToDuration
 * parse seconds to duration, only parses to hours, minutes & seconds
 */
export const parseSecondsToDuration = (input: number): Duration => {
  const days = Math.floor(input / oneDaySec);
  const hours = Math.floor((input - days * oneDaySec) / oneHourSec);
  const minutes = Math.floor((input - days * oneDaySec - hours * oneHourSec) / oneMinuteSec);
  const seconds = Math.floor(input - days * oneDaySec - hours * oneHourSec - minutes * 60);

  return {
    years: 0,
    months: 0,
    weeks: 0,
    days,
    hours,
    minutes,
    seconds
  };
};

export const parseISOStringToDuration = (durationString: string | undefined): Duration => {
  if (!durationString) {
    return { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const duration = parse(durationString);
  return {
    years: duration.years ?? 0,
    months: duration.months ?? 0,
    weeks: duration.weeks ?? 0,
    days: duration.days ?? 0,
    hours: duration.hours ?? 0,
    minutes: duration.minutes ?? 0,
    seconds: duration.seconds ?? 0
  };
};

export const getTimeString = (date: Date) => {
  return format(date, "HH:mm");
};

// TODO localize this
export const getDurationLocalized = (milliseconds: number, locale?: string) => {
  const language = locale || "en";
  return humanizeDuration(milliseconds, { language: language, fallbacks: ["en"] });
};
