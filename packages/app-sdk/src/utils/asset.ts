import { Asset, AssetType, ChannelAsset, ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { PublicationHelpers } from "./publication";
import { getLocalizedImageByType, getLocalizedValue } from "./localization";
import { getDurationLocalized, getTimeString } from "./time";
import { dateIntervalIsNow } from "./date";
import { ImageFormat, fit } from "./image-scaling";

export function getTitleFromAsset(asset: Asset, locale: string, defaultLocale?: string) {
  return getLocalizedValue(asset.localized, "title", locale, defaultLocale);
}

export function getShortDescriptionFromAsset(asset: Asset, locale: string, defaultLocale?: string) {
  return getLocalizedValue(asset.localized, "shortDescription", locale, defaultLocale);
}

export function getMediumDescriptionFromAsset(asset: Asset, locale: string, defaultLocale?: string) {
  return getLocalizedValue(asset.localized, "description", locale, defaultLocale);
}

export function getLongDescriptionFromAsset(asset: Asset, locale: string, defaultLocale?: string) {
  return getLocalizedValue(asset.localized, "longDescription", locale, defaultLocale);
}

export function getLocalizedAssetImage(
  asset: Asset,
  imageOrientation: ImageOrientation,
  imageType: string,
  locale: string,
  defaultLocale?: string
) {
  return getLocalizedImageByType(asset.localized, imageOrientation, imageType, locale, defaultLocale);
}

export function getScaledAssetImage({
  width,
  height,
  format,
  asset,
  imageType,
  oritentation,
  locale
}: {
  width?: number;
  height?: number;
  format?: ImageFormat;
  asset: Asset;
  imageType: string;
  oritentation: ImageOrientation;
  locale: string;
}) {
  const image = getLocalizedAssetImage(asset, oritentation, imageType, locale);
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

export function getAssetDurationString(asset: Asset, locale?: string) {
  if (!asset.duration) return;
  return getDurationLocalized(asset.duration, locale);
}

export function getChannelAssetTimeSlotString(asset: ChannelAsset) {
  return `${getTimeString(new Date(asset.startTime))} - ${getTimeString(new Date(asset.endTime))}`;
}

export function isChannelAssetLive(asset: ChannelAsset) {
  return dateIntervalIsNow(new Date(asset.startTime), new Date(asset.endTime));
}

export const ChannelAssetHelpers = {
  isLive: isChannelAssetLive,
  getTimeSlotString: getChannelAssetTimeSlotString
};

export const AssetHelpers = {
  getTitle: getTitleFromAsset,
  getMediumDescription: getMediumDescriptionFromAsset,
  getShortDescription: getShortDescriptionFromAsset,
  getLongDescription: getLongDescriptionFromAsset,
  getStartTime: getAssetStartTime,
  getEndTime: getAssetEndtime,
  getLocalizedImage: getLocalizedAssetImage,
  getTrailerAssetId: getAssetTrailerAssetId,
  getPushNextCuePoint: getPushNextCuePointForAsset,
  getIdentifier: getAssetIdentifier,
  getDurationString: getAssetDurationString,
  getScaledImage: getScaledAssetImage
};
