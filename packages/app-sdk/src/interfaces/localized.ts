import { IImage, ImageOrientation } from "./image";
import { ILocalizedMetadata } from "./localized-metadata";

function getLocaleItem(localized: ILocalizedMetadata[], locale: string) {
  return localized.find(l => l.locale === locale) || localized[0];
}

function getLocalizedValue(localized: ILocalizedMetadata[], property: string, locale: string, defaultLocale?: string) {
  if (!localized || localized.length === 0) {
    return "";
  }
  const localeItem = localized.find(localizedItem => localizedItem.locale === locale);
  if (!localeItem || !localeItem[property] || (Array.isArray(localeItem[property]) && !localeItem[property].length)) {
    if (defaultLocale) {
      return getLocalizedValue(localized, property, defaultLocale);
    }
    if (locale === localized[0].locale) {
      return "";
    }
    return getLocalizedValue(localized, property, localized[0].locale);
  }
  return localeItem[property] || "";
}

function sortByResolution(a: IImage, b: IImage) {
  return b.width - a.width;
}

function getImage(
  localized: ILocalizedMetadata[],
  orientation: ImageOrientation,
  locale: string,
  defaultLocale?: string
): string {
  if (!localized.length) {
    return "";
  }

  const allImages = (getLocalizedValue(localized, "images", locale, defaultLocale) || []).sort(sortByResolution);
  if (!allImages || !allImages.length) {
    return "";
  }

  const imagesByCorrectOrientation = allImages.filter(i => i.orientation === orientation.toUpperCase());
  const imagesByCorrectType = imagesByCorrectOrientation.filter(i => {
    if (orientation === ImageOrientation.LANDSCAPE) {
      return i.type === "cover";
    } else if (orientation === ImageOrientation.PORTRAIT) {
      return i.type === "poster";
    }
    return false;
  });
  if (imagesByCorrectType.length > 0) {
    return imagesByCorrectType[0].url;
  }
  if (imagesByCorrectOrientation.length > 0) {
    return imagesByCorrectOrientation[0].url;
  }
  if (allImages.length > 0) {
    return allImages[0].url;
  }
  return "";
}

function getImages(localized: ILocalizedMetadata[], locale: string, defaultLocale?: string): IImage[] {
  return getLocalizedValue(localized, "images", locale, defaultLocale) || [];
}

function getTitle(localized: ILocalizedMetadata[], locale: string, defaultLocale?: string): string {
  return getLocalizedValue(localized, "title", locale, defaultLocale);
}

function maxLengthString(aString: string, maxLength: number | null): string {
  if (maxLength === null) {
    return aString;
  }
  if (aString.split("").length < maxLength || aString === "") {
    return aString;
  }
  return aString.slice(0, maxLength) + "...";
}

function getShortDescription(
  localized: ILocalizedMetadata[],
  locale: string,
  maxLength: number | null = null,
  defaultLocale?: string
): string {
  return getLocalizedValue(localized, "shortDescription", locale, defaultLocale);
}

function getMediumDescription(localized: ILocalizedMetadata[], locale: string, defaultLocale?: string): string {
  return getLocalizedValue(localized, "description", locale, defaultLocale);
}

function getLongDescription(localized: ILocalizedMetadata[], locale: string, defaultLocale?: string): string {
  return getLocalizedValue(localized, "longDescription", locale, defaultLocale);
}

export function getDescription(
  localized: ILocalizedMetadata[],
  locale: string,
  maxLength: number | null = null,
  defaultLocale?: string
): string {
  if (getLongDescription(localized, locale, defaultLocale)) {
    return maxLengthString(getLongDescription(localized, locale, defaultLocale), maxLength);
  } else if (getMediumDescription(localized, locale, defaultLocale)) {
    return maxLengthString(getMediumDescription(localized, locale, defaultLocale), maxLength);
  } else if (getShortDescription(localized, locale, null, defaultLocale)) {
    return maxLengthString(getShortDescription(localized, locale, null, defaultLocale), maxLength);
  }
  return "";
}

// @todo: rename namespace to Localized? and add "localized" prefix individually to all named exports
export const localizedUtils = {
  getLocaleItem,
  getLocalizedValue,
  getImage,
  getImages,
  getTitle,
  getShortDescription,
  getMediumDescription,
  getLongDescription,
  getDescription
};
