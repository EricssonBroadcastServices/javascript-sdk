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

export interface ActivationCodeResponse {
  /** 6 characters drawn from set 123456789ABCDEF */
  code?: string;
  expires?: string;
}

export interface ActiveChannels {
  apiChannelStatuses?: ChannelStatus[];
  pageNumber?: number;
  pageSize?: number;
}

export interface AdClips {
  category?: string;
  duration?: number;
  impressionUrlTemplates?: string[];
  title?: string;
  titleId?: string;
  trackingEvents?: AdTrackingEvents;
  videoClicks?: AdVideoClicks;
}

export interface AdMarker {
  duration?: string;
  id?: string;
  offset?: number;
  type?: string;
}

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
  clips?: AdClips[];
  insertionDuration?: number;
  insertionMaxCount?: number;
  stitcher?: string;
  stitcherProfileId?: string;
  stitcherSession?: string;
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
  /** The time when the session expires */
  expirationDateTime?: string;
  /** The session token to use for subsequent requests. */
  sessionToken?: string;
}

/** Apple app store configuration */
export interface AppStoreConfig {
  /** Apple App Store enabled */
  enabled: boolean;
}

export interface AppStorePurchaseInitializeResponse {
  /** To used as appAccountToken */
  appAccountToken?: string;
  purchaseId?: string;
  transactionId?: string;
}

export interface AppStorePurchaseVerifyResponse {
  transactionStatus?: StoreTransactionStatus;
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
  event?: Event;
  expires?: string;
  externalReferences: ExternalReference[];
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
  /** A key value object */
  popularityScores?: object;
  productionCountries: string[];
  productionYear?: number;
  programs?: Program[];
  publications: Publication[];
  rating?: number;
  releaseDate?: string;
  /** The duration of the asset in seconds. */
  runtime?: number;
  season?: string;
  seasonId?: string;
  seasons?: Season[];
  slugs: string[];
  spokenLanguages: string[];
  studio?: string;
  subtitles: string[];
  tags: Tag[];
  trackSizes?: TrackSizes;
  tvShow?: TvShowInfo;
  tvShowId?: string;
  type: AssetType;
  userData?: UserAssetData;
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
  /** A key value object */
  metadata?: object;
  order?: number;
}

export const AssetMaterialType = {
  LOW_LATENCY_CHANNEL: "LOW_LATENCY_CHANNEL"
} as const;
export type AssetMaterialType = (typeof AssetMaterialType)[keyof typeof AssetMaterialType];

