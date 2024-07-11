import { IExposureWLCarousel } from "../../interfaces/exposure-wl-component";
import { WhiteLabelService } from "../white-label-service";

export async function getSeeAllCarousel(service: WhiteLabelService, tagId: string) {
  const searchParams = new URLSearchParams({
    pageSize: "140",
    fieldSet: "ALL",
    query: tagId
  });

  const component: IExposureWLCarousel = {
    id: `generated-tag-${tagId}`,
    appType: "carousel",
    contentUrl: {
      type: "AssetQuery",
      url: `/v1/customer/${service.context.customer}/businessunit/${
        service.context.businessUnit
      }/content/asset?${searchParams.toString()}`,
      authorized: false
    },
    presentation: {
      fallback: {
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
      imageOrientation: "landscape",
      carouselLayout: "carousel"
    }
  } as const;
}
