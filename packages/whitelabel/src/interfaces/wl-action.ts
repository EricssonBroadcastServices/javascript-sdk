import { WLActionType } from "@ericssonbroadcastservices/exposure-sdk";
import { IWLReference } from "./wl-reference";
export interface IWLAction {
  type: WLActionType;
  target: string;
  assetId?: string;
  pageId?: string;
  url?: string;
  internalUrl?: string;
  page?: IWLReference;
  qrCode?: string;
}
