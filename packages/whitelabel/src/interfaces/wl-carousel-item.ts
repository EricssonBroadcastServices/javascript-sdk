import {
  AssetType,
  Publication,
  ExternalReferences,
  ImageModel,
  MarkerType
} from "@ericssonbroadcastservices/exposure-sdk";
import { IWLAction } from "./wl-action";
import { IWLAssetTag } from "./wl-tag";

export interface IWLParticipant {
  name: string;
  function?: string;
  action?: IWLAction;
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

export interface IWLParentalRating {
  country: string;
  rating: string;
  scheme: string;
  countryName: string;
}

export interface IWLOverlayWidget {
  url: string;
}

export interface IWLMarkerPoint {
  type: MarkerType;
  offset: number;
  endOffset?: number;
  title: string;
}

export interface IWLCarouselItem {
  assetId: string;
  trailerAssetId?: string;
  type: AssetType;
  title: string;
  sortingTitle?: string;
  description: string;
  images: ImageModel[];
  publications: Publication[];
  startTime?: Date | string;
  endTime?: Date | string;
  duration?: number;
  participants: IWLParticipant[];
  tags: IWLAssetTag[];
  tvShowId?: string;
  channelId?: string;
  season?: number;
  episode?: number;
  externalReferences: ExternalReferences[];
  action: IWLAction;
  year: number;
  productionCountries: IProductionCountry[];
  pushNextCuepoint?: number;
  bookmark?: {
    time: number;
    percentage: number;
  };
  seasons?: IWLSeason[];
  parentalRatings: IWLParentalRating[];
  overlayWidgets: IWLOverlayWidget[];
  slugs?: string[];
  markerPoints?: IWLMarkerPoint[];
  seriesAssetAction?: IWLAction;
}
