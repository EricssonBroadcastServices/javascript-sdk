import { getAsset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { ResolvedComponent } from "../../interfaces/component-content";
import { IExposureWLCarousel } from "../../interfaces/exposure-wl-component";
import { WhiteLabelServiceContext } from "../white-label-service";
import { Translations } from "../../utils/wl-translations";
import { getComponentContent } from "./get-component-content";

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
    content: content.length > 1 ? content : [],
    presentationParameters: {
      density: "MEDIUM",
      carouselLayout: "carousel",
      imageOrientation: "landscape"
    }
  };
}
