import { lexer } from "marked";

import { IExposureWLConfig, IExposureWLMenuItem } from "../interfaces/index.js";
import { IExposureComponent, IExposureWLHerobannerItem } from "../interfaces/exposure-wl-component.js";
import { IExposureWLPresentation } from "../interfaces/exposure-wl-presentation.js";
import { IImage } from "../interfaces/image.js";

type LocalizedWLComponent = IExposureComponent | IExposureWLHerobannerItem | IExposureWLMenuItem | IExposureWLConfig;

export function getLocalizedItemFromPresentation(presentation: IExposureWLPresentation, language: string) {
  if (!presentation.localized) return presentation.fallback;
  return presentation.localized[language] || presentation.fallback;
}

export function getTitleFromWLComponent(component: LocalizedWLComponent, language: string): string {
  if (!component.presentation) return "";
  const localizedItem = getLocalizedItemFromPresentation(component.presentation, language);
  if (!localizedItem) {
    return "";
  }
  if (!localizedItem.title) {
    return component.presentation.fallback?.title || "";
  }
  return localizedItem.title;
}

export function getImagesFromWLPresentation(presentation: IExposureWLPresentation, language: string): IImage[] {
  const localizedItem = getLocalizedItemFromPresentation(presentation, language);
  if (!localizedItem || !localizedItem.images || localizedItem.images?.length === 0) {
    return presentation.fallback?.images ? presentation.fallback.images : [];
  }
  return localizedItem.images;
}

export function getImageByTagFromWLPresentation(
  presentation: IExposureWLPresentation,
  tag: string,
  language: string
): IImage | undefined {
  return getImagesFromWLPresentation(presentation, language).find(i => i.tags?.includes(tag));
}

export function getImageByTagFromWLComponent(component: LocalizedWLComponent, tag: string, language: string) {
  if (!component.presentation) return undefined;
  return getImageByTagFromWLPresentation(component.presentation, tag, language);
}

export function getDescriptionFromWLComponent(component: LocalizedWLComponent, language: string): string {
  if (!component.presentation) return "";
  const localizedItem = getLocalizedItemFromPresentation(component.presentation, language);
  if (!localizedItem || !localizedItem.body) {
    return component.presentation.fallback?.body || "";
  }
  return localizedItem.body;
}

export function getSubTitleWLPresentation(component: LocalizedWLComponent, language: string): string {
  if (!component.presentation) return "";
  const localizedItem = getLocalizedItemFromPresentation(component.presentation, language);
  if (!localizedItem || !localizedItem.subTitle) {
    return component.presentation.fallback?.subTitle || "";
  }
  return localizedItem.subTitle;
}

export function getIframeFromWLPresentation(component: LocalizedWLComponent, language: string) {
  if (!component.presentation) return null;
  const localizedItem = getLocalizedItemFromPresentation(component.presentation, language);
  if (!localizedItem || !localizedItem.iframe) {
    return component.presentation.fallback?.iframe || null;
  }
  return localizedItem.iframe;
}

export function getTrailerAssetIdFromComponent(component: LocalizedWLComponent, language: string) {
  if (!component.presentation) return null;
  const localizedItem = getLocalizedItemFromPresentation(component.presentation, language);
  if (!localizedItem || !localizedItem.trailerAssetId) {
    return component.presentation.fallback?.trailerAssetId || null;
  }
  return localizedItem.trailerAssetId;
}

export function getTextComponentLexer(component: LocalizedWLComponent, language: string) {
  const body = getDescriptionFromWLComponent(component, language);
  return lexer(body);
}

export const WLComponentHelpers = {
  getTitle: getTitleFromWLComponent,
  getImageByTag: getImageByTagFromWLComponent,
  getDescription: getDescriptionFromWLComponent,
  getSubTitle: getSubTitleWLPresentation,
  getIframe: getIframeFromWLPresentation,
  getTrailerAssetId: getTrailerAssetIdFromComponent,
  getTextComponentLexer
};
