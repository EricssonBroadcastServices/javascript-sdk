/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** A key value Map */
export type Map = object;

/** An object */
export type Object = object;

/** A string values */
export type String = string;

export interface APIErrorMessage {
  /**
   * HTTP Code
   * @format int32
   */
  httpCode?: number;
  /** Error message */
  message?: string;
  /** Extended error message */
  extendedMessage?: string;
}

/** Device details */
export interface DeviceDetails {
  /** The device id. */
  deviceId: string;
  /** The user's name of the device. */
  name: string;
  /** The type of device */
  type?: DeviceDetailsType;
}

export interface LoginRequest {
  /** The users login name, e.g. email address */
  username?: string;
  /** Password */
  password?: string;
  /** Device details */
  device?: DeviceDetails;
  /**
   * true: Consent to collect personal information is given. false or null: consent is not given now. This may be fine if consent already is given.
   * @default false
   */
  informationCollectionConsentGivenNow?: boolean;
}

export interface ApiUserAttributeResponse {
  attributeId?: string;
  type?: string;
  requiredAtSignup?: boolean;
  defaultValue?: object;
  value?: object;
  enums?: ApiUserAttributesEnumValue[];
  range?: ApiUserAttributesRange;
  valueSet?: boolean;
  localized?: ApiUserAttributesLocalizedMetadata[];
}

export interface ApiUserAttributesEnumValue {
  id?: string;
  localized?: ApiUserAttributesLocalizedMetadata[];
}

export interface ApiUserAttributesLocalizedMetadata {
  locale?: string;
  title?: string;
  description?: string;
}

export interface ApiUserAttributesRange {
  min?: object;
  max?: object;
}

export interface ApiUserCapabilities {
  canChangePassword?: boolean;
  canChangeUserNameAndEmail?: boolean;
  canChangeEmail?: boolean;
  canManageAccount?: boolean;
  canManageDevices?: boolean;
  canManagePayments?: boolean;
  canManagePurchases?: boolean;
}

/** User profile */
export interface ApiUserProfile {
  username?: string;
  displayName?: string;
  emailAddress?: string;
  userId?: string;
  child?: boolean;
  owner?: boolean;
  emailAddressRequired?: boolean;
  language?: string;
  capabilities?: ApiUserCapabilities;
  attributes?: ApiUserAttributeResponse[];
}

export interface LoginResponse {
  /** The id of the account. */
  accountId?: string;
  /** The id of the user. */
  userId?: string;
  /** The status of the account. */
  accountStatus?: string;
  /** The token of the underlying CRM to use if talking directly to the CRM. */
  crmToken?: string;
  /**
   * The time when the session expires.
   * @format date-time
   */
  expirationDateTime?: string;
  /** The session token to use for subsequent requests in the header Authorization: Bearer <sessionToken>. */
  sessionToken?: string;
  /**
   * When the consent was given.
   * @format date-time
   */
  informationCollectionConsentGiven?: string;
  /**
   * When, a potentially new, consent need to be given given.
   * @format date-time
   */
  informationCollectionConsentRequiredDate?: string;
  /** user language. */
  language?: string;
  /** If the session limit is reached. If so the session can only be used to manage devices */
  isOverDeviceLimit?: boolean;
  /** is a child user. */
  child?: boolean;
  /** User profile */
  userProfile?: ApiUserProfile;
}

export interface UserDetails {
  /** Name used e.g. as email display name, null if not changed. */
  displayName?: string;
  /** username. */
  username?: string;
  /** email address if available. */
  email?: string;
  /** Set Language. */
  language?: string;
  /** Default Language. */
  defaultLanguage?: string;
  /** is a child user. */
  child?: boolean;
}

export interface TimeResponse {
  /** @format int64 */
  epochMillis?: number;
  /** @format date-time */
  iso8601?: string;
}

export interface ApiAccessConfig {
  accessModel?: ApiAccessConfigAccessModel;
  /** @format int32 */
  signupMinimumAge?: number;
  passwordPolicy?: ApiPasswordPolicy;
  loginMethods?: object;
  signupModel?: ApiAccessConfigSignupModel;
  consentManagement?: ApiConsentManagement;
}

export interface ApiAnalyticsConfig {
  analyticsBaseUrl?: string;
  /** @format int32 */
  analyticsPercentage?: number;
}

export interface ApiAppStoreConfig {
  enabled?: boolean;
}

export interface ApiConsentManagement {
  didomi?: Didomi;
}

export interface ApiExternalPaymentConfig {
  enabled?: boolean;
  externalPaymentUrl?: string;
}

export interface ApiFrontendFeatures {
  shouldAlwaysUseAnonymousLogin?: boolean;
  customLandingPageUrl?: string;
  customSignupPageUrl?: string;
  customAccountPageUrl?: string;
  customPasswordResetPageUrl?: string;
  searchLocales?: string[];
}

export interface ApiGooglePlayConfig {
  enabled?: boolean;
}

export interface ApiLocaleConfig {
  currencies?: string[];
  displayLocales?: string[];
  defaultLocale?: string;
}

export interface ApiPasswordPolicy {
  /**
   * Minimum number of characters in passwords
   * @format int32
   */
  minimumLength?: number;
  /**
   * Minimum number character groups used, eg. alfa, ALFA, 0..9, separators
   * @format int32
   */
  minimumGroups?: number;
}

export interface ApiPaymentConfig {
  appstore?: ApiAppStoreConfig;
  external?: ApiExternalPaymentConfig;
  googleplay?: ApiGooglePlayConfig;
  stripe?: ApiStripeConfig;
  vouchers?: ApiVouchersConfig;
}

export interface ApiSentryConfig {
  /** If Sentry is to be enabled */
  enabled?: boolean;
  /**
   * How much reporting to do. 0.0 - 1.0.  0.0 report nothing, 0.5 means report every second session etc.
   * @format double
   */
  sampleRate?: number;
}

export interface ApiStripeConfig {
  enabled?: boolean;
  stripePublicKey?: string;
}

export interface ApiSystemConfig {
  access?: ApiAccessConfig;
  analytics?: ApiAnalyticsConfig;
  frontendFeatures?: ApiFrontendFeatures;
  localization?: ApiLocaleConfig;
  payments?: ApiPaymentConfig;
  playerUrl?: string;
  production?: boolean;
  sentry?: ApiSentryConfig;
}

export interface ApiVouchersConfig {
  enabled?: boolean;
}

export interface Didomi {
  apiKey?: string;
  noticeId?: string;
  tvNoticeId?: string;
  appNoticeId?: string;
}

export interface ApiLocation {
  /** true if location is known. */
  locationKnown?: boolean;
  /** ISO country code or null if unknown. */
  countryCode?: string;
}

export interface ApiGooglePlayPurchaseVerifyRequest {
  /** As received in the Google Play Purchase. */
  purchaseToken: string;
}

export interface ApiGooglePlayPurchaseVerifyResponse {
  transactionStatus?: ApiGooglePlayPurchaseVerifyResponseTransactionStatus;
}

export interface ApiGooglePlayPurchaseInitializeRequest {
  /** Single asset id that the purchase will entitle. Requires that the product offering requires "direct asset purchases". */
  assetId?: string;
}

export interface ApiGooglePlayPurchaseInitializeResponse {
  /** To used as obfuscatedAccountId */
  obfuscatedAccountId?: string;
  /** To used as obfuscatedProfileId */
  obfuscatedProfileId?: string;
  purchaseId?: string;
  transactionId?: string;
}

export interface ApiAppStorePurchaseVerifyRequest {
  /** As received in the App Store Purchase. */
  transaction: string;
}

export interface ApiAppStorePurchaseVerifyResponse {
  transactionStatus?: ApiAppStorePurchaseVerifyResponseTransactionStatus;
}

export interface ApiAppStorePurchaseInitializeRequest {
  /** Single asset id that the purchase will entitle. Requires that the product offering requires "direct asset purchases". */
  assetId?: string;
}

export interface ApiAppStorePurchaseInitializeResponse {
  /**
   * To used as appAccountToken
   * @format uuid
   */
  appAccountToken?: string;
  purchaseId?: string;
  transactionId?: string;
}

export interface ApiStoreAppStoreReference {
  productId?: string;
}

export interface ApiStoreGooglePlayReference {
  skuId?: string;
}

export interface ApiStoreLocalizedMetaData {
  locale?: string;
  name?: string;
  description?: string;
}

export interface ApiStorePriceTag {
  /** @format int64 */
  amount?: number;
  /** @format int32 */
  fractionDigits?: number;
  currency?: string;
}

export interface ApiStoreProductOffering {
  /** Product Offering Id */
  productOfferingId?: string;
  /** Recurrence interval, ISO 8601 Duration */
  recurrence?: string | null;
  /** Rental length, ISO 8601 Duration */
  rentalLength?: string;
  /** Rental expiry window, ISO 8601 Duration */
  rentalExpiryWindow?: string | null;
  localizedMetadata?: ApiStoreLocalizedMetaData[];
  accountProductId?: string;
  productIds?: string[];
  offeringPrice?: ApiStoreProductOfferingPrice;
  googlePlayReference?: ApiStoreGooglePlayReference;
  appStoreReference?: ApiStoreAppStoreReference;
  /**
   * If present the time at which entitlement starts, if not present entitlement starts ar time of purchase, ISO 8601 Date and time
   * @format date-time
   */
  entitlementStart?: string | null;
  /** The one-time discounted price on a product offering */
  discount?: ApiStoreProductOfferingDiscount;
  /** if true, purchase of single asset. The assetId must be provided in the purchase */
  productRequiresSelectAsset?: boolean | null;
  /** Type of offering: purchase, rental, event, subscription */
  productOfferingType?: string;
  /** If present, this is a list of stripe payment method types that are allowed with this offering */
  paymentMethodTypes?: string[];
  /**
   * Product Offering Id
   * @deprecated
   */
  id?: string;
}

/** The one-time discounted price on a product offering */
export type ApiStoreProductOfferingDiscount = {
  price?: ApiStorePriceTag;
  /** @format int32 */
  numberOfRecurringPayments?: number;
  freePeriod?: {
    /** @format int32 */
    years?: number;
    /** @format int32 */
    months?: number;
    /** @format int32 */
    days?: number;
    units?: {
      duration?: {
        /** @format int64 */
        seconds?: number;
        zero?: boolean;
        negative?: boolean;
        /** @format int32 */
        nano?: number;
      };
      durationEstimated?: boolean;
      dateBased?: boolean;
      timeBased?: boolean;
    }[];
    zero?: boolean;
    negative?: boolean;
    chronology?: {
      calendarType?: string;
      id?: string;
    };
  };
} | null;

