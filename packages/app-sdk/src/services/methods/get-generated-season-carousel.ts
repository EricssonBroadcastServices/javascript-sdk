import { getSeason } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureWLCarousel, WLCarouselAssetQueryTypes } from "../../interfaces/exposure-wl-component.js";
import { WhiteLabelService } from "../white-label-service.js";
import { SeasonHelpers } from "../../utils/season.js";
import { ResolvedComponent } from "../../interfaces/component-content.js";

export type GetGeneratedSeasonCarouselOptions = {
  tvShowId: string;
  seasonNumber: number;
  locale: string;
};

export async function getGeneratedSeasonCarousel(
  service: WhiteLabelService,
  { tvShowId, seasonNumber, locale }: GetGeneratedSeasonCarouselOptions
): Promise<ResolvedComponent<"carousel">> {
  const { context } = service;
  const seasonAsset = await getSeason.call(service, { assetId: tvShowId, season: seasonNumber });
  const component: IExposureWLCarousel = {
    id: `generated-season-${tvShowId}-${seasonNumber}`,
    appType: "carousel",
    contentUrl: {
      type: WLCarouselAssetQueryTypes.ASSET,
      url: `/v1/customer/${context.customer}/businessunit/${context.businessUnit}/content/asset/${tvShowId}/season/${seasonNumber}/episode?fieldSet=ALL&pageSize=100`,
      authorized: false
    },
    presentation: {
      fallback: {
        title: SeasonHelpers.getTitle(seasonAsset, locale),
        body: "",
        images: []
      },
      localized: {}
    }
  };
  const content = await service.getCarouselAssets(component);
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
