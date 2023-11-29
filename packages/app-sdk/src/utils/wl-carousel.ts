import { IExposureWLCarousel, WLComponentSubType } from "../interfaces/exposure-wl-component";
import { WLComponentHelpers } from "./wl-component";
import { getIndexOfLiveOrClosestUpcomingDateInterval } from "./date";
import { CarouselItem, ResolvedComponent } from "../interfaces/component-content";
import { Season } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { SeasonHelpers } from "./season";

function getInitialSlideFromAssetList(carousel: IExposureWLCarousel, assetList: CarouselItem[], when = Date.now()) {
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

export function getResolvedCarouselComponentFromSeason(
  seasonAsset: Season,
  locale: string
): ResolvedComponent<"carousel"> {
  const component: IExposureWLCarousel = {
    id: `seasonSelector-${seasonAsset.seasonId}`,
    appType: "carousel",
    presentation: {
      fallback: {
        title: SeasonHelpers.getTitle(seasonAsset, locale),
        body: "",
        images: []
      },
      localized: {}
    }
  };
  const content = seasonAsset.episodes.map(asset => ({ asset }));
  return {
    component,
    content,
    presentationParameters: {
      density: "MEDIUM",
      carouselLayout: "carousel",
      imageOrientation: "landscape"
    }
  };
}

export const WLCarouselHelpers = {
  ...WLComponentHelpers,
  getInitialSlideFromAssetList,
  getResolvedCarouselComponentFromSeason
};
