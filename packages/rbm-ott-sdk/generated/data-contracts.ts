/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

export interface APIErrorMessage {
  /** Extended error message */
  extendedMessage?: string;
  /** HTTP Code */
  httpCode?: number;
  /** Error message */
  message?: string;
}

/** User access configuration */
export interface AccessConfig {
  /** How users gain access */
  accessModel: "login" | "open" | "pay";
  /** Consent management */
  consentManagement: ConsentManagement;
  /** Login methods */
  loginMethods: object;
  /** Password policy */
  passwordPolicy: PasswordPolicy;
  /** Minimum age in years of user signing up to the service */
  signupMinimumAge: number;
  /** How to become a user */
  signupModel: "confirmed" | "provisioned" | "unconfirmed";
}

export interface AccountDownload {
  accountId?: string;
  assets?: AssetDownload[];
}

export interface AccountProducts {
  account?: string;
  entitleExposure?: boolean;
  entitled?: Product[];
  notEntitled?: Product[];
}

export interface Action {
  type: string;
  verb?: string;
}

export interface ActivationCodeResponse {
  code: string;
  expires: string;
}

export interface ActiveChannels {
  apiChannelStatuses?: ChannelStatus[];
  pageNumber?: number;
  pageSize?: number;
}

export interface AdClip {
  category?: AdClipCategory;
  duration?: number;
  impressionUrlTemplates?: string[];
  title?: string;
  titleId?: string;
  trackingEvents?: AdTrackingEvents;
  videoClicks?: AdVideoClicks;
}

export const AdClipCategory = {
  AD: "ad",
  VOD: "vod"
} as const;
export type AdClipCategory = (typeof AdClipCategory)[keyof typeof AdClipCategory];

export interface AdMarker {
  adTag?: string;
  duration?: string;
  id?: string;
  offset?: number;
  tagType?: string;
  type?: string;
}

export interface AdRoll {
  customParams?: Record<string, string>;
  defaultDuration?: string;
}

export type AdRollConfig = Record<"mid" | "post" | "pre", AdRoll>;

export const AdStitcher = {
  GENERIC: "GENERIC",
  INTERNAL: "INTERNAL",
  NOWTILUS: "NOWTILUS"
} as const;
export type AdStitcher = (typeof AdStitcher)[keyof typeof AdStitcher];

export type AdTrackingEvents = Record<"complete" | "firstQuartile" | "midpoint" | "thirdQuartile", string[]>;

export interface AdVideoClicks {
  clickThroughUrl?: string;
  clickTrackingUrls?: string[];
}

export interface AddPaymentMethodResponse {
  stripe?: StripeSetupIntentResponse;
}

export interface Ads {
  adMarkers?: AdMarker[];
  clips?: AdClip[];
  insertionDuration?: number;
  insertionMaxCount?: number;
  stitcher: AdStitcher;
  stitcherSession?: string;
  tenantId?: string;
}

export interface Analytics {
  baseUrl?: string;
  bucket?: number;
  percentage?: number;
  postInterval?: number;
  tag?: string;
}

/** Analytics reporting configuration */
export interface AnalyticsConfig {
  /** If stated this is the base URL for analytics events, if not stated the base URL for Exposure API is to be used */
  analyticsBaseUrl?: string;
  /**
   * Probability in percentage that the player shall send analytics events
   * @min 0
   * @max 100
   */
  analyticsPercentage: number;
}

export interface AnonymousSessionResponse {
  /** The ISO 8601 time when the session expires. */
  expirationDateTime: string;
  /** The (bearer) session token to use in subsequent requests. */
  sessionToken: string;
}

/** Apple app store configuration */
export interface AppStoreConfig {
  /** Apple App Store enabled */
  enabled: boolean;
}

export interface Asset {
  assetFeatures?: SystemTag[];
  assetId: string;
  audioTracks: string[];
  changed: string;
  channelFeatures?: ("VIRTUAL" | "VC_CURATED" | "VC_PERSONALIZED" | "VC_SCHEDULED" | "EPG")[];
  collections: CollectionReference[];
  created: string;
  cuePoints: MarkerPoint[];
  customData: JsonNode;
  defaultAudioTrack?: string;
  duration: number;
  episode?: string;
  episodeSortOrderAscending?: boolean;
  event?: Event;
  expires?: string;
  externalReferences: ExternalReference[];
  firstRunDate?: string;
  linkedEntities: LinkedEntity[];
  live: boolean;
  localized: LocalizedData[];
  markerPoints: MarkerPoint[];
  markers: Marker[];
  materialType?: AssetMaterialType;
  medias?: Media[];
  originalTitle?: string;
  overlayWidgets?: OverlayWidget[];
  parentalRatings: ParentalRating[];
  participants: Person[];
  popularityScores?: Record<string, string>;
  productionCountries: string[];
  productionYear?: number;
  program?: Program;
  programs?: Program[];
  publications: Publication[];
  rating?: number;
  releaseDate?: string;
  runtime?: number;
  season?: string;
  seasonId?: string;
  seasons?: Season[];
  seoData?: LocalizedSeoData[];
  slugs: string[];
  spokenLanguages: string[];
  studio?: string;
  subtitleTracks?: SubtitleTrack[];
  subtitles: string[];
  tags: Tag[];
  trackSizes?: TrackSizes;
  tvShow?: TvShowInfo;
  tvShowId?: string;
  type: AssetType;
}

export type AssetAction = Action & {
  assetId?: string;
  slugs?: string[];
};

export interface AssetDownload {
  assetId?: string;
  changed?: string;
  downloadCount?: number;
  downloads?: Download[];
}

