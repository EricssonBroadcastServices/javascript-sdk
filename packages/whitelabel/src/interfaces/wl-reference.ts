import { AspectRatio, ImageOrientation } from "@ericssonbroadcastservices/exposure-sdk";

export enum CarouselLayout {
  CAROUSEL = "carousel",
  GRID = "grid",
  LIST = "list"
}

export interface IWLReference {
  internalUrl: string;
  id: string;
  authorized: boolean;
  reloadInterval?: number;
  type: string;
  presentation?: {
    imageOrientation: ImageOrientation;
    layout?: CarouselLayout;
    imageAspectRatio: AspectRatio;
  };
}
