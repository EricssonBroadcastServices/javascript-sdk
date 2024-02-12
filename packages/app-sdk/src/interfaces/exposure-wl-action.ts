export const WLActionTypes = {
  NavigateToPage: "NavigateToPage",
  ExternalLink: "ExternalLink",
  PlayAsset: "PlayAsset",
  NavigateToDetails: "NavigateToDetails"
} as const;
export type WLActionTypes = (typeof WLActionTypes)[keyof typeof WLActionTypes];

export const WLActionType = {
  ExternalLink: "ExternalLink",
  NavigateToPage: "NavigateToPage",
  NavigateToDetails: "NavigateToDetails",
  PlayAsset: "PlayAsset"
} as const;
export type WLActionType = (typeof WLActionType)[keyof typeof WLActionType];

export const WLInternalActionType = {
  ExternalUrlAction: "ExternalUrlAction",
  BlockAction: "BlockAction",
  AssetAction: "AssetAction"
} as const;
export type WLInternalActionType = (typeof WLInternalActionType)[keyof typeof WLInternalActionType];

export interface IExposureWLAction {
  type: WLInternalActionType;
  verb: WLActionType;
  assetId?: string;
  componentId?: string;
  url?: string;
  localizedUrl?: {
    [key: string]: string;
  };
  slugs?: string[];
}
