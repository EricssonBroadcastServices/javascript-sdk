import { IWLCarouselItem } from "./wl-carousel-item";
import { CarouselSubType } from "../models/wl-component";
import { IImage } from "@ericssonbroadcastservices/exposure-sdk";

export interface IWLTagTitles {
  [key: string]: string;
}

export interface IWLCarousel {
  id: string;
  type: string;
  subType: CarouselSubType | null;
  title?: string;
  subTitle?: string;
  assets: IWLCarouselItem[];
  tagTitles?: IWLTagTitles;
  showAssetTitles: boolean;
  /**
   * @deprecated use background color from reference instead
   */
  backgroundColor?: string;
  /**
   * @deprecated use background image from reference instead
   */
  backgroundImage?: IImage;
}
