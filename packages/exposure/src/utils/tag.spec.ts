import { IImage, tagUtils } from "..";
import { ITag } from "../interfaces/tag/tag";

describe("tagUtils", () => {
  describe("getTitle", () => {
    it("defaults to empty string", () => {
      const tag: ITag = {
        scheme: "other",
        localized: [],
        tagId: "123"
      };
      expect(tagUtils.getTitle(tag, "en")).toBe("");
    });
    it("gets a proper title", () => {
      const tag: ITag = {
        scheme: "other",
        localized: [
          { title: "svTitle", description: "svDesc", images: [], locale: "sv" },
          { title: "Title", description: "Description", images: [], locale: "en" }
        ],
        tagId: "123"
      };
      expect(tagUtils.getTitle(tag, "en")).toBe("Title");
      expect(tagUtils.getTitle(tag, "sv")).toBe("svTitle");
      expect(tagUtils.getTitle(tag, "dk")).toBe("svTitle");
      expect(tagUtils.getTitle(tag, "dk", "en")).toBe("Title");
    });
  });
  describe("getDescription", () => {
    it("defaults to empty string", () => {
      const tag: ITag = {
        scheme: "other",
        localized: [],
        tagId: "123"
      };
      expect(tagUtils.getDescription(tag, "en")).toBe("");
    });
    it("gets a proper desc", () => {
      const tag: ITag = {
        scheme: "other",
        localized: [
          { title: "svTitle", description: "svDesc", images: [], locale: "sv" },
          { title: "Title", description: "Description", images: [], locale: "en" }
        ],
        tagId: "123"
      };
      expect(tagUtils.getDescription(tag, "en")).toBe("Description");
      expect(tagUtils.getDescription(tag, "sv")).toBe("svDesc");
      expect(tagUtils.getDescription(tag, "dk")).toBe("svDesc");
      expect(tagUtils.getDescription(tag, "dk", "en")).toBe("Description");
    });
  });
  describe("get localized images", () => {
    it("returns images in correct locale", () => {
      const tag: ITag = {
        scheme: "other",
        localized: [
          { title: "svTitle", description: "svDesc", images: [{ url: "1" } as IImage], locale: "sv" },
          { title: "Title", description: "Description", images: [{ url: "2" } as IImage], locale: "en" }
        ],
        tagId: "123"
      };
      expect(tagUtils.getImages(tag, "sv", "en")).toEqual([{ url: "1" }]);
      expect(tagUtils.getImages(tag, "dk", "en")).toEqual([{ url: "2" }]);
    });
  });
});
