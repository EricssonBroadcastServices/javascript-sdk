import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureWLCarousel, WLComponentSubType } from "../interfaces/exposure-wl-component";
import { WLComponentHelpers } from "./wl-component";
import { getIndexOfLiveOrClosestUpcomingDateInterval } from "./date";

function getInitialSlideFromAssetList(
  carousel: IExposureWLCarousel,
  assetList: { asset: Asset; startTime: string; endTime: string }[],
  when = Date.now()
) {
  switch (carousel.appSubType) {
    case WLComponentSubType.EPG:
      return getIndexOfLiveOrClosestUpcomingDateInterval(
        // we can safely assume epgs contain programs.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        assetList.map(a => ({ startTime: new Date(a.startTime), endTime: new Date(a.endTime) })) as {
          startTime: Date;
          endTime: Date;
        },
        when
      );
    default:
      return 0;
  }
}

export const WLCarouselHelpers = {
  ...WLComponentHelpers,
  getInitialSlideFromAssetList
};