export interface AssetRights {
  HDMIBlocked?: boolean;
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

export interface BookkeeperAccount {
  accountId?: string;
  assets?: BookkeeperAsset[];
}

export interface BookkeeperAsset {
  assetId?: string;
  changed?: string;
  downloadCount?: number;
  downloads?: BookkeeperDownload[];
}

export type BookkeeperDownload = Record<
  "clientIp" | "deviceId" | "deviceModelId" | "deviceType" | "time" | "type" | "userId",
  string
>;

export interface Bookmarks {
  /**
   * Only relevant for VOD.
   * This is the offset from the start off the VOD is ms
   */
  lastViewedOffset?: number;
  /**
   * Only relevant for LIVE.
   * This is the offset from the start of the stream in ms.
   * Since we always use unix epoch as start for our channels this will be a UNIX timestamp when the user hit pause while watching live
   */
  liveTime?: number;
}

export type CDN = Record<"host" | "profile" | "provider", string>;

/** Summary of card details */
export interface CardSummary {
  /** Last of digits of card number */
  last4?: string;
  /** Type of card, e.g visa */
  brand?: string;
  /** Expiry month e.g. "10" */
  expiryMonth?: string;
  /** Expiry month e.g. "2022" */
  expiryYear?: string;
  /** Origin of the card E.g. Google Pay, Apple Pay. If empty, consider the origin to be the payment provider */
  origin?: string;
}

export interface Carousel {
  carouselId?: string;
  items?: AssetList;
  sortOrder?: number;
  titles?: LocalizedTitle[];
}

export type CencConfigurationResponse = Record<"com.microsoft.playready" | "com.widevine.alpha", string>;

export interface ChangePasswordResponse {
  loginResponse?: LoginResponse;
}

export interface ChannelAsset {
  asset?: Asset;
  endTime?: string;
  startTime?: string;
}

export interface ChannelEPGResponse {
  channelId: string;
  programs: ProgramResponse[];
  /** This is the total number of hits for all channels, not only this. */
  totalHitsAllChannels: number;
}

export interface ChannelStatus {
  active?: boolean;
  assets?: ChannelAsset[];
  channel?: Asset;
}

export interface CollectionReference {
  collectionId?: string;
}

export interface ComponentFilters {
  countryCode?: string;
  filters?: Result[];
  locationKnown?: boolean;
}

export interface ConfigFile {
  businessUnit?: string;
  config?: JsonNode;
  customer?: string;
  fileName?: string;
  systemConfig?: SystemConfig;
  version?: number;
}

export interface ConfigFilesResponse {
  businessUnit?: string;
  customer?: string;
  fileNames?: string[];
}

export interface ConfirmAccountResponse {
  loginResponse?: LoginResponse;
}

/** Consent management */
export interface ConsentManagement {
  /** Didomi consent management */
  didomi: Didomi;
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
  /** A key value object */
  popularityScores?: object;
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

export interface ContractRestrictions {
  /** Is apple airplay allowed or not */
  airplayEnabled?: boolean;
  /** Is the user allowed to fast forward */
  ffEnabled?: boolean;
  /** What is the highest bitrate that should be used */
  maxBitrate?: number;
  /** What is the highest resolution allowed */
  maxResHeight?: number;
  /** What is the lowest bitrate that should be used */
  minBitrate?: number;
  /** Is the user allowed to rewind */
  rwEnabled?: boolean;
  /** Is the user allowed to timeshift (skip) */
  timeshiftEnabled?: boolean;
}

export interface CreateSessionResponse {
  /** The time when the session expires */
  expirationDateTime?: string;
  /** The session token to use for subsequent requests. */
  sessionToken?: string;
}

export interface DRMLicense {
  "com.apple.fps"?: DrmUrls;
  "com.microsoft.playready"?: DrmUrls;
  "com.widevine.alpha"?: DrmUrls;
  /** The datetime of activation of the drm license. */
  licenseActivation?: number;
  /** The datetime of expiration of the drm license. */
  licenseExpiration?: number;
  /** The reason of expiration of the drm license. */
  licenseExpirationReason?: EntitlementStatus;
}

export interface Device {
  height?: number;
  manufacturer?: string;
  model?: string;
  name?: string;
  os?: string;
  osVersion?: string;
  type: DeviceType;
  width?: number;
}

export interface DeviceRegistration {
  /** The device id. */
  deviceId: string;
  /** The user's name of the device. */
  name: string;
  type?: DeviceType;
}

export interface DeviceResponseV2 {
  aboveDeviceLimit?: boolean;
  currentDevice?: boolean;
  deviceCreated?: string;
  deviceId?: string;
  deviceName?: string;
  deviceType?: string;
  sessionCreated?: string;
  sessionExpires?: string;
}

export interface DeviceRights {
  manufacturer?: string;
  model?: string;
  os?: string;
  osVersion?: string;
  rights?: AssetRights;
  type?: DeviceType;
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
  /** The list of current devices for the account. */
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

export interface DownloadInfoResponse {
  accountId?: string;
  assetId?: string;
  audios?: Track[];
  downloadCount?: number;
  durationInMs?: number;
  maxDownloadCount?: number;
  productId?: string;
  publicationId?: string;
  requestId?: string;
  subtitles?: Track[];
  videos?: VideoTrack[];
}

export interface DownloadResponse {
  accountId?: string;
  analytics?: Analytics;
  assetId?: string;
  cdn?: CDN;
  downloadCount?: number;
  durationInMs?: number;
  formats?: MediaFormatDownload[];
  materialId?: string;
  materialVersion?: number;
  maxDownloadCount?: number;
  playSessionId?: string;
  playToken?: string;
  playTokenExpiration?: number;
  playTokenExpirationReason?: string;
  productId?: string;
  publicationId?: string;
  requestId?: string;
}

export type DrmUrls = Record<"certificateUrl" | "licenseServerUrl", string>;

export interface EDRMConfigurationResponse {
  /** The ad parameter to use. */
  adParameter?: string;
  /** The id of the owner of the media. */
  ownerId?: string;
  /** The url of the server to use. */
  requestUrl?: string;
  /** The user token. */
  userToken?: string;
}

export type EmptyResponse = object;

export interface EntitleResponseV2 {
  /** The account id */
  accountId?: string;
  entitleExposure?: boolean;
  /** The entitlement end time */
  entitlementEnd?: string;
  /** Identity of the entitlement that permitted playback of the asset. */
  entitlementId?: string;
  /** The entitlement start time */
  entitlementStart?: string;
  formats?: MediaFormat[];
  /** Identity of the product that permitted playback of the asset */
  productId?: string;
  /** The publication end time */
  publicationEnd?: string;
  /** Identity of the publication that permitted playback of the asset. */
  publicationId?: string;
  /** The publication start time */
  publicationStart?: string;
  /** The request id, used for internal debugging. */
  requestId?: string;
  /**
   * Status
   * Only used when we can actually play something, so at the moment we hard cord SUCCESS to make the move from v1 clients to v2 easy, they might expect SUCCESS
   */
  status?: string;
  streamInfo?: StreamInfo;
  /** The time the entitle was made for */
  time?: string;
}

export const EntitlementStatus = {
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
  SUCCESS: "SUCCESS"
} as const;
export type EntitlementStatus = (typeof EntitlementStatus)[keyof typeof EntitlementStatus];

export type EpgInfo = Record<"enabled" | "entitlementCheck", boolean>;

export interface EpgSearchHits {
  items?: ChannelEPGResponse[];
  pageNumber?: number;
  pageSize?: number;
  suggestion?: string;
  totalCount?: number;
}

export interface Event {
  asset: Asset;
  /** The id of the asset this program is for. */
  assetId: string;
  endTime: string;
  startTime: string;
}

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

export type FairplayConfigurationResponse = Record<
  "certificateUrl" | "licenseAcquisitionUrl" | "secondaryMediaLocator",
  string
>;

export interface Filters {
  filters?: FiltersFilter[];
}

export type FiltersFilter = Record<"type" | "value", string>;

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

export interface GetAllUserContentRatingsForAssetResponse {
  assetId?: string;
  creationDate?: string;
  lastModificationDate?: string;
  rating?: number;
  userId?: string;
}

export interface GetAllUserContentRatingsForUserResponse {
  assetId?: string;
  creationDate?: string;
  lastModificationDate?: string;
  rating?: number;
}

export interface GetUserContentRatingResponse {
  creationDate?: string;
  lastModificationDate?: string;
  rating?: number;
}

/** Google play configuration */
export interface GooglePlayConfig {
  /** Google play enabled */
  enabled: boolean;
}

export interface GooglePlayPurchaseInitializeResponse {
  /** To used as obfuscatedAccountId */
  obfuscatedAccountId?: string;
  /** To used as obfuscatedProfileId */
  obfuscatedProfileId?: string;
  purchaseId?: string;
  transactionId?: string;
}

export interface GooglePlayPurchaseVerifyResponse {
  transactionStatus?: StoreTransactionStatus;
}

export type HtmlDocument = Record<"body" | "url", string>;

export interface Image {
  height?: number;
  orientation?: ImageOrientation;
  priority?: number;
  type?: string;
  url?: string;
  width?: number;
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

export interface JsonNode {
  array?: boolean;
  bigDecimal?: boolean;
  bigInteger?: boolean;
  binary?: boolean;
  boolean?: boolean;
  containerNode?: boolean;
  double?: boolean;
  empty?: boolean;
  float?: boolean;
  floatingPointNumber?: boolean;
  int?: boolean;
  integralNumber?: boolean;
  long?: boolean;
  missingNode?: boolean;
  nodeType?: "ARRAY" | "BINARY" | "BOOLEAN" | "MISSING" | "NULL" | "NUMBER" | "OBJECT" | "POJO" | "STRING";
  null?: boolean;
  number?: boolean;
  object?: boolean;
  pojo?: boolean;
  short?: boolean;
  textual?: boolean;
  valueNode?: boolean;
}

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

export type LinkedEntity = Record<"entityId" | "entityType" | "linkType", string>;

export type LinkedEntityResponse = Record<"entityId" | "entityType" | "linkType", string>;

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
  description?: string;
  extendedDescription?: string;
  images?: Image[];
  locale?: string;
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
  shortDescription?: string;
  sortingTitle?: string;
  tinyDescription?: string;
  title?: string;
}

export type LocalizedPersonData = Record<"bio" | "locale", string>;

export type LocalizedPersonDataResponse = Record<"bio" | "locale", string>;

export interface LocalizedTag {
  description?: string;
  images?: Image[];
  locale?: string;
  title?: string;
}

export type LocalizedTitle = Record<"locale" | "title", string>;

export interface Location {
  /** ISO country code or null if unknown. */
  countryCode?: string;
  /** true if location is known. */
  locationKnown: boolean;
}

export interface LoginResponse {
  /** The id of the account in the CRM. */
  accountId?: string;
  /** The status of the account. */
  accountStatus?: string;
  /** is a child user */
  child?: boolean;
  configReloadQueryParameter?: QueryParameter;
  /** The token of the underlying CRM to use if talking directly to the CRM. */
  crmToken?: string;
  /** The time when the session expires */
  expirationDateTime?: string;
  informationCollectionConsentGiven?: string;
  informationCollectionConsentRequiredDate?: string;
  /** If true to many devices are logged in and this session can not be used to play. */
  isOverDeviceLimit?: boolean;
  /** user language */
  language?: string;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration. */
  profileType?: string;
  /** The session token to use for subsequent requests. */
  sessionToken?: string;
  /** The id of the user in the CRM. */
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
  offset?: number;
  thumbnail?: string;
  type?: string;
}

export interface Media {
  /** The DRM of the media. */
  drm?: string;
  /** The duration of the media in milliseconds. */
  durationMillis?: number;
  /** The streaming format of the media. */
  format?: string;
  /** The height in pixels. */
  height?: number;
  /** The id of the media. */
  mediaId?: string;
  /** The name of the media. */
  name?: string;
  /** The id of the EPG program this media is for. */
  programId?: string;
  /** The status of the media. "enabled" if playable. */
  status?: string;
  /** The width in pixels. */
  width?: number;
}

export interface MediaFormat {
  drm?: DRMLicense;
  format?: MediaFormatType;
  liveDelay?: number;
  mediaLocator?: string;
  orgMediaLocator?: string;
  vastUrl?: string;
}

export interface MediaFormatDownload {
  drm?: DRMLicense;
  format?: MediaFormatType;
  mediaLocator?: string;
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

export interface Message {
  message?: string;
}

export interface MultiSearchResponse {
  assetHits?: SearchList;
  tagHits?: TagSearchList;
}

export interface OverlayWidget {
  url?: string;
}

export interface ParentalRating {
  /** The two letter country code this rating is for. */
  country?: string;
  /** The rating, allowed values depends on the scheme. */
  rating?: string;
  /** The rating scheme, for instance MPAA. */
  scheme?: string;
}

export type ParentalRatingResponse = Record<"country" | "rating" | "scheme", string>;

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
  id?: string;
  preferred?: boolean;
}

export interface PaymentMethods {
  methods?: PaymentMethod[];
}

export const PaymentProvider = {
  Appstore: "appstore",
  Deny: "deny",
  External: "external",
  Googleplay: "googleplay",
  Stripe: "stripe"
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
  /** List of application specified grants */
  grants: string[];
  /** When last modified */
  modified: string;
  /** Id of PIN */
  pinId: string;
}

export interface PlayResponse {
  /** Media locator to used for add servers SDKs */
  adMediaLocator?: string;
  /** If airplay is blocked */
  airplayBlocked?: boolean;
  cencConfig?: CencConfigurationResponse;
  edrmConfig?: EDRMConfigurationResponse;
  /** The type of entitlement that granted access to this play. */
  entitlementType?: "AVOD" | "FVOD" | "SVOD" | "TVOD";
  fairplayConfig?: FairplayConfigurationResponse;
  /** If fast forward is enabled */
  ffEnabled?: boolean;
  /** Last viewed offset */
  lastViewedOffset?: number;
  /** Last viewed time */
  lastViewedTime?: number;
  /** The datetime of activation of the drm license. */
  licenseActivation?: string;
  /** The datetime of expiration of the drm license. */
  licenseExpiration?: string;
  /** The reason of expiration of the drm license. */
  licenseExpirationReason?: EntitlementStatus;
  /** If this is a live entitlement. */
  live?: boolean;
  /** Live time */
  liveTime?: number;
  /** Max bitrate to use */
  maxBitrate?: number;
  /** Max height resolution */
  maxResHeight?: number;
  /** MDN Request Router Url */
  mdnRequestRouterUrl?: string;
  /**
   * The information needed to locate the media. FOR EDRM this will be the media uid, for other formats it's the URL
   * of the media.
   */
  mediaLocator?: string;
  /** Min bitrate to use */
  minBitrate?: number;
  /** Unique id of this playback session, all analytics events for this session should be reported on with this id */
  playSessionId?: string;
  /**
   * Play token to use for either PlayReady or MRR.
   * Will be empty if the status is not SUCCESS.
   */
  playToken?: string;
  /** The expiration of the the play token. The player needs to be initialized and done the play call before this. */
  playTokenExpiration?: string;
  /** Identity of the product that permitted playback of the asset */
  productId?: string;
  /** If rewind is enabled */
  rwEnabled?: boolean;
  /** If timeshift is disabled */
  timeshiftEnabled?: boolean;
  widevineConfig?: WidevineConfigurationResponse;
}

export interface PlayResponseV2 {
  /** The account id */
  accountId?: string;
  ads?: Ads;
  analytics?: Analytics;
  assetId?: string;
  /** Is the material an audio only asset or is it audio+video */
  audioOnly?: boolean;
  bookmarks?: Bookmarks;
  cdn?: CDN;
  /** Number of concurrent sessions */
  concurrentSessionsCount?: number;
  contractRestrictions?: ContractRestrictions;
  /** Duration of the material. This is the new value that MUST be and should stay as milliseconds */
  durationInMilliseconds?: number;
  /** Duration of the material. This is deprecated and must contain duratin in micro seconds and not milliseconds */
  durationInMs?: number;
  entitleExposure?: boolean;
  /** The type of entitlement that granted access to this play. */
  entitlementType?: "AVOD" | "FVOD" | "SVOD" | "TVOD";
  epg?: EpgInfo;
  /** Formats */
  formats?: MediaFormat[];
  /** The material id for the material used in this play response. Just available for testing purposes. */
  materialId?: string;
  /** The material profile, materials can be used for different purposes using profiles */
  materialProfile?: string;
  /** The material version for the material used in this play response. Just available for testing purposes. */
  materialVersion?: number;
  /** Unique id of this playback session, all analytics events for this session should be reported on with this id */
  playSessionId?: string;
  /** The play token */
  playToken?: string;
  /** The expiration of the the play token. The player needs to be initialized and have done the play call before this. */
  playTokenExpiration?: number;
  /** Why does the play token expire */
  playTokenExpirationReason?: string;
  /** Identity of the product that permitted playback of the asset */
  productId?: string;
  /** Identity of the publication that permitted playback of the asset. */
  publicationId?: string;
  /** Type of publishing type, Just available for testing. Should we really return this here? why? */
  publishingType?: string;
  /** The request id, used for internal debugging. */
  requestId?: string;
  /** Information about available sprites */
  sprites?: Sprites[];
  streamInfo?: StreamInfo;
}

export interface PreferencesListItem {
  id?: string;
  lastUpdated?: string;
  /** A key value object */
  metadata?: object;
  order?: number;
}

export interface PreferencesListResponse {
  items?: PreferencesListItem[];
  query?: string;
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

export interface ProgramResponse {
  asset: Asset;
  /** The id of the asset this program is for. */
  assetId: string;
  /**
   * If this program is currently published as blackout. This means any publication contains blackout, not global
   * blackout;
   */
  blackout?: boolean;
  /** If this asset is currently available as rough cut that is not expired. */
  catchup?: boolean;
  /** If this asset is currently blocked for catchup. */
  catchupBlocked?: boolean;
  /** The date the program was changed. */
  changed?: string;
  /** The id of the channel this program is on. */
  channelId?: string;
  /** The date the program was created. */
  created?: string;
  endTime: string;
  /** The id of the program. */
  programId: string;
  startTime: string;
  /** If this asset is currently available as VOD. */
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

export interface PurchaseResponse {
  apiStripePurchaseResponse?: StripePurchaseResponse;
  purchase?: StorePurchase;
  /** @deprecated */
  purchaseId?: string;
}

export type QueryParameter = Record<"name" | "value", string>;

export interface RecommendedAssets {
  items?: Asset[];
}

export interface RecommendedWatchNext {
  items: Asset[];
}

export type Result = Record<"type" | "value", string>;

export interface Search {
  asset?: Asset;
  highlightedDescription?: string;
  highlightedTitle?: string;
}

export interface SearchList {
  items?: Search[];
  pageNumber?: number;
  pageSize?: number;
  suggestion?: string;
  totalCount?: number;
}

export interface Season {
  availableDate?: string;
  changed?: string;
  created?: string;
  customData?: JsonNode;
  endYear?: number;
  episodeCount?: number;
  episodes?: Asset[];
  externalReferences?: ExternalReference[];
  linkedEntities?: LinkedEntity[];
  localized?: LocalizedData[];
  publishedDate?: string;
  season?: string;
  seasonId?: string;
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
  episodes?: Asset[];
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
  /** The account ID. */
  accountId?: string;
  configReloadQueryParameter?: QueryParameter;
  /** The token within the crm. */
  crmToken?: string;
  /** If true this session is can only be used to list and log out other devices */
  overTheDeviceLimit?: boolean;
  /** The user / profile id. */
  userId?: string;
  userProfile?: UserProfile;
}

export interface SimpleLocalizedData {
  image?: Image;
  locale?: string;
  title?: string;
}

export interface Sprites {
  offsetInMs?: number;
  vtt?: string;
  width?: number;
}

export interface StoreAppStoreReference {
  productId: string;
}

export interface StoreDiscount {
  discountedOfferingPrice?: StoreProductOfferingPrice;
}

export interface StoreGooglePlayReference {
  skuId: string;
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
  appStoreReference?: StoreAppStoreReference;
  /** The one-time discounted price on a product offering */
  discount?: StoreProductOfferingDiscount;
  /** If present the time at which entitlement starts, if not present entitlement starts ar time of purchase, ISO 8601 Date and time */
  entitlementStart?: string | null;
  googlePlayReference?: StoreGooglePlayReference;
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
}

/** The one-time discounted price on a product offering */
export type StoreProductOfferingDiscount = {
  freePeriod?: {
    chronology?: {
      calendarType?: string;
      id?: string;
    };
    days?: number;
    months?: number;
    negative?: boolean;
    units?: {
      dateBased?: boolean;
      duration?: {
        nano?: number;
        negative?: boolean;
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
  from?: string;
  localizedAsset?: StoreLocalizedTitle[];
  localizedProductOffering?: StoreLocalizedName[];
  productIds?: string[];
  productOfferingId?: string;
  /** Type of offering: purchase, rental, event, subscription */
  productOfferingType?: string;
  renewAt?: string;
  status?: string;
  transactions?: StoreTransaction[];
  until?: string;
  voucherCode?: string;
}

export interface StoreTransaction {
  amount?: string;
  attributes?: Record<string, string>;
  completedTime?: string;
  /** @deprecated */
  id?: string;
  paymentProviderRequestId?: string;
  paymentProviderTransactionId?: string;
  paymentProviderType?: string;
  productOfferingId?: string;
  receiptUrl?: string;
  refunded?: boolean;
  status?: StoreTransactionStatus;
  transactionId?: string;
}

export const StoreTransactionStatus = {
  Accepted: "accepted",
  Cancelled: "cancelled",
  Pending: "pending",
  Rejected: "rejected"
} as const;
export type StoreTransactionStatus = (typeof StoreTransactionStatus)[keyof typeof StoreTransactionStatus];

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
  methodTypes?: StripePaymentMethodTypeAndPrice[];
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
  name?: string;
  /** Price after any discount */
  price?: StorePriceTag;
  /** Will payment be recurring */
  recurring?: boolean;
}

export type SubtitleResponse = Record<"language" | "location" | "name", string>;

export interface SubtitleTrackInfo {
  fileSize?: number;
  language?: string;
}

export interface SystemConfig {
  /** User access configuration */
  access: AccessConfig;
  /** Analytics reporting configuration */
  analytics: AnalyticsConfig;
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
  tagValues?: TagValues[];
  type?: string;
}

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

export interface TagValues {
  tagId?: string;
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

export interface UserAssetData {
  playHistory?: UserAssetPlayHistory;
}

export interface UserAssetPlayHistory {
  /** The channel id if the asset was viewed as catchup or live. */
  channelId?: string;
  /**
   * Property is set to "FAILURE" if the data couldn't be received.
   * If no problem this property is not set.
   */
  errorMessage?: string;
  /** Last viewed offset, offset in the last play of the asset. */
  lastViewedOffset?: number;
  /** The program id if the asset was viewed as catchup or live. */
  programId?: string;
}

export interface UserAttributeResponse {
  /** id of the attribute */
  attributeId: string;
  defaultValue?: object;
  /** If type = "enum": The enums value set */
  enums?: UserAttributesEnumValue[];
  /** Localized titles and descriptions */
  localized: UserAttributesLocalizedMetadata[];
  range?: UserAttributesRange;
  /** If true user must provide value */
  requiredAtSignup: boolean;
  /**
   * Name of type
   * "boolean":  value range null/undefined, false, true,
   * "email": valid email address
   * "string": any string
   * "integer": integer number e.g 1
   * "real": Real/decimal number e.g 1.1
   */
  type: string;
  value?: object;
  /** If true the attribute has been set, potentially with a null/undefined value, in which case the default value is used */
  valueSet: boolean;
}

export interface UserAttributesEnumValue {
  /** To be used as value of the enum */
  id?: string;
  localized?: UserAttributesLocalizedMetadata[];
}

export interface UserAttributesLocalizedMetadata {
  /** The attribute's or enum's description  in locale's language. */
  description?: string;
  /** Locale of title and description. */
  locale?: string;
  /** Title of attribute or enum in locale's language. */
  title?: string;
}

export type UserAttributesRange = Record<"max" | "min", object>;

export interface UserCapabilities {
  /** True if user name is not equal to the user's email address and the user may change the email address. */
  canChangeEmail: boolean;
  /** True if the user can change password here. */
  canChangePassword: boolean;
  /** True if user name equals the user's email address and the user may change this; password required */
  canChangeUserNameAndEmail: boolean;
  /** True if user can manage user profiles and cancel account */
  canManageAccount: boolean;
  /** True if user can manage devices */
  canManageDevices: boolean;
  /** True if user can manage payment methods, such as credit cards */
  canManagePayments: boolean;
  /** True if user can manage purchase, such as adding and cancelling subscriptions */
  canManagePurchases: boolean;
}

export interface UserDetailsResponse {
  /** Potentially empty list of attributes */
  attributes: UserAttributeResponse[];
  capabilities: UserCapabilities;
  /** If true the user is a child */
  child: boolean;
  defaultLanguage: string;
  /** Name used e.g. as email display name, null if not changed */
  displayName?: string;
  /** email address if available */
  email?: string;
  /** Set Language */
  language?: string;
  /** A key value object */
  metadata?: object;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration. */
  profileType?: string;
  /** username */
  username: string;
}

export interface UserPreferenceResponse {
  /** Last time the preferences where changed. */
  lastUpdated?: string;
  /** A key value object */
  preferences?: object;
}

export interface UserProfile {
  /** True if this user profile is the active user */
  active?: boolean;
  /**
   * Potentially empty list of attributes
   * EXPERIMENTAL May change
   */
  attributes?: UserAttributeResponse[];
  capabilities?: UserCapabilities;
  /** True if user is a child. */
  child?: boolean;
  /** Created at */
  created?: string;
  /** Display name (full name). */
  displayName?: string;
  /** Email address. */
  emailAddress?: string;
  /** DEPRECATED True if the user must have an email address. Check User attribute primary-email-address instead. */
  emailAddressRequired?: boolean;
  /** preferred language. */
  language?: string;
  /** A key value object */
  metadata?: object;
  /** True if user is owner of the account. */
  owner?: boolean;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration. */
  profileType?: string;
  /** UserId of profile. */
  userId?: string;
  /** User name. */
  username?: string;
}

export interface UserProfiles {
  /** List of pin codes, which may or may not be related to profile management. */
  pinCodes?: PinCodeResponse[];
  /** List user profiles. */
  profiles?: UserProfile[];
}

export interface UserSelfServiceCreateResponse {
  loginResponse?: LoginResponse;
  /**
   * If TRUE the user need to confirm creation bu following email/sms instructions
   * If FALSE the account is good to go.
   */
  unConfirmed?: boolean;
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
  asset?: Asset;
  lastViewedOffset?: number;
  startedWatching?: boolean;
}

export interface WidevineConfigurationResponse {
  certificateUrl?: string;
}
