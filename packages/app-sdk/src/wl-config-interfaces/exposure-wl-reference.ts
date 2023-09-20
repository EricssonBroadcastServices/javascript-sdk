import { IImage } from "./image";
import { WLComponentSubType, WLComponentType } from "./exposure-wl-component";

export const CarouselLayout = {
  CAROUSEL: "carousel",
  GRID: "grid",
  LIST: "list"
} as const;
export type CarouselLayout = typeof CarouselLayout[keyof typeof CarouselLayout];

export const PresentationImageOrientation = {
  LANDSCAPE: "landscape",
  PORTRAIT: "portrait"
} as const;
export type PresentationImageOrientation =
  typeof PresentationImageOrientation[keyof typeof PresentationImageOrientation];

export const CarouselDensity = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH"
} as const;
export type CarouselDensity = typeof CarouselDensity[keyof typeof CarouselDensity];

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
  images?: IImage[];
}
