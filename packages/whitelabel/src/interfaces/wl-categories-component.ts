import { WLComponentType } from "@ericssonbroadcastservices/exposure-sdk";
import { IWLAssetTag } from "./wl-tag";

export interface IWLCategoriesComponent {
  id: string;
  type: WLComponentType;
  title?: string;
  tags: IWLAssetTag[];
}
