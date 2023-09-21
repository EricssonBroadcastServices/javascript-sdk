import { IExposureComponent } from "../interfaces/exposure-wl-component";

export function getTitleFromWLComponent(page: IExposureComponent, locale: string) {
  return page.presentation?.localized?.[locale]?.title || page.presentation?.fallback?.title || "";
}

export const WLComponent = {
  getTitle: getTitleFromWLComponent
};
