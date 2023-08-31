import { IImage } from "../content/image";
import { WLComponentSubType, WLComponentType } from "./exposure-wl-component";

export enum CarouselLayout {
  CAROUSEL = "carousel",
  GRID = "grid",
  LIST = "list"
}

export enum PresentationImageOrientation {
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait"
}

export enum CarouselDensity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export interface IExposureWLReference {
  appType: WLComponentType;
  appSubType?: WLComponentSubType;
  referenceId: string;
  referenceUrl?: string;
  hasAuthorizedContent?: boolean;
  parameters?: {
    carouselLayout?: CarouselLayout;
    imageOrientation?: PresentationImageOrientation;
    density?: CarouselDensity;
    backgroundColor?: string;
  };
  images: IImage[];
}
