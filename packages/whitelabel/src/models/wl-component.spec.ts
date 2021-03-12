import { WLCarousel, CarouselSubType, WLHerobannerItem } from "./wl-component";
import { WLAsset } from "./wl-asset";
import { deserialize, ImageModel, ImageOrientation } from "@ericssonbroadcastservices/exposure-sdk";

describe("WL component", () => {
  describe("WL carousel", () => {
    it("should deserialize subtype null correctly", () => {
      const carousel = deserialize(WLCarousel, {
        subType: null,
      });
      expect(carousel.subType).toBe(null);
    })
    it("should get proper initial slide", () => {
      const carousel = deserialize(WLCarousel, {
        subType: "epg",
      })
      const asset1 = new WLAsset();
      const asset2 = new WLAsset();
      spyOn(asset2, "isLive").and.returnValue(true);
      carousel.assets = [asset1, asset2]
      expect(carousel.subType === CarouselSubType.EPG).toBeTruthy();
      expect(carousel.getInitialSlide()).toBe(1);
    })
  })
  describe("WL herobanner items", () => {
    it("should scale image", () => {
      const item = new WLHerobannerItem();

      const image = new ImageModel();
      image.orientation = ImageOrientation.LANDSCAPE;
      image.url = "https://image.test.com/test.png";

      const image2 = new ImageModel();
      image2.orientation = ImageOrientation.PORTRAIT;
      image2.url = "https://image.test.com/test2.png";

      item.images = [image, image2];
      expect(item.getScaledImage(ImageOrientation.LANDSCAPE, 300)).toBe("https://image.test.com/test.png?w=300");
      expect(item.getScaledImage(ImageOrientation.PORTRAIT, 300)).toBe("https://image.test.com/test2.png?w=300");
    })
  })
})