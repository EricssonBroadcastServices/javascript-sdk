import { getAsset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { ResolvedComponent } from "../../interfaces/component-content.js";
import { IExposureWLCarousel } from "../../interfaces/exposure-wl-component.js";
import { WhiteLabelServiceContext } from "../white-label-service.js";
import { Translations } from "../../utils/wl-translations.js";
import { getComponentContent } from "./get-component-content.js";

export interface GetGeneratedTrailersForAssetCarouselOptions {
  assetId: string;
  locale: string;
  translations: Translations;
}

export async function getGeneratedTrailersForAssetCarousel(
  context: WhiteLabelServiceContext,
  { assetId, translations }: GetGeneratedTrailersForAssetCarouselOptions
): Promise<ResolvedComponent<"carousel">> {
  const { customer, businessUnit } = context;
  const asset = await getAsset.call(context, { assetId });
  const linkedTrailers = asset.linkedEntities?.filter(entity => entity.linkType === "TRAILER");
  const trailerAssetsQuery = linkedTrailers.map(t => `assetId:${t.entityId}`).join(" OR ");
  const searchParams = new URLSearchParams({
    pageSize: "20",
    fieldSet: "ALL",
    query: trailerAssetsQuery
  });
  const component: IExposureWLCarousel = {
    id: `generated-trailers-carousel-${assetId}`,
    appType: "carousel",
    contentUrl: {
      type: "AssetQuery",
      url: `/v1/customer/${customer}/businessunit/${businessUnit}/content/asset?${searchParams.toString()}`,
      authorized: false
    },
    presentation: {
      fallback: {
        title: translations.getText(["CAROUSEL_TITLE", "TRAILERS"]),
        body: "",
        images: []
      },
      localized: {}
    }
  };

  const content = await getComponentContent<"carousel">(context, { component });

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
