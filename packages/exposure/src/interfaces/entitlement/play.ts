export const DRMType = {
  PLAYREADY: "com.microsoft.playready",
  WIDEVINE: "com.widevine.alpha",
  FAIRPLAY: "com.apple.fps"
} as const;
export type DRMType = typeof DRMType[keyof typeof DRMType];

export const FormatType = {
  DASH: "DASH",
  HLS: "HLS",
  SMOOTHSTREAMING: "SMOOTHSTREAMING",
  MP4: "MP4",
  MP3: "MP3"
} as const;
export type FormatType = typeof FormatType[keyof typeof FormatType];

export const Stitcher = {
  GENERIC: "GENERIC",
  INTERNAL: "INTERNAL",
  NOWTILUS: "NOWTILUS"
} as const;
export type Stitcher = typeof Stitcher[keyof typeof Stitcher];

export const AdClipCategory = {
  VOD: "vod",
  AD: "ad"
} as const;
export type AdClipCategory = typeof AdClipCategory[keyof typeof AdClipCategory];

export class IDRM {
  licenseServerUrl: string;
  certificateUrl?: string;
}

export interface IFormat {
  format: FormatType;
  mediaLocator: string;
  orgMediaLocator?: string;
  drm?: {
    [DRMType.FAIRPLAY]?: IDRM;
    [DRMType.PLAYREADY]?: IDRM;
    [DRMType.WIDEVINE]?: IDRM;
  };
  liveDelay?: number;
  adMediaLocator?: string;
  vastUrl?: string;
}

export interface IStreamInfo {
  channelId?: string;
  start?: number;
  end?: number;
  startPadding?: number;
  endPadding?: number;
  static?: boolean;
  live?: boolean;
  event?: boolean;
  programId?: string;
  persistent?: boolean;
  timeShift?: boolean;
  maxResolution?: string;
  ssai?: boolean;
}

export class ISprite {
  width: number;
  vtt: string;
  offsetInMs?: number;
}

export interface IContractRestrictions {
  airplayEnabled?: boolean;
  ffEnabled?: boolean;
  maxBitrate?: number;
  maxResHeight?: number;
  minBitrate?: number;
  rwEnabled?: boolean;
  timeshiftEnabled?: boolean;
}

export interface IAdMarker {
  id: string;
  type: string;
  offset: number;
  duration: string;
}

export interface IAd {
  title: string;
  titleId: string;
  duration: string;
}

export interface IAdTrackingEvents {
  loaded?: string[];
  start?: string[];
  complete?: string[];
  firstQuartile?: string[];
  midpoint?: string[];
  thirdQuartile?: string[];
}

export interface IAdClickThroughData {
  clickThroughUrl: string;
  clickTrackingUrls: string[];
}
export interface IAdClip {
  title?: string;
  titleId?: string;
  category?: AdClipCategory;
  duration?: number;
  impressionUrlTemplates?: string[];
  trackingEvents?: IAdTrackingEvents;
  videoClicks?: IAdClickThroughData;
}

export interface IAds {
  stitcher: Stitcher;
  stitcherSession?: string;
  stitcherProfileId?: string;
  insertionDuration?: number;
  insertionMaxCount?: number;
  adMarkers?: IAdMarker[];
  ads?: IAd[];
  clips?: IAdClip[];
}
export interface ICdn {
  profile?: string;
  host?: string;
  provider?: string;
}

export interface IAnalytics {
  postInterval?: number;
  bucket?: number;
  tag?: string;
  baseUrl?: string;
  percentage?: number;
}

export interface IEpg {
  enabled: boolean;
  entitlementCheck: boolean;
}

export interface IPlay {
  assetId?: string;
  accountId: string;
  audioOnly?: boolean;
  productId: string;
  publicationId: string;
  playSessionId: string;
  playToken: string;
  playTokenExpiration: number;
  epg?: IEpg;
  formats: IFormat[];
  streamInfo: IStreamInfo;
  sprites?: ISprite[];
  contractRestrictions: IContractRestrictions;
  bookmarks: {
    lastViewedOffset: number;
  };
  requestId: string;
  playTokenExpirationReason: string;
  concurrentSessionsCount: number;
  durationInMs: number;
  durationInMilliseconds: number;
  materialId: string;
  materiaVersion: number;
  ads: IAds;
  cdn?: ICdn;
  analytics?: IAnalytics;
}
