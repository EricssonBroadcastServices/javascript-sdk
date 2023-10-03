import { mockAsset, mockAssetEmptyLocalized } from "../../test-utils/mock-asset";
import { AssetHelpers } from "./asset";

describe("AssetHelpers", () => {
  it("should find a title", () => {
    expect(AssetHelpers.getTitle(mockAsset, "en")).toBe("enTitle");
    expect(AssetHelpers.getTitle(mockAsset, "fr")).toBe("frTitle");
    expect(AssetHelpers.getTitle(mockAsset, "blabla")).toBe("enTitle");

    expect(AssetHelpers.getTitle(mockAssetEmptyLocalized, "en")).toBeUndefined();
    // test fallback to locale
    expect(AssetHelpers.getTitle(mockAsset, "blabla", "fr")).toBe("frTitle");
  });
  it("finds descriptions", () => {
    expect(AssetHelpers.getShortDescription(mockAsset, "en")).toBe("enShortDesc");
    expect(AssetHelpers.getMediumDescription(mockAsset, "en")).toBe("enDesc");
    expect(AssetHelpers.getLongDescription(mockAsset, "en")).toBe("enLongDesc");

    expect(AssetHelpers.getShortDescription(mockAsset, "fr")).toBe("frShortDesc");
    expect(AssetHelpers.getMediumDescription(mockAsset, "fr")).toBe("frDesc");
    expect(AssetHelpers.getLongDescription(mockAsset, "fr")).toBe("frLongDesc");

    expect(AssetHelpers.getShortDescription(mockAssetEmptyLocalized, "fr")).toBeUndefined();
    expect(AssetHelpers.getMediumDescription(mockAssetEmptyLocalized, "fr")).toBeUndefined();
    expect(AssetHelpers.getLongDescription(mockAssetEmptyLocalized, "fr")).toBeUndefined();

    // test fallback to locale
    expect(AssetHelpers.getMediumDescription(mockAsset, "blabla", "sv")).toBe("svDesc");
    expect(AssetHelpers.getLongDescription(mockAsset, "blabla", "sv")).toBe("svLongDesc");
    expect(AssetHelpers.getShortDescription(mockAsset, "blabla", "sv")).toBe("svShortDesc");
  });
  it("finds an image by type and orientation", () => {
    expect(AssetHelpers.getLocalizedImage(mockAsset, "PORTRAIT", "banner", "en")?.url).toBe("enPosterImage.jpg");
    expect(AssetHelpers.getLocalizedImage(mockAsset, "LANDSCAPE", "banner", "en")?.url).toBe("enLandscapeImage.jpg");
    expect(AssetHelpers.getLocalizedImage(mockAsset, "LANDSCAPE", "someothertype", "en")?.url).toBe(
      "enLandscapeImage2.jpg"
    );
    // it default to any LANDSCAPE image when the type is non-existent
    expect(AssetHelpers.getLocalizedImage(mockAsset, "LANDSCAPE", "nonexsistenttype", "en")?.url).toBe(
      "enLandscapeImage.jpg"
    );
  });
});
