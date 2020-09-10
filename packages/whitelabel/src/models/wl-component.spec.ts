import { WLCarousel, CarouselSubType } from "./wl-component";
import { WLAsset } from "./wl-asset";
import { deserialize } from "@ericssonbroadcastservices/exposure-sdk";

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
})