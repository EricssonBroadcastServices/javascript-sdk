import { ImageScaler } from "./image-scaler";

describe("Image scaler", () => {
  it("should add query params", () => {
    expect(ImageScaler.fitToWidth("imageUrl/image.png", 400)).toBe("imageUrl/image.png?w=400");
  });
  it("should add query params even when other query params exist", () => {
    expect(ImageScaler.fitToWidth("imageUrl/image.png?test=test", 400)).toBe("imageUrl/image.png?test=test&w=400");
  });
  it("should return empty string when no url", () => {
    expect(ImageScaler.fitToWidth(undefined, 400)).toBe("");
  });
  it("should fit to height", () => {
    expect(ImageScaler.fitToHeight("imageUrl/image.png", 300)).toBe("imageUrl/image.png?h=300")
  })
});