export interface AssetList {
  items: Asset[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export interface AssetListItemResponse {
  asset: Asset;
  assetId: string;
  lastUpdated?: string;
  metadata?: Record<string, string>;
  order?: number;
}

export const AssetMaterialType = {
  LOW_LATENCY_CHANNEL: "LOW_LATENCY_CHANNEL"
} as const;
export type AssetMaterialType = (typeof AssetMaterialType)[keyof typeof AssetMaterialType];

export type AssetQueryUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

export interface AssetResponse {
  adminDisplayName?: string;
  assetId?: string;
  audioTracks?: string[];
  changed?: string;
  channelFeatures?: ("VIRTUAL" | "VC_CURATED" | "VC_PERSONALIZED" | "VC_SCHEDULED" | "EPG")[];
  collections?: CollectionReferenceResponse[];
  created?: string;
  customData?: JsonNode;
  defaultAudioTrack?: string;
  duration?: string;
  episode?: string;
  episodeSortOrderAscending?: boolean;
  event?: EventDataResponse;
  expires?: string;
  externalReferences?: ExternalReferenceResponse[];
  firstRunDate?: string;
  geoCountries?: string[];
  ingestFlow?: string;
  isLive?: boolean;
  linkedEntities?: LinkedEntityResponse[];
  localizedData?: LocalizedDataResponse[];
  markers?: Marker[];
  materialType?: AssetMaterialType;
  materials?: MaterialResponse[];
  medias?: MediaResponse[];
  mrrCluster?: string;
  originalTitle?: string;
  originalTitleLanguage?: string;
  overlayWidgetLayoutId?: string;
  parentalRatings?: ParentalRatingResponse[];
  participants?: PersonResponse[];
  popularity?: Popularity;
  popularityScores?: Record<string, string>;
  productionCountries?: string[];
  productionYear?: number;
  programs?: ProgramListEntryResponse[];
  publicCustomData?: JsonNode;
  publications?: PublicationResponse[];
  rating?: number;
  releaseDate?: string;
  runtime?: number;
  season?: string;
  seasonId?: string;
  slugs?: string[];
  spokenLanguages?: string[];
  studio?: string;
  subtitles?: string[];
  systemTags?: TagResponse[];
  tags?: TagResponse[];
  trackSizes?: TrackSizes;
  tvShowId?: string;
  type?: AssetType;
}

export interface AssetRights {
  activation?: string;
  airplayBlocked?: boolean;
  amcDebugLogEnabled?: boolean;
  analyticsEnabled?: boolean;
  downloadBlocked?: boolean;
  downloadMaxSecondsAfterDownload?: number;
  downloadMaxSecondsAfterPlay?: number;
  expiration?: string;
  ffEnabled?: boolean;
  fourGBlocked?: boolean;
  hdmiblocked?: boolean;
  jailbrokenBlocked?: boolean;
  locationEnabled?: boolean;
  maxAds?: number;
  maxBitrate?: number;
  maxDownloadCount?: number;
  maxFileSize?: number;
  maxPlayPosition?: number;
  maxResHeight?: number;
  maxResWidth?: number;
  minBitrate?: number;
  minPlayPosition?: number;
  playCount?: number;
  rwEnabled?: boolean;
  sessionShiftEnabled?: boolean;
  streamingBlocked?: boolean;
  threeGBlocked?: boolean;
  wifiBlocked?: boolean;
}

export const AssetType = {
  AD: "AD",
  CLIP: "CLIP",
  COLLECTION: "COLLECTION",
  EPISODE: "EPISODE",
  EVENT: "EVENT",
  LIVE_EVENT: "LIVE_EVENT",
  MOVIE: "MOVIE",
  OTHER: "OTHER",
  PODCAST: "PODCAST",
  PODCAST_EPISODE: "PODCAST_EPISODE",
  TV_CHANNEL: "TV_CHANNEL",
  TV_SHOW: "TV_SHOW"
} as const;
export type AssetType = (typeof AssetType)[keyof typeof AssetType];

export interface AudioTrackInfo {
  language?: string;
  trackInfoList?: TrackInfo[];
}

export type AutocompleteItem = Record<"assetId" | "text", string>;

export type AutocompleteItem2 = Record<"hitFieldValue" | "hitText", string>;

export interface AvailabilityKeys {
  availabilityKeys?: string[];
  currentAvailabilityKeys?: string[];
  entitleExposure?: boolean;
  expiryDate?: string;
  futureAvailabilityKeys?: string[];
}

export type Bookmarks = Record<"lastViewedOffset" | "liveTime", number>;

export type CDN = Record<"host" | "profile" | "provider", string>;

/** Summary of card details */
export interface CardSummary {
  /** Last of digits of card number */
  last4: string;
  /** Type of card, e.g visa */
  brand: string;
  /** Expiry month e.g. "10" */
  expiryMonth: string;
  /** Expiry month e.g. "2022" */
  expiryYear: string;
  /** Origin of the card E.g. Google Pay, Apple Pay. If empty, consider the origin to be the payment provider */
  origin?: string;
}

export interface ChangePasswordResponse {
  loginResponse: LoginResponse;
}

export interface ChannelAsset {
  asset: Asset;
  endTime: string;
  programId?: string;
  startTime: string;
}

export interface ChannelEPGResponse {
  channelId: string;
  programs: ProgramResponse[];
  totalHitsAllChannels: number;
}

export type ChannelEpgUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

export interface ChannelStatus {
  active?: boolean;
  assets?: ChannelAsset[];
  channel?: Asset;
}

export interface CollectionReference {
  collectionId?: string;
}

export interface CollectionReferenceResponse {
  collectionId?: string;
  sortOrder?: number;
}

export type Component = ComponentBase & {
  actions?: Record<string, AssetAction | ComponentAction | ExternalUrlAction | SimpleAction>;
  appSubType?: string;
  appType?: string;
  changed?: string;
  components?: Components;
  content?: PresentationFromAssetContent;
  contentPreferencesUrl?: TagFeedUrl;
  contentUrl?:
    | AssetQueryUrl
    | ChannelEpgUrl
    | ContinueWatchingUrl
    | CustomAssetQueryUrl
    | EpgUrl
    | FavouritesUrl
    | LiveEventsUrl
    | RecentlyWatchedUrl
    | RecommendedUrl
    | SingleAssetUrl
    | TagTypeUrl
    | TvodUrl;
  created?: string;
  customParameters?: Record<string, string>;
  id?: string;
  inlineComponents?: Record<string, Component>;
  name?: string;
  otherPresentations?: Record<string, Presentation>;
  parameters?: Record<string, string>;
  presentation?: Presentation;
};

export type ComponentAction = Action & {
  componentId?: string;
  url?: string;
};

export interface ComponentBase {
  type: string;
}

export interface ComponentFilters {
  countryCode?: string;
  filters?: Result[];
  locationKnown?: boolean;
}

export type ComponentReference = ComponentBase & {
  appSubType?: string;
  appType?: string;
  hasAuthorizedContent?: boolean;
  images?: Image[];
  name?: string;
  parameters?: Record<string, string>;
  referenceId?: string;
  referenceUrl?: string;
};

export type Components = Record<string, (Component | ComponentReference)[]>;

export interface Config {
  businessUnit?: string;
  changed?: string;
  components?: Record<string, (Component | ComponentReference)[]>;
  created?: string;
  customParameters?: Record<string, string>;
  customer?: string;
  id?: string;
  inlineComponents?: Record<string, Component>;
  name?: string;
  parameters?: Record<string, string>;
  presentation?: Presentation;
  systemConfig?: SystemConfig;
  theme?: Record<string, string>;
}

export interface ConfigFile {
  businessUnit?: string;
  config?: JsonNode;
  customer?: string;
  fileName?: string;
  systemConfig?: SystemConfig;
  version?: number;
}

export interface ConfirmAccountResponse {
  loginResponse?: LoginResponse;
}

/** Consent management */
export interface ConsentManagement {
  /** Didomi consent management */
  didomi: Didomi;
}

export interface Content {
  type: string;
}

export interface ContentPreferencesUrl {
  type: string;
}

export interface ContentUrl {
  type: string;
}

export interface ContinueUph2Assets {
  items?: ContinueWatchingAsset[];
}

export interface ContinueWatchingAsset {
  assetId?: string;
  audioTracks?: string[];
  changed?: string;
  collections?: CollectionReference[];
  created?: string;
  customData?: JsonNode;
  defaultAudioTrack?: string;
  duration?: number;
  episode?: string;
  expires?: string;
  externalReferences?: ExternalReferenceResponse[];
  geoCountries?: string[];
  linkedEntities?: LinkedEntityResponse[];
  live?: boolean;
  localized?: LocalizedDataResponse[];
  markers?: Marker[];
  materialType?: AssetMaterialType;
  medias?: MediaResponse[];
  originalTitle?: string;
  originalTitleLanguage?: string;
  parentalRatings?: ParentalRatingResponse[];
  participants?: PersonResponse[];
  popularityScores?: Record<string, string>;
  productionCountries?: string[];
  productionYear?: number;
  publications?: Publication[];
  rating?: number;
  releaseDate?: string;
  runtime?: number;
  season?: string;
  seasonId?: string;
  seasons?: SeasonResponse[];
  slugs?: string[];
  spokenLanguages?: string[];
  subtitles?: string[];
  tags?: TagResponse[];
  trackSizes?: TrackSizes;
  tvShowId?: string;
  type?: AssetType;
  userData?: UserAssetData;
}

export type ContinueWatchingUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

export interface ContractRestrictions {
  airplayEnabled?: boolean;
  ffEnabled?: boolean;
  maxBitrate?: number;
  maxResHeight?: number;
  minBitrate?: number;
  rwEnabled?: boolean;
  timeshiftEnabled?: boolean;
}

export interface CreateSessionResponse {
  /** The time when the session expires. */
  expirationDateTime?: string;
  /** The session (bearer) token to use for subsequent requests. */
  sessionToken?: string;
}

export type CustomAssetQueryUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

export interface DRMLicense {
  "com.apple.fps"?: DrmUrls;
  "com.microsoft.playready"?: DrmUrls;
  "com.widevine.alpha"?: DrmUrls;
  licenseActivation?: number;
  licenseExpiration?: number;
  licenseExpirationReason?: LicenseExpirationReason;
}

export interface Device {
  /**
   * Not used any longer
   * @deprecated
   */
  deviceModelId?: string;
  /** The type of device */
  type: DeviceType;
}

export interface DeviceRegistration {
  /** A unique ID of this device, used for logins from the device. */
  deviceId: string;
  /** The user's name of the device */
  name: string;
  /** The type of device */
  type: DeviceType;
}

export interface DeviceResponseV2 {
  /** If true to many devices are logged in and this session can not be used to play. Normally this will not happen. */
  aboveDeviceLimit?: boolean;
  /** True if this device is teh device used to list this device.. */
  currentDevice?: boolean;
  /** When the device was first created. */
  deviceCreated?: string;
  /** Device id. */
  deviceId?: string;
  /** Device name. */
  deviceName?: string;
  /** Device types. */
  deviceType?: string;
  /** When the session was created. */
  sessionCreated?: string;
  /** When the session expires. */
  sessionExpires?: string;
}

export interface DeviceRights {
  manufacturer?: string;
  model?: string;
  os?: string;
  osVersion?: string;
  rights?: AssetRights;
}

export const DeviceType = {
  APPLE_TV: "APPLE_TV",
  CONSOLE: "CONSOLE",
  MOBILE: "MOBILE",
  SMART_TV: "SMART_TV",
  STB: "STB",
  TABLET: "TABLET",
  WEB: "WEB"
} as const;
export type DeviceType = (typeof DeviceType)[keyof typeof DeviceType];

export interface DevicesResponseV2 {
  devices?: DeviceResponseV2[];
}

/** Didomi consent management */
export interface Didomi {
  /** API Key */
  apiKey?: string;
  /** App Notice Id */
  appNoticeId?: string;
  /** Notice Id */
  noticeId?: string;
  /** TV Notice Id */
  tvNoticeId?: string;
}

export type Download = Record<
  "clientIp" | "deviceId" | "deviceModelId" | "deviceType" | "time" | "type" | "userId",
  string
>;

export interface DownloadInfo {
  accountId?: string;
  assetId?: string;
  audios?: Track[];
  downloadCount?: number;
  durationInMs?: number;
  maxDownloadCount?: number;
  productId?: string;
  publicationEnd?: string;
  publicationId?: string;
  requestId?: string;
  subtitles?: Track[];
  videos?: VideoTrack[];
}

export type DownloadVerified = Record<
  "accountId" | "assetId" | "productId" | "publicationEnd" | "publicationId" | "requestId",
  string
>;

export interface DrmUrls {
  certificateUrl?: string;
  licenseServerUrl: string;
}

export interface EntitleResponse {
  accountId?: string;
  entitleExposure?: boolean;
  entitlementEnd?: string;
  entitlementId?: string;
  entitlementStart?: string;
  formats?: MediaFormatEntitle[];
  productId?: string;
  publicationEnd?: string;
  publicationId?: string;
  publicationStart?: string;
  requestId?: string;
  status?: string;
  streamInfo: StreamInfo;
  time?: string;
}

export type EpgInfo = Record<"enabled" | "entitlementCheck", boolean>;

export type EpgUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

export interface Event {
  asset: Asset;
  assetId: string;
  endTime: string;
  startTime: string;
}

export type EventDataResponse = Record<
  "channelId" | "endTime" | "id" | "publicEndTime" | "publicStartTime" | "startTime",
  string
>;

export interface EventList {
  items?: Event[];
  pageNumber?: number;
  pageSize?: number;
  totalCount?: number;
}

/** External payments configuration */
export interface ExternalPaymentConfig {
  /** External payments enabled */
  enabled: boolean;
  /** External payments url */
  externalPaymentUrl?: string;
}

export type ExternalReference = Record<"locator" | "type" | "value", string>;

export type ExternalReferenceResponse = Record<"locator" | "type" | "value", string>;

export type ExternalUrlAction = Action & {
  localizedUrl?: Record<string, string>;
  url?: string;
};

export type FavouritesUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

/** Firebase App configurations */
export interface FirebaseAppConfigs {
  /** Android app config */
  android: object;
  /** IOS app config */
  ios: object;
  /** List of available subscription topics */
  topics: Topic[];
  /** VAPID key used for web app */
  vapidKey: string;
  /** Web app config */
  web: object;
}

/** Frontend features configuration */
export interface FrontendFeatures {
  /** Custom account page url */
  customAccountPageUrl?: string;
  /** Custom landing page url */
  customLandingPageUrl?: string;
  /** Custom password reset page url */
  customPasswordResetPageUrl?: string;
  /** Custom signup page url */
  customSignupPageUrl?: string;
  /** Search languages */
  searchLocales: string[];
  /** Should device always login anonymous. */
  shouldAlwaysUseAnonymousLogin: boolean;
}

/** Google play configuration */
export interface GooglePlayConfig {
  /** Google play enabled */
  enabled: boolean;
}

export type HtmlDocument = Record<"body" | "url", string>;

export interface Iframe {
  height?: number;
  url?: string;
}

export interface Image {
  height: number;
  orientation: ImageOrientation;
  priority?: number;
  type?: string;
  url: string;
  width: number;
}

export const ImageOrientation = {
  LANDSCAPE: "LANDSCAPE",
  PORTRAIT: "PORTRAIT",
  SQUARE: "SQUARE",
  UNKNOWN: "UNKNOWN"
} as const;
export type ImageOrientation = (typeof ImageOrientation)[keyof typeof ImageOrientation];

export interface ImageResponse {
  caption?: string;
  copyright?: string;
  height?: number;
  orientation?: ImageOrientation;
  priority?: number;
  type?: string;
  url?: string;
  width?: number;
}

export interface InitializePaymentResponse {
  /** If Stripe is enabled. */
  stripe?: StripePaymentMethodsAndPrice;
}

export interface JsonAccount {
  accountId?: string;
  businessUnit?: string;
  created?: string;
  customer?: string;
  expires?: string;
  labels?: Record<string, string>;
  modified?: string;
  monitoringAccount?: boolean;
  ownerUserId?: string;
  preferredPaymentMethod?: string;
  referenceId?: string;
  stripeCustomerId?: string;
  stripeLiveMode?: boolean;
  stripePaymentMethods?: StripePaymentMethod[];
  userIds?: string[];
}

export type JsonNode = object;

export interface LabelFilter {
  labelFilterId: string;
}

export interface LastViewedOffset {
  assetId?: string;
  channelId?: string;
  lastViewedOffset?: number;
  lastViewedTime?: number;
  liveTime?: number;
  programId?: string;
  userId?: string;
}

export interface LastViewedOffsetList {
  count?: number;
  items?: LastViewedOffset[];
  pageNumber?: number;
  pageSize?: number;
}

export const LicenseExpirationReason = {
  ANONYMOUS_IP_BLOCKED: "ANONYMOUS_IP_BLOCKED",
  CONCURRENT_STREAMS_LIMIT_REACHED: "CONCURRENT_STREAMS_LIMIT_REACHED",
  DEVICE_BLOCKED: "DEVICE_BLOCKED",
  DOWNLOAD_BLOCKED: "DOWNLOAD_BLOCKED",
  EPG_PLAY_MAX_HOURS: "EPG_PLAY_MAX_HOURS",
  GAP_IN_EPG: "GAP_IN_EPG",
  GEO_BLOCKED: "GEO_BLOCKED",
  LICENSE_EXPIRED: "LICENSE_EXPIRED",
  NOT_AVAILABLE_IN_FORMAT: "NOT_AVAILABLE_IN_FORMAT",
  NOT_ENABLED: "NOT_ENABLED",
  NOT_ENTITLED: "NOT_ENTITLED",
  SUCCESS: "SUCCESS",
  TOO_MANY_DEVICES: "TOO_MANY_DEVICES",
  VPN_BLOCKED: "VPN_BLOCKED"
} as const;
export type LicenseExpirationReason = (typeof LicenseExpirationReason)[keyof typeof LicenseExpirationReason];

export type LinkedEntity = Record<"entityId" | "entityType" | "linkType", string>;

export type LinkedEntityResponse = Record<"entityId" | "entityType" | "linkType", string>;

export type LiveEventsUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

/** Locale configuration */
export interface LocaleConfig {
  /** Currencies */
  currencies?: string[];
  /** Default display language */
  defaultLocale: string;
  /** Supported display languages */
  displayLocales: string[];
}

export interface LocalizedData {
  article?: string;
  description?: string;
  extendedDescription?: string;
  images?: Image[];
  locale: string;
  longDescription?: string;
  shortDescription?: string;
  sortingTitle?: string;
  tinyDescription?: string;
  title?: string;
}

export interface LocalizedDataResponse {
  description?: string;
  extendedDescription?: string;
  images?: ImageResponse[];
  locale?: string;
  longDescription?: string;
  longFormDescription?: string;
  seoDescription?: string;
  seoTitle?: string;
  shortDescription?: string;
  sortingTitle?: string;
  tinyDescription?: string;
  title?: string;
}

export type LocalizedPersonData = Record<"bio" | "locale", string>;

export type LocalizedPersonDataResponse = Record<"bio" | "locale", string>;

export type LocalizedSeoData = Record<"locale" | "seoDescription" | "seoTitle", string>;

export interface LocalizedTag {
  article?: string;
  description?: string;
  images?: Image[];
  locale: string;
  title?: string;
}

export type LocalizedTopicMetadata = Record<"description" | "title", string>;

export interface Location {
  /** ISO country code or null if unknown. */
  countryCode?: string;
  /** true if location is known. */
  locationKnown: boolean;
}

export interface LoginResponse {
  /** The user's accountId. */
  accountId?: string;
  /**
   * Historical artifact. Always "OK"
   * @deprecated
   */
  accountStatus?: string;
  /**
   * use data in userProfile.
   * @deprecated
   */
  child?: boolean;
  /** The token of the underlying CRM to use if talking directly to the CRM. */
  crmToken?: string;
  /** When the session expires. */
  expirationDateTime: string;
  informationCollectionConsentGiven?: string;
  informationCollectionConsentRequiredDate?: string;
  /** If true to many devices are logged in and this session can not be used to play. Normally this will not happen. */
  isOverDeviceLimit?: boolean;
  /**
   * use data in userProfile.
   * @deprecated
   */
  language?: string;
  /**
   * use data in userProfile.
   * @deprecated
   */
  profileType?: string;
  /** The (bearer) session token to use in subsequent requests. */
  sessionToken: string;
  /** The user's userId. */
  userId?: string;
  userProfile?: UserProfile;
}

export interface Marker {
  adMarkerType?: string;
  offset?: number;
  url?: string;
}

export interface MarkerPoint {
  endOffset?: number;
  localized?: SimpleLocalizedData[];
  offset: number;
  thumbnail?: string;
  type?: MarkerType;
}

export interface MarkerPointResponse {
  localized?: SimpleLocalizedResponse[];
  markerTime?: string;
  markerTimeEnd?: string;
  thumbnail?: boolean;
  type?: string;
}

export const MarkerType = {
  CHAPTER: "CHAPTER",
  CREDITS: "CREDITS",
  INTRO: "INTRO",
  POINT: "POINT"
} as const;
export type MarkerType = (typeof MarkerType)[keyof typeof MarkerType];

export interface MaterialResponse {
  adMarkers?: Marker[];
  audioTracks?: string[];
  defaultAudioTrack?: string;
  duration?: string;
  markerPoints?: MarkerPointResponse[];
  materialType?: AssetMaterialType;
  profile?: string[];
  subtitleTracks?: MaterialSubtitleTrackResponse[];
  subtitles?: string[];
  validFrom?: string;
  validTo?: string;
  version?: number;
}

export type MaterialSubtitleTrackResponse = Record<"displayName" | "language" | "type", string>;

export interface Media {
  drm?: string;
  durationMillis?: number;
  format?: string;
  height?: number;
  mediaId?: string;
  name?: string;
  programId?: string;
  status?: string;
  width?: number;
}

export interface MediaFormat {
  drm?: DRMLicense;
  format: MediaFormatType;
  liveDelay?: number;
  mediaLocator?: string;
  orgMediaLocator?: string;
  vastUrl?: string;
}

export interface MediaFormatEntitle {
  format?: MediaFormatType;
}

export const MediaFormatType = {
  AAC: "AAC",
  DASH: "DASH",
  HLS: "HLS",
  MP3: "MP3",
  MP4: "MP4",
  SMOOTHSTREAMING: "SMOOTHSTREAMING",
  SYNDICATED: "SYNDICATED"
} as const;
export type MediaFormatType = (typeof MediaFormatType)[keyof typeof MediaFormatType];

export interface MediaResponse {
  bitrates?: number[];
  changed?: string;
  created?: string;
  drm?: string;
  duration?: number;
  format?: string;
  height?: number;
  ingestionProfile?: string;
  keyId?: string;
  mediaId?: string;
  mediaLocator?: string;
  name?: string;
  programId?: string;
  status?: string;
  subtitles?: SubtitleResponse[];
  width?: number;
}

export interface MultiSearchResponse {
  assetHits?: SearchList;
  participantHits?: ParticipantSearchList;
  tagHits?: TagSearchList;
}

export interface OverlayWidget {
  url?: string;
}

export type ParentalRating = Record<"country" | "rating" | "scheme", string>;

export type ParentalRatingResponse = Record<"country" | "rating" | "scheme", string>;

export interface ParentalRatingsFilter {
  ratings?: Record<string, string[]>;
}

export interface Participant {
  dateOfBirth?: string;
  dateOfDeath?: string;
  localized?: LocalizedPersonData[];
  name?: string;
  participantId?: string;
}

export interface ParticipantSearchList {
  items?: ParticipantsSearch[];
  pageNumber?: number;
  pageSize?: number;
  suggestion?: string;
  totalCount?: number;
}

export interface ParticipantsSearch {
  participant?: Participant;
}

/** Password policy */
export interface PasswordPolicy {
  /** Minimum number character groups used, eg. alfa, ALFA, 0..9, separators */
  minimumGroups: number;
  /** Minimum number of characters in passwords */
  minimumLength: number;
}

/** Payments configuration */
export interface PaymentConfig {
  /** Apple app store configuration */
  appstore: AppStoreConfig;
  /** External payments configuration */
  external: ExternalPaymentConfig;
  /** Google play configuration */
  googleplay: GooglePlayConfig;
  /** Stripe configuration */
  stripe: StripeConfig;
  /** Vouchers configuration */
  vouchers: VouchersConfig;
}

export interface PaymentMethod {
  /** Summary of card details */
  cardSummary?: CardSummary;
  /** The id of the payment method */
  id: string;
  preferred: boolean;
}

export interface PaymentMethods {
  methods?: PaymentMethod[];
}

export const PaymentProvider = {
  APPSTORE: "appstore",
  DENY: "deny",
  EXTERNAL: "external",
  GOOGLEPLAY: "googleplay",
  STRIPE: "stripe"
} as const;
export type PaymentProvider = (typeof PaymentProvider)[keyof typeof PaymentProvider];

export interface Person {
  dateOfBirth?: string;
  dateOfDeath?: string;
  function?: string;
  localized?: LocalizedPersonData[];
  name?: string;
  personId?: string;
  role?: string;
}

export interface PersonResponse {
  dateOfBirth?: string;
  dateOfDeath?: string;
  function?: string;
  localizedPersonData?: LocalizedPersonDataResponse[];
  name?: string;
  personId?: string;
  role?: string;
}

export interface PinCodeResponse {
  /** List of application specified grants. */
  grants: string[];
  /** When was the pin last modified. */
  modified: string;
  /** the PIN's pincodeId. */
  pinId: string;
}

export interface PlayResponse {
  accountId?: string;
  ads?: Ads;
  analytics?: Analytics;
  assetId?: string;
  audioOnly?: boolean;
  bookmarks?: Bookmarks;
  cdn?: CDN;
  concurrentSessionsCount?: number;
  contractRestrictions?: ContractRestrictions;
  deviceId?: string;
  deviceType?: string;
  durationInMilliseconds?: number;
  durationInMs?: number;
  entitleExposure?: boolean;
  entitlementType?: "AVOD" | "FVOD" | "SVOD" | "TVOD";
  epg?: EpgInfo;
  formats?: MediaFormat[];
  materialId?: string;
  materialProfile?: string;
  materialVersion?: number;
  playSessionId?: string;
  playToken?: string;
  playTokenExpiration?: number;
  playTokenExpirationReason?: string;
  productId?: string;
  publicationId?: string;
  publishingType?: string;
  requestId?: string;
  sprites?: Sprites[];
  streamInfo?: StreamInfo;
  subtitles?: Subtitle[];
  userId?: string;
}

export type Popularity = Record<"month" | "week", number>;

export interface PreferencesListItem {
  id?: string;
  lastUpdated?: string;
  metadata?: Record<string, string>;
  order?: number;
}

export interface PreferencesListResponse {
  items?: PreferencesListItem[];
  query?: string;
}

export interface PreferencesResponse {
  message?: string;
}

export interface Presentation {
  fallback?: PresentationItem;
  localized?: Record<string, PresentationItem>;
}

export type PresentationFromAssetContent = Content & {
  errorMessage?: string;
  presentation?: Presentation;
};

export interface PresentationItem {
  backgroundColor?: string;
  body?: string;
  iframe?: Iframe;
  images?: Image[];
  seoDescription?: string;
  seoTitle?: string;
  subTitle?: string;
  title?: string;
  trailerAssetId?: string;
}

export interface Product {
  anonymousAllowed: boolean;
  blocked: boolean;
  businessUnit?: string;
  changed?: string;
  customer?: string;
  description?: string;
  entitlementRequired: boolean;
  hasAds?: boolean;
  id: string;
  name: string;
  priority?: number;
}

export interface ProductOfferingPurchase {
  /** Indicates that the user has started to watch the content. */
  activated?: boolean;
  apiStoreProductOffering?: StoreProductOffering;
  assetId?: string;
  businessUnitId?: string;
  customerId?: string;
  /** Start of entitlement. ISO 8601 Date and time. */
  from?: string;
  /** @deprecated */
  id?: string;
  /** Id of the purchased product offering. */
  productOfferingId?: string;
  /** Id of this purchase. */
  purchaseId?: string;
  /** If present, next time for renewal. ISO 8601 Date and time. */
  renewAt?: string;
  /** Time of purchase. ISO 8601 Date and time. */
  startedAt?: string;
  status?: ProductOfferingPurchaseStatus;
  transactionId?: string;
  /** End of entitlement. ISO 8601 Date and time. */
  until?: string;
}

export const ProductOfferingPurchaseStatus = {
  FULFILLED: "FULFILLED",
  PENDING: "PENDING",
  REJECTED: "REJECTED"
} as const;
export type ProductOfferingPurchaseStatus =
  (typeof ProductOfferingPurchaseStatus)[keyof typeof ProductOfferingPurchaseStatus];

export interface ProductOfferingPurchases {
  consumedProductOfferingDiscounts?: string[];
  purchases?: ProductOfferingPurchase[];
}

export interface ProductOfferingTransactions {
  transactions?: StoreTransaction[];
}

export interface ProductOfferingTransactionsProductOfferingPair {
  productOffering?: StoreProductOffering;
  transactions?: StoreTransaction;
}

export interface ProductOfferingTransactionsProductOfferingPairList {
  transactionsProductOfferingPairs?: ProductOfferingTransactionsProductOfferingPair[];
}

export interface Program {
  channelId?: string;
  endTime: string;
  programId?: string;
  startTime: string;
}

export interface ProgramListEntryResponse {
  catchupBlocked?: boolean;
  channelId?: string;
  endTime?: string;
  programId?: string;
  publicEndTime?: string;
  publicStartTime?: string;
  startTime?: string;
}

export interface ProgramResponse {
  asset: Asset;
  assetId: string;
  blackout?: boolean;
  catchup?: boolean;
  catchupBlocked?: boolean;
  changed?: string;
  channelId?: string;
  created?: string;
  endTime: string;
  programId: string;
  startTime: string;
  vodAvailable?: boolean;
}

export interface Publication {
  availabilityKeys?: string[];
  countries: string[];
  customData?: JsonNode;
  devices?: DeviceRights[];
  fromDate: string;
  products: string[];
  publicationDate: string;
  publicationId: string;
  rights?: AssetRights;
  services?: string[];
  toDate: string;
}

export interface PublicationResponse {
  contractId?: string;
  countries?: string[];
  customData?: JsonNode;
  devices?: Device[];
  fromDate?: string;
  products?: string[];
  publicationDate?: string;
  publicationId?: string;
  rights?: Rights;
  services?: string[];
  toDate?: string;
}

export interface PurchaseResponse {
  apiStripePurchaseResponse?: StripePurchaseResponse;
  purchase?: StorePurchase;
  /** @deprecated */
  purchaseId?: string;
}

/** @deprecated */
export type QueryParameter = Record<"name" | "value", string>;

export type RecentlyWatchedUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

export interface RecommendedAssets {
  items?: Asset[];
}

export type RecommendedUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

export interface RecommendedWatchNext {
  items: Asset[];
}

export type Result = Record<"type" | "value", string>;

export interface Rights {
  activation?: string;
  airplayBlocked?: boolean;
  amcDebugLogEnabled?: boolean;
  analyticsEnabled?: boolean;
  downloadBlocked?: boolean;
  expiration?: string;
  ffEnabled?: boolean;
  fourGBlocked?: boolean;
  fwEnabled?: boolean;
  hdmiblocked?: boolean;
  jailbrokenBlocked?: boolean;
  locationEnabled?: boolean;
  maxAds?: number;
  maxBitrate?: number;
  maxDownloadCount?: number;
  maxFileSize?: number;
  maxPlayPosition?: number;
  maxResHeight?: number;
  maxResWidth?: number;
  minBitrate?: number;
  minPlayPosition?: number;
  playCount?: number;
  rwEnabled?: boolean;
  sessionShiftEnabled?: boolean;
  streamingBlocked?: boolean;
  threeGBlocked?: boolean;
  wifiBlocked?: boolean;
}

export interface Search {
  asset: Asset;
  highlightedDescription?: string;
  highlightedTitle?: string;
}

export interface SearchList {
  items: Search[];
  pageNumber: number;
  pageSize: number;
  suggestion?: string;
  totalCount: number;
}

export interface Season {
  availableDate?: string;
  changed?: string;
  created?: string;
  customData?: JsonNode;
  endYear?: number;
  episodeCount?: number;
  episodes: Asset[];
  externalReferences?: ExternalReference[];
  linkedEntities?: LinkedEntity[];
  localized: LocalizedData[];
  publishedDate?: string;
  season: string;
  seasonId: string;
  startYear?: number;
  tags?: Tag[];
  tvShowId?: string;
}

export interface SeasonList {
  items?: Season[];
  pageNumber?: number;
  pageSize?: number;
  totalCount?: number;
}

export interface SeasonResponse {
  availableDate?: string;
  changed?: string;
  created?: string;
  customData?: JsonNode;
  endYear?: number;
  episodeCount?: number;
  episodes?: AssetResponse[];
  externalReferences?: ExternalReferenceResponse[];
  linkedEntities?: LinkedEntityResponse[];
  localizedData?: LocalizedDataResponse[];
  originalTitle?: string;
  originalTitleLanguage?: string;
  parentalRatings?: ParentalRatingResponse[];
  participants?: PersonResponse[];
  productionCountries?: string[];
  productionYear?: number;
  publishedDate?: string;
  season?: string;
  seasonId?: string;
  startYear?: number;
  studio?: string;
  tags?: TagResponse[];
  tvShowId?: string;
}

/** Sentry configuaration */
export interface SentryConfig {
  /** If Sentry is to be enabled */
  enabled: boolean;
  /** How much reporting to do. 0.0 - 1.0.  0.0 report nothing, 0.5 means report every second session etc. */
  sampleRate?: number;
}

export interface SessionResponse {
  /** The user's accountId. */
  accountId?: string;
  configReloadQueryParameter?: QueryParameter;
  /** The token of the underlying CRM to use if talking directly to the CRM. */
  crmToken?: string;
  /** If true to many devices are logged in and this session can not be used to play. Normally this will not happen. */
  overTheDeviceLimit?: boolean;
  /** The user's userId. */
  userId?: string;
  userProfile?: UserProfile;
}

export type SimpleAction = Action;

export interface SimpleLocalizedData {
  image?: Image;
  locale: string;
  title?: string;
}

export interface SimpleLocalizedResponse {
  image?: ImageResponse;
  locale?: string;
  title?: string;
}

export type SingleAssetUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

export interface Sprites {
  offsetInMs?: number;
  vtt?: string;
  width: number;
}

export interface StoreDiscount {
  discountedOfferingPrice?: StoreProductOfferingPrice;
}

export type StoreLocalizedMetaData = Record<"description" | "locale" | "name", string>;

export type StoreLocalizedName = Record<"locale" | "name", string>;

export type StoreLocalizedTitle = Record<"locale" | "title", string>;

export interface StorePrice {
  amount?: string;
  currency?: string;
  priceClassId?: string;
  recurrence?: "NO_RECURRENCE" | "P1M" | "P1Y" | "P3M" | "P6M" | "P7D";
  rentalLength?: "NO_RENTAL" | "PT120H" | "PT144H" | "PT168H" | "PT24H" | "PT48H" | "PT720H" | "PT72H" | "PT96H";
  vatIncluded?: boolean;
  vatPercentage?: number;
}

/** Price after any discount */
export interface StorePriceTag {
  /** The amount in minor units of the currency. e.g. 10 EUR is 1000, while 100 JPY is 100 */
  amount: number;
  /** ISO 4217 Currency Code */
  currency: string;
  /** Number of fraction digits of the currency as specified by ISO 4217, e.g. for EUR 2 and for JPY 0 */
  fractionDigits: number;
}

export interface StoreProduct {
  externalId?: string;
  id?: string;
  name?: string;
  preRequisiteProducts?: StoreProduct[];
  prices?: StorePrice[];
  productType?: "AVOD" | "FVOD" | "PACKAGE" | "SVOD" | "TVOD";
  startTime?: string;
  subProducts?: StoreProduct[];
}

export interface StoreProductOffering {
  accountProductId?: string;
  /** The one-time discounted price on a product offering */
  discount?: StoreProductOfferingDiscount;
  /** If present the time at which entitlement starts, if not present entitlement starts ar time of purchase, ISO 8601 Date and time */
  entitlementStart?: string | null;
  /**
   * Product Offering Id
   * @deprecated
   */
  id: string;
  localizedMetadata: StoreLocalizedMetaData[];
  offeringPrice: StoreProductOfferingPrice;
  /** If present, this is a list of stripe payment method types that are allowed with this offering */
  paymentMethodTypes: string[];
  productIds: string[];
  /** Product Offering Id */
  productOfferingId: string;
  /** Type of offering: purchase, rental, event, subscription */
  productOfferingType: string;
  /** if true, purchase of single asset. The assetId must be provided in the purchase */
  productRequiresSelectAsset: boolean | null;
  /** Recurrence interval, ISO 8601 Duration */
  recurrence?: string | null;
  /** Rental expiry window, ISO 8601 Duration */
  rentalExpiryWindow?: string | null;
  /** Rental length, ISO 8601 Duration */
  rentalLength?: string;
  /** Sorting key to order the offerings by */
  sortKey?: string;
}

/** The one-time discounted price on a product offering */
export type StoreProductOfferingDiscount = {
  freePeriod?: {
    chronology?: {
      calendarType?: string;
      id?: string;
      isoBased?: boolean;
    };
    days?: number;
    months?: number;
    negative?: boolean;
    units?: {
      dateBased?: boolean;
      duration?: {
        nano?: number;
        negative?: boolean;
        positive?: boolean;
        seconds?: number;
        zero?: boolean;
      };
      durationEstimated?: boolean;
      timeBased?: boolean;
    }[];
    years?: number;
    zero?: boolean;
  };
  numberOfRecurringPayments?: number;
  /** Price after any discount */
  price?: StorePriceTag;
} | null;

export interface StoreProductOfferingPrice {
  /**
   * In which country this offering is valid, if not present anywhere
   * Format: ISO 3166-1 alpha-2, if not present the offering is available globally
   */
  countryCode?: string;
  /** Price after any discount */
  price: StorePriceTag;
  vat?: StoreVat;
}

export interface StoreProductOfferings {
  productOfferings?: StoreProductOffering[];
}

export interface StorePromotion {
  businessUnit?: string;
  customer?: string;
  discount?: StoreDiscount;
  fullDiscountVoucher?: boolean;
  id?: string;
  productOfferingIds?: string[];
}

export interface StorePromotionProductOfferings {
  productOfferings?: StoreProductOffering[];
  promotion?: StorePromotion;
}

export interface StorePurchase {
  amount?: string;
  assetId?: string;
  currency?: string;
  from?: string;
  id?: string;
  product?: StoreProduct;
  purchaseStatus?: ProductOfferingPurchaseStatus;
  renewAt?: string;
  status?: ProductOfferingPurchaseStatus;
  transactionId?: string;
  transactions?: StoreTransaction[];
  until?: string;
}

export interface StorePurchaseTransaction {
  assetId?: string;
  created?: string;
  from: string;
  localizedAsset?: StoreLocalizedTitle[];
  localizedProductOffering?: StoreLocalizedName[];
  productIds?: string[];
  productOfferingId: string;
  /** Type of offering: purchase, rental, event, subscription */
  productOfferingType?: string;
  renewAt?: string;
  status: string;
  transactions: StoreTransaction[];
  until: string;
  voucherCode?: string;
}

export interface StoreTransaction {
  amount?: string;
  attributes?: Record<string, string>;
  completedTime: string;
  /** @deprecated */
  id?: string;
  paymentProviderRequestId?: string;
  paymentProviderTransactionId?: string;
  paymentProviderType?: string;
  productOfferingId?: string;
  receiptUrl?: string;
  refunded: boolean;
  status: "accepted" | "cancelled" | "pending" | "rejected";
  transactionId: string;
}

export interface StoreVat {
  /** If the VAT is part of the product offering price */
  included?: boolean;
  /** The percentage of the price to paid a VAT, e.g. 12.5 */
  percentage?: number;
}

export interface StreamInfo {
  channelId?: string;
  end?: number;
  endPadding?: number;
  event?: boolean;
  live?: boolean;
  maxResolution?: string;
  nextAssetId?: string;
  nextProgramId?: string;
  persistent?: boolean;
  programId?: string;
  ssai?: boolean;
  start?: number;
  startPadding?: number;
  static?: boolean;
  timeShift?: boolean;
}

export interface StripeCard {
  last4?: string;
  brand?: string;
  country?: string;
  exp_month?: number;
  exp_year?: number;
}

/** Stripe configuration */
export interface StripeConfig {
  /** Stripe enabled */
  enabled: boolean;
  /** Stripe public key */
  stripePublicKey?: string;
}

export interface StripePaymentMethod {
  card?: StripeCard;
  id?: string;
}

/** One entry for each relevant payment method type, such as "card", "ideal" */
export interface StripePaymentMethodTypeAndPrice {
  /** Name e.g card or ideal */
  name?: string;
  /** Price after any discount */
  price?: StorePriceTag;
  /** Will payment be recurring */
  recurring?: boolean;
}

/** If Stripe is enabled. */
export interface StripePaymentMethodsAndPrice {
  /** One entry for each relevant payment method type, such as "card", "ideal" */
  methodTypes: StripePaymentMethodTypeAndPrice[];
  /** One entry for each relevant wallet, such as "apple", "google" */
  wallets?: StripeWalletAndPrice[];
}

/**
 * Purchase using Stripe as payment platform.
 * Creates an stripe intent.
 * Requires that Stripe is configured for the customer/business unit.
 */
export interface StripePurchaseRequest {
  paymentMethodId?: string;
}

export interface StripePurchaseResponse {
  /** If setupCard == false the clientSecret is paymentIntent clientSecret. If setupCard == true the clientSecret is setupIntent clientSecret */
  clientSecret?: string;
  /** "card" [, "ideal"]   Are the currently supported types */
  paymentMethodTypes?: string[];
  /** If true setup card else payment */
  setupCard?: boolean;
  status?: string;
  stripeCustomerId?: string;
}

export type StripeSetupIntentResponse = Record<"clientSecret" | "id", string>;

/** One entry for each relevant wallet, such as "apple", "google" */
export interface StripeWalletAndPrice {
  /** Name of wallet e.g apple or google */
  name: string;
  /** Price after any discount */
  price: StorePriceTag;
  /** Will payment be recurring */
  recurring: boolean;
}

export type Subtitle = Record<"label" | "language" | "url", string>;

export type SubtitleResponse = Record<"language" | "location" | "name", string>;

export type SubtitleTrack = Record<"displayName" | "language" | "type", string>;

export interface SubtitleTrackInfo {
  fileSize?: number;
  language?: string;
}

export interface SystemConfig {
  /** User access configuration */
  access: AccessConfig;
  /** Analytics reporting configuration */
  analytics: AnalyticsConfig;
  /** Firebase App configurations */
  firebaseApps?: FirebaseAppConfigs;
  /** Frontend features configuration */
  frontendFeatures: FrontendFeatures;
  /** Locale configuration */
  localization: LocaleConfig;
  /** Payments configuration */
  payments: PaymentConfig;
  /** Url to player */
  playerUrl?: string;
  /** True if production environment */
  production: boolean;
  /** Sentry configuaration */
  sentry: SentryConfig;
}

export interface SystemTag {
  id?: string;
  images?: SystemTagImage[];
}

export interface SystemTagImage {
  selectors?: string[];
  url?: string;
}

export interface Tag {
  changed?: string;
  created?: string;
  tagValues: TagValues[];
  type: string;
}

export type TagFeedUrl = ContentPreferencesUrl & {
  authorized?: boolean;
  fields?: string[];
  url?: string;
};

export interface TagList {
  items: TagType[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export interface TagResponse {
  changed?: string;
  created?: string;
  tagValues?: TagValuesResponse[];
  type?: string;
}

export interface TagSearch {
  highlightedTitle?: string;
  tag?: TagType;
}

export interface TagSearchList {
  items?: TagSearch[];
  pageNumber?: number;
  pageSize?: number;
  suggestion?: string;
  totalCount?: number;
}

export interface TagType {
  children?: TagType[];
  localized: LocalizedTag[];
  parents?: string[];
  scheme: string;
  tagId: string;
}

export type TagTypeUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

export interface TagValues {
  tagId: string;
}

export interface TagValuesResponse {
  tagId?: string;
}

export interface TimeResponse {
  /** Time as UTC ISO 8601 */
  iso8601: string;
  /** Time as Epoch milliseconds */
  epochMillis: number;
}

/** List of available subscription topics */
export interface Topic {
  localizedMetadata?: Record<string, LocalizedTopicMetadata>;
  topic?: string;
}

export interface Track {
  bitrate?: number;
  dashChannels?: string;
  dashLang?: string;
  dashRole?: string;
  fileSize?: number;
  hlsName?: string;
  language?: string;
  name?: string;
}

export interface TrackInfo {
  fileSize?: number;
  targetBitrate?: string;
}

export interface TrackSizes {
  audioTracks?: AudioTrackInfo[];
  subtitleTracks?: SubtitleTrackInfo[];
  videoTracks?: VideoTrackInfo[];
}

export interface TvShowInfo {
  localizedData?: LocalizedData[];
}

export type TvodUrl = ContentUrl & {
  authorized?: boolean;
  url?: string;
};

export interface UPHAsset {
  assetId?: string;
  audioTracks?: string[];
  changed?: string;
  collections?: CollectionReference[];
  created?: string;
  customData?: JsonNode;
  defaultAudioTrack?: string;
  duration?: number;
  episode?: string;
  expires?: string;
  externalReferences?: ExternalReferenceResponse[];
  geoCountries?: string[];
  linkedEntities?: LinkedEntityResponse[];
  live?: boolean;
  localized?: LocalizedDataResponse[];
  markers?: Marker[];
  materialType?: AssetMaterialType;
  medias?: MediaResponse[];
  originalTitle?: string;
  originalTitleLanguage?: string;
  parentalRatings?: ParentalRatingResponse[];
  participants?: PersonResponse[];
  popularityScores?: Record<string, string>;
  productionCountries?: string[];
  productionYear?: number;
  publications?: Publication[];
  rating?: number;
  releaseDate?: string;
  runtime?: number;
  season?: string;
  seasonId?: string;
  seasons?: SeasonResponse[];
  slugs?: string[];
  spokenLanguages?: string[];
  subtitles?: string[];
  tags?: TagResponse[];
  trackSizes?: TrackSizes;
  tvShowId?: string;
  type?: AssetType;
}

export interface UserAssetData {
  playHistory?: UserAssetPlayHistory;
}

export interface UserAssetPlayHistory {
  channelId?: string;
  errorMessage?: string;
  lastViewedOffset?: number;
  /** @deprecated */
  lastViewedTime?: number;
  programId?: string;
}

export interface UserAttributeResponse {
  /** attributeId */
  attributeId: string;
  /** The attributes default value. */
  defaultValue?: object;
  /** If type = "enum™": The enums value set. */
  enums?: UserAttributesEnumValue[];
  /** Localized metadata. */
  localized: UserAttributesLocalizedMetadata[];
  /** if type = "integer" or "real" and any range is specified: min and max values. */
  range?: UserAttributesRange;
  /** If true the user must provide a value, whicgh mayt be the default value. */
  requiredAtSignup: boolean;
  /** boolean:  value range null/undefined, false, true, email: valid email address, string: any string, integer: integer number e.g 1, real: Real/decimal number e.g 1.1, enum: a value defined by enums. */
  type: string;
  /** The value set by the user. */
  value?: object;
  /** If true the attribute has been set, potentially with a null/undefined value, in which case the default value is used. */
  valueSet: boolean;
}

/** If type = "enum™": The enums value set. */
export interface UserAttributesEnumValue {
  /** Used as value of the enum. */
  id?: string;
  /** Localized metadata. */
  localized?: UserAttributesLocalizedMetadata[];
}

/** Localized metadata. */
export type UserAttributesLocalizedMetadata = Record<"description" | "locale" | "title", string>;

/** if type = "integer" or "real" and any range is specified: min and max values. */
export type UserAttributesRange = Record<"max" | "min", object>;

export interface UserCapabilities {
  canChangeEmail: boolean;
  canChangePassword: boolean;
  canChangeUserNameAndEmail: boolean;
  canManageAccount: boolean;
  canManageDevices: boolean;
  canManagePayments: boolean;
  canManagePurchases: boolean;
}

export interface UserDetailsResponse {
  attributes: UserAttributeResponse[];
  capabilities: UserCapabilities;
  child: boolean;
  /** @deprecated */
  defaultLanguage: string;
  displayName?: string;
  email?: string;
  language?: string;
  metadata?: Record<string, string>;
  profileType?: string;
  username: string;
}

export interface UserPreferenceResponse {
  lastUpdated?: string;
  preferences?: Record<string, string>;
}

export interface UserProfile {
  /** True if this user profile is the active user (the user fetching this info. */
  active?: boolean;
  attributes?: UserAttributeResponse[];
  capabilities?: UserCapabilities;
  /** Created at. */
  created?: string;
  /** Display name (full name). */
  displayName?: string;
  /** Email address. */
  emailAddress?: string;
  /**
   * True if the user must have an email address. Check User attribute primary-email-address instead.
   * @deprecated
   */
  emailAddressRequired?: boolean;
  /** Language code of the user's preferred language */
  language?: string;
  /** Application defined map String->String. Can be used for arbitrary application specific data */
  metadata?: Record<string, string>;
  /** True if user is owner of the account. */
  owner?: boolean;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration. */
  profileType?: string;
  /** User Id. */
  userId?: string;
  /** User's (login) name. */
  username?: string;
}

export interface UserProfiles {
  pinCodes?: PinCodeResponse[];
  profiles?: UserProfile[];
}

export interface UserSignupResponse {
  loginResponse?: LoginResponse;
  /** If true the user need to confirm creation bu following email instructions. If false the account is good to go */
  unConfirmed: boolean;
}

export interface VideoTrack {
  bitrate?: number;
  dashChannels?: string;
  dashLang?: string;
  dashRole?: string;
  fileSize?: number;
  height?: number;
  hlsName?: string;
  language?: string;
  name?: string;
  width?: number;
}

export interface VideoTrackInfo {
  fileSize?: number;
  height?: number;
  targetBitrate?: string;
}

/** Vouchers configuration */
export interface VouchersConfig {
  /** Vouchers enabled */
  enabled: boolean;
}

export interface WatchedTvShowResponse {
  asset?: UPHAsset;
  lastViewedOffset?: number;
  startedWatching?: boolean;
}
