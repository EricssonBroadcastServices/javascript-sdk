import { jsonProperty } from "../decorators/json-property";
import { Orientation } from "../interfaces/orientation";
import { CarouselLayout, IWLReference } from "../interfaces/wl-reference";
import { WLComponentType } from "../interfaces/wl-component";

export class WLReferencePresentation {
  @jsonProperty()
  public imageOrientation: Orientation;
  @jsonProperty()
  public layout: CarouselLayout;
}

export class WLReference implements IWLReference {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public internalUrl: string;
  @jsonProperty()
  public authorized: boolean;
  @jsonProperty()
  public type: WLComponentType;
  @jsonProperty()
  public presentation: WLReferencePresentation = {
    layout: CarouselLayout.CAROUSEL, // default values
    imageOrientation: Orientation.LANDSCAPE
  };
}
