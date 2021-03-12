import { AspectRatio } from "@ericssonbroadcastservices/exposure-sdk";

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
  internalUrl: string;
  id: string;
  authorized: boolean;
  reloadInterval?: number;
  type: string;
  presentation?: {
    imageOrientation: PresentationImageOrientation;
    layout?: CarouselLayout;
    imageAspectRatio: AspectRatio;
  };
}
