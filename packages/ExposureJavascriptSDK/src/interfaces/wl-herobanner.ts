import { IWLAction } from "./wl-action";
import { ImageModel } from "../models/localized-model";

export interface IWLHeroBanner {
  type: string;
  id: string;
  items: IWLHeroBannerItem[];
}

export interface IWLHeroBannerItem {
  assetId?: string;
  action: IWLAction | undefined;
  title?: string;
  images?: ImageModel[];
  description?: string;
  trailerAssetId?: string;
}
