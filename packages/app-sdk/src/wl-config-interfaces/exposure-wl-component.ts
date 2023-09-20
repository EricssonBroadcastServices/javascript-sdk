import { IExposureWLAction } from "./exposure-wl-action";
import { IExposureWLPresentation } from "./exposure-wl-presentation";

export const WLCarouselAssetQueryTypes = {
  ASSET: "AssetQuery",
  EPG: "ChannelEpg",
  EVENT: "LiveEvents",
  RELATED: "Related",
  OTHERS_HAVE_WATCHED: "OthersHaveWatched",
  RECOMMENDED: "Recommended",
  RECENTLY_WATCHED: "RecentlyWatched",
  CONTINUE_WATCHING: "ContinueWatching",
  TVOD: "Tvod",
  FAVORITES: "Favourites",
  FULL_EPG: "Epg",
  TAG_FEED_URL: "ApiTagFeedUrl",
  TRAILERS: "Trailers",
  TAG_TYPE: "TagType"
} as const;
export type WLCarouselAssetQueryTypes = typeof WLCarouselAssetQueryTypes[keyof typeof WLCarouselAssetQueryTypes];

export const WLHeroBannerItemType = {
  HEROBANNER_ITEM: "herobanner_item",
  VIDEO_HEROBANNER_ITEM: "video_herobanner_item"
} as const;
export type WLHeroBannerItemType = typeof WLHeroBannerItemType[keyof typeof WLHeroBannerItemType];

export const WLComponentType = {
  CAROUSEL: "carousel",
  HEROBANNER: "herobanner",
  ASSET_DISPLAY: "asset_display",
  MENU: "menu",
  PAGE: "page",
  ASSET_PAGE: "asset_page",
  BROWSE_PAGE: "browse_page",
  FOOTER: "footer",
  IMAGE: "image",
  TEXT: "text",
  EPG: "epg",
  IFRAME: "iframe",
  TAG_TYPE: "tagtype"
} as const;
export type WLComponentType = typeof WLComponentType[keyof typeof WLComponentType];

export const WLComponentSubType = {
  TAG_FEED_QUERY: "TagFeedQuery",
  FAVORITES: "Favourites",
  CONTINUE_WATCHING: "ContinueWatching"
} as const;
export type WLComponentSubType = typeof WLComponentSubType[keyof typeof WLComponentSubType];

interface IExposureComponentParameters {
  assetSearchTypes?: string;
  assetTitles?: "show" | "hide";
}
export interface IExposureComponent {
  id: string;
  appType: WLComponentType;
  appSubType?: WLComponentSubType;
  presentation?: IExposureWLPresentation;
  parameters?: IExposureComponentParameters;
}

interface IContentUrl {
  type: WLCarouselAssetQueryTypes;
  url: string;
  authorized: boolean;
}

export interface IExposureWLCarousel extends IExposureComponent {
  contentUrl?: IContentUrl;
  contentPreferencesUrl?: {
    url: string;
    fields: string[];
  };
}

export interface IExposureWLCategoriesComponent extends IExposureComponent {
  contentUrl: IContentUrl;
}

export interface IExposureWLHerobannerItem {
  appType: WLHeroBannerItemType;
  presentation?: IExposureWLPresentation;
  content: {
    presentation?: IExposureWLPresentation;
  };
  actions?: { default: IExposureWLAction };
}

export interface IExposureWLHerobanner extends IExposureComponent {
  actions: {
    default?: IExposureWLAction;
  };
  components: {
    heroBannerItems?: IExposureWLHerobannerItem[];
  };
}

export interface IExpoureWLEpgComponent extends IExposureComponent {
  contentUrl: IContentUrl;
}

export interface IExposureWLImageComponent extends IExposureComponent {
  actions: {
    default?: IExposureWLAction;
  };
}
