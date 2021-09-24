import { WLActionType } from "../interfaces/wl-action";
import { deserialize } from "@ericssonbroadcastservices/exposure-sdk";
import { WLAction } from "./wl-config";

describe("WL config", () => {
  describe("WL action", () => {
    it("should return proper link for external action", () => {
      const data = {
        target: "default",
        type: WLActionType.ExternalLink,
        url: "https://test.com"
      };
      const action = deserialize(WLAction, data);
      expect(action.getLink()).toBe(data.url);
    });
    it("should return proper link for navigate to page action", () => {
      const data = {
        target: "default",
        type: WLActionType.NavigateToPage,
        pageId: "123"
      };
      const action = deserialize(WLAction, data);
      expect(action.getLink()).toBe(`/page/${data.pageId}`);
    });
    it("should return proper link for navigate to asset action", () => {
      const data = {
        target: "default",
        type: WLActionType.NavigateToDetails,
        assetId: "123"
      };
      const action = deserialize(WLAction, data);
      expect(action.getLink()).toBe(`/asset/${data.assetId}`);
    });
    it("should return proper link for navigate to asset action", () => {
      const data = {
        target: "default",
        type: WLActionType.PlayAsset,
        assetId: "123"
      };
      const action = deserialize(WLAction, data);
      expect(action.getLink()).toBe(`/play/${data.assetId}`);
    });
  });
});
