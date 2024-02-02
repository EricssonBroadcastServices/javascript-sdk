import { ResolvedComponent } from "../../interfaces/component-content.js";
import { IExposureWLCarousel } from "../../interfaces/exposure-wl-component.js";
import { WhiteLabelService } from "../white-label-service.js";
import { Translations } from "../../utils/wl-translations.js";

export type GetGeneratedOthersHaveWatchedOptions = {
  assetId: string;
  onlyIncludePlayableAssets?: boolean;
  service: WhiteLabelService;
  translations: Translations;
};

export async function getGeneratedOthersHaveWatchedCarousel({
  assetId,
  service,
  translations
}: GetGeneratedOthersHaveWatchedOptions): Promise<ResolvedComponent<"carousel">> {
  const component: IExposureWLCarousel = {
    id: `generated-others-have-watched-${assetId}`,
    appType: "carousel",
    contentUrl: {
      type: "Recommended",
      url: `/v1/customer/${service.context.customer}/businessunit/${service.context.businessUnit}/recommend/watchNext/${assetId}`,
      authorized: false
    },
    presentation: {
      fallback: {
        title: translations.getText(["CAROUSEL_TITLE", "OTHERS_HAVE_WATCHED"]),
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
