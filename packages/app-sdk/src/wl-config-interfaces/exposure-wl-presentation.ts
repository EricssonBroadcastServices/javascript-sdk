import { IImage } from "./image";

export interface IWLIframe {
  url: string;
  height: number;
}

export interface IExposureWLLocalized {
  title?: string;
  subTitle?: string;
  body?: string;
  images?: IImage[];
  trailerAssetId?: string;
  iframe?: IWLIframe;
  backgroundColor?: string;
}

export interface IExposureWLPresentation {
  fallback?: IExposureWLLocalized;
  localized?: {
    [key: string]: IExposureWLLocalized;
  };
}
