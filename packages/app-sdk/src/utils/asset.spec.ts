import { MarkerPoint } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { mockAsset, mockAssetEmptyLocalized } from "../../test-utils/mock-asset";
import { mockRental, mockEventTicket, mockRentalForMockAsset } from "../../test-utils/mock-wl-productoffering";
import { AssetHelpers } from "./asset";

describe("AssetHelpers", () => {
  it("should find a title", () => {
    expect(
      AssetHelpers.getTitle(mockAsset, {
        language: "en"
      })
    ).toBe("enTitle");
    expect(
      AssetHelpers.getTitle(mockAsset, {
        language: "fr"
      })
    ).toBe("frTitle");
    expect(
      AssetHelpers.getTitle(mockAsset, {
        language: "blabla"
      })
    ).toBe("enTitle");

    expect(AssetHelpers.getTitle(mockAssetEmptyLocalized, { language: "en" })).toBeUndefined();
    // test fallback to locale
    expect(
      AssetHelpers.getTitle(mockAsset, {
        language: "blabla",
        defaultLanguage: "fr"
      })
    ).toBe("frTitle");
  });

  it("finds descriptions", () => {
    expect(
      AssetHelpers.getShortDescription(mockAsset, {
        language: "en"
      })
    ).toBe("enShortDesc");
    expect(
      AssetHelpers.getMediumDescription(mockAsset, {
        language: "en"
      })
    ).toBe("enDesc");
    expect(
      AssetHelpers.getLongDescription(mockAsset, {
        language: "en"
      })
    ).toBe("enLongDesc");

    expect(
      AssetHelpers.getShortDescription(mockAsset, {
        language: "fr"
      })
    ).toBe("frShortDesc");
    expect(
      AssetHelpers.getMediumDescription(mockAsset, {
        language: "fr"
      })
    ).toBe("frDesc");
    expect(
      AssetHelpers.getLongDescription(mockAsset, {
        language: "fr"
      })
    ).toBe("frLongDesc");

    expect(AssetHelpers.getShortDescription(mockAssetEmptyLocalized, { language: "fr" })).toBeUndefined();
    expect(AssetHelpers.getMediumDescription(mockAssetEmptyLocalized, { language: "fr" })).toBeUndefined();
    expect(AssetHelpers.getLongDescription(mockAssetEmptyLocalized, { language: "fr" })).toBeUndefined();

    // test fallback to locale
    expect(
      AssetHelpers.getMediumDescription(mockAsset, {
        language: "blabla",
        defaultLanguage: "sv"
      })
    ).toBe("svDesc");
    expect(
      AssetHelpers.getLongDescription(mockAsset, {
        language: "blabla",
        defaultLanguage: "sv"
      })
    ).toBe("svLongDesc");
    expect(
      AssetHelpers.getShortDescription(mockAsset, {
        language: "blabla",
        defaultLanguage: "sv"
      })
    ).toBe("svShortDesc");
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
  it("finds a trailer assetId", () => {
    expect(AssetHelpers.getTrailerAssetId(mockAsset)).toBe("6d84994b-504a-4b1c-ba60-a401ef0c81d9_82162E");
  });
  it("gets a push next cuepoint", () => {
    expect(AssetHelpers.getPushNextCuePoint(mockAsset)).toBe(mockAsset.duration - 15_000);
    const testCredit: MarkerPoint = {
      type: "CREDITS",
      offset: mockAsset.duration - 60_000
    };
    expect(AssetHelpers.getPushNextCuePoint({ ...mockAsset, markerPoints: [testCredit] })).toBe(
      mockAsset.duration - 60_000
    );
  });
  it("gets required products", () => {
    expect(AssetHelpers.getRequiredProducts(mockAsset)).toEqual([
      "rental-tvod_82162E",
      "d49b896d-98a0-4c73-ae09-7b6bce2fd364_82162E",
      "1min1_82162E"
    ]);
  });
  it("get product offerings applicable to asset", () => {
    expect(
      AssetHelpers.getApplicableProductOfferings(mockAsset, [mockRental, mockEventTicket, mockRentalForMockAsset])
    ).toEqual([mockEventTicket, mockRentalForMockAsset]);
  });
});
