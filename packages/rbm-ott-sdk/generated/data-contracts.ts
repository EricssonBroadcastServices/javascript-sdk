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
  /**
   * HTTP Code
   * @format int32
   */
  httpCode?: number;
  /** Error message */
  message?: string;
}

export interface AccessConfig {
  accessModel?: "login" | "open" | "pay";
  consentManagement?: ConsentManagement;
  loginMethods?: object;
  passwordPolicy?: PasswordPolicy;
  /** @format int32 */
  signupMinimumAge?: number;
  signupModel?: "confirmed" | "provisioned" | "unconfirmed";
}

export interface ActivationCodeResponse {
  /** 6 characters drawn from set 123456789ABCDEF */
  code?: string;
  /** @format date-time */
  expires?: string;
}

export interface ActivationRequest {
  activationCode: string;
  device: Device;
  /** The device id. */
  deviceId: string;
}

export interface ActivationRequestV2 {
  /** 6 characters drawn from set 123456789ABCDEF as received from create end-point. */
  activationCode: string;
  device: DeviceRegistration;
}

export interface ActivationResult {
  accountId?: string;
  accountStatus?: string;
  businessUnitId?: string;
  customerId?: string;
  extendedMessage?: string;
  /** @format date-time */
  informationCollectionConsentGiven?: string;
  /** @format date-time */
  informationCollectionConsentRequiredDate?: string;
  /** @format date-time */
  sessionExpiryDateTime?: string;
  sessionToken?: string;
  status?:
    | "DEVICE_LIMIT_EXCEEDED"
    | "INCORRECT_CREDENTIALS"
    | "INFORMATION_COLLECTION_CONSENT_MISSING"
    | "LOGIN_LOCKED"
    | "MIGRATED_NO_PASSWORD"
    | "SESSION_LIMIT_EXCEEDED"
    | "SUCCESS"
    | "THIRD_PARTY_ERROR";
  userDisplayName?: string;
  userId?: string;
  userName?: string;
}

export interface ActiveChannels {
  apiChannelStatuses?: ChannelStatus[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
}

export interface AdClips {
  category?: string;
  /** @format double */
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
  /** @format int32 */
  offset?: number;
  type?: string;
}

export interface AdTrackingEvents {
  complete?: string[];
  firstQuartile?: string[];
  midpoint?: string[];
  thirdQuartile?: string[];
}

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
  /** @format int32 */
  insertionDuration?: number;
  /** @format int32 */
  insertionMaxCount?: number;
  stitcher?: string;
  stitcherProfileId?: string;
  stitcherSession?: string;
}

export interface Algorithm {
  /** @format int32 */
  pbkdf2Iterations?: number;
  algorithmName?: "CLEAR" | "NO_PASSWORD" | "PBKDF2";
}

export interface Analytics {
  baseUrl?: string;
  /** @format int32 */
  bucket?: number;
  /** @format int32 */
  percentage?: number;
  /** @format int32 */
  postInterval?: number;
  tag?: string;
}

export interface AnalyticsBatch {
  AccountId?: string;
  BusinessUnit?: string;
  ClientIp?: string;
  /** @format int32 */
  ClockOffset?: number;
  Customer?: string;
  /** @format int64 */
  DispatchTime: number;
  Payload?: string;
  SessionId?: string;
  UserId?: string;
}

export interface AnalyticsConfig {
  analyticsBaseUrl?: string;
  /** @format int32 */
  analyticsPercentage?: number;
}

export interface AnonymousSessionRequest {
  device: Device;
  /** The device id. */
  deviceId: string;
}

export interface AnonymousSessionResponse {
  /**
   * The time when the session expires
   * @format date-time
   */
  expirationDateTime?: string;
  /** The session token to use for subsequent requests. */
  sessionToken?: string;
}

export interface ApiKeyUserSessionRequest {
  device: DeviceRegistration;
  /**
   * When should the session created by this authentication request expire
   * and force the user to log in again.
   */
  expiration?: string;
  /**
   * TRUE: Consent to collect personal information is given.
   * FALSE or null: consent is not given now. This may be fine if consent already is given.
   */
  informationCollectionConsentGivenNow?: boolean;
  /**
   * Should the session be unique or connected to a userId.
   * If true the session will only be connected to an account but not to a user
   */
  sessionUser?: boolean;
  /** The users login name */
  username: string;
}

export interface AppStoreConfig {
  enabled?: boolean;
}

export interface AppStorePurchaseInitializeRequest {
  /** Single asset id that the purchase will entitle. Requires that the product offering requires "direct asset purchases". */
  assetId?: string;
}

export interface AppStorePurchaseInitializeResponse {
  /**
   * To used as appAccountToken
   * @format uuid
   */
  appAccountToken?: string;
  purchaseId?: string;
  transactionId?: string;
}

export interface AppStorePurchaseVerifyRequest {
  /** As received in the App Store Purchase. */
  transaction: string;
}

export interface AppStorePurchaseVerifyResponse {
  transactionStatus?: StoreTransactionStatus;
}

export interface Asset {
  assetFeatures?: SystemTag[];
  assetId: string;
  audioTracks: string[];
  /** @format date-time */
  changed: string;
  channelFeatures?: ("VIRTUAL" | "VC_CURATED" | "VC_PERSONALIZED" | "VC_SCHEDULED" | "EPG")[];
  collections: CollectionReference[];
  /** @format date-time */
  created: string;
  cuePoints: MarkerPoint[];
  customData: JsonNode;
  defaultAudioTrack?: string;
  /** @format int64 */
  duration: number;
  episode?: string;
  event?: Event;
  /** @format date-time */
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
  /** A key value Map */
  popularityScores?: Map;
  productionCountries: string[];
  /** @format int32 */
  productionYear?: number;
  programs?: Program[];
  publications: Publication[];
  /** @format double */
  rating?: number;
  /** @format date */
  releaseDate?: string;
  /**
   * The duration of the asset in seconds.
   * @format int64
   */
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
  /** @format int32 */
  pageNumber: number;
  /** @format int32 */
  pageSize: number;
  /** @format int64 */
  totalCount: number;
}

export interface AssetListBulk {
  items?: Asset[];
  /** @format int64 */
  lastCreatedEpochMillis?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int64 */
  totalCount?: number;
}

export interface AssetListItemRequest {
  /** A key value Map */
  metadata?: Map;
  /**
   * The order to sort by.
   * @format int32
   */
  order?: number;
}

export interface AssetListItemResponse {
  asset?: Asset;
  assetId?: string;
  /** @format date-time */
  lastUpdated?: string;
  /** A key value Map */
  metadata?: Map;
  /** @format int32 */
  order?: number;
}

export type AssetMaterialType = "LOW_LATENCY_CHANNEL";

