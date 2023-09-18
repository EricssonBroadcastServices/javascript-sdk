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
  w: number;
  h: number;
  format: string;
}

export class Scaler {
  private fit(imageUrl?: string, options: Partial<IFitOptions> = {}) {
    if (!imageUrl) return "";
    const params = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => value !== undefined && params.set(key, String(value)));
    if (!params.has("format") && isWebPSupported()) {
      params.set("format", "webp");
    }
    if (imageUrl.includes("?")) {
      return `${imageUrl}&${params}`;
    }
    return `${imageUrl}?${params}`;
  }

  public fitToWidth(imageUrl: string | undefined, w: number, format?: string) {
    return this.fit(imageUrl, { w, format });
  }
  public fitToHeight(imageUrl: string | undefined, h: number, format?: string) {
    return this.fit(imageUrl, { h, format });
  }
}

export const ImageScaler = new Scaler();
