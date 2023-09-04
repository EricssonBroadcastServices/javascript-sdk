import {
  AspectRatio,
  CarouselLayout,
  PresentationImageOrientation,
  WLComponentType,
  WLComponentSubType,
  CarouselDensity,
  IImage
} from "@ericssonbroadcastservices/exposure-sdk";
export interface IWLReference {
  id: string;
  type: WLComponentType;
  subType?: WLComponentSubType;
  internalUrl: string;
  urlVariables?: string[];
  authorized: boolean;
  reloadInterval?: number;
  images?: IImage[];
  presentation?: {
    imageOrientation: PresentationImageOrientation;
    layout?: CarouselLayout;
    imageAspectRatio: AspectRatio;
    density?: CarouselDensity;
    backgroundColor?: string;
  };
}