export interface AssetResponse {
  adminDisplayName?: string;
  assetId?: string;
  audioTracks?: string[];
  /** @format date-time */
  changed?: string;
  channelFeatures?: ("VIRTUAL" | "VC_CURATED" | "VC_PERSONALIZED" | "VC_SCHEDULED" | "EPG")[];
  collections?: CollectionReferenceResponse[];
  /** @format date-time */
  created?: string;
  customData?: JsonNode;
  defaultAudioTrack?: string;
  duration?: string;
  episode?: string;
  event?: EventDataResponse;
  /** @format date-time */
  expires?: string;
  externalReferences?: ExternalReferenceResponse[];
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
  /** A key value Map */
  popularityScores?: Map;
  productionCountries?: string[];
  /** @format int32 */
  productionYear?: number;
  programs?: ProgramListEntryResponse[];
  publicCustomData?: JsonNode;
  publications?: PublicationResponse[];
  /** @format double */
  rating?: number;
  /** @format date */
  releaseDate?: string;
  /** @format int32 */
  runtime?: number;
  season?: string;
  seasonId?: string;
  seasons?: SeasonResponse[];
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
  HDMIBlocked?: boolean;
  /** @format date-time */
  activation?: string;
  airplayBlocked?: boolean;
  amcDebugLogEnabled?: boolean;
  analyticsEnabled?: boolean;
  downloadBlocked?: boolean;
  /** @format int32 */
  downloadMaxSecondsAfterDownload?: number;
  /** @format int32 */
  downloadMaxSecondsAfterPlay?: number;
  /** @format date-time */
  expiration?: string;
  ffEnabled?: boolean;
  fourGBlocked?: boolean;
  jailbrokenBlocked?: boolean;
  locationEnabled?: boolean;
  /** @format int32 */
  maxAds?: number;
  /** @format int32 */
  maxBitrate?: number;
  /** @format int32 */
  maxDownloadCount?: number;
  /** @format int64 */
  maxFileSize?: number;
  /** @format int32 */
  maxPlayPosition?: number;
  /** @format int32 */
  maxResHeight?: number;
  /** @format int32 */
  maxResWidth?: number;
  /** @format int32 */
  minBitrate?: number;
  /** @format int32 */
  minPlayPosition?: number;
  /** @format int32 */
  playCount?: number;
  rwEnabled?: boolean;
  sessionShiftEnabled?: boolean;
  streamingBlocked?: boolean;
  threeGBlocked?: boolean;
  wifiBlocked?: boolean;
}

export type AssetType =
  | "AD"
  | "CLIP"
  | "COLLECTION"
  | "EPISODE"
  | "EVENT"
  | "LIVE_EVENT"
  | "MOVIE"
  | "OTHER"
  | "PODCAST"
  | "PODCAST_EPISODE"
  | "TV_CHANNEL"
  | "TV_SHOW";

export interface AudioTrackInfo {
  language?: string;
  trackInfoList?: TrackInfo[];
}

export interface AuthRequestV3 {
  device: DeviceRegistration;
  /**
   * TRUE: Consent to collect personal information is given.
   * FALSE or null: consent is not given now. This may be fine if consent already is given.
   */
  informationCollectionConsentGivenNow?: boolean;
  /** Password. */
  password?: string;
  /** The users login name, e.g. email */
  username: string;
}

export interface AuthenticationRequest {
  credentials?: Credentials;
  device: DeviceRegistration;
  /**
   * When should the session created by this authentication request expire
   * and force the user to log in again.
   */
  expiration?: string;
  /**
   * TRUE: Consent to collect personal information is given.
   * FALSE or null: consent is not given now. This may be fine if consent already is given.
   */
  informationCollectionConsentGivenNow?: boolean;
  /**
   * Should the session be unique or connected to a userId.
   * If true the session will only be connected to an account but not to a user
   */
  sessionUser?: boolean;
  /** The users login name, e.g. email */
  username: string;
}

export interface AutocompleteItem {
  assetId?: string;
  text?: string;
}

export interface AutocompleteItem2 {
  hitFieldValue?: string;
  hitText?: string;
}

export interface AvailabilityKeys {
  availabilityKeys?: string[];
  currentAvailabilityKeys?: string[];
  entitleExposure?: boolean;
  /** @format date-time */
  expiryDate?: string;
  futureAvailabilityKeys?: string[];
}

export interface BookkeeperAccount {
  accountId?: string;
  assets?: BookkeeperAsset[];
}

export interface BookkeeperAsset {
  assetId?: string;
  /** @format date-time */
  changed?: string;
  /** @format int32 */
  downloadCount?: number;
  downloads?: BookkeeperDownload[];
}

export interface BookkeeperDownload {
  clientIp?: string;
  deviceId?: string;
  deviceModelId?: string;
  deviceType?: string;
  /** @format date-time */
  time?: string;
  type?: string;
  userId?: string;
}

export interface Bookmarks {
  /**
   * Only relevant for VOD.
   * This is the offset from the start off the VOD is ms
   * @format int64
   */
  lastViewedOffset?: number;
  /**
   * Only relevant for LIVE.
   * This is the offset from the start of the stream in ms.
   * Since we always use unix epoch as start for our channels this will be a UNIX timestamp when the user hit pause while watching live
   * @format int64
   */
  liveTime?: number;
}

export interface CDN {
  host?: string;
  profile?: string;
  provider?: string;
}

export interface CardSummary {
  last4?: string;
  brand?: string;
  expiryMonth?: string;
  expiryYear?: string;
  origin?: string;
}

export interface Carousel {
  carouselId?: string;
  items?: AssetList;
  /** @format int32 */
  sortOrder?: number;
  titles?: LocalizedTitle[];
}

export interface CencConfigurationResponse {
  "com.microsoft.playready"?: string;
  "com.widevine.alpha"?: string;
}

export interface ChangeEmailAndUserNameV3 {
  /** The new email address and user name */
  newEmailAddressAndUsername?: string;
  /** Current Password. */
  password: string;
}

export interface ChangeEmailRequest {
  credentials: Credentials;
  /** The new email address */
  newEmailAddress?: string;
}

export interface ChangeEmailRequestV3 {
  /** The new email address */
  newEmailAddress?: string;
}

export interface ChangePasswordRequest {
  device: DeviceRegistration;
  /**
   * true: All existing sessions will be cleared
   * false : other devices' sessions are still valid
   */
  logoutOnAllDevices?: boolean;
  newCredentials: Credentials;
  oldCredentials: Credentials;
}

export interface ChangePasswordResponse {
  loginResponse?: LoginResponse;
}

export interface ChangePwdV3 {
  device: DeviceRegistration;
  /**
   * true: All existing sessions will be cleared
   * false : other devices' sessions are still valid
   */
  logoutOnAllDevices?: boolean;
  /** New Password. */
  newPassword: string;
  /** Old Password. */
  oldPassword: string;
}

export interface ChannelAsset {
  asset?: Asset;
  endTime?: string;
  startTime?: string;
}

export interface ChannelEPGResponse {
  channelId?: string;
  programs?: ProgramResponse[];
  /**
   * This is the total number of hits for all channels, not only this.
   * @format int64
   */
  totalHitsAllChannels?: number;
}

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
  /** @format int32 */
  sortOrder?: number;
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
  /** @format int32 */
  version?: number;
}

export interface ConfigFilesResponse {
  businessUnit?: string;
  customer?: string;
  fileNames?: string[];
}

export interface ConfirmAccountData {
  deviceRegistration?: DeviceRegistration;
}

export interface ConfirmAccountResponse {
  loginResponse?: LoginResponse;
}

export interface ConsentManagement {
  didomi?: Didomi;
}

export interface ConsentManagementDidomi {
  apiKey?: string;
  appNoticeId?: string;
  noticeId?: string;
  tvNoticeId?: string;
}

export interface ContinueUph2Assets {
  items?: ContinueWatchingAsset[];
}

export interface ContinueWatchingAsset {
  assetId?: string;
  audioTracks?: string[];
  /** @format date-time */
  changed?: string;
  collections?: CollectionReference[];
  /** @format date-time */
  created?: string;
  customData?: JsonNode;
  defaultAudioTrack?: string;
  /** @format int64 */
  duration?: number;
  episode?: string;
  /** @format date-time */
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
  /** A key value Map */
  popularityScores?: Map;
  productionCountries?: string[];
  /** @format int32 */
  productionYear?: number;
  publications?: Publication[];
  /** @format double */
  rating?: number;
  /** @format date */
  releaseDate?: string;
  /** @format int32 */
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
  /**
   * What is the highest bitrate that should be used
   * @format int32
   */
  maxBitrate?: number;
  /**
   * What is the highest resolution allowed
   * @format int32
   */
  maxResHeight?: number;
  /**
   * What is the lowest bitrate that should be used
   * @format int32
   */
  minBitrate?: number;
  /** Is the user allowed to rewind */
  rwEnabled?: boolean;
  /** Is the user allowed to timeshift (skip) */
  timeshiftEnabled?: boolean;
}

