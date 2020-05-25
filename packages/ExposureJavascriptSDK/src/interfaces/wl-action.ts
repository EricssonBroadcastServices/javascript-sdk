import { IWLReference } from "./wl-reference";

export interface IWLAction {
  type: WLActionType;
  target: string;
  assetId?: string;
  pageId?: string;
  url?: string;
  internalUrl?: string;
  page?: IWLReference;
}

export enum WLInternalActionType {
  ExternalUrlAction = "ExternalUrlAction",
  BlockAction = "BlockAction"
}

export enum WLActionType {
  ExternalLink = "ExternalLink",
  NavigateToPage = "NavigateToPage",
  NavigateToDetails = "NavigateToDetails",
  PlayAsset = "PlayAsset"
}
