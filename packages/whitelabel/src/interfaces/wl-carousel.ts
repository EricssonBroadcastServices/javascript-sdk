import { IWLCarouselItem } from "./wl-carousel-item";
import { CarouselSubType } from "../models/wl-component";

export interface IWLTagTitles {
  [key: string]: string;
}

export interface IWLCarousel {
  id: string;
  type: string;
  subType: CarouselSubType | null;
  title?: string;
  assets: IWLCarouselItem[];
  tagTitles?: IWLTagTitles;
}
