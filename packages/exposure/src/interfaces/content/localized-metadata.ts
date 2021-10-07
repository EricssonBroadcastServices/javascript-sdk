import { IImage } from "./image";

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
}
