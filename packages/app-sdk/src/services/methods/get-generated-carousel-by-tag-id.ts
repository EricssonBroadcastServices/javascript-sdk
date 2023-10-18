import { getTagById } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { ResolvedComponent } from "../../interfaces/component-content";
import { WhiteLabelService } from "../white-label-service";
import { IExposureWLCarousel } from "../../interfaces/exposure-wl-component";
import { TagHelpers } from "../../utils/tag";

export async function getGeneratedCarouselByTagId(
  service: WhiteLabelService,
  {
    tagId,
    excludedAssetId,
    onlyIncludePlayableAssets,
    locale
  }: {
    tagId: string;
    excludedAssetId?: string;
    onlyIncludePlayableAssets?: boolean;
    locale: string;
  }
): Promise<ResolvedComponent<"carousel">> {
  const tag = await getTagById.call(service, { tagId });
  const searchParams = new URLSearchParams({
    pageSize: "20",
    fieldSet: "ALL",
    query: `tags.${tag.scheme}:${tagId}${excludedAssetId ? ` NOT assetId:${excludedAssetId}` : ""}`
  });
  if (onlyIncludePlayableAssets) {
    searchParams.set("playableWithinHours", "0");
  }
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
        title: TagHelpers.getTitle(tag, locale),
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
