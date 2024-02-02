import { ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IImage } from "../interfaces/index.js";
import { getScaledHeroBannerImage } from "./hero-banner.js";

function getPresentation(images: IImage[]) {
  return {
    localized: {
      en: {
        images
      }
    }
  };
}

describe("HeroBannerHelpers", () => {
  describe("getScaledHeroBannerImage()", () => {
    it("should return undefined if no image is found", () => {
      expect(
        getScaledHeroBannerImage(
          {
            appType: "herobanner_item",
            content: {
              presentation: getPresentation([])
            }
          },
          {
            language: "en",
            width: 100
          }
        )
      ).toBeUndefined();
    });

    it("should return the component image if it exists", () => {
      expect(
        getScaledHeroBannerImage(
          {
            appType: "herobanner_item",
            presentation: getPresentation([{ url: "componentImage", tags: ["main"] }]),
            content: {
              presentation: getPresentation([{ url: "contentImage" }])
            }
          },
          {
            language: "en",
            width: 100
          }
        )
      ).toBe("componentImage?w=100");
    });

    it("should not return the content image if no landscape image is found", () => {
      expect(
        getScaledHeroBannerImage(
          {
            appType: "herobanner_item",
            content: {
              presentation: getPresentation([{ url: "contentImage" }])
            }
          },
          {
            language: "en",
            width: 100
          }
        )
      ).toBeUndefined();
    });

    it("should return the contentImage without orientation if both width & height is provided", () => {
      expect(
        getScaledHeroBannerImage(
          {
            appType: "herobanner_item",
            content: {
              presentation: getPresentation([{ url: "contentImage" }])
            }
          },
          {
            language: "en",
            width: 100,
            height: 100
          }
        )
      ).toBe("contentImage?w=100&h=100");
    });

    it("should return the content image if a landscape image is found", () => {
      expect(
        getScaledHeroBannerImage(
          {
            appType: "herobanner_item",
            content: {
              presentation: getPresentation([
                { url: "contentImage", orientation: ImageOrientation.LANDSCAPE },
                { url: "landscapeImage", orientation: ImageOrientation.LANDSCAPE }
              ])
            }
          },
          {
            language: "en",
            width: 100
          }
        )
      ).toBe("landscapeImage?w=100");
    });

    it("should return the banner image if it exists", () => {
      expect(
        getScaledHeroBannerImage(
          {
            appType: "herobanner_item",
            content: {
              presentation: getPresentation([
                { url: "contentImageLandscape", orientation: ImageOrientation.LANDSCAPE },
                { url: "contentImageBanner", tags: ["banner"], orientation: ImageOrientation.LANDSCAPE }
              ])
            }
          },
          {
            language: "en",
            width: 100
          }
        )
      ).toBe("contentImageBanner?w=100");
    });

    it("should return the highest resolution landscape image", () => {
      expect(
        getScaledHeroBannerImage(
          {
            appType: "herobanner_item",
            content: {
              presentation: getPresentation([
                { url: "contentImage100", orientation: ImageOrientation.LANDSCAPE, width: 100 },
                { url: "contentImage300", orientation: ImageOrientation.PORTRAIT, width: 300 },
                { url: "contentImage200", orientation: ImageOrientation.LANDSCAPE, width: 200 }
              ])
            }
          },
          {
            language: "en",
            width: 100
          }
        )
      ).toBe("contentImage200?w=100");
    });
  });
});
