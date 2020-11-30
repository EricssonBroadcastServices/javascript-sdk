import { WLComponentType } from "./wl-component";
import { ImageModel } from "@ericssonbroadcastservices/exposure-sdk";
import { IWLAction } from "./wl-action";

export interface IWLImageComponent {
  id: string;
  type: WLComponentType;
  title?: string;
  description?: string;
  images: ImageModel[];
  action?: IWLAction;
}