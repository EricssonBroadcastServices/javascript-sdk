import { ContentService } from "./services/content-service";
import { ServiceOptions } from "./services/base-service";
import { LocationService } from "./services/location-service";
import { EntitlementService } from "./services/entitlement-service";
import { TagService } from "./services/tag-service";
import { AuthenticationService } from "./services/authentication-service";
import { DocumentService } from "./services/document-service";
import { SearchService } from "./services/search-service";
import { UserService } from "./services/user-service";
import {
  PaymentService,
  CardPaymentDetails,
  VerifyPurchasePayload,
  IPurchaseSettings,
  TPaymentProvider
} from "./services/payment-service";
import { SystemService } from "./services/system-service";
import { PreferencesService } from "./services/preferences-service";
import { WhiteLabelService } from "./services/white-label-service";

/* Models */

export { ILocalizedMetadata, ILocalizedMetadata as Localized } from "./interfaces/content/localized-metadata";
export { ImageOrientation, ImageType, IImage, IImage as ImageModel } from "./interfaces/content/image";
export { IAssetResponse, IAssetResponse as AssetResponse } from "./interfaces/content/asset-response";
export { IDeviceInfo, DeviceType } from "./interfaces/device";
export {
  Asset,
  AssetType,
  Participants,
  ExternalReferences,
  ChannelFeature,
  LinkedEntity,
  LinkType,
  EntityType,
  MarkerType,
  MarkerPoint
} from "./models/asset-model";
export { IPublication, IPublication as Publication } from "./interfaces/content/publication";
export {
  IPlay,
  IPlay as Play,
  DRMType,
  FormatType,
  IDRM,
  IDRM as DRM,
  IFormat,
  IFormat as Format,
  IAds,
  IAds as Ads,
  IAdClip,
  IAdClip as AdClip,
  AdClipCategory,
  Stitcher,
  IStreamInfo,
  IStreamInfo as StreamInfo,
  ISprite,
  ISprite as Sprite,
  IContractRestrictions,
  IContractRestrictions as ContractRestrictions
} from "./interfaces/entitlement/play";
export { Event, EventResponse } from "./models/event-model";
export { IUserLocation, IUserLocation as UserLocation } from "./interfaces/location/user-location";
export {
  IProduct,
  IProduct as Product,
  IProductResponse,
  IProductResponse as ProductResponse,
  IAvailabilityKeysResponse,
  IAvailabilityKeysResponse as AvailabilityKeysResponse
} from "./interfaces/entitlement/product";
export {
  IProductOffering,
  IProductOffering as ProductOffering,
  ProductOfferingType
} from "./interfaces/payment/product-offering";
export {
  IEntitlementError,
  IEntitlementResponse,
  EntitlementActionType,
  IEntitlementActions
} from "./interfaces/entitlement/entitlement";
export { LoginResponse, ISessionResponse } from "./models/login-response-model";
export {
  ICardPaymentResponse,
  ICardPaymentResponse as CardPaymentResponse,
  PurchaseStatus,
  StripePaymentType
} from "./interfaces/payment/card-payment-response";
export { Season, SeasonResponse } from "./models/season-model";
export {
  IAssetTag,
  IAssetTag as Tag,
  IAssetTagCollection,
  IAssetTagCollection as TagCollection
} from "./interfaces/content/asset-tag";
export { ITag, ITag as TagResponse } from "./interfaces/tag/tag";
export { IBookmark, IBookmark as Bookmark } from "./interfaces/content/bookmark";
export { AppConfig } from "./models/app-config-model";
export { Program, EpgResponse, OnNowAsset } from "./models/program-model";
export {
  IPurchase,
  IPurchase as Purchase,
  IPurchaseResponse,
  IPurchaseResponse as PurchaseResponse
} from "./interfaces/payment/purchase";
export {
  ITransaction,
  ITransaction as Transaction,
  ITransactionsWithProductOffering,
  ITransactionsWithProductOffering as TransactionsWithProductOffering
} from "./interfaces/payment/transaction";
export { IUserProfile } from "./interfaces/user/user-profile";
export { IUserDetails, IUserCapabilities, IUserProfileAttribute } from "./interfaces/user/user-details";
export {
  IPasswordAlgorithm,
  IPasswordAlgorithm as PasswordAlgorithm,
  IPasswordHashConfig,
  IPasswordHashConfig as PasswordHashConfig,
  IPasswordPolicy,
  IPasswordPolicy as PasswordPolicy,
  PaymentType,
  ILoginMethod,
  ILoginMethod as LoginMethod,
  ILoginMethodProvider,
  ILoginMethodProvider as LoginMethodProvider,
  LoginMethodType,
  AccessModel,
  SignupModel,
  ISystemConfig
} from "./interfaces/config/system-config";
export { AspectRatio } from "./interfaces/aspect-ratio";
export { ApiError } from "./models/api-error-model";
export { IPaymentMethod as PaymentMethod, IPaymentMethod } from "./interfaces/payment/payment-method";
export { PreferenceListItem } from "./models/preference-model";
export {
  IUserPreferences,
  IPreferenceListItem,
  IPreferenceListTagItem,
  IPreferenceListTags
} from "./interfaces/preferences/preferences";

