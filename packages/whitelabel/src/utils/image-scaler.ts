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
  private fit(imageUrl: string | undefined, value: number, param: "w" | "h") {
    if (!imageUrl) {
      return "";
    }
    if (imageUrl.includes("?")) {
      return imageUrl + `&${param}=${value}`;
    }
    return `${imageUrl}?${param}=${value}`;
  }
  public fitToWidth(imageUrl: string | undefined, width: number) {
    return this.fit(imageUrl, width, "w");
  }
  public fitToHeight(imageUrl: string | undefined, height: number) {
    return this.fit(imageUrl, height, "h");
  }
}

export const ImageScaler = new Scaler();
