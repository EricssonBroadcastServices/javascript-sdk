import { Orientation } from "./orientation";
import { AspectRatio } from "./apsect-ratio";

export enum CarouselLayout {
  CAROUSEL = "carousel",
  GRID = "grid",
  LIST = "list"
}

export interface IWLReference {
  internalUrl: string;
  id: string;
  authorized: boolean;
  type: string;
  presentation?: {
    imageOrientation: Orientation;
    layout: CarouselLayout;
    imageAspectRatio: AspectRatio;
  };
}
