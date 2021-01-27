import { jsonProperty } from "../decorators/json-property";

export enum DRMType {
  PLAYREADY = "com.microsoft.playready",
  WIDEVINE = "com.widevine.alpha",
  FAIRPLAY = "com.apple.fps"
}

export enum FormatType {
  DASH = "DASH",
  HLS = "HLS",
  SMOOTHSTREAMING = "SMOOTHSTREAMING"
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
  public drm?: {
    [DRMType.FAIRPLAY]?: DRM;
    [DRMType.PLAYREADY]?: DRM;
    [DRMType.WIDEVINE]?: DRM;
  };
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

export class Play {
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
  @jsonProperty()
  public formats: Format[];
  @jsonProperty()
  public streamInfo: StreamInfo;
  @jsonProperty()
  public sprites: Sprite[];
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
}
