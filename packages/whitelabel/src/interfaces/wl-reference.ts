import { AspectRatio } from "@EricssonBroadcastServices/exposure-sdk";
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
  reloadInterval?: number;
  type: string;
  presentation?: {
    imageOrientation: Orientation;
    layout?: CarouselLayout;
    imageAspectRatio: AspectRatio;
  };
}
