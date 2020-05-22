import { IWLReference } from "./wl-reference";

export interface IWLAction {
  type: string;
  target: string;
  assetId?: string;
  pageId?: string;
  url?: string;
  internalUrl?: string;
  page?: IWLReference;
}
