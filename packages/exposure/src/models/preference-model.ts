import { deserialize } from "../decorators/property-mapper";
import { IPreferenceListItem } from "../interfaces/preferences/preferences";
import { Asset } from "./asset-model";

export class PreferenceListItem {
  public assetId: string;
  public lastUpdated: Date;
  public order: number;
  public asset: Asset;

  constructor(json: IPreferenceListItem) {
    this.assetId = json.assetId;
    this.lastUpdated = new Date(json.lastUpdated);
    this.order = json.order;
    this.asset = deserialize(Asset, json.asset);
  }
}

export interface IPreferenceListTagItem {
  id: string;
  order: number;
}

export interface IPreferenceListTags {
  query: string;
  items: IPreferenceListTagItem[];
}

export interface IUserPreferences {
  lastUpdated?: string;
  preferences: any;
}
