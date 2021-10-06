import { IWLAssetTag, WLComponentType } from "..";

export interface IWLCategoriesComponent {
  id: string;
  type: WLComponentType;
  title?: string;
  tags: IWLAssetTag[];
}
