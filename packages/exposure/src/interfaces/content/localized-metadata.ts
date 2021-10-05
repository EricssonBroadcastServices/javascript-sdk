import { IImage, ImageOrientation } from "./image";

export interface ILocalizedMetadata {
  images?: IImage[];
  locale: string;
  title: string;
  sortingTitle?: string;
  shortDescription?: string;
  description?: string;
  longDescription?: string;
}

export interface ILocalizedContent {
  localized: ILocalizedMetadata[];
  getLocaleItem: (locale: string) => ILocalizedMetadata;
  getLocalizedValue: (property: string, locale: string, defaultLocale?: string | undefined) => any;
  getImage: (orientation: ImageOrientation, locale: string, defaultLocale?: string | undefined) => string;
  getImages: (locale: string, defaultLocale?: string | undefined) => IImage[];
  getTitle: (locale: string, defaultLocale?: string | undefined) => string;
  getShortDescription: (locale: string, maxLength?: number | null, defaultLocale?: string | undefined) => string;
  getMediumDescription: (locale: string, defaultLocale?: string | undefined) => string;
  getLongDescription: (locale: string, defaultLocale?: string | undefined) => string;
  getDescription: (locale: string, maxLength?: number | null, defaultLocale?: string | undefined) => string;
}
