import { IImage } from "@ericssonbroadcastservices/exposure-sdk";
import { IWLAction } from "..";

export interface IWLAssetTag {
  title: string;
  description: string;
  images: IImage[];
  tagType: string;
  id: string;
  action?: IWLAction;
}
