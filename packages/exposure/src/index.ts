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
import { PaymentService, CardPaymentDetails, VerifyPurchasePayload } from "./services/payment-service";
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
  EntityType
} from "./models/asset-model";
export {
  Play,
  DRMType,
  FormatType,
  DRM,
  Format,
  Stitcher,
  StreamInfo,
  Sprite,
  ContractRestrictions
} from "./models/play-model";
export { Event, EventResponse } from "./models/event-model";
export { UserLocation } from "./models/user-location-model";
export { Product, ProductResponse, AvailabilityKeysResponse } from "./models/product-model";
export { IProductOffering, IOfferingPrice, IPrice } from "./models/store/product-offering/i-product-offering";
export { ProductOfferingUtils } from "./models/store/product-offering/product-offering-utils";
export { IPromotion, IPromotionDiscount, IPromotionResponse } from "./models/store/promotion/i-promotion";
export { LoginResponse } from "./models/login-response-model";
export { ICardPaymentResponse, PurchaseStatus, StripePaymentType } from "./models/store/card-payment/i-card-payment";
export { Season, SeasonResponse } from "./models/season-model";
export { Tag, TagCollection } from "./models/tag-model";
export { TagResponse } from "./models/tag-response-model";
export { IBookmark } from "./models/user-play-history/i-bookmark";
export { CustomerConfigFile } from "./models/customer-config-file-model";
export { Program, EpgResponse, OnNowAsset } from "./models/program-model";
export { IPurchase, IPurchaseResponse } from "./models/store/purchase/i-purchase";
export { PurchaseUtils } from "./models/store/purchase/purchase-utils";
export { ITransaction, ITransactionWithProductOffering } from "./models/store/transaction/i-transaction";
export { UserDetailsResponse } from "./models/user-detail-response-model";
export { PasswordAlgorithm, PasswordHashConfig } from "./models/system-config-model";
export { PasswordPolicy } from "./models/password-policy-model";
export { AspectRatio } from "./interfaces/aspect-ratio";
export { ApiError } from "./models/api-error-model";
export { IPaymentMethod } from "./models/store/payment-method/i-payment-method";
export { PreferenceListItem, PreferenceListTags, PreferenceListTagItem } from "./models/preference-model";
export { IBraintreeSettings } from "./models/store/braintree-settings/i-braintree-settings";
export { SystemConfig, PaymentType, LoginMethod, LoginMethodProvider, LoginMethodType, AccessModel, SignupModel };

/* Services */
export {
  ContentService,
  LocationService,
  TagService,
  EntitlementService,
  UserService,
  AuthenticationService,
  SearchService,
  PaymentService,
  CustomerConfigService,
  DocumentService,
  PreferencesService
};

/* InterFaces */
export { CardPaymentDetails, VerifyPurchasePayload, DeviceType };

/* Utils */
export { deserialize } from "./decorators/property-mapper";
export { jsonProperty } from "./decorators/json-property";
export { BaseService, CustomerAndBusinessUnitOptions, ServiceOptions } from "./services/base-service";

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
