import { Asset, AssetType } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { ResolvedComponent } from "../../interfaces/component-content.js";
import { IExposureWLCarousel } from "../../interfaces/exposure-wl-component.js";
import { WhiteLabelService } from "../white-label-service.js";
import { Translations } from "../../utils/wl-translations.js";

export type GetGeneratedByMetadataCarouselOptions = {
  asset: Asset;
  onlyIncludePlayableAssets?: boolean;
  service: WhiteLabelService;
  translations: Translations;
};

function getRelatedByMetadataQueryAssetType(type: AssetType) {
  if (type === AssetType.EPISODE) {
    return AssetType.TV_SHOW;
  }
  return type;
}

function getRelatedByMetadataQuery(asset: Asset): string {
  const tagQuery = asset.tags
    .flatMap(t => {
      return t.tagValues.map(tv => `tags.${t.type}:${tv.tagId}`);
    })
    .join(" OR ");
  const participantsQuery = asset.participants.map(p => `participants.name:"${p.name}"`).join(" OR ");
  const query = [tagQuery, participantsQuery].filter(q => !!q).join(" OR ");
  return `${query} NOT assetId:${asset.assetId}`;
}

export async function getGeneratedByMetadataCarousel({
  asset,
  onlyIncludePlayableAssets = false,
  service,
  translations
}: GetGeneratedByMetadataCarouselOptions): Promise<ResolvedComponent<"carousel">> {
  const searchParams = new URLSearchParams({
    assetType: getRelatedByMetadataQueryAssetType(asset.type),
    pageSize: "12",
    fieldSet: "ALL",
    query: getRelatedByMetadataQuery(asset)
  });

  if (onlyIncludePlayableAssets) {
    searchParams.set("playableWithinHours", "0");
  }

  const component: IExposureWLCarousel = {
    id: `generated-metadata-${asset.assetId}`,
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
        title: translations.getText(["CAROUSEL_TITLE", "RELATED"]),
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
