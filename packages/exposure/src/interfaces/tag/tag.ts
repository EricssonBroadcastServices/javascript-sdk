import { IImage } from "../..";

export interface ITag {
  tagId: string;
  localized: { title?: string; locale: string; description?: string; images: IImage[] }[];
  scheme: string;
}
