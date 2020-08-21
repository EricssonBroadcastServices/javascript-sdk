export declare enum ImageSizes {
    CAROUSEL_MOBILE_LANDSCAPE = 270,
    CAROUSEL_DESKTOP_LANDSCAPE = 600,
    CAROUSEL_MOBILE_PORTRAIT = 170,
    CAROUSEL_DESKTOP_PORTRAIT = 400,
    HEROBANNER_DESKTOP = 1920,
    HEROBANNER_MOBILE = 800,
    DETAILPAGE = 1000
}
export declare class Scaler {
    fitToWidth(imageUrl: string | undefined, width: number): string;
}
export declare const ImageScaler: Scaler;
