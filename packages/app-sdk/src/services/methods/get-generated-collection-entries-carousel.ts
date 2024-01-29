import { ResolvedComponent } from "../../interfaces/component-content.js";
import { IExposureWLCarousel } from "../../interfaces/exposure-wl-component.js";
import { WhiteLabelServiceContext } from "../white-label-service.js";
import { getCarouselAssets } from "./get-carousel-assets.js";

export interface GetGeneratedCollectionEntriesCarouselOptions {
  assetId: string;
}

export async function getGeneratedCollectionEntriesCarousel(
  context: WhiteLabelServiceContext,
  { assetId }: GetGeneratedCollectionEntriesCarouselOptions
): Promise<ResolvedComponent<"carousel">> {
  const component: IExposureWLCarousel = {
    id: `generated-collection-entries-carousel-${assetId}`,
    appType: "carousel",
    presentation: { localized: {} },
    contentUrl: {
      type: "AssetQuery",
      url: `/v1/customer/${context.customer}/businessunit/${context.businessUnit}/content/asset/${assetId}/collectionentries?fieldSet=ALL&sortOrder=ASC`,
      authorized: false
    }
  };

  const content = await getCarouselAssets(context, component);

  return {
    component,
    content,
    presentationParameters: {
      density: "MEDIUM",
      imageOrientation: "landscape",
      carouselLayout: "grid"
    }
  };
}
