import { CarouselSubType } from "../models/wl-component";

export interface IWLTagFeedTagTitles {
  [key: string]: string
}

export interface IWLTagFeedCarousel {
  id: string;
  type: string;
  subType: CarouselSubType;
  title?: string;
  tagTitles: IWLTagFeedTagTitles,
  contentPreferencesUrl: {
    url: string,
    fields: string[],
    authorized: boolean 
  }
}
