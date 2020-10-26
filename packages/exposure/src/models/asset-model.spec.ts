import { Asset, AssetType } from "./asset-model";

describe("Asset", () => {
  describe("getTitle", () => {
    let asset: Asset;
    beforeEach(() => {
      asset = new Asset();
      asset.localized = [
        {
          locale: "en",
          title: "enTitle"
        },
        {
          locale: "sv",
          title: "svTitle"
        }
      ] as any;
    });

    it("returns a proper title", () => {
      expect(asset.getTitle("en")).toBe("enTitle");
      expect(asset.getTitle("dk", "sv")).toBe("svTitle");
    });
    it("returns enriched season title", () => {
      asset.type = AssetType.EPISODE;
      asset.episode = 1;
      asset.season = 1;
      expect(asset.getTitle("en")).toEqual("S1E1 enTitle");
      expect(asset.getTitle("en", "en", false)).toEqual("enTitle");
    });
  });
});
