export const ImageOrientation = {
  LANDSCAPE: "LANDSCAPE",
  PORTRAIT: "PORTRAIT",
  SQUARE: "SQUARE"
} as const;
export type ImageOrientation = typeof ImageOrientation[keyof typeof ImageOrientation];

export const ImageType = {
  POSTER: "poster",
  BANNER: "banner",
  LOGO: "logo",
  THUMBNAIL: "thumbnail",
  COVER: "cover",
  OTHER: "other"
} as const;
export type ImageType = typeof ImageType[keyof typeof ImageType];

export interface IImage {
  url: string;
  type?: ImageType;
  orientation: string;
  height: number;
  width: number;
  tags?: string[];
}
