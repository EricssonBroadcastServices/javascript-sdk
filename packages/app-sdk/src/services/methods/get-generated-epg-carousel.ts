import { ResolvedComponent } from "../../interfaces/component-content";
import { IExposureWLCarousel, WLCarouselAssetQueryTypes } from "../../interfaces/exposure-wl-component";
import { Translations } from "../../utils/wl-translations";
import { WhiteLabelServiceContext } from "../white-label-service";
import { getComponentContent } from "./get-component-content";

export interface GetGeneratedEpgCarouselFromAssetIdOptions {
  assetId: string;
  translations: Translations;
}

export async function getGeneratedEpgCarouselFromAssetId(
  context: WhiteLabelServiceContext,
  { assetId, translations }: GetGeneratedEpgCarouselFromAssetIdOptions
): Promise<ResolvedComponent<"carousel">> {
  const { customer, businessUnit } = context;
  const component: IExposureWLCarousel = {
    id: `generated-epg-carousel-${assetId}`,
    appType: "carousel",
    appSubType: "Epg",
    contentUrl: {
      type: WLCarouselAssetQueryTypes.EPG,
      url: `/v2/customer/${customer}/businessunit/${businessUnit}/epg/${assetId}/date/${
        new Date().toISOString().split("T")[0]
      }?daysBackward=1&daysForward=1&pageSize=500`,
      authorized: false
    },
    presentation: {
      fallback: {
        title: translations.getText("EPG"),
        body: "",
        images: []
      },
      localized: {}
    }
  };
  const content = await getComponentContent<"carousel">(context, { component });
  return {
    content,
    component,
    presentationParameters: {
      carouselLayout: "carousel",
      imageOrientation: "landscape",
      density: "MEDIUM"
    }
  };
}
