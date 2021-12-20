import { jsonProperty } from "../decorators/json-property";

export enum DRMType {
  PLAYREADY = "com.microsoft.playready",
  WIDEVINE = "com.widevine.alpha",
  FAIRPLAY = "com.apple.fps",
}

export enum FormatType {
  DASH = "DASH",
  HLS = "HLS",
  SMOOTHSTREAMING = "SMOOTHSTREAMING",
  MP4 = "MP4",
  MP3 = "MP3",
}

export enum Stitcher {
  GENERIC = "GENERIC",
  NOWTILUS = "NOWTILUS",
}

export enum AdClipCategory {
  VOD = "vod",
  AD = "ad",
}

export class DRM {
  licenseServerUrl: string;
  certificateUrl?: string;
}

export class Format {
  @jsonProperty()
  public format: FormatType;
  @jsonProperty()
  public mediaLocator: string;
  @jsonProperty()
  public orgMediaLocator: string;
  @jsonProperty()
  public drm?: {
    [DRMType.FAIRPLAY]?: DRM;
    [DRMType.PLAYREADY]?: DRM;
    [DRMType.WIDEVINE]?: DRM;
  };
  @jsonProperty()
  public liveDelay?: number;
  @jsonProperty()
  public adMediaLocator?: string;
  @jsonProperty()
  public vastUrl?: string;
}

export class StreamInfo {
  @jsonProperty()
  public channelId?: string;
  @jsonProperty()
  public start?: number;
  @jsonProperty()
  public end?: number;
  @jsonProperty()
  public startPadding?: number;
  @jsonProperty()
  public endPadding?: number;
  @jsonProperty()
  public static?: boolean;
  @jsonProperty()
  public live?: boolean;
  @jsonProperty()
  public event?: boolean;
  @jsonProperty()
  public programId?: string;
  @jsonProperty()
  public persistent?: boolean;
  @jsonProperty()
  public timeShift?: boolean;
  @jsonProperty()
  public maxResolution?: string;
  @jsonProperty()
  public ssai?: boolean;
}

export class Sprite {
  @jsonProperty()
  public width: number;
  @jsonProperty()
  public vtt: string;
  @jsonProperty()
  public offsetInMs?: number;
}

export class ContractRestrictions {
  @jsonProperty()
  public airplayEnabled?: boolean;
  @jsonProperty()
  public ffEnabled?: boolean;
  @jsonProperty()
  public maxBitrate?: number;
  @jsonProperty()
  public maxResHeight?: number;
  @jsonProperty()
  public minBitrate?: number;
  @jsonProperty()
  public rwEnabled?: boolean;
  @jsonProperty()
  public timeshiftEnabled?: boolean;
}

export class AdMarker {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public type: string;
  @jsonProperty()
  public offset: number;
  @jsonProperty()
  public duration: string;
}

export class Ad {
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public titleId: string;
  @jsonProperty()
  public duration: string;
}

export class AdTrackingEvents {
  @jsonProperty({ type: String })
  complete?: string[];
  @jsonProperty({ type: String })
  firstQuartile?: string[];
  @jsonProperty({ type: String })
  midpoint?: string[];
  @jsonProperty({ type: String })
  thirdQuartile?: string[];
}

export class AdClickThroughData {
  @jsonProperty()
  public clickThroughUrl: string;
  @jsonProperty()
  public clickTrackingUrls: string[];
}

export class AdClip {
  @jsonProperty()
  title?: string;
  @jsonProperty()
  titleId?: string;
  @jsonProperty()
  category?: AdClipCategory;
  @jsonProperty()
  duration?: number;
  @jsonProperty({ type: String })
  impressionUrlTemplates?: string[];
  @jsonProperty()
  trackingEvents?: AdTrackingEvents;
  @jsonProperty()
  videoClicks?: AdClickThroughData;
}

export class Ads {
  @jsonProperty()
  public stitcher: Stitcher;
  @jsonProperty()
  public stitcherSession?: string;
  @jsonProperty()
  public stitcherProfileId?: string;
  @jsonProperty()
  public insertionDuration?: number;
  @jsonProperty()
  public insertionMaxCount?: number;
  @jsonProperty({ type: AdMarker })
  public adMarkers?: AdMarker[];
  @jsonProperty({ type: Ad })
  public ads?: Ad[];
  @jsonProperty({ type: AdClip })
  public clips?: AdClip[];
}

export class Cdn {
  @jsonProperty()
  public profile?: string;
  @jsonProperty()
  public host?: string;
  @jsonProperty()
  public provider?: string;
}

export class Analytics {
  @jsonProperty()
  public postInterval?: number;
  @jsonProperty()
  public bucket?: number;
  @jsonProperty()
  public tag?: string;
}

export class Play {
  @jsonProperty()
  public assetId?: string;
  @jsonProperty()
  public accountId: string;
  @jsonProperty()
  public productId: string;
  @jsonProperty()
  public publicationId: string;
  @jsonProperty()
  public playSessionId: string;
  @jsonProperty()
  public playToken: string;
  @jsonProperty()
  public playTokenExpiration: number;
  @jsonProperty({ type: Format })
  public formats: Format[] = [];
  @jsonProperty()
  public streamInfo: StreamInfo;
  @jsonProperty({ type: Sprite })
  public sprites?: Sprite[];
  @jsonProperty()
  public contractRestrictions: ContractRestrictions;
  @jsonProperty()
  public bookmarks: {
    lastViewedOffset: number;
  };
  @jsonProperty()
  public requestId: string;
  @jsonProperty()
  public playTokenExpirationReason: string;
  @jsonProperty()
  public concurrentSessionsCount: number;
  @jsonProperty()
  public durationInMs: number;
  @jsonProperty()
  public materialId: string;
  @jsonProperty()
  public materiaVersion: number;
  @jsonProperty({ type: Ads })
  public ads: Ads;
  @jsonProperty({ type: Cdn })
  public cdn?: Cdn;
  @jsonProperty({ type: Analytics })
  public analytics?: Analytics;
}
