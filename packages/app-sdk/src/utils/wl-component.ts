import { IExposureComponent } from "../interfaces/exposure-wl-component";
import { IExposureWLPresentation } from "../interfaces/exposure-wl-presentation";
import { IImage } from "../interfaces/image";

function getLocalizedItemFromPresentation(presentation: IExposureWLPresentation, locale: string) {
  if (!presentation.localized) return presentation.fallback;
  return presentation.localized[locale] || presentation.fallback;
}

export function getTitleFromWLComponent(component: IExposureComponent, locale: string): string {
  if (!component.presentation) return "";
  const localizedItem = getLocalizedItemFromPresentation(component.presentation, locale);
  if (!localizedItem) {
    return "";
  }
  if (!localizedItem.title) {
    return component.presentation.fallback?.title || "";
  }
  return localizedItem.title;
}

function getImagesFromWLPresentation(presentation: IExposureWLPresentation, locale: string): IImage[] {
  const localizedItem = getLocalizedItemFromPresentation(presentation, locale);
  if (!localizedItem || !localizedItem.images || localizedItem.images?.length === 0) {
    return presentation.fallback?.images ? presentation.fallback.images : [];
  }
  return localizedItem.images;
}

export function getImageByTagFromWLComponent(component: IExposureComponent, tag: string, locale: string) {
  if (!component.presentation) return undefined;
  return getImagesFromWLPresentation(component.presentation, locale).find(i => i.tags?.includes(tag));
}

export function getDescriptionFromWLComponent(component: IExposureComponent, locale: string): string {
  if (!component.presentation) return "";
  const localizedItem = getLocalizedItemFromPresentation(component.presentation, locale);
  if (!localizedItem || !localizedItem.body) {
    return component.presentation.fallback?.body || "";
  }
  return localizedItem.body;
}

export function getSubTitleWLPresentation(component: IExposureComponent, locale: string): string {
  if (!component.presentation) return "";
  const localizedItem = getLocalizedItemFromPresentation(component.presentation, locale);
  if (!localizedItem || !localizedItem.subTitle) {
    return component.presentation.fallback?.subTitle || "";
  }
  return localizedItem.subTitle;
}

export function getIframeFromWLPresentation(component: IExposureComponent, locale: string) {
  if (!component.presentation) return null;
  const localizedItem = getLocalizedItemFromPresentation(component.presentation, locale);
  if (!localizedItem || !localizedItem.iframe) {
    return component.presentation.fallback?.iframe || null;
  }
  return localizedItem.iframe;
}

export const WLComponentHelpers = {
  getTitle: getTitleFromWLComponent,
  getImageByTag: getImageByTagFromWLComponent,
  getDescription: getDescriptionFromWLComponent,
  getSubTitle: getSubTitleWLPresentation,
  getIframe: getIframeFromWLPresentation
};
