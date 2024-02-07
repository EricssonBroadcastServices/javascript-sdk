/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mockEpgCarousel, mockWLCarousel } from "../../test-utils/mock-components";
import { mockEpgAssetList } from "../../test-utils/mock-epg-asset-list";
import { WLCarouselHelpers } from "./wl-carousel";

describe("WLComponentHeloers", () => {
  it("should find initial index", () => {
    expect(WLCarouselHelpers.getInitialSlideFromAssetList(mockWLCarousel, mockEpgAssetList)).toBe(0);
    expect(WLCarouselHelpers.getInitialSlideFromAssetList(mockEpgCarousel, mockEpgAssetList)).toBe(0);
    expect(
      WLCarouselHelpers.getInitialSlideFromAssetList(
        mockEpgCarousel,
        mockEpgAssetList,
        new Date("2023-10-02T18:05:00Z").getTime()
      )
    ).toBe(0);
    expect(
      WLCarouselHelpers.getInitialSlideFromAssetList(
        mockEpgCarousel,
        mockEpgAssetList,
        new Date("2023-10-02T19:05:00Z").getTime()
      )
    ).toBe(1);
    expect(
      WLCarouselHelpers.getInitialSlideFromAssetList(
        mockEpgCarousel,
        mockEpgAssetList,
        new Date("2023-10-02T19:55:00Z").getTime()
      )
    ).toBe(2);
    expect(
      WLCarouselHelpers.getInitialSlideFromAssetList(
        mockEpgCarousel,
        mockEpgAssetList,
        new Date("2022-10-02T19:05:00Z").getTime()
      )
    ).toBe(0);
  });
});
