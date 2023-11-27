import { Asset, ProgramResponse, TagList } from "@ericssonbroadcastservices/rbm-ott-sdk";
import {
  IExposureComponent,
  IExposureWLCarousel,
  IExposureWLHerobanner,
  IExposureWLImageComponent,
  WLComponentType
} from "./exposure-wl-component";
import { CarouselDensity, CarouselLayout, PresentationImageOrientation } from "./exposure-wl-reference";
import { IImage } from "./image";
import { IExposureWLMenu } from "./exposure-wl-menu";
import { IExposureWLPage } from "./exposure-wl-page";

export type CarouselItem = { asset: Asset; startTime?: string; endTime?: string };

export type EPGComponentEntry = {
  channel: Asset;
  programs: ProgramResponse[];
};

export type EpgComponentContent = EPGComponentEntry[];

export type ComponentContentMap = {
  [WLComponentType.CAROUSEL]: CarouselItem[];
  [WLComponentType.EPG]: EpgComponentContent;
  [WLComponentType.TAG_TYPE]: TagList;
  [WLComponentType.ASSET_DISPLAY]: Asset;
  [WLComponentType.FOOTER]: undefined;
  [WLComponentType.HEROBANNER]: undefined;
  [WLComponentType.IFRAME]: undefined;
  [WLComponentType.IMAGE]: undefined;
  [WLComponentType.MENU]: undefined;
  [WLComponentType.PAGE]: undefined;
  [WLComponentType.TEXT]: undefined;
};

export type ComponentComponentMap = {
  [WLComponentType.CAROUSEL]: IExposureWLCarousel;
  [WLComponentType.EPG]: IExposureComponent;
  [WLComponentType.TAG_TYPE]: IExposureComponent;
  [WLComponentType.ASSET_DISPLAY]: IExposureComponent;
  [WLComponentType.FOOTER]: IExposureWLMenu;
  [WLComponentType.HEROBANNER]: IExposureWLHerobanner;
  [WLComponentType.IFRAME]: IExposureComponent;
  [WLComponentType.IMAGE]: IExposureWLImageComponent;
  [WLComponentType.MENU]: IExposureWLMenu;
  [WLComponentType.PAGE]: IExposureWLPage;
  [WLComponentType.TEXT]: IExposureComponent;
};

// export type ComponentContent = CarouselItem[] | TagList | EpgComponentContent;

export interface ComponentPresentationParameters {
  carouselLayout: CarouselLayout;
  imageOrientation: PresentationImageOrientation;
  density: CarouselDensity;
  backgroundColor?: string;
  backgroundImage?: IImage;
}

export interface ResolvedComponent<T extends keyof ComponentContentMap = any> {
  component: ComponentComponentMap[T];
  content: ComponentContentMap[T];
  presentationParameters: ComponentPresentationParameters;
}
