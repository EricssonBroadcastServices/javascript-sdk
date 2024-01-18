import {
  AssetHelpers,
  getAssetDurationString,
  ImageFormat,
  SeasonHelpers,
  WLCarouselHelpers
} from "@ericssonbroadcastservices/app-sdk";
import { Asset, AssetType, ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useMemo } from "react";
import { useAsset } from "./useAsset";
import { useBookmarkPercentage } from "./useBookmarks";
import { useContinueWatching } from "./useContinueWatching";
import { useEntitlementForAsset } from "./useEntitlementForAsset";
import { useProgramProgress, useTimeLeft } from "./useProgramProgress";
import { useLanguage } from "./useSelectedLanguage";
import { useTranslations } from "./useTranslations";

type UseAssetOptions = {
  width: number;
  height?: number;
  imageFormat?: ImageFormat;
};

export function useAssetDisplayCollection(asset: Asset, options: UseAssetOptions) {
  if (asset.type !== AssetType.COLLECTION) {
    console.warn(`useAssetDisplayTvShow should only be used with TV shows, but received ${asset.type}`);
  }
  const defaults = useAssetDisplayDefaults(asset, options);

  return {
    ...defaults
  };
}

export function useAssetDisplayTvShow(asset: Asset, options: UseAssetOptions) {
  if (asset.type !== AssetType.TV_SHOW) {
    console.warn(`useAssetDisplayTvShow should only be used with TV shows, but received ${asset.type}`);
  }
  const { language, defaultLanguage } = useLanguage();
  const defaults = useAssetDisplayDefaults(asset, options);

  const [continueWatching, loadingContinueWatching] = useContinueWatching(asset.assetId);
  const [entitlement, loadingEntitlement] = useEntitlementForAsset({ asset: continueWatching?.asset }, {});

  const [bookmarkPercentage] = useBookmarkPercentage(
    continueWatching?.asset?.assetId,
    continueWatching?.asset?.duration
  );
  const timeLeft = useTimeLeft({ percentageWatched: bookmarkPercentage ?? undefined, durationMs: asset.duration });

  const seasons = useMemo(() => {
    if (asset.seasons) {
      return asset.seasons
        .map(season => WLCarouselHelpers.getResolvedCarouselComponentFromSeason(season, language, defaultLanguage))
        .filter(season => !!season.content.length);
    }
    return [];
  }, [asset, language, defaultLanguage]);

  return {
    ...defaults,
    seasons,
    continueWatching,
    loadingContinueWatching,
    entitlement,
    loadingEntitlement,
    progress: {
      percentage: bookmarkPercentage,
      duration: continueWatching?.asset?.duration,
      timeLeft
    }
  };
}

export function useAssetDisplay(asset: Asset, options: UseAssetOptions) {
  const [translations] = useTranslations();
  const { language, defaultLanguage } = useLanguage();
  const defaults = useAssetDisplayDefaults(asset, options);

  // if the asset is NOT a series but belongs to a series, get the series asset
  const [seriesAsset] = useAsset(asset.tvShowId);
  const seasonAsset = asset.seasonId
    ? seriesAsset?.seasons?.find(season => season.seasonId === asset.seasonId)
    : undefined;

  const seriesTitle = seriesAsset ? AssetHelpers.getTitle(seriesAsset, { language, defaultLanguage }) : undefined;
  const seasonTitle = seasonAsset
    ? SeasonHelpers.getTitle(seasonAsset, language, defaultLanguage) ||
      `${translations.getText(["ASSETS", "SEASON"])} ${seasonAsset.season}`
    : undefined;

  const [entitlement, loadingEntitlement] = useEntitlementForAsset({ asset }, {});

  const progress = useProgramProgress({ asset, live: entitlement.streamInfo.live });
  const timeLeft = useTimeLeft({ percentageWatched: progress.percentage, durationMs: asset.duration });

  return {
    ...defaults,
    seriesTitle,
    seasonTitle,
    entitlement,
    loadingEntitlement,
    duration: getAssetDurationString(asset, language, defaultLanguage),
    progress: {
      ...progress,
      timeLeft
    }
  };
}

function useAssetDisplayDefaults(asset: Asset, options: UseAssetOptions) {
  const { width, height, imageFormat } = options;
  const { language, defaultLanguage } = useLanguage();

  const { tvShowId, episode } = asset;

  const description = AssetHelpers.getLongDescription(asset, { language, defaultLanguage, fallback: true }) ?? "";

  let title = AssetHelpers.getTitle(asset, { language, defaultLanguage }) ?? "";
  if (tvShowId && episode) {
    title = `E${episode} ${title}`;
  }

  const trailerAssetId = AssetHelpers.getTrailerAssetId(asset);

  const image = AssetHelpers.getScaledImage({
    asset,
    width,
    height,
    imageType: "cover",
    format: imageFormat,
    orientation: ImageOrientation.LANDSCAPE,
    language,
    defaultLanguage
  });

  return {
    title: title,
    description,
    image,
    tags: AssetHelpers.getAllTagIds(asset),
    trailerAssetId
  };
}
