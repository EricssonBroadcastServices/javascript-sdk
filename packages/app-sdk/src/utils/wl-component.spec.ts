/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  mockHerobannerItem,
  mockHerobannerItemFromAsset,
  mockImageComponent,
  mockWLCarousel
} from "../../test-utils/mock-components";
import { WLComponentHelpers } from "./wl-component";

describe("WLComponentHeloers", () => {
  it("should return a title", () => {
    expect(WLComponentHelpers.getTitle(mockWLCarousel, "en")).toBe("Animated shorts");
    expect(WLComponentHelpers.getTitle(mockWLCarousel, "something unknown")).toBe("Animated shorts");
    expect(WLComponentHelpers.getTitle(mockWLCarousel, "sv")).toBe("Animerade kortfilmer");
  });
  it("should return a subTitle", () => {
    expect(WLComponentHelpers.getSubTitle(mockWLCarousel, "en")).toBe("A bunch of animated shortfilms");
    expect(WLComponentHelpers.getSubTitle(mockWLCarousel, "something unknown")).toBe("A bunch of animated shortfilms");
    expect(WLComponentHelpers.getSubTitle(mockWLCarousel, "sv")).toBe("A bunch of animated shortfilms");
  });

  it("should use content.presentation for herobanner items, if available", () => {
    expect(WLComponentHelpers.getTitle(mockHerobannerItemFromAsset, "it")).toBe("The Undertaker");
    expect(WLComponentHelpers.getTrailerAssetId(mockHerobannerItemFromAsset, "it")).toBe(
      "b7b6c343-90e9-40b4-be50-ef11f0149c91_AEBE0Fc"
    );
  });

  it("should return standard presentation for items without presentation.content", () => {
    expect(WLComponentHelpers.getTitle(mockHerobannerItem, "it")).toBe("just testing");
    expect(WLComponentHelpers.getTrailerAssetId(mockHerobannerItem, "it")).toBe("123");
  });

  it("should return a description", () => {
    expect(WLComponentHelpers.getDescription(mockImageComponent, "en")).toBe(
      "Everyone should be free to create 3D CG content, with free technical and creative production means and free access to markets."
    );
    expect(WLComponentHelpers.getDescription(mockImageComponent, "something unknown")).toBe(
      "Everyone should be free to create 3D CG content, with free technical and creative production means and free access to markets."
    );
    expect(WLComponentHelpers.getDescription(mockImageComponent, "sv")).toBe("En svensk beskrivning");
  });
  it("should get an image by tag", () => {
    expect(WLComponentHelpers.getImageByTag(mockImageComponent, "image", "en")).toEqual({
      url: "anImage.jpg",
      tags: ["image"],
      height: 1080,
      width: 1920
    });
    expect(WLComponentHelpers.getImageByTag(mockImageComponent, "image", "sv")).toEqual({
      url: "enSvenskBild.jpg",
      tags: ["image"],
      height: 1080,
      width: 1920
    });
    expect(WLComponentHelpers.getImageByTag(mockImageComponent, "image", "blablabla")).toEqual({
      url: "aFallbackImage.jpg",
      tags: ["image"],
      height: 1080,
      width: 1920
    });
    expect(WLComponentHelpers.getImageByTag(mockImageComponent, "anothertag", "en")).toEqual({
      url: "anOtherImage.jpg",
      tags: ["anothertag"],
      height: 1080,
      width: 1920
    });
    expect(WLComponentHelpers.getImageByTag(mockImageComponent, "anothertag", "sv")).toEqual(undefined);
  });
});
