import { ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";

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
  orientation: ImageOrientation;
  height: number;
  width: number;
  tags?: string[];
}
