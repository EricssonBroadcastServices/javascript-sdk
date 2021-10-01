import { ImageOrientation, ImageType } from "../..";

interface ITagImage {
  height: number;
  orientation: ImageOrientation;
  type: ImageType;
  url: string;
  width: number;
}

export interface ITag {
  tagId: string;
  localized: { title?: string; locale: string; description?: string; images: ITagImage[] }[];
  scheme: string;
}
