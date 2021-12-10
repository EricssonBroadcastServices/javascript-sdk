export enum DRMType {
  PLAYREADY = "com.microsoft.playready",
  WIDEVINE = "com.widevine.alpha",
  FAIRPLAY = "com.apple.fps"
}

export enum FormatType {
  DASH = "DASH",
  HLS = "HLS",
  SMOOTHSTREAMING = "SMOOTHSTREAMING",
  MP4 = "MP4",
  MP3 = "MP3"
}

export enum Stitcher {
  GENERIC = "GENERIC",
  NOWTILUS = "NOWTILUS"
}

export enum AdClipCategory {
  VOD = "vod",
  AD = "ad"
}

export class IDRM {
  licenseServerUrl: string;
  certificateUrl?: string;
}

export interface IFormat {
  format: FormatType;
  mediaLocator: string;
  orgMediaLocator: string;
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
}

export interface IPlay {
  assetId?: string;
  accountId: string;
  productId: string;
  publicationId: string;
  playSessionId: string;
  playToken: string;
  playTokenExpiration: number;
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
  materialId: string;
  materiaVersion: number;
  ads: IAds;
  cdn?: ICdn;
  analytics?: IAnalytics;
}
