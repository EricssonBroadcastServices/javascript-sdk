export enum WLActionTypes {
  NavigateToPage = "NavigateToPage",
  ExternalLink = "ExternalLink",
  PlayAsset = "PlayAsset",
  NavigateToDetails = "NavigateToDetails"
}

export enum WLActionType {
  ExternalLink = "ExternalLink",
  NavigateToPage = "NavigateToPage",
  NavigateToDetails = "NavigateToDetails",
  PlayAsset = "PlayAsset"
}

export enum WLInternalActionType {
  ExternalUrlAction = "ExternalUrlAction",
  BlockAction = "BlockAction"
}

export interface IExposureWLAction {
  type: WLInternalActionType;
  verb: WLActionType;
  assetId?: string;
  componentId?: string;
  url?: string;
  localizedUrl?: {
    [key: string]: string;
  };
}
