import {
  AspectRatio,
  CarouselLayout,
  PresentationImageOrientation,
  WLComponentType,
  WLComponentSubType
} from "@ericssonbroadcastservices/exposure-sdk";
export interface IWLReference {
  id: string;
  type: WLComponentType;
  subType?: WLComponentSubType;
  internalUrl: string;
  urlVariables?: string[];
  authorized: boolean;
  reloadInterval?: number;
  presentation?: {
    imageOrientation: PresentationImageOrientation;
    layout?: CarouselLayout;
    imageAspectRatio: AspectRatio;
  };
}
