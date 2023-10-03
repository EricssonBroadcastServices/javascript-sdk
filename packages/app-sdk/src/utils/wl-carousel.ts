import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureWLCarousel, WLComponentSubType } from "../interfaces/exposure-wl-component";
import { WLComponentHelpers } from "./wl-component";
import { getIndexOfLiveOrClosestUpcomingDateInterval } from "./date";
import { getAssetEndtime, getAssetStartTime } from "./asset";

function getInitialSlideFromAssetList(carousel: IExposureWLCarousel, assetList: Asset[]) {
  switch (carousel.appSubType) {
    case WLComponentSubType.EPG:
      return getIndexOfLiveOrClosestUpcomingDateInterval(
        // we can safely assume epgs contain programs.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        assetList.map(a => ({ startTime: getAssetStartTime(a), endTime: getAssetEndtime(a) })) as {
          startTime: Date;
          endTime: Date;
        }
      );
    default:
      return 0;
  }
}

export const WLCarouselHelpers = {
  ...WLComponentHelpers,
  getInitialSlideFromAssetList
};
