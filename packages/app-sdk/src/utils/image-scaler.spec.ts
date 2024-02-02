import { fitToHeight, fitToWidth } from "./image-scaling.js";

describe("Image scaler", () => {
  it("should add query params", () => {
    expect(fitToWidth("imageUrl/image.png", 400)).toBe("imageUrl/image.png?w=400");
    expect(fitToWidth("imageUrl/image.png", 400, undefined)).toBe("imageUrl/image.png?w=400");
    expect(fitToWidth("imageUrl/image.png", 400, "webp")).toBe("imageUrl/image.png?w=400&format=webp");
  });
  it("should add query params even when other query params exist", () => {
    expect(fitToWidth("imageUrl/image.png?test=test", 400)).toBe("imageUrl/image.png?test=test&w=400");
    expect(fitToWidth("imageUrl/image.png?test=test", 400, "webp")).toBe(
      "imageUrl/image.png?test=test&w=400&format=webp"
    );
  });
  it("should return empty string when no url", () => {
    expect(fitToWidth(undefined, 400)).toBe("");
  });
  it("should fit to height", () => {
    expect(fitToHeight("imageUrl/image.png", 300)).toBe("imageUrl/image.png?h=300");
  });
});
