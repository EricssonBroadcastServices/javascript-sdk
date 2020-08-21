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
});
