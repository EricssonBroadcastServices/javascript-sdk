import * as querystring from "query-string";
import { isWebPSupported } from "./webp";

export enum ImageSizes {
  CAROUSEL_MOBILE_LANDSCAPE = 270,
  CAROUSEL_DESKTOP_LANDSCAPE = 600,
  CAROUSEL_MOBILE_PORTRAIT = 170,
  CAROUSEL_DESKTOP_PORTRAIT = 400,
  HEROBANNER_DESKTOP = 1920,
  HEROBANNER_MOBILE = 800,
  DETAILPAGE = 1000
}

interface IFitOptions {
  w?: number;
  h?: number;
  format?: string;
}

export class Scaler {
  private fit(imageUrl: string | undefined, options: IFitOptions) {
    if (!imageUrl) return "";
    if (!options?.format && isWebPSupported()) {
      options = options || {};
      options.format = 'webp';
    }
    const queryString = querystring.stringify(options as any);
    if (imageUrl.includes("?")) {
      return `${imageUrl}&${queryString}`;
    }
    return `${imageUrl}?${queryString}`;
  }

  public fitToWidth(imageUrl: string | undefined, w: number, format?: string) {
    return this.fit(imageUrl, { w, format });
  }
  public fitToHeight(imageUrl: string | undefined, h: number, format?: string) {
    return this.fit(imageUrl, { h, format });
  }
}

export const ImageScaler = new Scaler();
