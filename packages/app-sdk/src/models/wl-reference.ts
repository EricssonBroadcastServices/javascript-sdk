import { IWLReference } from "../interfaces/wl-reference";
import {
  AspectRatio,
  jsonProperty,
  CarouselLayout,
  PresentationImageOrientation,
  WLComponentType,
  WLComponentSubType,
  CarouselDensity,
  IImage
} from "@ericssonbroadcastservices/exposure-sdk";

export class WLReferencePresentation {
  @jsonProperty()
  public imageOrientation: PresentationImageOrientation;
  @jsonProperty()
  public layout: CarouselLayout;
  @jsonProperty()
  public imageAspectRatio: AspectRatio;
  @jsonProperty()
  public density?: CarouselDensity;
  @jsonProperty()
  public backgroundColor?: string;
}

export class WLReference implements IWLReference {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public type: WLComponentType;
  @jsonProperty()
  public subType?: WLComponentSubType;
  @jsonProperty()
  public internalUrl: string;
  @jsonProperty()
  public urlVariables?: string[];
  @jsonProperty()
  public authorized: boolean;
  @jsonProperty()
  public reloadInterval?: number;
  @jsonProperty({ type: Object })
  public images: IImage[] = [];
  @jsonProperty()
  public presentation: WLReferencePresentation = {
    layout: CarouselLayout.CAROUSEL, // default values
    imageOrientation: PresentationImageOrientation.LANDSCAPE,
    imageAspectRatio: AspectRatio.SIXTEEN_BY_NINE,
    density: CarouselDensity.MEDIUM
  };
}
