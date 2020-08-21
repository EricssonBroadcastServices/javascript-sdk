import { ImageModel } from "@EricssonBroadcastServices/exposure-sdk";
import { IWLAction } from "./wl-action";

export interface IWLHeroBanner {
  type: string;
  id: string;
  items: IWLHeroBannerItem[];
}

export enum WLHeroBannerItemType {
  HEROBANNER_ITEM = "herobanner_item",
  VIDEO_HEROBANNER_ITEM = "video_herobanner_item"
}

export interface IWLHeroBannerItem {
  type: WLHeroBannerItemType;
  assetId?: string;
  action: IWLAction | undefined;
  title?: string;
  images?: ImageModel[];
  description?: string;
  trailerAssetId?: string;
}
