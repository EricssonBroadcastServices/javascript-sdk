import { CarouselLayout, PresentationImageOrientation, IWLReference } from "../interfaces/wl-reference";
import { WLComponentType } from "../interfaces/wl-component";
import { AspectRatio, jsonProperty } from "@ericssonbroadcastservices/exposure-sdk";

export class WLReferencePresentation {
  @jsonProperty()
  public imageOrientation: PresentationImageOrientation;
  @jsonProperty()
  public layout: CarouselLayout;
  @jsonProperty()
  public imageAspectRatio: AspectRatio;
}

export class WLReference implements IWLReference {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public internalUrl: string;
  @jsonProperty()
  public authorized: boolean;
  @jsonProperty()
  public reloadInterval?: number;
  @jsonProperty()
  public type: WLComponentType;
  @jsonProperty()
  public presentation: WLReferencePresentation = {
    layout: CarouselLayout.CAROUSEL, // default values
    imageOrientation: PresentationImageOrientation.LANDSCAPE,
    imageAspectRatio: AspectRatio.SIXTEEN_BY_NINE
  };
}
