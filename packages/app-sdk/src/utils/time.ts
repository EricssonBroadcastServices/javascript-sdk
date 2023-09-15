import { parse, toSeconds } from "iso8601-duration";
import * as humanizeDuration from "humanize-duration";
import { Translations } from "../models/wl-translations";

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

export const getDateObjectFromISOString = (durationString: string, startDate = new Date()): Date => {
  const duration = parseISOStringToDuration(durationString);
  const seconds = toSeconds(duration);
  const ms = seconds * 1000;
  return new Date(startDate.getTime() + ms);
};

export function getTimeString(date: Date): string {
  // returns HH:mm in local timezone. For more control change to Intl.DateTimeFormat
  return date.toTimeString().slice(0, 5);
}

export const getDurationLocalized = (milliseconds: number, locale?: string) => {
  return humanizeDuration(milliseconds, {
    language: locale || "en",
    fallbacks: ["en"],
    round: true
  });
};

export function iso8601ToReadableString(iso8601String: string, translations: Translations): string {
  const duration = parseISOStringToDuration(iso8601String);
  const years = duration.years;
  const months = duration.months;
  const days = duration.days;
  const hours = duration.hours;
  const minutes = duration.minutes;

  const yearText = translations.getText(["DATES", "YEAR"]);
  const monthText = months > 1 ? translations.getText(["DATES", "MONTHS"]) : translations.getText(["DATES", "MONTH"]);
  const dayText = days > 1 ? translations.getText(["DATES", "DAYS"]) : translations.getText(["DATES", "DAY"]);
  const hourText = hours > 1 ? translations.getText(["DATES", "HOURS"]) : translations.getText(["DATES", "HOUR"]);
  const minuteText =
    minutes > 1 ? translations.getText(["DATES", "MINUTES"]) : translations.getText(["DATES", "MINUTE"]);

  return (
    `${years > 0 ? years + ` ${yearText} ` : ""}` +
    `${months > 0 ? months + ` ${monthText} ` : ""}` +
    `${days > 0 ? days + ` ${dayText}` : ""}` +
    `${hours > 0 ? hours + ` ${hourText} ` : ""}` +
    `${minutes > 0 ? minutes + ` ${minuteText} ` : ""}`
  ).trim();
}