/* Services */
export {
  ContentService,
  LocationService,
  TagService,
  UserService,
  AuthenticationService,
  SearchService,
  PaymentService,
  DocumentService,
  PreferencesService,
  WhiteLabelService
};
export { EntitlementService, TPlayDrm, TPlayFormat, TAdDeviceType } from "./services/entitlement-service";

/* InterFaces */
export { CardPaymentDetails, VerifyPurchasePayload, IPurchaseSettings, TPaymentProvider };
export * from "./interfaces/white-label/exposure-wl-action";
export * from "./interfaces/white-label/exposure-wl-component";
export * from "./interfaces/white-label/exposure-wl-config";
export * from "./interfaces/white-label/exposure-wl-menu";
export * from "./interfaces/white-label/exposure-wl-page";
export * from "./interfaces/white-label/exposure-wl-presentation";
export * from "./interfaces/white-label/exposure-wl-reference";
export * from "./interfaces/payment/google-play";
export * from "./interfaces/payment/app-store";
export * from "./interfaces/config/system-config-v2";

/* Utils */
export { deserialize } from "./decorators/property-mapper";
export { jsonProperty } from "./decorators/json-property";
export { BaseService, CustomerAndBusinessUnitOptions, ServiceOptions } from "./services/base-service";
export { priceUtils } from "./utils/price";
export {
  IPrice,
  IPrice as Price,
  IDiscount,
  IOfferingPrice,
  IOfferingPrice as OfferingPrice,
  IPromotion,
  IPromotion as Promotion
} from "./interfaces/payment/price";
export { userDetailsUtils } from "./utils/user-details";
export { tagUtils } from "./utils/tag";
export { purchaseUtils } from "./utils/purchase";
export { productOfferingUtils } from "./utils/product-offering";
export { publicationUtils } from "./utils/publication";
export { localizedUtils } from "./utils/localized";
export { systemConfigUtils } from "./utils/system-config-utils";
export class ExposureApi {
  constructor(public options: ServiceOptions) {}
  public authentication = new AuthenticationService(this.options);
  public content = new ContentService(this.options);
  public document = new DocumentService(this.options);
  public location = new LocationService(this.options);
  public tag = new TagService(this.options);
  public entitlements = new EntitlementService(this.options);
  public search = new SearchService(this.options);
  public user = new UserService(this.options);
  public payment = new PaymentService(this.options);
  public preferences = new PreferencesService(this.options);
  public system = new SystemService(this.options);
  public whiteLabel = new WhiteLabelService(this.options);
}
