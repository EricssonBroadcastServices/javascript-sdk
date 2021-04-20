import { CarouselSubType } from "../models/wl-component";

export interface IWLTagFeedTags {
  [key: string]: string
}

export interface IWLTagFeedCarousel {
  id: string;
  type: string;
  subType: CarouselSubType;
  title?: string;
  tags: IWLTagFeedTags,
  contentPreferencesUrl: {
    url: string,
    fields: string[],
    authorized: boolean 
  }
}
