import {
  Asset,
  AssetType,
  ChannelAsset,
  ContinueWatchingAsset,
  ImageOrientation,
  StoreProductOffering
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { PublicationHelpers } from "./publication";
import {
  getLocalizedImageByType,
  getLocalizedValue,
  DESCRIPTION_TYPES,
  getAvailableDescriptions,
  DESCRIPTION_MAX_LENGTHS,
  getLocalizedSEOValue
} from "./localization";
import { getDurationLocalized, getTimeString } from "./time";
import { dateIntervalIsNow } from "./date";
import { ImageFormat, fit } from "./image-scaling";
import { CarouselItem } from "../interfaces/component-content";
import truncate from "lodash.truncate";

type LocalizedOptions = {
  language: string;
  defaultLanguage?: string;
};

type DescriptionOptions = LocalizedOptions & {
  /**
   * if true, will return the longest available description if the requested one is not available.
   * The returned description will be truncated to the max length of the requested description type.
   */
  fallback?: boolean;
};

export function getTitleFromAsset(asset: Asset, options: LocalizedOptions) {
  const { language, defaultLanguage } = options;
  return getLocalizedValue(asset.localized, "title", language, defaultLanguage);
}

export function getSEOTitleFromAsset(asset: Asset, options: LocalizedOptions) {
  const { language, defaultLanguage } = options;
  return asset.seoData && getLocalizedSEOValue(asset.seoData, "seoTitle", language, defaultLanguage);
}

function getDescription(asset: Asset, type: (typeof DESCRIPTION_TYPES)[number], options: DescriptionOptions) {
  const { language, defaultLanguage, fallback } = options;
  const description = getLocalizedValue(asset.localized, type, language, defaultLanguage);
  if (!description && fallback) {
    const availableDescriptions = getAvailableDescriptions(asset.localized, language, defaultLanguage);
    if (availableDescriptions.length) {
      return truncate(
        getLocalizedValue(
          asset.localized,
          availableDescriptions[availableDescriptions.length - 1],
          language,
          defaultLanguage
        ),
        { length: DESCRIPTION_MAX_LENGTHS[type] }
      );
    }
  }
  return description;
}

export function getTinyDescriptionFromAsset(asset: Asset, options: DescriptionOptions) {
  return getDescription(asset, "tinyDescription", options);
}

export function getShortDescriptionFromAsset(asset: Asset, options: DescriptionOptions) {
  return getDescription(asset, "shortDescription", options);
}

export function getMediumDescriptionFromAsset(asset: Asset, options: DescriptionOptions) {
  return getDescription(asset, "description", options);
}

export function getLongDescriptionFromAsset(asset: Asset, options: DescriptionOptions) {
  return getDescription(asset, "longDescription", options);
}

export function getExtendedDescriptionFromAsset(asset: Asset, options: DescriptionOptions) {
  return getDescription(asset, "extendedDescription", options);
}

export function getSEODescriptionFormAsset(asset: Asset, options: LocalizedOptions) {
  const { language, defaultLanguage } = options;
  return asset.seoData && getLocalizedSEOValue(asset.seoData, "seoDescription", language, defaultLanguage);
}

export function getLocalizedAssetImage(
  asset: Asset,
  imageOrientation: ImageOrientation,
  imageType: string,
  locale: string,
  imageTypeFallback?: string,
  defaultLocale?: string
) {
  return getLocalizedImageByType(
    asset.localized,
    imageOrientation,
    imageType,
    locale,
    imageTypeFallback,
    defaultLocale
  );
}

export function getScaledAssetImage({
  width,
  height,
  format,
  asset,
  imageType,
  imageTypeFallback,
  orientation,
  language,
  defaultLanguage
}: {
  width?: number;
  height?: number;
  format?: ImageFormat;
  asset: Asset;
  imageType: string;
  orientation: ImageOrientation;
  language: string;
  imageTypeFallback?: string;
  defaultLanguage?: string;
}) {
  const image = getLocalizedAssetImage(asset, orientation, imageType, language, imageTypeFallback, defaultLanguage);
  if (!image?.url) return;
  return fit(image.url, { w: width, h: height, format });
}

export function getAssetEndtime(asset: Asset): Date | null {
  if (asset.event && asset.event.endTime) {
    return new Date(asset.event.endTime);
  }
  if (asset.programs && asset.programs.length === 1) {
    return new Date(asset.programs[0].endTime);
  }
  return null;
}

export function getAssetStartTime(asset: Asset): Date | null {
  if (asset.event && asset.event.startTime) {
    return new Date(asset.event.startTime);
  }
  if (asset.programs && asset.programs.length === 1) {
    return new Date(asset.programs[0].startTime);
  }

  // fallback to use startTime from publication

  if (asset.publications.length === 0) {
    return null;
  }
  const publicationsSortedAscending = asset.publications.sort(PublicationHelpers.sortPublicationsAscending);
  // if we the asset will be published in the future, take the start time from next upcoming publication
  if (PublicationHelpers.allInFuture(asset.publications)) {
    const futurePublications = publicationsSortedAscending.filter(p => PublicationHelpers.inFuture(p));
    if (futurePublications.length) return new Date(futurePublications[0].fromDate);
  }
  // if we have active publications, the start time has already been
  const activePublications = PublicationHelpers.getActivePublications(publicationsSortedAscending);
  if (activePublications.length) {
    return new Date(activePublications[0].fromDate);
  }
  return new Date(publicationsSortedAscending[0].fromDate);
}

function getAssetTrailerAssetId(asset: Asset) {
  return (
    // preferred trailer from linkedEnteties
    asset.linkedEntities.find(ent => ent.linkType === "TRAILER")?.entityId ||
    // legacy trailer from externalReferences
    asset.externalReferences?.find(ref => ref.type && ref.type.toLowerCase() === "trailer")?.locator
  );
}

function resolvePushNextCuePoint(asset: Asset, defaultOffset = 15_000): number | undefined {
  const creditsMarker = asset.markerPoints?.find(markerPoint => markerPoint.type === "CREDITS");
  if (creditsMarker?.offset) {
    return creditsMarker.offset;
  } else if (asset.duration && asset.duration > 60 * 1000 * 2) {
    return asset.duration - defaultOffset;
  } else if (asset.duration) {
    return asset.duration;
  }
  return;
}

// TODO: should useCatchupPNCFeature default to true maybe ?
export function getPushNextCuePointForAsset(asset: Asset, useCatchupPNCFeature = false): number | undefined {
  const isEpisode = !!asset.tvShowId && !!asset.episode;
  const isCatchup = asset.programs && asset.programs.length > 0;
  if (isEpisode || AssetType.MOVIE === asset.type) {
    return resolvePushNextCuePoint(asset);
  }
  if (isCatchup && useCatchupPNCFeature) {
    return resolvePushNextCuePoint(asset);
  }
  return;
}

/** Returns an asset slug for use in web urls if present. Defaults to assetId */
export function getAssetIdentifier(asset: Asset) {
  return asset.slugs?.length > 0 ? asset.slugs[0] : asset.assetId;
}

export function getAssetDurationString(asset: Asset, language: string, defaultLanguage: string) {
  if (!asset.duration) return;
  return getDurationLocalized(asset.duration, language, defaultLanguage);
}

export function getAllTagIdsFromAsset(asset: Asset) {
  return asset.tags.flatMap(t => t.tagValues?.map(t => t.tagId));
}

export function getPlayHistoryPercentageFromAsset(asset: Asset) {
  const playHistory = (asset as ContinueWatchingAsset).userData?.playHistory;
  if (!playHistory?.lastViewedOffset || !asset.duration) return null;
  return Math.round((playHistory.lastViewedOffset * 100) / asset.duration);
}

export function getRequiredProductsForAsset(asset: Asset): string[] {
  let publications = PublicationHelpers.getActivePublications(asset.publications);
  if (PublicationHelpers.allInFuture(asset.publications)) {
    publications = PublicationHelpers.getNextPublications(asset.publications);
  }
  return publications.flatMap(p => p.products);
}

export function getProductOfferingsApplicableToAsset(asset: Asset, availableProductOfferings: StoreProductOffering[]) {
  const requiredProducts = getRequiredProductsForAsset(asset);
  const buyable = availableProductOfferings.flatMap(p => p.productIds).filter(p => requiredProducts.includes(p));
  return availableProductOfferings.filter(po => po.productIds.filter(pId => buyable.includes(pId)).length > 0);
}

export function isAssetPlayable(asset: Asset) {
  return asset.type !== "COLLECTION" && asset.type !== "TV_SHOW";
}

export function getChannelAssetTimeSlotString(item: ChannelAsset | CarouselItem) {
  const startTime = item.startTime ? new Date(item.startTime) : getAssetStartTime(item.asset);
  const endTime = item.endTime ? new Date(item.endTime) : getAssetEndtime(item.asset);
  if (!startTime || !endTime) {
    return null;
  }
  return `${getTimeString(new Date(startTime))} - ${getTimeString(new Date(endTime))}`;
}

export function isChannelAssetLive(asset: ChannelAsset | CarouselItem): boolean {
  if (!asset.startTime || !asset.endTime) return false;
  return dateIntervalIsNow(new Date(asset.startTime), new Date(asset.endTime));
}

export function getChannelAssetStartTimeString(item: ChannelAsset | CarouselItem) {
  const startTime = item.startTime ? new Date(item.startTime) : getAssetStartTime(item.asset);
  if (!startTime) {
    return null;
  }
  return getTimeString(new Date(startTime));
}

export const ChannelAssetHelpers = {
  isLive: isChannelAssetLive,
  getTimeSlotString: getChannelAssetTimeSlotString,
  getStartTimeString: getChannelAssetStartTimeString
};

export const AssetHelpers = {
  isAssetPlayable,
  getTitle: getTitleFromAsset,
  getTinyDescription: getTinyDescriptionFromAsset,
  getShortDescription: getShortDescriptionFromAsset,
  getMediumDescription: getMediumDescriptionFromAsset,
  getLongDescription: getLongDescriptionFromAsset,
  getExtendedDescription: getExtendedDescriptionFromAsset,
  getStartTime: getAssetStartTime,
  getEndTime: getAssetEndtime,
  getLocalizedImage: getLocalizedAssetImage,
  getTrailerAssetId: getAssetTrailerAssetId,
  getPushNextCuePoint: getPushNextCuePointForAsset,
  getIdentifier: getAssetIdentifier,
  getDurationString: getAssetDurationString,
  getScaledImage: getScaledAssetImage,
  getAllTagIds: getAllTagIdsFromAsset,
  getPlayHistoryPercentage: getPlayHistoryPercentageFromAsset,
  getRequiredProducts: getRequiredProductsForAsset,
  getApplicableProductOfferings: getProductOfferingsApplicableToAsset
};
