export interface IPreferenceListItem {
  assetId: string;
  lastUpdated: string;
  order: number;
  asset: any; // TODO: this should be IAsset once we have that defined.
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
