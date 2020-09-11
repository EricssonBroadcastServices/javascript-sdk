import { parseISOStringToDuration, Duration, parseSecondsToDuration, getTimeString } from "./time";

const baseDuration: Duration = {
  years: 0,
  months: 0,
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

describe("util/time", () => {
  describe("parseISOStringToDuration", () => {
    it("undefined", () => {
      expect(parseISOStringToDuration(undefined)).toEqual({ years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
    })
    it("PT2M", () => {
      const expectedDuration = Object.assign({}, baseDuration, { minutes: 2 });
      expect(parseISOStringToDuration("PT2M")).toEqual(expectedDuration);
    });
    it("PT24H", () => {
      const expectedDuration = Object.assign({}, baseDuration, { hours: 24 });
      expect(parseISOStringToDuration("PT24H")).toEqual(expectedDuration);
    });
    it("P39Y2M20DT0H20M5S", () => {
      const expectedDuration = Object.assign({}, baseDuration, {
        years: 39,
        months: 2,
        days: 20,
        hours: 0,
        minutes: 20,
        seconds: 5
      });
      expect(parseISOStringToDuration("P39Y2M20DT0H20M5S")).toEqual(expectedDuration);
    });
  });
  describe("parseSecondsToDuration", () => {
    it("7392", () => {
      const expectedDuration = Object.assign({}, baseDuration, { hours: 2, minutes: 3, seconds: 12 });
      expect(parseSecondsToDuration(7392)).toEqual(expectedDuration);
    });
  });
  describe("format", () => {
    expect(getTimeString(new Date("2020-01-01"))).toBe("01:00");
  })
});
