import {
  Image,
  ImageOrientation,
  LocalizedData,
  LocalizedSeoData,
  LocalizedTag
} from "@ericssonbroadcastservices/rbm-ott-sdk";

type Localized = LocalizedData & LocalizedTag;

export const DESCRIPTION_TYPES = [
  "tinyDescription",
  "shortDescription",
  "description",
  "longDescription",
  "extendedDescription"
] as const;

/**
 * The maximum length of a description of a given type. Aligned with the customer portal.
 */
export const DESCRIPTION_MAX_LENGTHS: Record<(typeof DESCRIPTION_TYPES)[number], number> = {
  tinyDescription: 80,
  shortDescription: 140,
  description: 250,
  longDescription: Infinity,
  extendedDescription: Infinity
};

export function getAvailableDescriptions(localized: Localized[], locale: string, defaultLocale?: string) {
  return DESCRIPTION_TYPES.filter(descriptionType => {
    return !!getLocalizedValue(localized, descriptionType, locale, defaultLocale);
  });
}

export function getLocalizedValue<Key extends keyof Localized>(
  localized: Localized[],
  property: Key,
  locale: string,
  defaultLocale?: string
): Localized[Key] | undefined {
  if (!localized || localized.length === 0) {
    return undefined;
  }
  const localeItem = localized.find(localizedItem => localizedItem.locale === locale);
  const value = localeItem?.[property];
  if (value && (!Array.isArray(value) || value.length)) {
    return value ? (value as Localized[Key]) : undefined;
  }
  if (defaultLocale) {
    return getLocalizedValue(localized, property, defaultLocale);
  }
  if (locale === localized[0].locale) {
    return undefined;
  }
  return getLocalizedValue(localized, property, localized[0].locale);
}

export function getLocalizedSEOValue<Key extends keyof LocalizedSeoData>(
  localized: LocalizedSeoData[],
  property: Key,
  locale: string,
  defaultLocale?: string
): LocalizedSeoData[Key] | undefined {
  if (!localized || localized.length === 0) {
    return undefined;
  }
  const localeItem = localized.find(localizedItem => localizedItem.locale === locale);
  const value = localeItem?.[property];
  if (value && (!Array.isArray(value) || value.length)) {
    return value ? (value as LocalizedSeoData[Key]) : undefined;
  }
  if (defaultLocale) {
    return getLocalizedSEOValue(localized, property, defaultLocale);
  }
  if (locale === localized[0].locale) {
    return undefined;
  }
  return getLocalizedSEOValue(localized, property, localized[0].locale);
}

function sortByResolution(a: Image, b: Image) {
  return b.width - a.width;
}

export function getLocalizedImageByType(
  localized: Localized[],
  orientation: ImageOrientation,
  imageType: string,
  locale: string,
  imageTypeFallback?: string,
  defaultLocale?: string
): Image | undefined {
  if (!localized.length) {
    return;
  }

  const allImages = (getLocalizedValue(localized, "images", locale, defaultLocale) || []).sort(sortByResolution);
  if (!allImages || !allImages.length) {
    return;
  }

  const imagesByCorrectOrientation = allImages.filter(i => i.orientation === orientation.toUpperCase());
  const imageByCorrectType = imagesByCorrectOrientation.find(i => i.type === imageType);
  if (imageByCorrectType) {
    return imageByCorrectType;
  }
  if (imageTypeFallback && imageType !== imageTypeFallback) {
    const imageByFallbackType = imagesByCorrectOrientation.find(i => i.type === imageTypeFallback);
    if (imageByFallbackType) {
      return imageByFallbackType;
    }
  }
  if (imagesByCorrectOrientation.length > 0) {
    return imagesByCorrectOrientation[0];
  }
  if (allImages.length > 0) {
    return allImages[0];
  }
  return undefined;
}
