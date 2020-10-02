import { AssetType, Publication, Participants, ExternalReferences, ImageModel } from "@EricssonBroadcastServices/exposure-sdk";
import { IWLAction } from "./wl-action";

export interface IWLAssetTag {
  title: string;
  tagType: string;
  id: string;
}

export interface IWLSeason {
  episodeCount: number;
  season: number;
  seasonId: string;
  images: ImageModel[];
  title: string;
  description: string;
  episodes?: IWLCarouselItem[];
}

export interface IProductionCountry {
  code: string;
  name: string;
}

export interface IWLCarouselItem {
  assetId: string;
  type: AssetType;
  title: string;
  description: string;
  images: ImageModel[];
  publications: Publication[];
  startTime?: Date | string;
  endTime?: Date | string;
  duration?: number;
  participants: Participants[];
  tags: IWLAssetTag[];
  tvShowId?: string;
  season: number;
  externalReferences: ExternalReferences[];
  action: IWLAction;
  year: number;
  productionCountries: IProductionCountry[];
  bookmark?: {
    time: number;
    percentage: number;
  };
  seasons?: IWLSeason[];
}