export interface CreateSessionRequest {
  accountId: string;
  /** If this is an anonymous user. */
  anonymous?: boolean;
  device?: Device;
  /** The device id. */
  deviceId: string;
  /**
   * The time that the session should expire.
   * @format date-time
   */
  expiration: string;
  userId: string;
}

export interface CreateSessionResponse {
  /**
   * The time when the session expires
   * @format date-time
   */
  expirationDateTime?: string;
  /** The session token to use for subsequent requests. */
  sessionToken?: string;
}

export interface Credentials {
  passwordTuples: PasswordTuple[];
}

export interface CredentialsV3 {
  password: string;
}

export interface DRMLicense {
  "com.apple.fps"?: DrmUrls;
  "com.microsoft.playready"?: DrmUrls;
  "com.widevine.alpha"?: DrmUrls;
  /**
   * The datetime of activation of the drm license.
   * @format int64
   */
  licenseActivation?: number;
  /**
   * The datetime of expiration of the drm license.
   * @format int64
   */
  licenseExpiration?: number;
  /** The reason of expiration of the drm license. */
  licenseExpirationReason?: EntitlementStatus;
}

export interface DeleteUsersSessionsRequest {
  /** The users login name */
  username: string;
}

export interface Device {
  /** @format int32 */
  height?: number;
  manufacturer?: string;
  model?: string;
  name?: string;
  os?: string;
  osVersion?: string;
  type: DeviceType;
  /** @format int32 */
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
  /** @format date-time */
  deviceCreated?: string;
  deviceId?: string;
  deviceName?: string;
  deviceType?: string;
  /** @format date-time */
  sessionCreated?: string;
  /** @format date-time */
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

export type DeviceType = "APPLE_TV" | "CONSOLE" | "MOBILE" | "SMART_TV" | "STB" | "TABLET" | "WEB";

export interface DevicesResponseV2 {
  /** The list of current devices for the account. */
  devices?: DeviceResponseV2[];
}

export interface Didomi {
  apiKey?: string;
  appNoticeId?: string;
  noticeId?: string;
  tvNoticeId?: string;
}

export interface DownloadInfoResponse {
  accountId?: string;
  assetId?: string;
  audios?: Track[];
  /** @format int32 */
  downloadCount?: number;
  /** @format int64 */
  durationInMs?: number;
  /** @format int32 */
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
  /** @format int32 */
  downloadCount?: number;
  /** @format int64 */
  durationInMs?: number;
  formats?: MediaFormatDownload[];
  materialId?: string;
  /** @format int32 */
  materialVersion?: number;
  /** @format int32 */
  maxDownloadCount?: number;
  playSessionId?: string;
  playToken?: string;
  /** @format int64 */
  playTokenExpiration?: number;
  playTokenExpirationReason?: string;
  productId?: string;
  publicationId?: string;
  requestId?: string;
}

export interface DrmUrls {
  certificateUrl?: string;
  licenseServerUrl?: string;
}

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
  /**
   * The entitlement end time
   * @format date-time
   */
  entitlementEnd?: string;
  /** Identity of the entitlement that permitted playback of the asset. */
  entitlementId?: string;
  /**
   * The entitlement start time
   * @format date-time
   */
  entitlementStart?: string;
  formats?: MediaFormat[];
  /** Identity of the product that permitted playback of the asset */
  productId?: string;
  /**
   * The publication end time
   * @format date-time
   */
  publicationEnd?: string;
  /** Identity of the publication that permitted playback of the asset. */
  publicationId?: string;
  /**
   * The publication start time
   * @format date-time
   */
  publicationStart?: string;
  /** The request id, used for internal debugging. */
  requestId?: string;
  /**
   * Status
   * Only used when we can actually play something, so at the moment we hard cord SUCCESS to make the move from v1 clients to v2 easy, they might expect SUCCESS
   */
  status?: string;
  streamInfo?: StreamInfo;
  /**
   * The time the entitle was made for
   * @format date-time
   */
  time?: string;
}

export interface EntitlementResponse {
  /** The ID of the asset for TVOD. */
  assetId?: string;
  /** The external ID of the asset for TVOD. */
  externalAssetId?: string;
  /** The id of the order this entitlement is part of. */
  orderId?: string;
  /** The id of the package. */
  packageId?: string;
  /** The flag to show if payment is done. */
  paymentDone?: boolean;
  /** The id of the product. */
  productId?: string;
  /** The type of the entitlement. */
  type?: "AVOD" | "FVOD" | "INTERNAL" | "SVOD" | "TVOD";
  /**
   * The start date of the validity of the entitlement.
   * @format date-time
   */
  validFrom?: string;
  /**
   * The end date of the validity of the entitlement.
   * @format date-time
   */
  validTo?: string;
}

export type EntitlementStatus =
  | "ANONYMOUS_IP_BLOCKED"
  | "CONCURRENT_STREAMS_LIMIT_REACHED"
  | "DEVICE_BLOCKED"
  | "DOWNLOAD_BLOCKED"
  | "EPG_PLAY_MAX_HOURS"
  | "GAP_IN_EPG"
  | "GEO_BLOCKED"
  | "LICENSE_EXPIRED"
  | "NOT_AVAILABLE_IN_FORMAT"
  | "NOT_ENABLED"
  | "NOT_ENTITLED"
  | "SUCCESS";

export interface EpgInfo {
  enabled?: boolean;
  entitlementCheck?: boolean;
}

