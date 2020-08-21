import { ImageScaler } from "./image-scaler";

describe("Image scaler", () => {
  it("should add query params", () => {
    expect(ImageScaler.fitToWidth("imageUrl/image.png", 400)).toBe("imageUrl/image.png?w=400");
  });
  it("should add query params even when other query params exist", () => {
    expect(ImageScaler.fitToWidth("imageUrl/image.png?test=test", 400)).toBe("imageUrl/image.png?test=test&w=400");
  });
});
