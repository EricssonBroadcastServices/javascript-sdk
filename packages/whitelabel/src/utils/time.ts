import { parse } from "iso8601-duration";
import format from "date-fns/format";

export interface Duration {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * parseSecondsToDuration
 * parse seconds to duration, only parses to hours, minutes & seconds
 */
export const parseSecondsToDuration = (input: number): Duration => {
  const hours = Math.floor(input / 3600);
  const minutes = Math.floor((input - hours * 3600) / 60);
  const seconds = Math.floor(input - hours * 3600 - minutes * 60);

  return {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
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
export const getDurationLocalized = (input: number) => {
  const duration = parseSecondsToDuration(input);
  const hours = duration.hours;
  const minutes = duration.minutes;
  const seconds = duration.seconds;

  return `\
  ${hours > 0 ? hours + "h " : ""}\
  ${minutes > 0 ? minutes + "min " : ""}\
  ${minutes < 1 && seconds > 0 ? seconds + "sec" : ""}\
  `;
};
