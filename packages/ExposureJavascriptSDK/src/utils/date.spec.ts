import { mockTranslations } from "../../test-utils/mock-translations";
import { getDayLocalized } from "./date";

const ONE_DAY_MS = 86400000;

describe("util/date", () => {
  describe("getDayLocalized", () => {
    it("returns today", () => {
      expect(getDayLocalized(new Date(Date.now()), mockTranslations)).toBe("Today");
    });
    it("returns tomorrow", () => {
      expect(getDayLocalized(new Date(Date.now() + ONE_DAY_MS), mockTranslations)).toBe("Tomorrow");
    });
    it("returns yesterday", () => {
      expect(getDayLocalized(new Date(Date.now() - ONE_DAY_MS), mockTranslations)).toBe("Yesterday");
    });
    it("returns future dates in DD/MM/YYYY", () => {
      expect(getDayLocalized(new Date(1991, 3, 20), mockTranslations)).toBe("20/04/1991");
    });
    it("returns past dates in DD/MM/YYYY", () => {
      expect(getDayLocalized(new Date(2200, 0, 20), mockTranslations)).toBe("20/01/2200");
    });
  });
});
