import { Orientation } from "./orientation";

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
  };
}
