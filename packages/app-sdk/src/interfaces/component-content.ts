import { Asset, ProgramResponse, TagList } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureComponent, WLComponentType } from "./exposure-wl-component";
import { CarouselDensity, CarouselLayout, PresentationImageOrientation } from "./exposure-wl-reference";
import { IImage } from "./image";

export type CarouselItem = { asset: Asset; startTime?: string; endTime?: string };

export type EpgComponentContent = {
  channel: Asset;
  programs: ProgramResponse[];
}[];

export type ComponentContentMap = {
  [WLComponentType.CAROUSEL]: CarouselItem[];
  [WLComponentType.EPG]: EpgComponentContent;
  [WLComponentType.TAG_TYPE]: TagList;
  [WLComponentType.ASSET_DISPLAY]: undefined;
  [WLComponentType.ASSET_PAGE]: undefined;
  [WLComponentType.BROWSE_PAGE]: undefined;
  [WLComponentType.FOOTER]: undefined;
  [WLComponentType.HEROBANNER]: undefined;
  [WLComponentType.IFRAME]: undefined;
  [WLComponentType.IMAGE]: undefined;
  [WLComponentType.MENU]: undefined;
  [WLComponentType.PAGE]: undefined;
  [WLComponentType.TEXT]: undefined;
};

// export type ComponentContent = CarouselItem[] | TagList | EpgComponentContent;

export interface ComponentPresentationParameters {
  carouselLayout: CarouselLayout;
  imageOrientation: PresentationImageOrientation;
  density: CarouselDensity;
  backgroundColor?: string;
  backgroundImage?: IImage;
}

export interface ResolvedComponent<T extends keyof ComponentContentMap> {
  component: IExposureComponent;
  content: ComponentContentMap[T];
  presentationParameters: ComponentPresentationParameters;
}
