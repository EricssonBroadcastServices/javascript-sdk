import { WLAsset } from "../models/wl-asset";
import { IWLCarouselItem } from "./wl-carousel-item";

export interface IWLEPGChannel {
	channel: WLAsset;
	programs: WLAsset[];
}

export interface IWLEPG {
	channels: IWLEPGChannel[];
}

export interface IWLEpgComponent {
  id: string;
  type: string;
  title?: string;
  description?: string;
  channels: {
    channel: IWLCarouselItem;
    programs: IWLCarouselItem[];
  }[];
}