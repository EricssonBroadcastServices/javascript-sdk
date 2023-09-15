import { WLCarousel, CarouselSubType, WLHerobannerItem } from "./wl-component";
import { WLAsset } from "./wl-asset";
import { deserialize, IImage, ImageOrientation } from "@ericssonbroadcastservices/exposure-sdk";

describe("WL component", () => {
  describe("WL carousel", () => {
    it("should deserialize subtype null correctly", () => {
      const carousel = deserialize(WLCarousel, {
        subType: null
      });
      expect(carousel.subType).toBe(null);
    });
    it("should get proper initial slide", () => {
      const carousel = deserialize(WLCarousel, {
        subType: "epg"
      });
      const asset1 = new WLAsset();
      const asset2 = new WLAsset();
      asset1.startTime = new Date(Date.now() - 5000);
      asset1.endTime = new Date(Date.now() + 10000);
      asset2.startTime = new Date(Date.now() - 10000);
      asset2.endTime = new Date(Date.now() - 5000);

      carousel.assets = [asset1, asset2];
      expect(carousel.subType === CarouselSubType.EPG).toBeTruthy();
      expect(carousel.getInitialSlide()).toBe(0);
    });
    it("should get proper initial slide when no program is live", () => {
      const carousel = deserialize(WLCarousel, {
        subType: "epg"
      });
      const asset1 = new WLAsset();
      const asset2 = new WLAsset();
      const asset3 = new WLAsset();

      asset1.startTime = new Date(Date.now() + 10000);
      asset1.endTime = new Date(Date.now() + 15000);
      asset2.startTime = new Date(Date.now() - 10000);
      asset2.endTime = new Date(Date.now() - 5000);
      asset3.startTime = new Date(Date.now() + 1000);
      asset3.endTime = new Date(Date.now() + 5000);
      carousel.assets = [asset1, asset2, asset3];
      expect(carousel.subType === CarouselSubType.EPG).toBeTruthy();
      expect(carousel.getInitialSlide()).toBe(2);
    });
  });

  describe("WL herobanner items", () => {
    it("should scale image", () => {
      const item = new WLHerobannerItem();

      const image: IImage = {
        orientation: ImageOrientation.LANDSCAPE,
        url: "https://image.test.com/test.png",
        height: 600,
        width: 800
      };

      const image2: IImage = {
        orientation: ImageOrientation.PORTRAIT,
        url: "https://image.test.com/test2.png",
        height: 800,
        width: 400
      };

      item.images = [image, image2];
      expect(item.getScaledImage(ImageOrientation.LANDSCAPE, 300)).toBe("https://image.test.com/test.png?w=300");
      expect(item.getScaledImage(ImageOrientation.PORTRAIT, 300)).toBe("https://image.test.com/test2.png?w=300");
    });
  });
});
