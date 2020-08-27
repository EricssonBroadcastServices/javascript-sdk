import {Publication} from "@ericssonbroadcastservices/exposure-sdk";
import { WLAsset } from "./wl-asset";

describe("wl asset", () => {
  describe("entitlement", () => {
    const asset = new WLAsset()
    asset.publications = [{ availabilityKeys: ["1", "2", "3"] } as Publication];
    it("should be entitled", () => {
      spyOn(asset, "inFuture").and.returnValue(false);
      expect(asset.getIsEntitled(["1", "4"])).toBe(true);
    });
    it("should not be entitled", () => {
      spyOn(asset, "inFuture").and.returnValue(false);
      expect(asset.getIsEntitled(["4", "5"])).toBe(false);
    });
    it("should not be entitled when in future", () => {
      spyOn(asset, "inFuture").and.returnValue(true);
      expect(asset.getIsEntitled(["1", "5"])).toBe(false);
    })
  });
  describe("metadata", () => {
    it("should render duration string", () => {
      const asset = new WLAsset();
      asset.duration = 60000;
      expect(asset.getDurationString()).toEqual("1min ");
      asset.duration = 60000 * 61;
      expect(asset.getDurationString()).toEqual("1h 1min ");
      asset.duration = 60000 * 61 + 1000;
      expect(asset.getDurationString()).toEqual("1h 1min 1sec");
      asset.duration = 500;
      expect(asset.getDurationString()).toEqual("");
    })
  })
});
