import { getEventProgress, getTimeLeft } from "./programProgress";
import { Program } from "@ericssonbroadcastservices/rbm-ott-sdk";

describe("programProgress", () => {
  Date.now = jest.fn(() => 1695904199500);
  it("should get progress of an event", () => {
    const programs: Program[] = [
      {
        channelId: "89bff8fb_82162E",
        endTime: "2023-09-28T12:59:14Z",
        programId: "p89bff8fb-1824232804_82162E",
        startTime: "2023-09-28T12:00:45Z"
      }
    ];
    expect(getEventProgress(programs, "89bff8fb-1824232804_82162E")).toEqual({
      duration: 3509000,
      endTime: 1695905954000,
      progress: 50,
      startTime: 1695902445000
    });
  });
  it("should return 0 if no matching program was found", () => {
    expect(getEventProgress([], "89bff8fb-1824232804_82162E")).toEqual({
      startTime: 0,
      endTime: 0,
      duration: 0,
      progress: 0
    });
  });
  it("should get progress (0) of an event if startTime is equal to endTime", () => {
    const programs: Program[] = [
      {
        channelId: "89bff8fb_82162E",
        endTime: "2023-09-28T12:59:14Z",
        programId: "p89bff8fb-1824232804_82162E",
        startTime: "2023-09-28T12:59:14Z"
      }
    ];
    expect(getEventProgress(programs, "89bff8fb-1824232804_82162E")).toEqual({
      duration: 0,
      endTime: 1695905954000,
      progress: 0,
      startTime: 1695905954000
    });
  });
});

describe("programProgress", () => {
  it("should return the hours and minutes left of a program", () => {
    expect(getTimeLeft(0, 7200000)).toEqual({ hours: 2, minutes: 0 });
    expect(getTimeLeft(30, 7200000)).toEqual({ hours: 1, minutes: 24 });
    expect(getTimeLeft(50, 7200000)).toEqual({ hours: 1, minutes: 0 });
    expect(getTimeLeft(70, 7200000)).toEqual({ hours: 0, minutes: 36 });
    expect(getTimeLeft(100, 7200000)).toEqual({ hours: 0, minutes: 0 });
  });
  it("should return 0 hours and 0 minutes left of a program if duration or percentage watched is set to 0", () => {
    expect(getTimeLeft(50, 0)).toEqual({ hours: 0, minutes: 0 });
    expect(getTimeLeft(0, 0)).toEqual({ hours: 0, minutes: 0 });
  });
  it("should return 0 hours and 0 minutes left of a program if duration or percentage watched is set to undefined", () => {
    expect(getTimeLeft(undefined, undefined)).toEqual({ hours: 0, minutes: 0 });
    expect(getTimeLeft(undefined, 50)).toEqual({ hours: 0, minutes: 0 });
    expect(getTimeLeft(50, undefined)).toEqual({ hours: 0, minutes: 0 });
  });
});
