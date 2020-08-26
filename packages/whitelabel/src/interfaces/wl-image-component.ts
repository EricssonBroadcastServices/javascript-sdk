import { WLComponentType } from "./wl-component";
import { ImageModel } from "@EricssonBroadcastServices/exposure-sdk";
import { IWLAction } from "./wl-action";

export interface IWLImageComponent {
  id: string;
  type: WLComponentType;
  title?: string;
  description?: string;
  images: ImageModel[];
  action?: IWLAction;
}