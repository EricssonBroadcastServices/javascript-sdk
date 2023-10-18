import { ResolvedComponent } from "../../interfaces/component-content";
import { IExposureWLCarousel } from "../../interfaces/exposure-wl-component";
import { WhiteLabelService } from "../white-label-service";

interface IGetGeneratedCollectionEntriesCarousel {
  assetId: string;
}

export async function getGeneratedCollectionEntriesCarousel(
  this: WhiteLabelService,
  { assetId }: IGetGeneratedCollectionEntriesCarousel
): Promise<ResolvedComponent<"carousel">> {
  const component: IExposureWLCarousel = {
    id: `generated-collection-entries-carousel-${assetId}`,
    appType: "carousel",
    presentation: { localized: {} },
    contentUrl: {
      type: "AssetQuery",
      url: `/v1/customer/${this.context.customer}/businessunit/${this.context.businessUnit}/content/asset/${assetId}/collectionentries?fieldSet=ALL&sortOrder=ASC`,
      authorized: false
    }
  };

  const content = await this.getCarouselAssets(component);

  return {
    component,
    content,
    presentationParameters: {
      density: "MEDIUM",
      imageOrientation: "landscape",
      carouselLayout: "carousel"
    }
  };
}
