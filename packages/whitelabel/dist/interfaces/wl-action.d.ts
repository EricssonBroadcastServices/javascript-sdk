import { IWLReference } from "./wl-reference";
export declare enum WLActionTypes {
    NavigateToPage = "NavigateToPage",
    ExternalLink = "ExternalLink",
    PlayAsset = "PlayAsset",
    NavigateToDetails = "NavigateToDetails"
}
export interface IWLAction {
    type: WLActionType;
    target: string;
    assetId?: string;
    pageId?: string;
    url?: string;
    internalUrl?: string;
    page?: IWLReference;
}
export declare enum WLInternalActionType {
    ExternalUrlAction = "ExternalUrlAction",
    BlockAction = "BlockAction"
}
export declare enum WLActionType {
    ExternalLink = "ExternalLink",
    NavigateToPage = "NavigateToPage",
    NavigateToDetails = "NavigateToDetails",
    PlayAsset = "PlayAsset"
}
