import { getAsset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelService } from "../white-label-service.js";
import { ResolvedComponent } from "../../interfaces/component-content.js";
import { AssetHelpers } from "../../utils/asset.js";
import { getGeneratedCarouselByTagId } from "./get-generated-carousel-by-tag-id.js";
import { getGeneratedEpgCarouselFromAssetId } from "./get-generated-epg-carousel.js";
import { Translations } from "../../utils/wl-translations.js";
import { getGeneratedCollectionEntriesCarousel } from "./get-generated-collection-entries-carousel.js";
import { getGeneratedTrailersForAssetCarousel } from "./get-generated-trailers-carousel.js";
import { getGeneratedByMetadataCarousel } from "./get-generated-by-metadata-carousel.js";
import { getGeneratedOthersHaveWatchedCarousel } from "./get-generated-others-have-watched-carousel.js";
import { getGeneratedSeasonCarousel } from "./get-generated-season-carousel.js";

export interface GetAssetPageOptions {
  assetId: string;
  useTagIdCarousels?: boolean;
  useTrailersAndExtrasCarousel?: boolean;
  useSeasonCarousel?: boolean;
  useAssetEpgCarousel?: boolean;
  useRelatedByMetadataCarousel?: boolean;
  useOthersHaveWatchedCarousel?: boolean;
  /* only include assets with active publications, where applicable */
  useOnlyPlayableAssets?: boolean;
  locale: string;
  translations: Translations;
}

export async function getAssetPage(
  service: WhiteLabelService,
  {
    assetId,
    locale,
    useTagIdCarousels = true,
    translations,
    useTrailersAndExtrasCarousel = true,
    useAssetEpgCarousel = true,
    useOthersHaveWatchedCarousel = true,
    useRelatedByMetadataCarousel = true,
    useSeasonCarousel = true,
    useOnlyPlayableAssets = false
  }: GetAssetPageOptions
): Promise<ResolvedComponent[]> {
  const asset = await getAsset.call(service.context, { assetId, includeSeasons: true, includeEpisodes: true });

  const generatedComponents: Promise<ResolvedComponent>[] = [];

  if (asset.type === "COLLECTION") {
    generatedComponents.push(getGeneratedCollectionEntriesCarousel(service.context, { assetId }));
  }
  const linkedTrailers = asset.linkedEntities?.filter(entity => entity.linkType === "TRAILER");
  if (useTrailersAndExtrasCarousel && linkedTrailers.length > 0) {
    generatedComponents.push(getGeneratedTrailersForAssetCarousel(service.context, { assetId, translations, locale }));
  }

  if (useSeasonCarousel && asset.tvShowId && asset.season && !Number.isNaN(parseInt(asset.season))) {
    generatedComponents.push(
      getGeneratedSeasonCarousel(service, { tvShowId: asset.tvShowId, seasonNumber: parseInt(asset.season), locale })
    );
  }

  if (useAssetEpgCarousel && asset.type === "TV_CHANNEL") {
    generatedComponents.push(getGeneratedEpgCarouselFromAssetId(service.context, { assetId, translations }));
  }

  if (useRelatedByMetadataCarousel) {
    generatedComponents.push(
      getGeneratedByMetadataCarousel({ asset, service, translations, onlyIncludePlayableAssets: useOnlyPlayableAssets })
    );
  }

  if (useOthersHaveWatchedCarousel) {
    generatedComponents.push(getGeneratedOthersHaveWatchedCarousel({ assetId, service, translations }));
  }

  if (useTagIdCarousels) {
    const tagIds = AssetHelpers.getAllTagIds(asset);
    tagIds.forEach(tagId => {
      generatedComponents.push(
        getGeneratedCarouselByTagId(service, {
          tagId,
          excludedAssetId: asset.assetId,
          locale,
          onlyIncludePlayableAssets: useOnlyPlayableAssets
        })
      );
    });
  }

  const resolvedGeneratedComponents = await (
    await Promise.allSettled(generatedComponents)
  )
    .filter((val): val is PromiseFulfilledResult<ResolvedComponent> => {
      if (val.status === "rejected") {
        console.warn("generated carousel failed to resolve", val);
      }
      return val.status === "fulfilled";
    })
    .map(res => res.value);
  return [
    {
      presentationParameters: {
        carouselLayout: "carousel",
        density: "MEDIUM",
        imageOrientation: "landscape"
      },
      content: asset,
      component: {
        id: `generated_asset_${assetId}`,
        appType: "asset_display"
      }
    },
    ...resolvedGeneratedComponents
  ];
}
