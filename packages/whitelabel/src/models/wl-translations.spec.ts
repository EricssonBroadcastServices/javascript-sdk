import { mockTranslations } from "../../test-utils/mock-translations";


describe("translations", () => {
  it("should properly get text", () => {
    expect(mockTranslations.getText("BUY")).toBe(mockTranslations.data["BUY"]);
  });
  it("should properly deepGet text", () => {
    expect(mockTranslations.getText(["deep", "test", 0, "test"])).toBe("test");
  });
  it("should fallback to emprty string when called with undefined", () => {
    /* eslint-disable */
    // @ts-ignore
    expect(mockTranslations.getText(undefined)).toBe("");
  });
});
