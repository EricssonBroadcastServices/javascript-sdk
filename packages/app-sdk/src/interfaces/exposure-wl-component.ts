import { IExposureWLAction } from "./exposure-wl-action";
import { IExposureWLPresentation } from "./exposure-wl-presentation";

export const WLCarouselAssetQueryTypes = {
  // used for carousels
  ASSET: "AssetQuery",
  EPG: "ChannelEpg",
  EVENT: "LiveEvents",
  RECOMMENDED: "Recommended",
  RECENTLY_WATCHED: "RecentlyWatched",
  CONTINUE_WATCHING: "ContinueWatching",
  TVOD: "Tvod",
  FAVORITES: "Favourites",

  // used for epg component
  FULL_EPG: "Epg",

  // used for tag feed components.
  TAG_FEED_URL: "ApiTagFeedUrl",

  // used for categories component exclusivly
  TAG_TYPE: "TagType",

  // SingleAsset is not currently used
  SINGLE_ASSET: "SingleAsset"
} as const;
export type WLCarouselAssetQueryTypes = (typeof WLCarouselAssetQueryTypes)[keyof typeof WLCarouselAssetQueryTypes];

export const WLHeroBannerItemType = {
  HEROBANNER_ITEM: "herobanner_item",
  VIDEO_HEROBANNER_ITEM: "video_herobanner_item"
} as const;
export type WLHeroBannerItemType = (typeof WLHeroBannerItemType)[keyof typeof WLHeroBannerItemType];

export const WLComponentType = {
  CAROUSEL: "carousel",
  HEROBANNER: "herobanner",
  ASSET_DISPLAY: "asset_display",
  MENU: "menu",
  PAGE: "page",
  FOOTER: "footer",
  IMAGE: "image",
  TEXT: "text",
  EPG: "epg",
  IFRAME: "iframe",
  TAG_TYPE: "tagtype",
  SEE_ALL: "seeAll"
} as const;
export type WLComponentType = (typeof WLComponentType)[keyof typeof WLComponentType];

export const WLComponentSubType = {
  EPG: "Epg",
  TAG_FEED_QUERY: "TagFeedQuery",
  FAVORITES: "Favourites",
  CONTINUE_WATCHING: "ContinueWatching",
  TAGS_QUERY: "TagsQuery"
} as const;
export type WLComponentSubType = (typeof WLComponentSubType)[keyof typeof WLComponentSubType];

interface IExposureComponentParameters {
  assetSearchTypes?: string;
  assetTitles?: "show" | "hide";
  carouselNavigation?: "GO_TO_DETAILS" | "PLAY";
}
export interface IExposureComponent {
  id: string;
  appType: WLComponentType;
  appSubType?: WLComponentSubType;
  presentation?: IExposureWLPresentation;
  parameters?: IExposureComponentParameters;
  created?: string;
  changed?: string;
  name?: string;
  actions?: { default?: IExposureWLAction };
}

interface IContentUrl {
  type: WLCarouselAssetQueryTypes;
  url: string;
  authorized: boolean;
}

export interface IExposureWLCarousel extends IExposureComponent {
  contentUrl?: IContentUrl;
  contentPreferencesUrl?: {
    type: "ApiTagFeedUrl";
    url: string;
    fields: string[];
  };
}

export interface IExposureWLCategoriesComponent extends IExposureComponent {
  contentUrl: IContentUrl;
}

export interface IExposureWLHerobannerItem {
  appType: WLHeroBannerItemType;
  appSubType?: string;
  presentation?: IExposureWLPresentation;
  content: {
    type?: string;
    presentation?: IExposureWLPresentation;
  };
  actions?: { default: IExposureWLAction };
}

export interface IExposureWLHerobanner extends IExposureComponent {
  components: {
    heroBannerItems?: IExposureWLHerobannerItem[];
  };
}

export interface IExpoureWLEpgComponent extends IExposureComponent {
  contentUrl: IContentUrl;
}

export type IExposureWLImageComponent = IExposureComponent;
