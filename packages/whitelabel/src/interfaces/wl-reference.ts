import { AspectRatio } from "@ericssonbroadcastservices/exposure-sdk";
import { WLComponentType, WLComponentSubType } from "./wl-component";

export enum CarouselLayout {
  CAROUSEL = "carousel",
  GRID = "grid",
  LIST = "list"
}

export enum PresentationImageOrientation {
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait"
}

export interface IWLReference {
  id: string;
  type: WLComponentType;
  subType?: WLComponentSubType;
  internalUrl: string;
  urlVariables?: string[];
  authorized: boolean;
  reloadInterval?: number;
  presentation?: {
    imageOrientation: PresentationImageOrientation;
    layout?: CarouselLayout;
    imageAspectRatio: AspectRatio;
  };
}
