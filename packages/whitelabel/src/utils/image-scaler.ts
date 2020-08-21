export enum ImageSizes {
  CAROUSEL_MOBILE_LANDSCAPE = 270,
  CAROUSEL_DESKTOP_LANDSCAPE = 600,
  CAROUSEL_MOBILE_PORTRAIT = 170,
  CAROUSEL_DESKTOP_PORTRAIT = 400,
  HEROBANNER_DESKTOP = 1920,
  HEROBANNER_MOBILE = 800,
  DETAILPAGE = 1000
}

export class Scaler {
  public fitToWidth(imageUrl: string | undefined, width: number) {
    if (!imageUrl) {
      return "";
    }
    if (imageUrl.includes("?")) {
      return imageUrl + "&w=" + width;
    }
    return `${imageUrl}?w=${width}`;
  }
}

export const ImageScaler = new Scaler();
