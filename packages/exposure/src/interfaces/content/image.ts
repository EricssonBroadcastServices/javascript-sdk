export const ImageOrientation = {
  LANDSCAPE: "LANDSCAPE",
  PORTRAIT: "PORTRAIT",
  SQUARE: "SQUARE"
} as const;
// eslint-disable-next-line no-redeclare
export type ImageOrientation = typeof ImageOrientation[keyof typeof ImageOrientation];

export enum ImageType {
  POSTER = "poster",
  BANNER = "banner",
  LOGO = "logo",
  THUMBNAIL = "thumbnail",
  COVER = "cover",
  OTHER = "other"
}

export interface IImage {
  url: string;
  type?: ImageType;
  orientation: string;
  height: number;
  width: number;
  tags?: string[];
}