export interface ApiStoreProductOfferingPrice {
  price?: ApiStorePriceTag;
  countryCode?: string;
  vat?: ApiStoreVat;
}

export interface ApiStoreVat {
  /** @format double */
  percentage?: number;
  included?: boolean;
}

export interface ApiLocalizedTag {
  description?: string;
  locale?: string;
  title?: string;
  images?: ApiImage[];
}

export interface ApiImage {
  /** @format int32 */
  height?: number;
  orientation?: ApiImageOrientation;
  type?: string;
  url?: string;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  priority?: number;
}

export interface ApiTagType {
  children?: ApiTagType[];
  localized?: ApiLocalizedTag[];
  parents?: string[];
  scheme?: string;
  tagId?: string;
}

export interface ApiTagList {
  items?: ApiTagType[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int64 */
  totalCount?: number;
}

export interface ApiPaymentMethod {
  /** The id of the payment method */
  id?: string;
  cardSummary?: ApiCardSummary;
  /** When the card expires, format yyy-mm-ddThh:mm:ss.fffZ */
  expiry?: string;
  payPalDetails?: ApiPayPalDetails;
  preferred?: boolean;
}

export interface ApiCardSummary {
  /** Type of card, e.g visa */
  brand?: string;
  /** Expiry month e.g. "10" */
  expiryMonth?: string;
  /** Expiry month e.g. "2022" */
  expiryYear?: string;
  /** Last of digits of card number */
  last4?: string;
  /**
   * Origin of the card
   *  E.g. Google Pay, Apple Pay
   *  If empty, consider the origin to be the payment provider.
   */
  origin?: string;
}

export interface ApiPaymentMethods {
  methods?: ApiPaymentMethod[];
}

export interface UpdatePrederredPaymentMethodRequest {
  paymentMethodId?: string;
}

export interface AddPaymentMethodRequest {
  paymentMethodId?: string;
}

export interface ApiPayPalDetails {
  /** The email connected to the PayPal account */
  email?: string;
}

export interface UpdatePaymentMethodRequest {
  /** @format int32 */
  expiryMonth?: number;
  /** @format int32 */
  expiryYear?: number;
  paymentMethodId?: string;
}

export interface ApiHtmlDocument {
  body?: string;
  url?: string;
}

export interface ApiDevicesResponseV2 {
  /** The list of current devices for the account. */
  devices?: ApiDeviceResponseV2[];
}

export interface ApiDeviceResponseV2 {
  deviceId?: string;
  deviceName?: string;
  /** @format date-time */
  deviceCreated?: string;
  /** @format date-time */
  sessionCreated?: string;
  /** @format date-time */
  sessionExpires?: string;
  currentDevice?: boolean;
  aboveDeviceLimit?: boolean;
}

export interface ApiPasswordHashConfig {
  sharedRandom?: string;
  algorithms?: Algorithm[];
}

export interface ApiConsentManagementDidomi {
  apiKey?: string;
  noticeId?: string;
  tvNoticeId?: string;
  appNoticeId?: string;
}

export interface Algorithm {
  algorithmName?: AlgorithmAlgorithmName;
  /** @format int32 */
  pbkdf2Iterations?: number;
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

export interface Filters {
  filters?: FiltersFilter[];
}

export interface ApiComponentFilters {
  locationKnown?: boolean;
  countryCode?: string;
  filters?: Result[];
}

export interface Result {
  type?: string;
  value?: string;
}

export interface FiltersFilter {
  type?: string;
  value?: string;
}

export interface ApiConfigFilesResponse {
  businessUnit?: string;
  customer?: string;
  fileNames?: string[];
}

export interface JsonNode {
  empty?: boolean;
  valueNode?: boolean;
  containerNode?: boolean;
  missingNode?: boolean;
  array?: boolean;
  object?: boolean;
  nodeType?: JsonNodeNodeType;
  pojo?: boolean;
  number?: boolean;
  integralNumber?: boolean;
  floatingPointNumber?: boolean;
  short?: boolean;
  int?: boolean;
  long?: boolean;
  float?: boolean;
  double?: boolean;
  bigDecimal?: boolean;
  bigInteger?: boolean;
  textual?: boolean;
  boolean?: boolean;
  null?: boolean;
  binary?: boolean;
}

export interface ApiConfigFile {
  businessUnit?: string;
  config?: JsonNode;
  customer?: string;
  fileName?: string;
  /** @format int32 */
  version?: number;
  systemConfig?: ApiSystemConfig;
}

export interface ApiGetAllUserContentRatingsForAssetResponse {
  assetId?: string;
  /** @format date-time */
  creationDate?: string;
  /** @format date-time */
  lastModificationDate?: string;
  /** @format double */
  rating?: number;
  userId?: string;
}

export interface ApiGetAllUserContentRatingsForUserResponse {
  assetId?: string;
  /** @format date-time */
  creationDate?: string;
  /** @format date-time */
  lastModificationDate?: string;
  /** @format double */
  rating?: number;
}

export interface ApiGetUserContentRatingResponse {
  /** @format date-time */
  creationDate?: string;
  /** @format date-time */
  lastModificationDate?: string;
  /** @format double */
  rating?: number;
}

export interface ApiPutUserContentRatingRequest {
  /** @format double */
  rating?: number;
}

export interface ApiLinkedEntity {
  entityId?: string;
  entityType?: string;
  linkType?: string;
}

export interface ApiDeviceRights {
  manufacturer?: string;
  model?: string;
  os?: string;
  osVersion?: string;
  rights?: ApiAssetRights;
  type?: ApiDeviceRightsType;
}

export interface ApiTag {
  /** @format date-time */
  changed?: string;
  /** @format date-time */
  created?: string;
  tagValues?: ApiTagValues[];
  type?: string;
}

export interface ApiExternalReference {
  locator?: string;
  type?: string;
  value?: string;
}

export interface ApiTrackInfo {
  targetBitrate?: string;
  /** @format int64 */
  fileSize?: number;
}

export interface ApiAsset {
  assetId?: string;
  audioTracks?: string[];
  /** @format date-time */
  changed?: string;
  /** @format date-time */
  created?: string;
  customData?: JsonNode;
  defaultAudioTrack?: string;
  episode?: string;
  /** @format date-time */
  expires?: string;
  externalReferences?: ApiExternalReference[];
  linkedEntities?: ApiLinkedEntity[];
  live?: boolean;
  localized?: ApiLocalizedData[];
  markers?: Marker[];
  medias?: ApiMedia[];
  originalTitle?: string;
  parentalRatings?: ApiParentalRating[];
  participants?: ApiPerson[];
  /** A key value Map */
  popularityScores?: Map;
  productionCountries?: string[];
  /** @format int32 */
  productionYear?: number;
  publications?: ApiPublication[];
  /** @format double */
  rating?: number;
  studio?: string;
  /** @format date */
  releaseDate?: string;
  /**
   * The duration of the asset in seconds.
   * @format int64
   */
  runtime?: number;
  season?: string;
  seasonId?: string;
  seasons?: ApiSeason[];
  spokenLanguages?: string[];
  subtitles?: string[];
  tags?: ApiTag[];
  tvShowId?: string;
  tvShow?: ApiTvShowInfo;
  type?: ApiAssetType;
  userData?: ApiUserAssetData;
  trackSizes?: ApiTrackSizes;
  materialType?: ApiAssetMaterialType;
  /** @format int64 */
  duration?: number;
  channelFeatures?: ApiAssetChannelFeatures[];
  overlayWidgets?: ApiOverlayWidget[];
  slugs?: string[];
  markerPoints?: ApiMarkerPoint[];
  cuePoints?: ApiMarkerPoint[];
  event?: Event;
  programs?: ApiProgram[];
  collections?: ApiCollectionReference[];
}

export interface ApiSeason {
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
  episodes?: ApiAsset[];
  externalReferences?: ApiExternalReference[];
  linkedEntities?: ApiLinkedEntity[];
  localized?: ApiLocalizedData[];
  /** @format date-time */
  publishedDate?: string;
  season?: string;
  seasonId?: string;
  /** @format int32 */
  startYear?: number;
  tags?: ApiTag[];
  tvShowId?: string;
}

export interface ApiLocalizedPersonData {
  locale?: string;
  bio?: string;
}

export interface ApiCollectionReference {
  collectionId?: string;
}

export interface ApiProgram {
  /** @format date-time */
  endTime?: string;
  /** @format date-time */
  startTime?: string;
  programId?: string;
  channelId?: string;
}

export interface ApiSubtitleTrackInfo {
  language?: string;
  /** @format int64 */
  fileSize?: number;
}

export interface ApiParentalRating {
  /** The two letter country code this rating is for. */
  country?: string;
  /** The rating, allowed values depends on the scheme. */
  rating?: string;
  /** The rating scheme, for instance MPAA. */
  scheme?: string;
}

export interface ApiAssetRights {
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
  /** @format int32 */
  maxDownloadCount?: number;
}

export interface ApiTvShowInfo {
  localizedData?: ApiLocalizedData[];
}

export interface ApiAssetListBulk {
  items?: ApiAsset[];
  /** @format int32 */
  pageSize?: number;
  /** @format int64 */
  totalCount?: number;
  /** @format int64 */
  lastCreatedEpochMillis?: number;
}

export interface ApiUserAssetData {
  playHistory?: ApiUserAssetPlayHistory;
}

export interface ApiAudioTrackInfo {
  language?: string;
  trackInfoList?: ApiTrackInfo[];
}

export interface Marker {
  /** @format int32 */
  offset?: number;
  adMarkerType?: string;
  url?: string;
}

export interface ApiVideoTrackInfo {
  targetBitrate?: string;
  /** @format int64 */
  fileSize?: number;
  /** @format int32 */
  height?: number;
}

export interface ApiTrackSizes {
  audioTracks?: ApiAudioTrackInfo[];
  videoTracks?: ApiVideoTrackInfo[];
  subtitleTracks?: ApiSubtitleTrackInfo[];
}

export interface ApiSimpleLocalizedData {
  locale?: string;
  title?: string;
  image?: ApiImage;
}

export interface ApiMarkerPoint {
  type?: string;
  /** @format int64 */
  offset?: number;
  /** @format int64 */
  endOffset?: number;
  thumbnail?: string;
  localized?: ApiSimpleLocalizedData[];
}

export interface ApiOverlayWidget {
  url?: string;
}

export interface ApiLocalizedData {
  description?: string;
  images?: ApiImage[];
  locale?: string;
  extendedDescription?: string;
  longDescription?: string;
  shortDescription?: string;
  sortingTitle?: string;
  tinyDescription?: string;
  title?: string;
}

export interface ApiMedia {
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

export interface ApiPerson {
  function?: string;
  name?: string;
  personId?: string;
  role?: string;
  /** @format date */
  dateOfBirth?: string;
  /** @format date */
  dateOfDeath?: string;
  localized?: ApiLocalizedPersonData[];
}

export interface ApiUserAssetPlayHistory {
  /** The channel id if the asset was viewed as catchup or live. */
  channelId?: string;
  /**
   * Property is set to "FAILURE" if the data couldn't be received.
   *  If no problem this property is not set.
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

export interface ApiPublication {
  countries?: string[];
  customData?: JsonNode;
  devices?: ApiDeviceRights[];
  /** @format date-time */
  fromDate?: string;
  products?: string[];
  availabilityKeys?: string[];
  /** @format date-time */
  publicationDate?: string;
  publicationId?: string;
  rights?: ApiAssetRights;
  services?: string[];
  /** @format date-time */
  toDate?: string;
}

export interface ApiTagValues {
  tagId?: string;
}

export interface Event {
  /** @format date-time */
  startTime?: string;
  /** @format date-time */
  endTime?: string;
}

export interface ApiUserPreferenceResponse {
  /**
   * Last time the preferences where changed.
   * @format date-time
   */
  lastUpdated?: string;
  /** A key value Map */
  preferences?: Map;
}

export interface ApiPreferencesListItem {
  id?: string;
  /** @format date-time */
  lastUpdated?: string;
  /** A key value Map */
  metadata?: Map;
  /** @format int32 */
  order?: number;
}

export interface ApiAssetListItemRequest {
  /** A key value Map */
  metadata?: Map;
  /**
   * The order to sort by.
   * @format int32
   */
  order?: number;
}

export interface ApiSetUserPreferenceRequest {
  /** A key value Map */
  preferences: Map;
}

export interface ApiPreferencesListResponse {
  items?: ApiPreferencesListItem[];
  query?: string;
}

export interface ApiAssetListItemResponse {
  asset?: ApiAsset;
  assetId?: string;
  /** @format date-time */
  lastUpdated?: string;
  /** A key value Map */
  metadata?: Map;
  /** @format int32 */
  order?: number;
}

export interface ApiEvent {
  asset?: ApiAsset;
  /** The id of the asset this program is for. */
  assetId?: string;
  /** @format date-time */
  endTime?: string;
  /** @format date-time */
  startTime?: string;
}

export interface ApiEventList {
  items?: ApiEvent[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int64 */
  totalCount?: number;
}

export interface ApiSeasonList {
  items?: ApiSeason[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int64 */
  totalCount?: number;
}

export interface ApiDownloadInfoResponse {
  assetId?: string;
  accountId?: string;
  productId?: string;
  publicationId?: string;
  /** @format int64 */
  durationInMs?: number;
  requestId?: string;
  audios?: Track[];
  videos?: VideoTrack[];
  subtitles?: Track[];
  /** @format int32 */
  downloadCount?: number;
  /** @format int32 */
  maxDownloadCount?: number;
}

export interface ApiBookkeeperDownload {
  /** @format date-time */
  time?: string;
  type?: string;
  clientIp?: string;
  deviceId?: string;
  deviceType?: string;
  deviceModelId?: string;
  userId?: string;
}

export interface DRMLicense {
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
  licenseExpirationReason?: DrmLicenseLicenseExpirationReason;
}

export interface Message {
  message?: string;
}

export interface ApiDownloadResponse {
  assetId?: string;
  accountId?: string;
  requestId?: string;
  formats?: MediaFormatDownload[];
  playSessionId?: string;
  playToken?: string;
  /** @format int64 */
  playTokenExpiration?: number;
  playTokenExpirationReason?: string;
  productId?: string;
  publicationId?: string;
  /** @format int64 */
  durationInMs?: number;
  materialId?: string;
  /** @format int32 */
  materialVersion?: number;
  /** @format int32 */
  downloadCount?: number;
  /** @format int32 */
  maxDownloadCount?: number;
  cdn?: CDN;
}

export interface VideoTrack {
  name?: string;
  /** @format int64 */
  bitrate?: number;
  language?: string;
  /** @format int64 */
  fileSize?: number;
  /** @format int64 */
  width?: number;
  /** @format int64 */
  height?: number;
  hlsName?: string;
  dashLang?: string;
  dashRole?: string;
  dashChannels?: string;
}

export interface MediaFormatDownload {
  drm?: DRMLicense;
  format?: MediaFormatDownloadFormat;
  mediaLocator?: string;
}

export interface ApiBookkeeperAccount {
  accountId?: string;
  assets?: ApiBookkeeperAsset[];
}

export interface CDN {
  profile?: string;
  host?: string;
  provider?: string;
}

export interface ApiBookkeeperAsset {
  assetId?: string;
  /** @format int32 */
  downloadCount?: number;
  downloads?: ApiBookkeeperDownload[];
  /** @format date-time */
  changed?: string;
}

export interface Track {
  name?: string;
  /** @format int64 */
  bitrate?: number;
  language?: string;
  /** @format int64 */
  fileSize?: number;
  hlsName?: string;
  dashLang?: string;
  dashRole?: string;
  dashChannels?: string;
}

export interface ApiAssetList {
  items?: ApiAsset[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int64 */
  totalCount?: number;
}

export interface ApiLocalizedTitle {
  locale?: string;
  title?: string;
}

export interface ApiCarousel {
  carouselId?: string;
  items?: ApiAssetList;
  /** @format int32 */
  sortOrder?: number;
  titles?: ApiLocalizedTitle[];
}

export interface ApiActiveChannels {
  apiChannelStatuses?: ApiChannelStatus[];
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  pageNumber?: number;
}

export interface ApiChannelEPGResponse {
  channelId?: string;
  programs?: ApiProgramResponse[];
  /**
   * This is the total number of hits for all channels, not only this.
   * @format int64
   */
  totalHitsAllChannels?: number;
}

export interface ApiChannelStatus {
  channel?: ApiAsset;
  active?: boolean;
  assets?: ApiChannelAsset[];
}

export interface ApiChannelAsset {
  asset?: ApiAsset;
  startTime?: string;
  endTime?: string;
}

export interface SimpleDateParam {
  /** @format date */
  date?: string;
  originalValue?: string;
}

export interface ApiProgramResponse {
  asset?: ApiAsset;
  /** The id of the asset this program is for. */
  assetId?: string;
  /**
   * If this program is currently published as blackout. This means any publication contains blackout, not global
   *  blackout;
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

export interface ApiStorePromotionProductOfferings {
  productOfferings?: ApiStoreProductOffering[];
  promotion?: ApiStorePromotion;
}

export interface ApiInitializePaymentResponse {
  stripe?: ApiStripePaymentMethodsAndPrice;
}

export interface ApiStorePromotion {
  id?: string;
  customer?: string;
  businessUnit?: string;
  discount?: ApiStoreDiscount;
  productOfferingIds?: string[];
  isFullDiscountVoucher?: boolean;
}

export interface ApiStripePurchaseResponse {
  /**
   * If setupCard == false the clientSecret is paymentIntent clientSecret
   *  If setupCard == true the clientSecret is setupIntent clientSecret
   */
  clientSecret?: string;
  /** If true setup card else payment */
  setupCard?: boolean;
  stripeCustomerId?: string;
  status?: string;
  /** "card" [, "ideal"]   Are the currently supported types */
  paymentMethodTypes?: string[];
}

export interface ApiStoreProductOfferings {
  productOfferings?: ApiStoreProductOffering[];
}

export interface ApiStoreDiscount {
  discountedOfferingPrice?: ApiStoreProductOfferingPrice;
}

export interface ApiPurchaseResponse {
  purchase?: ApiStorePurchase;
  apiStripePurchaseResponse?: ApiStripePurchaseResponse;
}

export interface ApiStorePurchaseTransaction {
  productOfferingId?: string;
  productIds?: string[];
  /** @format date-time */
  from?: string;
  /** @format date-time */
  until?: string;
  /** @format date-time */
  renewAt?: string;
  /** @format date-time */
  created?: string;
  status?: string;
  transactions?: ApiStoreTransaction[];
  voucherCode?: string;
  assetId?: string;
}

export interface ApiProductOfferingTransactionsProductOfferingPairList {
  transactionsProductOfferingPairs?: ApiProductOfferingTransactionsProductOfferingPair[];
}

export interface ApiStripePurchaseRequest {
  paymentMethodId?: string;
}

export interface ApiProductOfferingTransactionsProductOfferingPair {
  transactions?: ApiStoreTransaction;
  productOffering?: ApiStoreProductOffering;
}

export interface ApiProductOfferingTransactions {
  transactions?: ApiStoreTransaction[];
}

export interface ApiStorePurchase {
  id?: string;
  transactionId?: string;
  product?: ApiStoreProduct;
  currency?: string;
  amount?: string;
  assetId?: string;
  /** @format date-time */
  from?: string;
  /** @format date-time */
  until?: string;
  /** @format date-time */
  renewAt?: string;
  status?: ApiStorePurchaseStatus;
  purchaseStatus?: ApiStorePurchasePurchaseStatus;
  transactions?: ApiStoreTransaction[];
}

export interface ApiStorePrice {
  priceClassId?: string;
  currency?: string;
  amount?: string;
  vatIncluded?: boolean;
  /** @format double */
  vatPercentage?: number;
  rentalLength?: ApiStorePriceRentalLength;
  recurrence?: ApiStorePriceRecurrence;
}

export interface ApiStripeWalletAndPrice {
  /** Name of wallet e.g apple or google */
  name?: string;
  price?: ApiStorePriceTag;
  /** Will payment be recurring */
  recurring?: boolean;
}

export interface ApiStripePaymentMethodsAndPrice {
  /** One entry for each relevant payment method type, such as "card", "ideal" */
  methodTypes?: ApiStripePaymentMethodTypeAndPrice[];
  /** One entry for each relevant wallet, such as "apple", "google" */
  wallets?: ApiStripeWalletAndPrice[];
}

export interface ApiStoreTransaction {
  transactionId?: string;
  status?: ApiStoreTransactionStatus;
  paymentProviderRequestId?: string;
  text?: string;
  amount?: string;
  completedTime?: string;
  refunded?: boolean;
  paymentProviderTransactionId?: string;
  paymentProviderType?: string;
  productOfferingId?: string;
  receiptUrl?: string;
  /** A key value Map */
  attributes?: Map;
}

export interface ApiStoreProduct {
  id?: string;
  externalId?: string;
  name?: string;
  /** @format date-time */
  startTime?: string;
  productType?: ApiStoreProductProductType;
  preRequisiteProducts?: ApiStoreProduct[];
  prices?: ApiStorePrice[];
  subProducts?: ApiStoreProduct[];
}

export interface ApiInitialisePayment {
  paymentProviderCustomerId?: string;
  /** id of the product offering to get methods and price for. */
  productOfferingId?: string;
  /** Optional voucher code. */
  voucherCode?: string;
}

export interface ApiProductOfferingPurchase {
  customerId?: string;
  businessUnitId?: string;
  /**
   * Time of purchase.
   *  ISO 8601 Date and time
   * @format date-time
   */
  startedAt?: string;
  transactionId?: string;
  assetId?: string;
  /**
   * Start of entitlement.
   *  ISO 8601 Date and time
   * @format date-time
   */
  from?: string;
  /**
   * End of entitlement.
   *  ISO 8601 Date and time
   * @format date-time
   */
  until?: string;
  /** Id of this purchase. */
  purchaseId?: string;
  /**
   * If present, next time for renewal.
   *  ISO 8601 Date and time
   * @format date-time
   */
  renewAt?: string;
  /** Id of the purchased product offering. */
  productOfferingId?: string;
  apiStoreProductOffering?: ApiStoreProductOffering;
  status?: ApiProductOfferingPurchaseStatus;
  /** Indicates that the user has started to watch the content. */
  activated?: boolean;
}

export type ApiPurchaseVerificationRequest = object;

export interface ApiProductOfferingPurchases {
  consumedProductOfferingDiscounts?: string[];
  purchases?: ApiProductOfferingPurchase[];
}

export interface ApiPurchaseRequest {
  stripePurchase?: ApiStripePurchaseRequest;
  /** Voucher code that should be applied to the purchase */
  voucherCode?: string;
  /**
   * Single asset id that the purchase will entitle.
   *  Requires that the product offering requires "direct asset purchases"
   */
  assetId?: string;
  /**
   * Store payment method for future usage.
   *  The details is stored within the used payment provider.
   */
  storePaymentMethod?: boolean;
}

export interface ApiStripePaymentMethodTypeAndPrice {
  /** Name e.g card or ideal */
  name?: string;
  price?: ApiStorePriceTag;
  /** Will payment be recurring */
  recurring?: boolean;
}

export interface Rights {
  sessionShiftEnabled?: boolean;
  /** @format int32 */
  maxAds?: number;
  hDMIBlocked?: boolean;
  fourGBlocked?: boolean;
  ffEnabled?: boolean;
  /** @format int32 */
  minPlayPosition?: number;
  /** @format int32 */
  maxResHeight?: number;
  /** @format int32 */
  maxPlayPosition?: number;
  /** @format int32 */
  maxResWidth?: number;
  /** @format int32 */
  playCount?: number;
  jailbrokenBlocked?: boolean;
  /** @format int64 */
  maxFileSize?: number;
  amcDebugLogEnabled?: boolean;
  locationEnabled?: boolean;
  /** @format int32 */
  minBitrate?: number;
  downloadBlocked?: boolean;
  rwEnabled?: boolean;
  /** @format int32 */
  maxBitrate?: number;
  threeGBlocked?: boolean;
  airplayBlocked?: boolean;
  fwEnabled?: boolean;
  wifiBlocked?: boolean;
  /** @format int32 */
  maxDownloadCount?: number;
  analyticsEnabled?: boolean;
  /** @format date-time */
  expiration?: string;
  streamingBlocked?: boolean;
  /** @format date-time */
  activation?: string;
}

export interface SeasonResponse {
  /** @format int32 */
  episodeCount?: number;
  studio?: string;
  /** @format date-time */
  created?: string;
  tvShowId?: string;
  /** @format date-time */
  publishedDate?: string;
  localizedData?: LocalizedDataResponse[];
  tags?: TagResponse[];
  originalTitleLanguage?: string;
  parentalRatings?: ParentalRatingResponse[];
  externalReferences?: ExternalReferenceResponse[];
  originalTitle?: string;
  seasonId?: string;
  productionCountries?: string[];
  season?: string;
  /** @format int32 */
  startYear?: number;
  linkedEntities?: LinkedEntityResponse[];
  /** @format int32 */
  productionYear?: number;
  customData?: JsonNode;
  /** @format date-time */
  availableDate?: string;
  /** @format int32 */
  endYear?: number;
  episodes?: AssetResponse[];
  participants?: PersonResponse[];
  /** @format date-time */
  changed?: string;
}

export interface TrackInfo {
  /** @format int64 */
  fileSize?: number;
  targetBitrate?: string;
}

export interface SubtitleTrackInfo {
  language?: string;
  /** @format int64 */
  fileSize?: number;
}

export interface CollectionReferenceResponse {
  /** @format int32 */
  sortOrder?: number;
  collectionId?: string;
}

export interface LocalizedDataResponse {
  shortDescription?: string;
  tinyDescription?: string;
  images?: ImageResponse[];
  extendedDescription?: string;
  longDescription?: string;
  sortingTitle?: string;
  description?: string;
  locale?: string;
  title?: string;
}

export interface TagResponse {
  /** @format date-time */
  created?: string;
  tagValues?: TagValuesResponse[];
  type?: string;
  /** @format date-time */
  changed?: string;
}

export interface ApiContinueWatchingAsset {
  assetId?: string;
  audioTracks?: string[];
  /** @format date-time */
  changed?: string;
  /** @format date-time */
  created?: string;
  customData?: JsonNode;
  defaultAudioTrack?: string;
  episode?: string;
  /** @format date-time */
  expires?: string;
  externalReferences?: ExternalReferenceResponse[];
  /** @format double */
  rating?: number;
  spokenLanguages?: string[];
  /** @format date */
  releaseDate?: string;
  type?: ApiContinueWatchingAssetType;
  originalTitleLanguage?: string;
  parentalRatings?: ParentalRatingResponse[];
  originalTitle?: string;
  materialType?: ApiContinueWatchingAssetMaterialType;
  productionCountries?: string[];
  season?: string;
  /** @format int32 */
  productionYear?: number;
  participants?: PersonResponse[];
  trackSizes?: TrackSizes;
  subtitles?: string[];
  live?: boolean;
  seasons?: SeasonResponse[];
  geoCountries?: string[];
  /** @format int32 */
  runtime?: number;
  /** A key value Map */
  popularityScores?: Map;
  localized?: LocalizedDataResponse[];
  tags?: TagResponse[];
  medias?: MediaResponse[];
  seasonId?: string;
  linkedEntities?: LinkedEntityResponse[];
  markers?: Marker[];
  publications?: ApiPublication[];
  tvShowId?: string;
  /** @format int64 */
  duration?: number;
  collections?: ApiCollectionReference[];
  slugs?: string[];
  userData?: ApiUserAssetData;
}

export interface Device {
  os?: string;
  rights?: Rights;
  model?: string;
  osVersion?: string;
  type?: DeviceType;
  manufacturer?: string;
}

export interface AudioTrackInfo {
  language?: string;
  trackInfoList?: TrackInfo[];
}

export interface TagValuesResponse {
  tagId?: string;
}

export interface LinkedEntityResponse {
  entityType?: string;
  linkType?: string;
  entityId?: string;
}

export interface ApiRecommendedWatchNext {
  items?: ApiAsset[];
}

export interface EventDataResponse {
  /** @format date-time */
  publicStartTime?: string;
  /** @format date-time */
  endTime?: string;
  id?: string;
  /** @format date-time */
  startTime?: string;
  /** @format date-time */
  publicEndTime?: string;
  channelId?: string;
}

export interface MaterialResponse {
  duration?: string;
  subtitles?: string[];
  defaultAudioTrack?: string;
  materialType?: MaterialResponseMaterialType;
  profile?: string[];
  audioTracks?: string[];
  /** @format date-time */
  validFrom?: string;
  /** @format int32 */
  version?: number;
  markerPoints?: MarkerPointResponse[];
  /** @format date-time */
  validTo?: string;
  adMarkers?: Marker[];
}

export interface ExternalReferenceResponse {
  type?: string;
  value?: string;
  locator?: string;
}

export interface MediaResponse {
  bitrates?: number[];
  subtitles?: SubtitleResponse[];
  /** @format date-time */
  created?: string;
  format?: string;
  keyId?: string;
  mediaId?: string;
  mediaLocator?: string;
  /** @format int64 */
  duration?: number;
  ingestionProfile?: string;
  name?: string;
  /** @format int32 */
  width?: number;
  drm?: string;
  programId?: string;
  /** @format int32 */
  height?: number;
  status?: string;
  /** @format date-time */
  changed?: string;
}

export interface ImageResponse {
  orientation?: ImageResponseOrientation;
  copyright?: string;
  /** @format int32 */
  width?: number;
  caption?: string;
  type?: string;
  /** @format int32 */
  priority?: number;
  url?: string;
  /** @format int32 */
  height?: number;
}

export interface VideoTrackInfo {
  /** @format int64 */
  fileSize?: number;
  targetBitrate?: string;
  /** @format int32 */
  height?: number;
}

export interface ProgramListEntryResponse {
  catchupBlocked?: boolean;
  /** @format date-time */
  publicStartTime?: string;
  /** @format date-time */
  endTime?: string;
  /** @format date-time */
  startTime?: string;
  /** @format date-time */
  publicEndTime?: string;
  programId?: string;
  channelId?: string;
}

export interface TrackSizes {
  subtitleTracks?: SubtitleTrackInfo[];
  videoTracks?: VideoTrackInfo[];
  audioTracks?: AudioTrackInfo[];
}

export interface LocalizedPersonDataResponse {
  bio?: string;
  locale?: string;
}

export interface Popularity {
  /** @format double */
  week?: number;
  /** @format double */
  month?: number;
}

export interface MarkerPointResponse {
  thumbnail?: boolean;
  localized?: SimpleLocalizedResponse[];
  type?: string;
  markerTimeEnd?: string;
  markerTime?: string;
}

export interface SimpleLocalizedResponse {
  image?: ImageResponse;
  locale?: string;
  title?: string;
}

export interface AssetResponse {
  studio?: string;
  /** @format double */
  rating?: number;
  spokenLanguages?: string[];
  tvShowId?: string;
  episode?: string;
  /** @format date */
  releaseDate?: string;
  type?: AssetResponseType;
  publicCustomData?: JsonNode;
  parentalRatings?: ParentalRatingResponse[];
  mrrCluster?: string;
  originalTitle?: string;
  materialType?: AssetResponseMaterialType;
  collections?: CollectionReferenceResponse[];
  systemTags?: TagResponse[];
  season?: string;
  /** @format int32 */
  productionYear?: number;
  trackSizes?: TrackSizes;
  isLive?: boolean;
  seasons?: SeasonResponse[];
  /** @format date-time */
  created?: string;
  geoCountries?: string[];
  adminDisplayName?: string;
  /** @format int32 */
  runtime?: number;
  localizedData?: LocalizedDataResponse[];
  tags?: TagResponse[];
  slugs?: string[];
  medias?: MediaResponse[];
  seasonId?: string;
  materials?: MaterialResponse[];
  programs?: ProgramListEntryResponse[];
  /** @format date-time */
  changed?: string;
  /** @format date-time */
  expires?: string;
  originalTitleLanguage?: string;
  duration?: string;
  externalReferences?: ExternalReferenceResponse[];
  audioTracks?: string[];
  popularity?: Popularity;
  ingestFlow?: string;
  productionCountries?: string[];
  customData?: JsonNode;
  overlayWidgetLayoutId?: string;
  event?: EventDataResponse;
  participants?: PersonResponse[];
  subtitles?: string[];
  defaultAudioTrack?: string;
  /** A key value Map */
  popularityScores?: Map;
  assetId?: string;
  channelFeatures?: AssetResponseChannelFeatures[];
  linkedEntities?: LinkedEntityResponse[];
  markers?: Marker[];
  publications?: PublicationResponse[];
}

export interface PublicationResponse {
  /** @format date-time */
  toDate?: string;
  devices?: Device[];
  rights?: Rights;
  contractId?: string;
  countries?: string[];
  services?: string[];
  customData?: JsonNode;
  publicationId?: string;
  /** @format date-time */
  publicationDate?: string;
  /** @format date-time */
  fromDate?: string;
  products?: string[];
}

export interface ApiContinueUph2Assets {
  items?: ApiContinueWatchingAsset[];
}

export interface ApiRecommendedAssets {
  items?: ApiAsset[];
}

export interface SubtitleResponse {
  name?: string;
  language?: string;
  location?: string;
}

export interface ParentalRatingResponse {
  country?: string;
  scheme?: string;
  rating?: string;
}

export interface PersonResponse {
  /** @format date */
  dateOfBirth?: string;
  localizedPersonData?: LocalizedPersonDataResponse[];
  role?: string;
  function?: string;
  name?: string;
  personId?: string;
  /** @format date */
  dateOfDeath?: string;
}

export interface ApiTagSearchList {
  items?: ApiTagSearch[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  suggestion?: string;
  /** @format int64 */
  totalCount?: number;
}

export interface ApiTagSearch {
  tag?: ApiTagType;
  highlightedTitle?: string;
}

export interface ApiAutocompleteItem {
  assetId?: string;
  text?: string;
}

export interface ApiEpgSearchHits {
  items?: ApiChannelEPGResponse[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  suggestion?: string;
  /** @format int64 */
  totalCount?: number;
}

export interface ApiSearch {
  asset?: ApiAsset;
  highlightedDescription?: string;
  highlightedTitle?: string;
}

export interface ApiAutocompleteItem2 {
  hitText?: string;
  hitFieldValue?: string;
}

export interface ApiMultiSearchResponse {
  assetHits?: ApiSearchList;
  tagHits?: ApiTagSearchList;
}

export interface ApiSearchList {
  items?: ApiSearch[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  suggestion?: string;
  /** @format int64 */
  totalCount?: number;
}

export interface ApiCredentials {
  passwordTuples: PasswordTuple[];
}

export interface ApiDeviceRegistration {
  /** The device id. */
  deviceId: string;
  /** The user's name of the device. */
  name: string;
  type?: ApiDeviceRegistrationType;
}

export interface ApiChangePasswordResponse {
  loginResponse?: ApiLoginResponse;
}

export interface ApiSetPasswordWithTokenRequestV2 {
  credentials: ApiCredentials;
  /**
   * If TRUE consent to information collection is given now
   *  If FALSE or null no consent given now. Which is fine if consent is not required or already given
   */
  informationCollectionConsentGivenNow?: boolean;
}

export interface ApiPinCodeResponse {
  /** Id of PIN */
  pinId: string;
  /** List of application specified grants */
  grants: string[];
  /** When last modified */
  modified: string;
}

export interface ApiPinCodeValidationRequest {
  /** PIN in clear text to validate. */
  inClear: string;
}

export interface ApiChangePwdV3 {
  /** New Password. */
  newPassword: string;
  /** Old Password. */
  oldPassword: string;
  device: ApiDeviceRegistration;
  /**
   * true: All existing sessions will be cleared
   *  false : other devices' sessions are still valid
   */
  logoutOnAllDevices?: boolean;
}

export interface ApiUserProfileCreateRequest {
  /** Name. */
  displayName: string;
  /** True if user is a child. */
  child?: boolean;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration. */
  profileType?: string;
  /** A key value Map */
  metadata?: Map;
  /** Preferred language. */
  language?: string;
}

export interface ApiQueryParameter {
  name?: string;
  value?: string;
}

export interface ApiDevice {
  /** @format int32 */
  height?: number;
  /** @format int32 */
  width?: number;
  model?: string;
  name?: string;
  os?: string;
  osVersion?: string;
  manufacturer?: string;
  type: ApiDeviceType;
}

export interface ApiUserSelfServiceCreateRequestV2 {
  /** Name used e.g. as email display name */
  displayName: string;
  /**
   * Used for e.g. password reset mails
   *  Maybe required depending on customer settings
   *  EmailAddress must be provided
   */
  emailAddress?: string;
  /**
   * Preferred language. If not set fall back to business unit's default language
   *  Valid iso 639-1 language code
   */
  language?: string;
  /**
   * If TRUE consent to information collection is given now
   *  If FALSE or null no consent given now.
   */
  informationCollectionConsentGivenNow?: boolean;
  credentials: ApiCredentials;
  device: ApiDeviceRegistration;
}

export interface ApiUserDetailsResponse {
  /** Name used e.g. as email display name, null if not changed */
  displayName?: string;
  /** username */
  username?: string;
  /** email address if available */
  email?: string;
  /** Set Language */
  language?: string;
  defaultLanguage?: string;
  /** If true the user is a child */
  child?: boolean;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration. */
  profileType?: string;
  /** A key value Map */
  metadata?: Map;
  capabilities?: ApiUserCapabilities;
  /** Potentially empty list of attributes */
  attributes?: ApiUserAttributeResponse[];
}

export interface ApiConfirmAccountData {
  deviceRegistration?: ApiDeviceRegistration;
}

export interface ApiLabelFilter {
  labelFilterId: string;
}

export interface PasswordTuple {
  algorithm?: Algorithm;
  value?: string;
}

export interface ApiChangeEmailRequest {
  credentials: ApiCredentials;
  /** The new email address */
  newEmailAddress?: string;
}

export interface ApiUserSelfServiceCreateResponse {
  /**
   * If TRUE the user need to confirm creation bu following email/sms instructions
   *  If FALSE the account is good to go.
   */
  unConfirmed?: boolean;
  loginResponse?: ApiLoginResponse;
}

export interface ApiCredentialsV3 {
  password: string;
}

export interface ApiSetPwdWithTokenV3 {
  /** Password. */
  password: string;
  /**
   * If TRUE consent to information collection is given now
   *  If FALSE or null no consent given now. Which is fine if consent is not required or already given
   */
  informationCollectionConsentGivenNow?: boolean;
}

export interface ApiActivationResult {
  status?: ApiActivationResultStatus;
  sessionToken?: string;
  accountId?: string;
  userId?: string;
  userName?: string;
  userDisplayName?: string;
  /** @format date-time */
  sessionExpiryDateTime?: string;
  accountStatus?: string;
  extendedMessage?: string;
  /** @format date-time */
  informationCollectionConsentGiven?: string;
  /** @format date-time */
  informationCollectionConsentRequiredDate?: string;
  customerId?: string;
  businessUnitId?: string;
}

export interface ApiUserProfiles {
  /** List user profiles. */
  profiles?: ApiUserProfile[];
  /** List of pin codes, which may or may not be related to profile management. */
  pinCodes?: ApiPinCodeResponse[];
}

export interface ApiUserSelfServiceCreateWithVoucherRequestV2 {
  /** Voucher code */
  voucherCode: string;
  /**
   * Used for e.g. password reset mails
   *  Maybe required depending on customer settings
   *  EmailAddress must be provided
   */
  emailAddress?: string;
  /**
   * If TRUE consent to information collection is given now
   *  If FALSE or null no consent given now.
   */
  informationCollectionConsentGivenNow?: boolean;
  credentials: ApiCredentials;
  device: ApiDeviceRegistration;
}

export interface ApiUserAttributeRequest {
  /** id of the attribute */
  attributeId: string;
  /** An object */
  value?: Object;
}

export interface ApiActivationRequest {
  device: ApiDevice;
  /** The device id. */
  deviceId: string;
  activationCode: string;
}

export interface ApiActivationCodeResponse {
  /** 6 characters drawn from set 123456789ABCDEF */
  code?: string;
  /** @format date-time */
  expires?: string;
}

export interface ApiActivationRequestV2 {
  /** 6 characters drawn from set 123456789ABCDEF as received from create end-point. */
  activationCode: string;
  device: ApiDeviceRegistration;
}

export interface ApiUserDetailsUpdateRequest {
  /**
   * Name used e.g. as email display name, null if not changed.
   *  If value is not provided any existing value is unchanged.
   */
  displayName?: string;
  /**
   * Preferred language.
   *  If value is not provided any existing value is unchanged.
   */
  language?: string;
  /** True if user is a child. */
  child?: boolean;
  /**
   * Application defined value. Can be used e.g. to carry mapping to parental rating configuration.
   *  If value is not provided any existing value is unchanged.
   */
  profileType?: string;
  /** A key value Map */
  metadata?: Map;
}

export interface ApiPinCodeSetRequest {
  /** PIN in clear text. */
  inClear: string;
  /** List of application specified grants returned if PIN is successfully validated. */
  grants: string[];
}

export interface ApiChangeEmailAndUserNameV3 {
  /** Current Password. */
  password: string;
  /** The new email address and user name */
  newEmailAddressAndUsername?: string;
}

export interface ApiChangePasswordRequest {
  newCredentials: ApiCredentials;
  oldCredentials: ApiCredentials;
  device: ApiDeviceRegistration;
  /**
   * true: All existing sessions will be cleared
   *  false : other devices' sessions are still valid
   */
  logoutOnAllDevices?: boolean;
}

export interface ApiLoginResponse {
  /** The id of the account in the CRM. */
  accountId?: string;
  /** The id of the user in the CRM. */
  userId?: string;
  /** The status of the account. */
  accountStatus?: string;
  /** The token of the underlying CRM to use if talking directly to the CRM. */
  crmToken?: string;
  /**
   * The time when the session expires
   * @format date-time
   */
  expirationDateTime?: string;
  /** The session token to use for subsequent requests. */
  sessionToken?: string;
  /** @format date-time */
  informationCollectionConsentGiven?: string;
  /** @format date-time */
  informationCollectionConsentRequiredDate?: string;
  /** user language */
  language?: string;
  /** If true to many devices are logged in and this session can not be used to play. */
  isOverDeviceLimit?: boolean;
  /** is a child user */
  child?: boolean;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration. */
  profileType?: string;
  configReloadQueryParameter?: ApiQueryParameter;
  /** User profile */
  userProfile?: ApiUserProfile;
}

export interface ApiConfirmAccountResponse {
  loginResponse?: ApiLoginResponse;
}

export interface ApiChangeEmailRequestV3 {
  /** The new email address */
  newEmailAddress?: string;
}

export interface ApiUserSignupRequestV3 {
  /** Name used e.g. as email display name */
  displayName: string;
  /**
   * Used for e.g. password reset mails
   *  Maybe required depending on customer settings
   *  EmailAddress must be provided
   */
  emailAddress?: string;
  /**
   * Preferred language. If not set fall back to business unit's default language
   *  Valid iso 639-1 language code
   */
  language?: string;
  /**
   * If TRUE consent to information collection is given now
   *  If FALSE or null no consent given now.
   */
  informationCollectionConsentGivenNow?: boolean;
  /** Password. */
  password: string;
  device: ApiDeviceRegistration;
}

export interface MediaFormat {
  drm?: DRMLicense;
  format?: MediaFormatFormat;
  mediaLocator?: string;
  orgMediaLocator?: string;
  vastUrl?: string;
  /** @format int32 */
  liveDelay?: number;
}

export interface ApiEntitleResponseV2 {
  /** The account id */
  accountId?: string;
  /** The request id, used for internal debugging. */
  requestId?: string;
  formats?: MediaFormat[];
  /** Identity of the product that permitted playback of the asset */
  productId?: string;
  /** Identity of the publication that permitted playback of the asset. */
  publicationId?: string;
  /**
   * The publication start time
   * @format date-time
   */
  publicationStart?: string;
  /**
   * The publication end time
   * @format date-time
   */
  publicationEnd?: string;
  /** Identity of the entitlement that permitted playback of the asset. */
  entitlementId?: string;
  /**
   * The entitlement start time
   * @format date-time
   */
  entitlementStart?: string;
  /**
   * The entitlement end time
   * @format date-time
   */
  entitlementEnd?: string;
  /**
   * The time the entitle was made for
   * @format date-time
   */
  time?: string;
  streamInfo?: StreamInfo;
  /**
   * Status
   *  Only used when we can actually play something, so at the moment we hard cord SUCCESS to make the move from v1 clients to v2 easy, they might expect SUCCESS
   */
  status?: string;
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

export interface Bookmarks {
  /**
   * Only relevant for VOD.
   *  This is the offset from the start off the VOD is ms
   * @format int64
   */
  lastViewedOffset?: number;
  /**
   * Only relevant for LIVE.
   *  This is the offset from the start of the stream in ms.
   *  Since we always use unix epoch as start for our channels this will be a UNIX timestamp when the user hit pause while watching live
   * @format int64
   */
  liveTime?: number;
}

export interface ApiPlayResponseV2 {
  assetId?: string;
  /** The account id */
  accountId?: string;
  /** Is the material an audio only asset or is it audio+video */
  audioOnly?: boolean;
  /** The request id, used for internal debugging. */
  requestId?: string;
  bookmarks?: Bookmarks;
  contractRestrictions?: ContractRestrictions;
  /** The type of entitlement that granted access to this play. */
  entitlementType?: ApiPlayResponseV2EntitlementType;
  /** Formats */
  formats?: MediaFormat[];
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
  streamInfo?: StreamInfo;
  /**
   * Number of concurrent sessions
   * @format int32
   */
  concurrentSessionsCount?: number;
  /**
   * Duration of the material. This is deprecated and must contain duratin in micro seconds and not milliseconds
   * @format int64
   */
  durationInMs?: number;
  /**
   * Duration of the material. This is the new value that MUST be and should stay as milliseconds
   * @format int64
   */
  durationInMilliseconds?: number;
  /** The material id for the material used in this play response. Just available for testing purposes. */
  materialId?: string;
  /**
   * The material version for the material used in this play response. Just available for testing purposes.
   * @format int32
   */
  materialVersion?: number;
  /** The material profile, materials can be used for different purposes using profiles */
  materialProfile?: string;
  ads?: Ads;
  /** Information about available sprites */
  sprites?: Sprites[];
  /** Type of publishing type, Just available for testing. Should we really return this here? why? */
  publishingType?: string;
  cdn?: CDN;
  analytics?: Analytics;
  epg?: EpgInfo;
}

export interface ApiCencConfigurationResponse {
  "com.microsoft.playready"?: string;
  "com.widevine.alpha"?: string;
}

export interface ApiEDRMConfigurationResponse {
  /** The ad parameter to use. */
  adParameter?: string;
  /** The id of the owner of the media. */
  ownerId?: string;
  /** The url of the server to use. */
  requestUrl?: string;
  /** The user token. */
  userToken?: string;
}

export interface AdMarker {
  id?: string;
  type?: string;
  /** @format int32 */
  offset?: number;
  duration?: string;
}

export interface Ads {
  stitcher?: string;
  stitcherSession?: string;
  stitcherProfileId?: string;
  /** @format int32 */
  insertionDuration?: number;
  /** @format int32 */
  insertionMaxCount?: number;
  adMarkers?: AdMarker[];
  clips?: AdClips[];
}

export interface Sprites {
  /** @format int32 */
  width?: number;
  vtt?: string;
  /** @format int64 */
  offsetInMs?: number;
}

export interface ApiPlayResponse {
  /** If airplay is blocked */
  airplayBlocked?: boolean;
  cencConfig?: ApiCencConfigurationResponse;
  edrmConfig?: ApiEDRMConfigurationResponse;
  /** The type of entitlement that granted access to this play. */
  entitlementType?: ApiPlayResponseEntitlementType;
  fairplayConfig?: ApiFairplayConfigurationResponse;
  widevineConfig?: ApiWidevineConfigurationResponse;
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
  licenseExpirationReason?: ApiPlayResponseLicenseExpirationReason;
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
   *  of the media.
   */
  mediaLocator?: string;
  /** Media locator to used for add servers SDKs */
  adMediaLocator?: string;
  /**
   * Min bitrate to use
   * @format int32
   */
  minBitrate?: number;
  /** Unique id of this playback session, all analytics events for this session should be reported on with this id */
  playSessionId?: string;
  /**
   * Play token to use for either PlayReady or MRR.
   *  Will be empty if the status is not SUCCESS.
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
}

export interface AdClips {
  title?: string;
  titleId?: string;
  category?: string;
  /** @format double */
  duration?: number;
  impressionUrlTemplates?: string[];
  trackingEvents?: AdTrackingEvents;
  videoClicks?: AdVideoClicks;
}

export interface AdTrackingEvents {
  complete?: string[];
  firstQuartile?: string[];
  midpoint?: string[];
  thirdQuartile?: string[];
}

export interface ApiEntitlementResponse {
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
  type?: ApiEntitlementResponseType;
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

export interface ApiWidevineConfigurationResponse {
  certificateUrl?: string;
}

export interface AvailabilityKeys {
  /** @format date-time */
  expiryDate?: string;
  availabilityKeys?: string[];
  currentAvailabilityKeys?: string[];
  futureAvailabilityKeys?: string[];
}

export interface ApiProduct {
  customer?: string;
  businessUnit?: string;
  id?: string;
  name?: string;
  description?: string;
  entitlementRequired?: boolean;
  anonymousAllowed?: boolean;
  hasAds?: boolean;
  /** @format int32 */
  priority?: number;
  blocked?: boolean;
  /** @format date-time */
  changed?: string;
}

export interface Analytics {
  /** @format int32 */
  postInterval?: number;
  /** @format int32 */
  bucket?: number;
  tag?: string;
  baseUrl?: string;
  /** @format int32 */
  percentage?: number;
}

export interface EpgInfo {
  enabled?: boolean;
  entitlementCheck?: boolean;
}

export interface ApiProducts {
  products?: ApiProduct[];
}

export interface ApiPlayRequest {
  /** The requested DRM. The token will be adapted according to this parameter. */
  drm: ApiPlayRequestDrm;
  /** The requested format. The server will make sure that the asset is available in this format. */
  format: ApiPlayRequestFormat;
}

export interface StreamInfo {
  channelId?: string;
  /** @format int64 */
  end?: number;
  static?: boolean;
  live?: boolean;
  event?: boolean;
  programId?: string;
  nextProgramId?: string;
  nextAssetId?: string;
  /** @format int64 */
  start?: number;
  /** @format int32 */
  startPadding?: number;
  /** @format int32 */
  endPadding?: number;
  persistent?: boolean;
  timeShift?: boolean;
  maxResolution?: string;
  ssai?: boolean;
}

export interface ApiFairplayConfigurationResponse {
  certificateUrl?: string;
  licenseAcquisitionUrl?: string;
  secondaryMediaLocator?: string;
}

export interface AdVideoClicks {
  clickThroughUrl?: string;
  clickTrackingUrls?: string[];
}

export interface ApiIsEntitledResponse {
  /** The status of the payment. */
  paymentDone?: boolean;
  /** The status of the entitlement. */
  status?: ApiIsEntitledResponseStatus;
}

export interface ApiSessionResponse {
  /** The account ID. */
  accountId?: string;
  /** The token within the crm. */
  crmToken?: string;
  /** The user / profile id. */
  userId?: string;
  /** If true this session is can only be used to list and log out other devices */
  overTheDeviceLimit?: boolean;
  configReloadQueryParameter?: ApiQueryParameter;
  /** User profile */
  userProfile?: ApiUserProfile;
}

export interface ApiLoginRequest {
  device: ApiDevice;
  /** The device id. */
  deviceId: string;
  /** If the session should have a longer lifetime. */
  rememberMe?: boolean;
  /** The password of the user. */
  password: string;
  /** The username to login. */
  username: string;
  /**
   * TRUE: Consent to collect personal information is given.
   *  FALSE or null: consent is not given now. This may be fine if consent already is given.
   */
  informationCollectionConsentGivenNow?: boolean;
}

export interface ApiAnonymousSessionRequest {
  device: ApiDevice;
  /** The device id. */
  deviceId: string;
}

export interface ApiCreateSessionRequest {
  accountId: string;
  /** If this is an anonymous user. */
  anonymous?: boolean;
  device?: ApiDevice;
  /** The device id. */
  deviceId: string;
  /**
   * The time that the session should expire.
   * @format date-time
   */
  expiration: string;
  userId: string;
}

export interface ApiOauthAuthenticationRequest {
  /** OAuth access token. */
  token: string;
  device: ApiDeviceRegistration;
}

export interface ApiFirebaseAuthenticationRequest {
  /** The users login name, 'firebase..&lt;uid&gt;' */
  username: string;
  /** Email, used for Firebase user creation. */
  email?: string;
  /** Display name, used for Firebase user creation. */
  displayName?: string;
  /** Email verified, used for Firebase user creation. */
  emailVerified?: boolean;
  /** Firebase provider, used for Firebase user creation. */
  providerId?: string;
  /** Firebase access token. */
  accessToken?: string;
  device: ApiDeviceRegistration;
  /**
   * When should the session created by this authentication request expire
   *  and force the user to log in again.
   */
  expiration?: string;
}

export interface ApiDeleteUsersSessionsRequest {
  /** The users login name */
  username: string;
}

export interface ValidateCredentialsRequest {
  /** The password to verify if it's the correct one. */
  password: string;
}

export interface ApiOAuthLoginRequest {
  device: ApiDevice;
  /** The device id. */
  deviceId: string;
  /** If the session should have a longer lifetime. */
  rememberMe?: boolean;
  /** OAuth access token (oauth2). */
  accessToken: string;
  /** The OAuth provider type. */
  type: string;
}

export interface ApiExchangeTokenRequest {
  device: ApiDevice;
  /** The device id. */
  deviceId: string;
  /** The CRM token to exchange. */
  crmToken: string;
}

export interface ApiGigyaAuthenticationRequest {
  /** Gigya JWT. */
  jwt: string;
  device: ApiDeviceRegistration;
}

export interface ApiAuthenticationRequest {
  /** The users login name, e.g. email */
  username: string;
  credentials?: ApiCredentials;
  device: ApiDeviceRegistration;
  /**
   * When should the session created by this authentication request expire
   *  and force the user to log in again.
   */
  expiration?: string;
  /**
   * Should the session be unique or connected to a userId.
   *  If true the session will only be connected to an account but not to a user
   */
  sessionUser?: boolean;
  /**
   * TRUE: Consent to collect personal information is given.
   *  FALSE or null: consent is not given now. This may be fine if consent already is given.
   */
  informationCollectionConsentGivenNow?: boolean;
}

export interface ValidateCredentialsResponse {
  /** If the password was valid or not. */
  valid?: boolean;
}

export interface ApiExternalUserSessionRequest {
  accountId?: string;
  device?: ApiDeviceRegistration;
  /**
   * The time that the session should expire.
   * @format date-time
   */
  expiration?: string;
}

export interface ApiAnonymousSessionResponse {
  /** The session token to use for subsequent requests. */
  sessionToken?: string;
  /**
   * The time when the session expires
   * @format date-time
   */
  expirationDateTime?: string;
}

export interface ApiFacebookLoginRequest {
  device: ApiDevice;
  /** The device id. */
  deviceId: string;
  /** If the session should have a longer lifetime. */
  rememberMe?: boolean;
  /** Facebook access token (oauth2). */
  accessToken: string;
}

export interface ApiAuthRequestV3 {
  /** The users login name, e.g. email */
  username: string;
  /** Password. */
  password?: string;
  device: ApiDeviceRegistration;
  /**
   * TRUE: Consent to collect personal information is given.
   *  FALSE or null: consent is not given now. This may be fine if consent already is given.
   */
  informationCollectionConsentGivenNow?: boolean;
}

export interface ApiPrimetimeAuthenticationRequest {
  /** Adobe Primetime AuthZ media token. */
  mediaToken: string;
  device: ApiDeviceRegistration;
}

export interface ApiApiKeyUserSessionRequest {
  /** The users login name */
  username: string;
  device: ApiDeviceRegistration;
  /**
   * When should the session created by this authentication request expire
   *  and force the user to log in again.
   */
  expiration?: string;
  /**
   * Should the session be unique or connected to a userId.
   *  If true the session will only be connected to an account but not to a user
   */
  sessionUser?: boolean;
  /**
   * TRUE: Consent to collect personal information is given.
   *  FALSE or null: consent is not given now. This may be fine if consent already is given.
   */
  informationCollectionConsentGivenNow?: boolean;
}

export interface ApiCreateSessionResponse {
  /** The session token to use for subsequent requests. */
  sessionToken?: string;
  /**
   * The time when the session expires
   * @format date-time
   */
  expirationDateTime?: string;
}

export type EmptyResponse = object;

export interface ApiLastViewedAssetList {
  items?: ApiAsset[];
}

export interface WatchedTvShowResponse {
  asset?: UPHAsset;
  startedWatching?: boolean;
  /** @format int64 */
  lastViewedOffset?: number;
}

export interface UPHAsset {
  assetId?: string;
  audioTracks?: string[];
  /** @format date-time */
  changed?: string;
  /** @format date-time */
  created?: string;
  customData?: JsonNode;
  defaultAudioTrack?: string;
  episode?: string;
  /** @format date-time */
  expires?: string;
  externalReferences?: ExternalReferenceResponse[];
  /** @format double */
  rating?: number;
  spokenLanguages?: string[];
  /** @format date */
  releaseDate?: string;
  type?: UphAssetType;
  originalTitleLanguage?: string;
  parentalRatings?: ParentalRatingResponse[];
  originalTitle?: string;
  materialType?: UphAssetMaterialType;
  productionCountries?: string[];
  season?: string;
  /** @format int32 */
  productionYear?: number;
  participants?: PersonResponse[];
  trackSizes?: TrackSizes;
  subtitles?: string[];
  live?: boolean;
  seasons?: SeasonResponse[];
  geoCountries?: string[];
  /** @format int32 */
  runtime?: number;
  /** A key value Map */
  popularityScores?: Map;
  localized?: LocalizedDataResponse[];
  tags?: TagResponse[];
  medias?: MediaResponse[];
  seasonId?: string;
  linkedEntities?: LinkedEntityResponse[];
  markers?: Marker[];
  publications?: ApiPublication[];
  tvShowId?: string;
  /** @format int64 */
  duration?: number;
  collections?: ApiCollectionReference[];
  slugs?: string[];
}

export interface ApiLastViewedOffset {
  userId?: string;
  assetId?: string;
  channelId?: string;
  /** @format int64 */
  lastViewedOffset?: number;
  /** @format int64 */
  lastViewedTime?: number;
  /** @format int64 */
  liveTime?: number;
  programId?: string;
}

export interface ApiLastViewedOffsetList {
  /** @format int32 */
  count?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  items?: ApiLastViewedOffset[];
}

/** The type of device */
export type DeviceDetailsType = "WEB" | "MOBILE" | "TABLET" | "APPLE_TV" | "SMART_TV" | "CONSOLE" | "STB";

export type ApiAccessConfigAccessModel = "open" | "login" | "pay";

export type ApiAccessConfigSignupModel = "provisioned" | "unconfirmed" | "confirmed";

export type ApiGooglePlayPurchaseVerifyResponseTransactionStatus = "pending" | "accepted" | "rejected" | "cancelled";

export type ApiAppStorePurchaseVerifyResponseTransactionStatus = "pending" | "accepted" | "rejected" | "cancelled";

export type ApiImageOrientation = "PORTRAIT" | "LANDSCAPE" | "SQUARE" | "UNKNOWN";

export type AlgorithmAlgorithmName = "CLEAR" | "PBKDF2" | "NO_PASSWORD";

export type JsonNodeNodeType =
  | "ARRAY"
  | "BINARY"
  | "BOOLEAN"
  | "MISSING"
  | "NULL"
  | "NUMBER"
  | "OBJECT"
  | "POJO"
  | "STRING";

export type ApiDeviceRightsType = "WEB" | "MOBILE" | "TABLET" | "APPLE_TV" | "SMART_TV" | "CONSOLE" | "STB";

export type ApiAssetType =
  | "MOVIE"
  | "TV_SHOW"
  | "EPISODE"
  | "CLIP"
  | "TV_CHANNEL"
  | "AD"
  | "LIVE_EVENT"
  | "COLLECTION"
  | "PODCAST"
  | "PODCAST_EPISODE"
  | "EVENT"
  | "OTHER";

export type ApiAssetMaterialType = "LOW_LATENCY_CHANNEL";

export type ApiAssetChannelFeatures = "VIRTUAL" | "VC_CURATED" | "VC_PERSONALIZED" | "VC_SCHEDULED" | "EPG";

/** The reason of expiration of the drm license. */
export type DrmLicenseLicenseExpirationReason =
  | "SUCCESS"
  | "NOT_ENTITLED"
  | "GEO_BLOCKED"
  | "DOWNLOAD_BLOCKED"
  | "DEVICE_BLOCKED"
  | "LICENSE_EXPIRED"
  | "NOT_AVAILABLE_IN_FORMAT"
  | "CONCURRENT_STREAMS_LIMIT_REACHED"
  | "NOT_ENABLED"
  | "GAP_IN_EPG"
  | "EPG_PLAY_MAX_HOURS"
  | "ANONYMOUS_IP_BLOCKED";

export type MediaFormatDownloadFormat = "DASH" | "SMOOTHSTREAMING" | "HLS" | "MP4" | "SYNDICATED" | "MP3" | "AAC";

export type ApiStorePurchaseStatus = "REJECTED" | "PENDING" | "FULFILLED";

export type ApiStorePurchasePurchaseStatus = "REJECTED" | "PENDING" | "FULFILLED";

export type ApiStorePriceRentalLength =
  | "NO_RENTAL"
  | "PT24H"
  | "PT48H"
  | "PT72H"
  | "PT96H"
  | "PT120H"
  | "PT144H"
  | "PT168H"
  | "PT720H";

export type ApiStorePriceRecurrence = "NO_RECURRENCE" | "P1Y" | "P6M" | "P3M" | "P1M" | "P7D";

export type ApiStoreTransactionStatus = "pending" | "accepted" | "rejected" | "cancelled";

export type ApiStoreProductProductType = "PACKAGE" | "SVOD" | "TVOD" | "AVOD" | "FVOD";

export type ApiProductOfferingPurchaseStatus = "REJECTED" | "PENDING" | "FULFILLED";

export type ApiContinueWatchingAssetType =
  | "MOVIE"
  | "TV_SHOW"
  | "EPISODE"
  | "CLIP"
  | "TV_CHANNEL"
  | "LIVE_EVENT"
  | "AD"
  | "COLLECTION"
  | "PODCAST"
  | "PODCAST_EPISODE"
  | "EVENT"
  | "OTHER";

export type ApiContinueWatchingAssetMaterialType = "LOW_LATENCY_CHANNEL";

export type DeviceType = "WEB" | "MOBILE" | "TABLET" | "APPLE_TV" | "SMART_TV" | "CONSOLE" | "STB";

export type MaterialResponseMaterialType = "LOW_LATENCY_CHANNEL";

export type ImageResponseOrientation = "PORTRAIT" | "LANDSCAPE" | "SQUARE" | "UNKNOWN";

export type AssetResponseType =
  | "MOVIE"
  | "TV_SHOW"
  | "EPISODE"
  | "CLIP"
  | "TV_CHANNEL"
  | "LIVE_EVENT"
  | "AD"
  | "COLLECTION"
  | "PODCAST"
  | "PODCAST_EPISODE"
  | "EVENT"
  | "OTHER";

export type AssetResponseMaterialType = "LOW_LATENCY_CHANNEL";

export type AssetResponseChannelFeatures = "VIRTUAL" | "VC_CURATED" | "VC_PERSONALIZED" | "VC_SCHEDULED" | "EPG";

export type ApiDeviceRegistrationType = "WEB" | "MOBILE" | "TABLET" | "APPLE_TV" | "SMART_TV" | "CONSOLE" | "STB";

export type ApiDeviceType = "WEB" | "MOBILE" | "TABLET" | "APPLE_TV" | "SMART_TV" | "CONSOLE" | "STB";

export type ApiActivationResultStatus =
  | "SUCCESS"
  | "INCORRECT_CREDENTIALS"
  | "MIGRATED_NO_PASSWORD"
  | "DEVICE_LIMIT_EXCEEDED"
  | "SESSION_LIMIT_EXCEEDED"
  | "LOGIN_LOCKED"
  | "THIRD_PARTY_ERROR"
  | "INFORMATION_COLLECTION_CONSENT_MISSING";

export type MediaFormatFormat = "DASH" | "SMOOTHSTREAMING" | "HLS" | "MP4" | "SYNDICATED" | "MP3" | "AAC";

/** The type of entitlement that granted access to this play. */
export type ApiPlayResponseV2EntitlementType = "TVOD" | "SVOD" | "FVOD" | "AVOD";

/** The type of entitlement that granted access to this play. */
export type ApiPlayResponseEntitlementType = "TVOD" | "SVOD" | "FVOD" | "AVOD";

/** The reason of expiration of the drm license. */
export type ApiPlayResponseLicenseExpirationReason =
  | "SUCCESS"
  | "NOT_ENTITLED"
  | "GEO_BLOCKED"
  | "DOWNLOAD_BLOCKED"
  | "DEVICE_BLOCKED"
  | "LICENSE_EXPIRED"
  | "NOT_AVAILABLE_IN_FORMAT"
  | "CONCURRENT_STREAMS_LIMIT_REACHED"
  | "NOT_ENABLED"
  | "GAP_IN_EPG"
  | "EPG_PLAY_MAX_HOURS"
  | "ANONYMOUS_IP_BLOCKED";

/** The type of the entitlement. */
export type ApiEntitlementResponseType = "FVOD" | "SVOD" | "TVOD" | "AVOD" | "INTERNAL";

/** The requested DRM. The token will be adapted according to this parameter. */
export type ApiPlayRequestDrm = "PLAYREADY" | "EDRM" | "EDRM_FAIRPLAY" | "CENC" | "UNENCRYPTED" | "FAIRPLAY";

/** The requested format. The server will make sure that the asset is available in this format. */
export type ApiPlayRequestFormat = "DASH" | "SMOOTHSTREAMING" | "HLS" | "MP4" | "SYNDICATED" | "MP3" | "AAC";

/** The status of the entitlement. */
export type ApiIsEntitledResponseStatus =
  | "SUCCESS"
  | "NOT_ENTITLED"
  | "GEO_BLOCKED"
  | "DOWNLOAD_BLOCKED"
  | "DEVICE_BLOCKED"
  | "LICENSE_EXPIRED"
  | "NOT_AVAILABLE_IN_FORMAT"
  | "CONCURRENT_STREAMS_LIMIT_REACHED"
  | "NOT_ENABLED"
  | "GAP_IN_EPG"
  | "EPG_PLAY_MAX_HOURS"
  | "ANONYMOUS_IP_BLOCKED";

export type UphAssetType =
  | "MOVIE"
  | "TV_SHOW"
  | "EPISODE"
  | "CLIP"
  | "TV_CHANNEL"
  | "LIVE_EVENT"
  | "AD"
  | "COLLECTION"
  | "PODCAST"
  | "PODCAST_EPISODE"
  | "EVENT"
  | "OTHER";

export type UphAssetMaterialType = "LOW_LATENCY_CHANNEL";

/** Select API */
export type GetApiDocsParamsApi = "exposure" | "management";

/** Payment provider */
export type GetOfferingsV3ParamsPaymentProvider = "stripe" | "appstore" | "googleplay" | "external";

/** The asset type to filter by. */
export type GetUniqueTagsFromAssetsParamsAssetType =
  | "MOVIE"
  | "TV_SHOW"
  | "EPISODE"
  | "CLIP"
  | "TV_CHANNEL"
  | "LIVE_EVENT"
  | "AD"
  | "COLLECTION"
  | "PODCAST"
  | "PODCAST_EPISODE"
  | "EVENT"
  | "OTHER";

/** Which document to fetch */
export type GetDocumentParamsDocumentId =
  | "end_user_consent"
  | "end_user_cookie_policy"
  | "end_user_privacy_policy"
  | "end_user_terms_and_conditions"
  | "custom_document"
  | "END_USER_CONSENT"
  | "END_USER_COOKIE_POLICY"
  | "END_USER_PRIVACY_POLICY"
  | "END_USER_TERMS_AND_CONDITIONS"
  | "CUSTOM_DOCUMENT";

/** The asset type to filter by. */
export type ExportAssetsParamsAssetType =
  | "MOVIE"
  | "TV_SHOW"
  | "EPISODE"
  | "CLIP"
  | "TV_CHANNEL"
  | "AD"
  | "LIVE_EVENT"
  | "COLLECTION"
  | "PODCAST"
  | "PODCAST_EPISODE"
  | "EVENT"
  | "OTHER";

/**
 * The set of fields to include by default.
 * @default "ALL"
 */
export type GetSeasonByIdParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/**
 * The set of fields to include by default.
 * @default "ALL"
 */
export type GetSeasonsParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/**
 * The set of fields to include by default.
 * @default "PARTIAL"
 */
export type GetCarouselsForGroupParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/**
 * The set of fields to include by default.
 * @default "PARTIAL"
 */
export type GetCarouselParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/**
 * The sort order. Note that pageNumber * pageSize cannot exceed 10000 or an error will occur.
 * @default "ASC"
 */
export type GetEpgV2ParamsStartDateSort = "ASC" | "DESC";

/**
 * The sort order.
 * @default "ASC"
 */
export type GetEpgForChannelV2ParamsStartDateSort = "ASC" | "DESC";

/**
 * The sort order.
 * @default "ASC"
 */
export type GetEpgForChannelsV2ParamsStartDateSort = "ASC" | "DESC";

/**
 * The set of fields to include by default.
 * @default "ALL"
 */
export type GetAssetParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/**
 * The set of fields to include by default.
 * @default "PARTIAL"
 */
export type GetEpisodesParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/**
 * The set of fields to include by default.
 * @default "PARTIAL"
 */
export type GetCollectionEntriesParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/**
 * Sort entries by the sort order parameter on the collection reference. Sort parameter is the
 *                        tiebreaker.
 */
export type GetCollectionEntriesParamsSortOrder = "ASC" | "DESC";

/**
 * The set of fields to include by default.
 * @default "PARTIAL"
 */
export type GetSeasonsForTvShowParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/**
 * The set of fields to include by default.
 * @default "ALL"
 */
export type GetSeasonParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/** The asset type to filter by. */
export type GetAssetsParamsAssetType =
  | "MOVIE"
  | "TV_SHOW"
  | "EPISODE"
  | "CLIP"
  | "TV_CHANNEL"
  | "AD"
  | "LIVE_EVENT"
  | "COLLECTION"
  | "PODCAST"
  | "PODCAST_EPISODE"
  | "EVENT"
  | "OTHER";

/**
 * The set of fields to include by default.
 * @default "PARTIAL"
 */
export type GetAssetsParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/** If we should only return assets that are allowed to play on this device */
export type GetAssetsParamsDeviceType = "WEB" | "MOBILE" | "TABLET" | "APPLE_TV" | "SMART_TV" | "CONSOLE" | "STB";

export type SearchAssetV3ParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/** The set of fields to include by default. */
export type SearchV3ParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

export type SearchTagsV3ParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

export type SearchParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/** @default "PARTIAL" */
export type SearchEpgParamsFieldSet = "NONE" | "PARTIAL" | "ALL";

/** The set of fields to include by default. */
export type SearchV2ParamsFieldSet = "NONE" | "PARTIAL" | "ALL";
