export enum ImageOrientation {
  LANDSCAPE = "LANDSCAPE",
  PORTRAIT = "PORTRAIT",
  SQUARE = "SQUARE"
}

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
