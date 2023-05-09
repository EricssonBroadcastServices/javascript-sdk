export interface IAssetFeatureImage {
  url: string;
  selectors: string[];
}

export interface IAssetFeature {
  id: string;
  images: IAssetFeatureImage[];
}