import { ContentService } from "./services/content-service";
import { ServiceOptions } from "./services/base-service";
import { LocationService } from "./services/location-service";
import { EntitlementService } from "./services/entitlement-service";
import { TagService } from "./services/tag-service";
import { CustomerConfigService } from "./services/customer-config-service";
import { AuthenticationService, DeviceType } from "./services/authentication-service";
import { DocumentService } from "./services/document-service";
import { SearchService } from "./services/search-service";
import { UserService } from "./services/user-service";
import {
  PaymentService,
  CardPaymentDetails,
  VerifyPurchasePayload,
  IPurchaseSettings
} from "./services/payment-service";
import { SystemService } from "./services/system-service";

/* Models */
import {
  SystemConfig,
  PaymentType,
  LoginMethod,
  LoginMethodProvider,
  LoginMethodType,
  AccessModel,
  SignupModel
} from "./models/system-config-model";
import { PreferencesService } from "./services/preferences-service";

export { Localized, ImageModel, ImageOrientation, ImageType } from "./models/localized-model";
export {
  Asset,
  AssetResponse,
  AssetType,
  Participants,
  Publication,
  ExternalReferences,
  ChannelFeature,
  LinkedEntity,
  LinkType,
  EntityType,
  MarkerType,
  MarkerPoint
} from "./models/asset-model";
export {
  Play,
  DRMType,
  FormatType,
  DRM,
  Format,
  Ads,
  AdClip,
  AdClipCategory,
  Stitcher,
  StreamInfo,
  Sprite,
  ContractRestrictions
} from "./models/play-model";
export { Event, EventResponse } from "./models/event-model";
// alias for backwards compatibility
export { IUserLocation, IUserLocation as UserLocation } from "./interfaces/user-localtion";
export { Product, ProductResponse, AvailabilityKeysResponse } from "./models/product-model";
export {
  ProductOffering,
  ProductOfferingsResponse,
  OfferingPrice,
  Price,
  Promotion,
  PromotionResponse,
  IDiscount
} from "./models/product-offering-model";
export { LoginResponse, ISessionResponse } from "./models/login-response-model";
export {
  ICardPaymentResponse,
  // alias for backwards compatibility
  ICardPaymentResponse as CardPaymentResponse,
  PurchaseStatus,
  StripePaymentType
} from "./interfaces/card-payment-response";
export { Season, SeasonResponse } from "./models/season-model";
export {
  IAssetTag,
  // alias for backwards compatibility
  IAssetTag as Tag,
  IAssetTagCollection,
  // alias for backwards compatibility
  IAssetTagCollection as TagCollection
} from "./interfaces/asset-tag";
export { ITag, ITag as TagResponse } from "./interfaces/tag";
export { IBookmark, IBookmark as Bookmark } from "./interfaces/bookmark";
export { CustomerConfigFile } from "./models/customer-config-file-model";
export { Program, EpgResponse, OnNowAsset } from "./models/program-model";
export { Purchase, PurchaseResponse } from "./models/purchase-model";
export { Transaction, TransactionsWithProductOffering } from "./models/transaction-model";
export { IUserProfile } from "./interfaces/user-profile";
export { IUserDetails, IUserCapabilities, IUserProfileAttribute } from "./interfaces/user-details";
export { PasswordAlgorithm, PasswordHashConfig } from "./models/system-config-model";
export { PasswordPolicy } from "./models/password-policy-model";
export { AspectRatio } from "./interfaces/aspect-ratio";
export { ApiError } from "./models/api-error-model";
export { IPaymentMethod as PaymentMethod, IPaymentMethod } from "./interfaces/payment-method";
export {
  PreferenceListItem,
  PreferenceListTags,
  PreferenceListTagItem,
  UserPreferences
} from "./models/preference-model";

export { SystemConfig, PaymentType, LoginMethod, LoginMethodProvider, LoginMethodType, AccessModel, SignupModel };

/* Services */
export {
  ContentService,
  LocationService,
  TagService,
  UserService,
  AuthenticationService,
  SearchService,
  PaymentService,
  CustomerConfigService,
  DocumentService,
  PreferencesService
};
export { EntitlementService, TPlayDrm, TPlayFormat } from "./services/entitlement-service";

/* InterFaces */
export { CardPaymentDetails, VerifyPurchasePayload, DeviceType, IPurchaseSettings };

/* Utils */
export { deserialize } from "./decorators/property-mapper";
export { jsonProperty } from "./decorators/json-property";
export { BaseService, CustomerAndBusinessUnitOptions, ServiceOptions } from "./services/base-service";
export { priceUtils } from "./utils/price";
export { IPrice } from "./interfaces/price";
export { userDetailsUtils } from "./utils/user-details";
export { tagUtils } from "./utils/tag";
export class ExposureApi {
  constructor(public options: ServiceOptions) {}
  public authentication = new AuthenticationService(this.options);
  public content = new ContentService(this.options);
  public document = new DocumentService(this.options);
  public location = new LocationService(this.options);
  public tag = new TagService(this.options);
  public entitlements = new EntitlementService(this.options);
  public config = new CustomerConfigService(this.options);
  public search = new SearchService(this.options);
  public user = new UserService(this.options);
  public payment = new PaymentService(this.options);
  public preferences = new PreferencesService(this.options);
  public system = new SystemService(this.options);
}
