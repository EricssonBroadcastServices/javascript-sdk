import { WLComponentType } from "@ericssonbroadcastservices/exposure-sdk";

export interface IWLTextComponent {
  id: string;
  type: WLComponentType;
  title?: string;
  body: string;
}
