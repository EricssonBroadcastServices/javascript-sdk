import { IWLCarouselItem } from "./wl-carousel-item";

export interface IWLCarousel {
  id: string;
  type: string;
  subType: string | null;
  title?: string;
  assets: IWLCarouselItem[];
}