export interface EpgSearchHits {
  items?: ChannelEPGResponse[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  suggestion?: string;
  /** @format int64 */
  totalCount?: number;
}

export interface Event {
  asset?: Asset;
  /** The id of the asset this program is for. */
  assetId?: string;
  /** @format date-time */
  endTime?: string;
  /** @format date-time */
  startTime?: string;
}

export interface EventDataResponse {
  channelId?: string;
  /** @format date-time */
  endTime?: string;
  id?: string;
  /** @format date-time */
  publicEndTime?: string;
  /** @format date-time */
  publicStartTime?: string;
  /** @format date-time */
  startTime?: string;
}

export interface EventList {
  items?: Event[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int64 */
  totalCount?: number;
}

export interface ExchangeTokenRequest {
  /** The CRM token to exchange. */
  crmToken: string;
  device: Device;
  /** The device id. */
  deviceId: string;
}

export interface ExternalPaymentConfig {
  enabled?: boolean;
  externalPaymentUrl?: string;
}

export interface ExternalReference {
  locator?: string;
  type?: string;
  value?: string;
}

export interface ExternalReferenceResponse {
  locator?: string;
  type?: string;
  value?: string;
}

export interface ExternalUserSessionRequest {
  /** Will be used as accountId and, if userId is not provided, as userId */
  accountId: string;
  device: DeviceRegistration;
  /**
   * The time that the session should expire.
   * @format date-time
   */
  expiration: string;
  /** Optional userId, if not provided accountId will be used also as userId */
  userId?: string;
}

export interface FacebookLoginRequest {
  /** Facebook access token (oauth2). */
  accessToken: string;
  device: Device;
  /** The device id. */
  deviceId: string;
  /** If the session should have a longer lifetime. */
  rememberMe?: boolean;
}

export interface FairplayConfigurationResponse {
  certificateUrl?: string;
  licenseAcquisitionUrl?: string;
  secondaryMediaLocator?: string;
}

export interface Filters {
  filters?: FiltersFilter[];
}

export interface FiltersFilter {
  type?: string;
  value?: string;
}

export interface FirebaseAuthenticationRequest {
  /** Firebase access token. */
  accessToken?: string;
  device: DeviceRegistration;
  /** Display name, used for Firebase user creation. */
  displayName?: string;
  /** Email, used for Firebase user creation. */
  email?: string;
  /** Email verified, used for Firebase user creation. */
  emailVerified?: boolean;
  /**
   * When should the session created by this authentication request expire
   * and force the user to log in again.
   */
  expiration?: string;
  /** The user's preferred language. Only used if first login when creating the user */
  language?: string;
  /** Firebase provider, used for Firebase user creation. */
  providerId?: string;
  /** The users login name, 'firebase..&lt;uid&gt;' */
  username: string;
}

export interface FrontendFeatures {
  customAccountPageUrl?: string;
  customLandingPageUrl?: string;
  customPasswordResetPageUrl?: string;
  customSignupPageUrl?: string;
  searchLocales?: string[];
  shouldAlwaysUseAnonymousLogin?: boolean;
}

export interface GetAllUserContentRatingsForAssetResponse {
  assetId?: string;
  /** @format date-time */
  creationDate?: string;
  /** @format date-time */
  lastModificationDate?: string;
  /** @format double */
  rating?: number;
  userId?: string;
}

export interface GetAllUserContentRatingsForUserResponse {
  assetId?: string;
  /** @format date-time */
  creationDate?: string;
  /** @format date-time */
  lastModificationDate?: string;
  /** @format double */
  rating?: number;
}

export interface GetUserContentRatingResponse {
  /** @format date-time */
  creationDate?: string;
  /** @format date-time */
  lastModificationDate?: string;
  /** @format double */
  rating?: number;
}

export interface GigyaAuthenticationRequest {
  device: DeviceRegistration;
  /** Gigya JWT. */
  jwt: string;
  /** The user's preferred language. Only used if first login when creating the user */
  language?: string;
}

export interface GooglePlayConfig {
  enabled?: boolean;
}

export interface GooglePlayPurchaseInitializeRequest {
  /** Single asset id that the purchase will entitle. Requires that the product offering requires "direct asset purchases". */
  assetId?: string;
}

export interface GooglePlayPurchaseInitializeResponse {
  /** To used as obfuscatedAccountId */
  obfuscatedAccountId?: string;
  /** To used as obfuscatedProfileId */
  obfuscatedProfileId?: string;
  purchaseId?: string;
  transactionId?: string;
}

export interface GooglePlayPurchaseVerifyRequest {
  /** As received in the Google Play Purchase. */
  purchaseToken: string;
}

export interface GooglePlayPurchaseVerifyResponse {
  transactionStatus?: StoreTransactionStatus;
}

export interface HtmlDocument {
  body?: string;
  url?: string;
}

export interface Image {
  /** @format int32 */
  height?: number;
  orientation?: ImageOrientation;
  /** @format int32 */
  priority?: number;
  type?: string;
  url?: string;
  /** @format int32 */
  width?: number;
}

export type ImageOrientation = "LANDSCAPE" | "PORTRAIT" | "SQUARE" | "UNKNOWN";

export interface ImageResponse {
  caption?: string;
  copyright?: string;
  /** @format int32 */
  height?: number;
  orientation?: ImageOrientation;
  /** @format int32 */
  priority?: number;
  type?: string;
  url?: string;
  /** @format int32 */
  width?: number;
}

export interface InitialisePayment {
  /** id of the product offering to get methods and price for. */
  productOfferingId?: string;
  /** Optional voucher code. */
  voucherCode?: string;
}

export interface InitializePaymentResponse {
  stripe?: StripePaymentMethodsAndPrice;
}

export interface IsEntitledResponse {
  /** The status of the payment. */
  paymentDone?: boolean;
  /** The status of the entitlement. */
  status?: EntitlementStatus;
}

export interface JsonAccount {
  accountId?: string;
  businessUnit?: string;
  /** @format date-time */
  created?: string;
  customer?: string;
  /** @format date-time */
  expires?: string;
  labels?: Record<string, string>;
  /** @format date-time */
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

export interface LastViewedAssetList {
  items?: Asset[];
}

export interface LastViewedOffset {
  assetId?: string;
  channelId?: string;
  /** @format int64 */
  lastViewedOffset?: number;
  /** @format int64 */
  lastViewedTime?: number;
  /** @format int64 */
  liveTime?: number;
  programId?: string;
  userId?: string;
}

export interface LastViewedOffsetList {
  /** @format int32 */
  count?: number;
  items?: LastViewedOffset[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
}

export interface LinkedEntity {
  entityId?: string;
  entityType?: string;
  linkType?: string;
}

export interface LinkedEntityResponse {
  entityId?: string;
  entityType?: string;
  linkType?: string;
}

export interface LocaleConfig {
  currencies?: string[];
  defaultLocale?: string;
  displayLocales?: string[];
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

export interface LocalizedPersonData {
  bio?: string;
  locale?: string;
}

export interface LocalizedPersonDataResponse {
  bio?: string;
  locale?: string;
}

export interface LocalizedTag {
  description?: string;
  images?: Image[];
  locale?: string;
  title?: string;
}

export interface LocalizedTitle {
  locale?: string;
  title?: string;
}

export interface Location {
  /** ISO country code or null if unknown. */
  countryCode?: string;
  /** true if location is known. */
  locationKnown: boolean;
}

export interface LoginRequest {
  device: Device;
  /** The device id. */
  deviceId: string;
  /**
   * TRUE: Consent to collect personal information is given.
   * FALSE or null: consent is not given now. This may be fine if consent already is given.
   */
  informationCollectionConsentGivenNow?: boolean;
  /** The password of the user. */
  password: string;
  /** If the session should have a longer lifetime. */
  rememberMe?: boolean;
  /** The username to login. */
  username: string;
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
  /**
   * The time when the session expires
   * @format date-time
   */
  expirationDateTime?: string;
  /** @format date-time */
  informationCollectionConsentGiven?: string;
  /** @format date-time */
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

export type Map = object;

export interface Marker {
  adMarkerType?: string;
  /** @format int32 */
  offset?: number;
  url?: string;
}

export interface MarkerPoint {
  /** @format int64 */
  endOffset?: number;
  localized?: SimpleLocalizedData[];
  /** @format int64 */
  offset?: number;
  thumbnail?: string;
  type?: string;
}

export interface MarkerPointResponse {
  localized?: SimpleLocalizedResponse[];
  markerTime?: string;
  markerTimeEnd?: string;
  thumbnail?: boolean;
  type?: string;
}

export interface MaterialResponse {
  adMarkers?: Marker[];
  audioTracks?: string[];
  defaultAudioTrack?: string;
  duration?: string;
  markerPoints?: MarkerPointResponse[];
  materialType?: AssetMaterialType;
  profile?: string[];
  subtitles?: string[];
  /** @format date-time */
  validFrom?: string;
  /** @format date-time */
  validTo?: string;
  /** @format int32 */
  version?: number;
}

export interface Media {
  /** The DRM of the media. */
  drm?: string;
  /**
   * The duration of the media in milliseconds.
   * @format int64
   */
  durationMillis?: number;
  /** The streaming format of the media. */
  format?: string;
  /**
   * The height in pixels.
   * @format int32
   */
  height?: number;
  /** The id of the media. */
  mediaId?: string;
  /** The name of the media. */
  name?: string;
  /** The id of the EPG program this media is for. */
  programId?: string;
  /** The status of the media. "enabled" if playable. */
  status?: string;
  /**
   * The width in pixels.
   * @format int32
   */
  width?: number;
}

export interface MediaFormat {
  drm?: DRMLicense;
  format?: MediaFormatType;
  /** @format int32 */
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

export type MediaFormatType = "AAC" | "DASH" | "HLS" | "MP3" | "MP4" | "SMOOTHSTREAMING" | "SYNDICATED";

export interface MediaResponse {
  bitrates?: number[];
  /** @format date-time */
  changed?: string;
  /** @format date-time */
  created?: string;
  drm?: string;
  /** @format int64 */
  duration?: number;
  format?: string;
  /** @format int32 */
  height?: number;
  ingestionProfile?: string;
  keyId?: string;
  mediaId?: string;
  mediaLocator?: string;
  name?: string;
  programId?: string;
  status?: string;
  subtitles?: SubtitleResponse[];
  /** @format int32 */
  width?: number;
}

export interface Message {
  message?: string;
}

export interface MultiSearchResponse {
  assetHits?: SearchList;
  tagHits?: TagSearchList;
}

export interface OAuthLoginRequest {
  /** OAuth access token (oauth2). */
  accessToken: string;
  device: Device;
  /** The device id. */
  deviceId: string;
  /** If the session should have a longer lifetime. */
  rememberMe?: boolean;
  /** The OAuth provider type. */
  type: string;
}

export interface OauthAuthenticationRequest {
  device: DeviceRegistration;
  /** The user's preferred language. Only used if firebase login creating the user */
  language?: string;
  /** OAuth access token. */
  token: string;
}

export type Object = object;

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

export interface ParentalRatingResponse {
  country?: string;
  rating?: string;
  scheme?: string;
}

export interface PasswordHashConfig {
  algorithms?: Algorithm[];
  sharedRandom?: string;
}

export interface PasswordPolicy {
  /**
   * Minimum number character groups used, eg. alfa, ALFA, 0..9, separators
   * @format int32
   */
  minimumGroups?: number;
  /**
   * Minimum number of characters in passwords
   * @format int32
   */
  minimumLength?: number;
}

export interface PasswordTuple {
  algorithm?: Algorithm;
  value?: string;
}

export interface PaymentConfig {
  appstore?: AppStoreConfig;
  external?: ExternalPaymentConfig;
  googleplay?: GooglePlayConfig;
  stripe?: StripeConfig;
  vouchers?: VouchersConfig;
}

export interface PaymentMethod {
  cardSummary?: CardSummary;
  id?: string;
  preferred?: boolean;
}

export interface PaymentMethods {
  methods?: PaymentMethod[];
}

export interface Person {
  /** @format date */
  dateOfBirth?: string;
  /** @format date */
  dateOfDeath?: string;
  function?: string;
  localized?: LocalizedPersonData[];
  name?: string;
  personId?: string;
  role?: string;
}

export interface PersonResponse {
  /** @format date */
  dateOfBirth?: string;
  /** @format date */
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

export interface PinCodeSetRequest {
  /** List of application specified grants returned if PIN is successfully validated. */
  grants: string[];
  /** PIN in clear text. */
  inClear: string;
}

export interface PinCodeValidationRequest {
  /** PIN in clear text to validate. */
  inClear: string;
}

export interface PlayRequest {
  /** The requested DRM. The token will be adapted according to this parameter. */
  drm: "CENC" | "EDRM" | "EDRM_FAIRPLAY" | "FAIRPLAY" | "PLAYREADY" | "UNENCRYPTED";
  /** The requested format. The server will make sure that the asset is available in this format. */
  format: MediaFormatType;
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
  /**
   * Last viewed offset
   * @format int64
   */
  lastViewedOffset?: number;
  /**
   * Last viewed time
   * @format int64
   */
  lastViewedTime?: number;
  /**
   * The datetime of activation of the drm license.
   * @format date-time
   */
  licenseActivation?: string;
  /**
   * The datetime of expiration of the drm license.
   * @format date-time
   */
  licenseExpiration?: string;
  /** The reason of expiration of the drm license. */
  licenseExpirationReason?: EntitlementStatus;
  /** If this is a live entitlement. */
  live?: boolean;
  /**
   * Live time
   * @format int64
   */
  liveTime?: number;
  /**
   * Max bitrate to use
   * @format int32
   */
  maxBitrate?: number;
  /**
   * Max height resolution
   * @format int32
   */
  maxResHeight?: number;
  /** MDN Request Router Url */
  mdnRequestRouterUrl?: string;
  /**
   * The information needed to locate the media. FOR EDRM this will be the media uid, for other formats it's the URL
   * of the media.
   */
  mediaLocator?: string;
  /**
   * Min bitrate to use
   * @format int32
   */
  minBitrate?: number;
  /** Unique id of this playback session, all analytics events for this session should be reported on with this id */
  playSessionId?: string;
  /**
   * Play token to use for either PlayReady or MRR.
   * Will be empty if the status is not SUCCESS.
   */
  playToken?: string;
  /**
   * The expiration of the the play token. The player needs to be initialized and done the play call before this.
   * @format date-time
   */
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
  /** Base64 encoded Authentication XML for buyDRM playback. Should be passed on by the player in the customdata field */
  buyDrmEncodedAuthXml?: string;
  cdn?: CDN;
  /**
   * Number of concurrent sessions
   * @format int32
   */
  concurrentSessionsCount?: number;
  contractRestrictions?: ContractRestrictions;
  /**
   * Duration of the material. This is the new value that MUST be and should stay as milliseconds
   * @format int64
   */
  durationInMilliseconds?: number;
  /**
   * Duration of the material. This is deprecated and must contain duratin in micro seconds and not milliseconds
   * @format int64
   */
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
  /**
   * The material version for the material used in this play response. Just available for testing purposes.
   * @format int32
   */
  materialVersion?: number;
  /** Unique id of this playback session, all analytics events for this session should be reported on with this id */
  playSessionId?: string;
  /** The play token */
  playToken?: string;
  /**
   * The expiration of the the play token. The player needs to be initialized and have done the play call before this.
   * @format int64
   */
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

export interface Popularity {
  /** @format double */
  month?: number;
  /** @format double */
  week?: number;
}

export interface PreferencesListItem {
  id?: string;
  /** @format date-time */
  lastUpdated?: string;
  /** A key value Map */
  metadata?: Map;
  /** @format int32 */
  order?: number;
}

export interface PreferencesListResponse {
  items?: PreferencesListItem[];
  query?: string;
}

export interface PrimetimeAuthenticationRequest {
  device: DeviceRegistration;
  /** The user's preferred language. Only used if first login when creating the user */
  language?: string;
  /** Adobe Primetime AuthZ media token. */
  mediaToken: string;
}

export interface Product {
  anonymousAllowed?: boolean;
  blocked?: boolean;
  businessUnit?: string;
  /** @format date-time */
  changed?: string;
  customer?: string;
  description?: string;
  entitlementRequired?: boolean;
  hasAds?: boolean;
  id?: string;
  name?: string;
  /** @format int32 */
  priority?: number;
}

export interface ProductOfferingPurchase {
  /** Indicates that the user has started to watch the content. */
  activated?: boolean;
  apiStoreProductOffering?: StoreProductOffering;
  assetId?: string;
  businessUnitId?: string;
  customerId?: string;
  /**
   * Start of entitlement.
   * ISO 8601 Date and time
   * @format date-time
   */
  from?: string;
  /** Id of the purchased product offering. */
  productOfferingId?: string;
  /** Id of this purchase. */
  purchaseId?: string;
  /**
   * If present, next time for renewal.
   * ISO 8601 Date and time
   * @format date-time
   */
  renewAt?: string;
  /**
   * Time of purchase.
   * ISO 8601 Date and time
   * @format date-time
   */
  startedAt?: string;
  status?: ProductOfferingPurchaseStatus;
  transactionId?: string;
  /**
   * End of entitlement.
   * ISO 8601 Date and time
   * @format date-time
   */
  until?: string;
}

export type ProductOfferingPurchaseStatus = "FULFILLED" | "PENDING" | "REJECTED";

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

export interface Products {
  products?: Product[];
}

export interface Program {
  channelId?: string;
  /** @format date-time */
  endTime: string;
  programId?: string;
  /** @format date-time */
  startTime: string;
}

export interface ProgramListEntryResponse {
  catchupBlocked?: boolean;
  channelId?: string;
  /** @format date-time */
  endTime?: string;
  programId?: string;
  /** @format date-time */
  publicEndTime?: string;
  /** @format date-time */
  publicStartTime?: string;
  /** @format date-time */
  startTime?: string;
}

export interface ProgramResponse {
  asset?: Asset;
  /** The id of the asset this program is for. */
  assetId?: string;
  /**
   * If this program is currently published as blackout. This means any publication contains blackout, not global
   * blackout;
   */
  blackout?: boolean;
  /** If this asset is currently available as rough cut that is not expired. */
  catchup?: boolean;
  /** If this asset is currently blocked for catchup. */
  catchupBlocked?: boolean;
  /**
   * The date the program was changed.
   * @format date-time
   */
  changed?: string;
  /** The id of the channel this program is on. */
  channelId?: string;
  /**
   * The date the program was created.
   * @format date-time
   */
  created?: string;
  /** @format date-time */
  endTime?: string;
  /** The id of the program. */
  programId?: string;
  /** @format date-time */
  startTime?: string;
  /** If this asset is currently available as VOD. */
  vodAvailable?: boolean;
}

export interface Publication {
  availabilityKeys?: string[];
  countries?: string[];
  customData?: JsonNode;
  devices?: DeviceRights[];
  /** @format date-time */
  fromDate?: string;
  products?: string[];
  /** @format date-time */
  publicationDate?: string;
  publicationId?: string;
  rights?: AssetRights;
  services?: string[];
  /** @format date-time */
  toDate?: string;
}

export interface PublicationResponse {
  contractId?: string;
  countries?: string[];
  customData?: JsonNode;
  devices?: Device[];
  /** @format date-time */
  fromDate?: string;
  products?: string[];
  /** @format date-time */
  publicationDate?: string;
  publicationId?: string;
  rights?: Rights;
  services?: string[];
  /** @format date-time */
  toDate?: string;
}

export interface PurchaseRequest {
  /**
   * Single asset id that the purchase will entitle.
   * Requires that the product offering requires "direct asset purchases"
   */
  assetId?: string;
  /**
   * Store payment method for future usage.
   * The details is stored within the used payment provider.
   */
  storePaymentMethod?: boolean;
  stripePurchase?: StripePurchaseRequest;
  /** Voucher code that should be applied to the purchase */
  voucherCode?: string;
}

export interface PurchaseResponse {
  apiStripePurchaseResponse?: StripePurchaseResponse;
  purchase?: StorePurchase;
}

export type PurchaseVerificationRequest = object;

export interface PutUserContentRatingRequest {
  /** @format double */
  rating?: number;
}

export interface QueryParameter {
  name?: string;
  value?: string;
}

export interface RecommendedAssets {
  items?: Asset[];
}

export interface RecommendedWatchNext {
  items?: Asset[];
}

export interface Result {
  type?: string;
  value?: string;
}

export interface Rights {
  /** @format date-time */
  activation?: string;
  airplayBlocked?: boolean;
  amcDebugLogEnabled?: boolean;
  analyticsEnabled?: boolean;
  downloadBlocked?: boolean;
  /** @format date-time */
  expiration?: string;
  ffEnabled?: boolean;
  fourGBlocked?: boolean;
  fwEnabled?: boolean;
  hDMIBlocked?: boolean;
  jailbrokenBlocked?: boolean;
  locationEnabled?: boolean;
  /** @format int32 */
  maxAds?: number;
  /** @format int32 */
  maxBitrate?: number;
  /** @format int32 */
  maxDownloadCount?: number;
  /** @format int64 */
  maxFileSize?: number;
  /** @format int32 */
  maxPlayPosition?: number;
  /** @format int32 */
  maxResHeight?: number;
  /** @format int32 */
  maxResWidth?: number;
  /** @format int32 */
  minBitrate?: number;
  /** @format int32 */
  minPlayPosition?: number;
  /** @format int32 */
  playCount?: number;
  rwEnabled?: boolean;
  sessionShiftEnabled?: boolean;
  streamingBlocked?: boolean;
  threeGBlocked?: boolean;
  wifiBlocked?: boolean;
}

export interface Search {
  asset?: Asset;
  highlightedDescription?: string;
  highlightedTitle?: string;
}

export interface SearchList {
  items?: Search[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  suggestion?: string;
  /** @format int64 */
  totalCount?: number;
}

export interface Season {
  /** @format date-time */
  availableDate?: string;
  /** @format date-time */
  changed?: string;
  /** @format date-time */
  created?: string;
  customData?: JsonNode;
  /** @format int32 */
  endYear?: number;
  /** @format int32 */
  episodeCount?: number;
  episodes?: Asset[];
  externalReferences?: ExternalReference[];
  linkedEntities?: LinkedEntity[];
  localized?: LocalizedData[];
  /** @format date-time */
  publishedDate?: string;
  season?: string;
  seasonId?: string;
  /** @format int32 */
  startYear?: number;
  tags?: Tag[];
  tvShowId?: string;
}

export interface SeasonList {
  items?: Season[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int64 */
  totalCount?: number;
}

export interface SeasonResponse {
  /** @format date-time */
  availableDate?: string;
  /** @format date-time */
  changed?: string;
  /** @format date-time */
  created?: string;
  customData?: JsonNode;
  /** @format int32 */
  endYear?: number;
  /** @format int32 */
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
  /** @format int32 */
  productionYear?: number;
  /** @format date-time */
  publishedDate?: string;
  season?: string;
  seasonId?: string;
  /** @format int32 */
  startYear?: number;
  studio?: string;
  tags?: TagResponse[];
  tvShowId?: string;
}

export interface SentryConfig {
  /** If Sentry is to be enabled */
  enabled?: boolean;
  /**
   * How much reporting to do. 0.0 - 1.0.  0.0 report nothing, 0.5 means report every second session etc.
   * @format double
   */
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

export interface SetPasswordWithTokenRequestV2 {
  credentials: Credentials;
  /**
   * If TRUE consent to information collection is given now
   * If FALSE or null no consent given now. Which is fine if consent is not required or already given
   */
  informationCollectionConsentGivenNow?: boolean;
}

export interface SetPwdWithTokenV3 {
  /**
   * If TRUE consent to information collection is given now
   * If FALSE or null no consent given now. Which is fine if consent is not required or already given
   */
  informationCollectionConsentGivenNow?: boolean;
  /** Password. */
  password: string;
}

export interface SetUserPreferenceRequest {
  /** A key value Map */
  preferences: Map;
}

export interface SimpleDateParam {
  /** @format date */
  date?: string;
  originalValue?: string;
}

export interface SimpleLocalizedData {
  image?: Image;
  locale?: string;
  title?: string;
}

export interface SimpleLocalizedResponse {
  image?: ImageResponse;
  locale?: string;
  title?: string;
}

export interface Sprites {
  /** @format int64 */
  offsetInMs?: number;
  vtt?: string;
  /** @format int32 */
  width?: number;
}

export interface StoreAppStoreReference {
  productId?: string;
}

export interface StoreDiscount {
  discountedOfferingPrice?: StoreProductOfferingPrice;
}

export interface StoreGooglePlayReference {
  skuId?: string;
}

export interface StoreLocalizedMetaData {
  description?: string;
  locale?: string;
  name?: string;
}

export interface StoreLocalizedName {
  locale?: string;
  name?: string;
}

export interface StoreLocalizedTitle {
  locale?: string;
  title?: string;
}

export interface StorePrice {
  amount?: string;
  currency?: string;
  priceClassId?: string;
  recurrence?: "NO_RECURRENCE" | "P1M" | "P1Y" | "P3M" | "P6M" | "P7D";
  rentalLength?: "NO_RENTAL" | "PT120H" | "PT144H" | "PT168H" | "PT24H" | "PT48H" | "PT720H" | "PT72H" | "PT96H";
  vatIncluded?: boolean;
  /** @format double */
  vatPercentage?: number;
}

export interface StorePriceTag {
  /** @format int64 */
  amount?: number;
  currency?: string;
  /** @format int32 */
  fractionDigits?: number;
}

export interface StoreProduct {
  externalId?: string;
  id?: string;
  name?: string;
  preRequisiteProducts?: StoreProduct[];
  prices?: StorePrice[];
  productType?: "AVOD" | "FVOD" | "PACKAGE" | "SVOD" | "TVOD";
  /** @format date-time */
  startTime?: string;
  subProducts?: StoreProduct[];
}

export interface StoreProductOffering {
  accountProductId?: string;
  appStoreReference?: StoreAppStoreReference;
  /** The one-time discounted price on a product offering */
  discount?: StoreProductOfferingDiscount;
  /**
   * If present the time at which entitlement starts, if not present entitlement starts ar time of purchase, ISO 8601 Date and time
   * @format date-time
   */
  entitlementStart?: string | null;
  googlePlayReference?: StoreGooglePlayReference;
  /**
   * Product Offering Id
   * @deprecated
   */
  id?: string;
  localizedMetadata?: StoreLocalizedMetaData[];
  offeringPrice?: StoreProductOfferingPrice;
  /** If present, this is a list of stripe payment method types that are allowed with this offering */
  paymentMethodTypes?: string[];
  productIds?: string[];
  /** Product Offering Id */
  productOfferingId?: string;
  /** Type of offering: purchase, rental, event, subscription */
  productOfferingType?: string;
  /** if true, purchase of single asset. The assetId must be provided in the purchase */
  productRequiresSelectAsset?: boolean | null;
  /** Recurrence interval, ISO 8601 Duration */
  recurrence?: string | null;
  /** Rental expiry window, ISO 8601 Duration */
  rentalExpiryWindow?: string | null;
  /** Rental length, ISO 8601 Duration */
  rentalLength?: string;
}

export type StoreProductOfferingDiscount = {
  freePeriod?: {
    chronology?: {
      calendarType?: string;
      id?: string;
    };
    /** @format int32 */
    days?: number;
    /** @format int32 */
    months?: number;
    negative?: boolean;
    units?: {
      dateBased?: boolean;
      duration?: {
        /** @format int32 */
        nano?: number;
        negative?: boolean;
        /** @format int64 */
        seconds?: number;
        zero?: boolean;
      };
      durationEstimated?: boolean;
      timeBased?: boolean;
    }[];
    /** @format int32 */
    years?: number;
    zero?: boolean;
  };
  /** @format int32 */
  numberOfRecurringPayments?: number;
  price?: StorePriceTag;
} | null;

export interface StoreProductOfferingPrice {
  countryCode?: string;
  price?: StorePriceTag;
  vat?: StoreVat;
}

export interface StoreProductOfferings {
  productOfferings?: StoreProductOffering[];
}

export interface StorePromotion {
  businessUnit?: string;
  customer?: string;
  discount?: StoreDiscount;
  id?: string;
  isFullDiscountVoucher?: boolean;
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
  /** @format date-time */
  from?: string;
  id?: string;
  product?: StoreProduct;
  purchaseStatus?: ProductOfferingPurchaseStatus;
  /** @format date-time */
  renewAt?: string;
  status?: ProductOfferingPurchaseStatus;
  transactionId?: string;
  transactions?: StoreTransaction[];
  /** @format date-time */
  until?: string;
}

export interface StorePurchaseTransaction {
  assetId?: string;
  /** @format date-time */
  created?: string;
  /** @format date-time */
  from?: string;
  localizedAsset?: StoreLocalizedTitle[];
  localizedProductOffering?: StoreLocalizedName[];
  productIds?: string[];
  productOfferingId?: string;
  /** Type of offering: purchase, rental, event, subscription */
  productOfferingType?: string;
  /** @format date-time */
  renewAt?: string;
  status?: string;
  transactions?: StoreTransaction[];
  /** @format date-time */
  until?: string;
  voucherCode?: string;
}

export interface StoreTransaction {
  amount?: string;
  /** A key value Map */
  attributes?: Map;
  completedTime?: string;
  paymentProviderRequestId?: string;
  paymentProviderTransactionId?: string;
  paymentProviderType?: string;
  productOfferingId?: string;
  receiptUrl?: string;
  refunded?: boolean;
  status?: StoreTransactionStatus;
  transactionId?: string;
}

export type StoreTransactionStatus = "accepted" | "cancelled" | "pending" | "rejected";

export interface StoreVat {
  included?: boolean;
  /** @format double */
  percentage?: number;
}

export interface StreamInfo {
  channelId?: string;
  /** @format int64 */
  end?: number;
  /** @format int32 */
  endPadding?: number;
  event?: boolean;
  live?: boolean;
  maxResolution?: string;
  nextAssetId?: string;
  nextProgramId?: string;
  persistent?: boolean;
  programId?: string;
  ssai?: boolean;
  /** @format int64 */
  start?: number;
  /** @format int32 */
  startPadding?: number;
  static?: boolean;
  timeShift?: boolean;
}

export interface StripeCard {
  last4?: string;
  brand?: string;
  country?: string;
  /** @format int32 */
  exp_month?: number;
  /** @format int32 */
  exp_year?: number;
}

export interface StripeConfig {
  enabled?: boolean;
  stripePublicKey?: string;
}

export interface StripePaymentMethod {
  card?: StripeCard;
  id?: string;
}

export interface StripePaymentMethodTypeAndPrice {
  /** Name e.g card or ideal */
  name?: string;
  price?: StorePriceTag;
  /** Will payment be recurring */
  recurring?: boolean;
}

export interface StripePaymentMethodsAndPrice {
  /** One entry for each relevant payment method type, such as "card", "ideal" */
  methodTypes?: StripePaymentMethodTypeAndPrice[];
  /** One entry for each relevant wallet, such as "apple", "google" */
  wallets?: StripeWalletAndPrice[];
}

export interface StripePurchaseRequest {
  paymentMethodId?: string;
}

export interface StripePurchaseResponse {
  /**
   * If setupCard == false the clientSecret is paymentIntent clientSecret
   * If setupCard == true the clientSecret is setupIntent clientSecret
   */
  clientSecret?: string;
  /** "card" [, "ideal"]   Are the currently supported types */
  paymentMethodTypes?: string[];
  /** If true setup card else payment */
  setupCard?: boolean;
  status?: string;
  stripeCustomerId?: string;
}

export interface StripeSetupIntentResponse {
  clientSecret?: string;
  id?: string;
}

export interface StripeWalletAndPrice {
  /** Name of wallet e.g apple or google */
  name?: string;
  price?: StorePriceTag;
  /** Will payment be recurring */
  recurring?: boolean;
}

export interface SubtitleResponse {
  language?: string;
  location?: string;
  name?: string;
}

export interface SubtitleTrackInfo {
  /** @format int64 */
  fileSize?: number;
  language?: string;
}

export interface SystemConfig {
  access?: AccessConfig;
  analytics?: AnalyticsConfig;
  frontendFeatures?: FrontendFeatures;
  localization?: LocaleConfig;
  payments?: PaymentConfig;
  playerUrl?: string;
  production?: boolean;
  sentry?: SentryConfig;
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
  /** @format date-time */
  changed?: string;
  /** @format date-time */
  created?: string;
  tagValues?: TagValues[];
  type?: string;
}

export interface TagList {
  items?: TagType[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int64 */
  totalCount?: number;
}

export interface TagResponse {
  /** @format date-time */
  changed?: string;
  /** @format date-time */
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
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  suggestion?: string;
  /** @format int64 */
  totalCount?: number;
}

export interface TagType {
  children?: TagType[];
  localized?: LocalizedTag[];
  parents?: string[];
  scheme?: string;
  tagId?: string;
}

export interface TagValues {
  tagId?: string;
}

export interface TagValuesResponse {
  tagId?: string;
}

export interface TimeResponse {
  /** @format date-time */
  iso8601?: string;
  /** @format int64 */
  epochMillis?: number;
}

export interface Track {
  /** @format int64 */
  bitrate?: number;
  dashChannels?: string;
  dashLang?: string;
  dashRole?: string;
  /** @format int64 */
  fileSize?: number;
  hlsName?: string;
  language?: string;
  name?: string;
}

export interface TrackInfo {
  /** @format int64 */
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

export interface UPHAsset {
  assetId?: string;
  audioTracks?: string[];
  /** @format date-time */
  changed?: string;
  collections?: CollectionReference[];
  /** @format date-time */
  created?: string;
  customData?: JsonNode;
  defaultAudioTrack?: string;
  /** @format int64 */
  duration?: number;
  episode?: string;
  /** @format date-time */
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
  /** A key value Map */
  popularityScores?: Map;
  productionCountries?: string[];
  /** @format int32 */
  productionYear?: number;
  publications?: Publication[];
  /** @format double */
  rating?: number;
  /** @format date */
  releaseDate?: string;
  /** @format int32 */
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

export interface UpdatePaymentMethodRequest {
  /** @format int32 */
  expiryMonth?: number;
  /** @format int32 */
  expiryYear?: number;
  paymentMethodId?: string;
}

export interface UpdatePrederredPaymentMethodRequest {
  paymentMethodId?: string;
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
  /**
   * Last viewed offset, offset in the last play of the asset.
   * @format int64
   */
  lastViewedOffset?: number;
  /** The program id if the asset was viewed as catchup or live. */
  programId?: string;
}

export interface UserAttributeRequest {
  /** id of the attribute */
  attributeId: string;
  /** An object */
  value?: Object;
}

export interface UserAttributeResponse {
  /** id of the attribute */
  attributeId?: string;
  /** An object */
  defaultValue?: Object;
  /** If type = "enum": The enums value set */
  enums?: UserAttributesEnumValue[];
  /** Localized titles and descriptions */
  localized?: UserAttributesLocalizedMetadata[];
  range?: UserAttributesRange;
  /** If true user must provide value */
  requiredAtSignup?: boolean;
  /**
   * Name of type
   * "boolean":  value range null/undefined, false, true,
   * "email": valid email address
   * "string": any string
   * "integer": integer number e.g 1
   * "real": Real/decimal number e.g 1.1
   */
  type?: string;
  /** An object */
  value?: Object;
  /** If true the attribute has been set, potentially with a null/undefined value, in which case the default value is used */
  valueSet?: boolean;
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

export interface UserAttributesRange {
  /** An object */
  max?: Object;
  /** An object */
  min?: Object;
}

export interface UserCapabilities {
  /** True if user name is not equal to the user's email address and the user may change the email address. */
  canChangeEmail?: boolean;
  /** True if the user can change password here. */
  canChangePassword?: boolean;
  /** True if user name equals the user's email address and the user may change this; password required */
  canChangeUserNameAndEmail?: boolean;
  /** True if user can manage user profiles and cancel account */
  canManageAccount?: boolean;
  /** True if user can manage devices */
  canManageDevices?: boolean;
  /** True if user can manage payment methods, such as credit cards */
  canManagePayments?: boolean;
  /** True if user can manage purchase, such as adding and cancelling subscriptions */
  canManagePurchases?: boolean;
}

export interface UserDetailsResponse {
  /** Potentially empty list of attributes */
  attributes?: UserAttributeResponse[];
  capabilities?: UserCapabilities;
  /** If true the user is a child */
  child?: boolean;
  defaultLanguage?: string;
  /** Name used e.g. as email display name, null if not changed */
  displayName?: string;
  /** email address if available */
  email?: string;
  /** Set Language */
  language?: string;
  /** A key value Map */
  metadata?: Map;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration. */
  profileType?: string;
  /** username */
  username?: string;
}

export interface UserDetailsUpdateRequest {
  /** True if user is a child. */
  child?: boolean;
  /**
   * Name used e.g. as email display name, null if not changed.
   * If value is not provided any existing value is unchanged.
   */
  displayName?: string;
  /**
   * Preferred language.
   * If value is not provided any existing value is unchanged.
   */
  language?: string;
  /** A key value Map */
  metadata?: Map;
  /**
   * Application defined value. Can be used e.g. to carry mapping to parental rating configuration.
   * If value is not provided any existing value is unchanged.
   */
  profileType?: string;
}

export interface UserPreferenceResponse {
  /**
   * Last time the preferences where changed.
   * @format date-time
   */
  lastUpdated?: string;
  /** A key value Map */
  preferences?: Map;
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
  /** A key value Map */
  metadata?: Map;
  /** True if user is owner of the account. */
  owner?: boolean;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration. */
  profileType?: string;
  /** UserId of profile. */
  userId?: string;
  /** User name. */
  username?: string;
}

export interface UserProfileCreateRequest {
  /** True if user is a child. */
  child?: boolean;
  /** Name. */
  displayName: string;
  /** Preferred language. */
  language?: string;
  /** A key value Map */
  metadata?: Map;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration. */
  profileType?: string;
}

export interface UserProfiles {
  /** List of pin codes, which may or may not be related to profile management. */
  pinCodes?: PinCodeResponse[];
  /** List user profiles. */
  profiles?: UserProfile[];
}

export interface UserSelfServiceCreateRequestV2 {
  credentials: Credentials;
  device: DeviceRegistration;
  /** Name used e.g. as email display name */
  displayName: string;
  /**
   * Used for e.g. password reset mails
   * Maybe required depending on customer settings
   * EmailAddress must be provided
   */
  emailAddress?: string;
  /**
   * If TRUE consent to information collection is given now
   * If FALSE or null no consent given now.
   */
  informationCollectionConsentGivenNow?: boolean;
  /**
   * Preferred language. If not set fall back to business unit's default language
   * Valid iso 639-1 language code
   */
  language?: string;
}

export interface UserSelfServiceCreateResponse {
  loginResponse?: LoginResponse;
  /**
   * If TRUE the user need to confirm creation bu following email/sms instructions
   * If FALSE the account is good to go.
   */
  unConfirmed?: boolean;
}

export interface UserSelfServiceCreateWithVoucherRequestV2 {
  credentials: Credentials;
  device: DeviceRegistration;
  /**
   * Used for e.g. password reset mails
   * Maybe required depending on customer settings
   * EmailAddress must be provided
   */
  emailAddress?: string;
  /**
   * If TRUE consent to information collection is given now
   * If FALSE or null no consent given now.
   */
  informationCollectionConsentGivenNow?: boolean;
  /** Voucher code */
  voucherCode: string;
}

export interface UserSignupRequestV3 {
  device: DeviceRegistration;
  /** Name used e.g. as email display name */
  displayName: string;
  /**
   * Used for e.g. password reset mails
   * Maybe required depending on customer settings
   * EmailAddress must be provided
   */
  emailAddress?: string;
  /**
   * If TRUE consent to information collection is given now
   * If FALSE or null no consent given now.
   */
  informationCollectionConsentGivenNow?: boolean;
  /**
   * Preferred language. If not set fall back to business unit's default language
   * Valid iso 639-1 language code
   */
  language?: string;
  /** Password. */
  password: string;
}

export interface ValidateCredentialsRequest {
  /** The password to verify if it's the correct one. */
  password: string;
}

export interface ValidateCredentialsResponse {
  /** If the password was valid or not. */
  valid?: boolean;
}

export interface VideoTrack {
  /** @format int64 */
  bitrate?: number;
  dashChannels?: string;
  dashLang?: string;
  dashRole?: string;
  /** @format int64 */
  fileSize?: number;
  /** @format int64 */
  height?: number;
  hlsName?: string;
  language?: string;
  name?: string;
  /** @format int64 */
  width?: number;
}

export interface VideoTrackInfo {
  /** @format int64 */
  fileSize?: number;
  /** @format int32 */
  height?: number;
  targetBitrate?: string;
}

export interface VouchersConfig {
  enabled?: boolean;
}

export interface WatchedTvShowResponse {
  asset?: UPHAsset;
  /** @format int64 */
  lastViewedOffset?: number;
  startedWatching?: boolean;
}

export interface WidevineConfigurationResponse {
  certificateUrl?: string;
}
