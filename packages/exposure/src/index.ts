import { ContentService } from "./services/content-service";
import { ServiceOptions } from "./services/base-service";
import { LocationService } from "./services/location-service";
import { EntitlementService } from "./services/entitlement-service";
import { TagService } from "./services/tag-service";
import { CustomerConfigService } from "./services/customer-config-service";
import { AuthenticationService, Credentials, PasswordTuple, DeviceType } from "./services/authentication-service";
import { DocumentService } from "./services/document-service";
import { SearchService } from "./services/search-service";
import { UserService } from "./services/user-service";
import { PaymentService, CardPaymentDetails, VerifyPurchasePayload } from "./services/payment-service";
import { SystemService } from "./services/system-service";

/* Models */
import { SystemConfig, PaymentType } from "./models/system-config-model";
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
export {
  ProductOffering,
  ProductOfferingsResponse,
  OfferingPrice,
  Price,
  Promotion,
  PromotionResponse,
  Discount
} from "./models/product-offering-model";
export { LoginResponse } from "./models/login-response-model";
export {
  CardPaymentResponse,
  AdyenPaymentStatus,
  PurchaseStatus,
  StripePaymentType
} from "./models/card-payment-response-model";
export { Season, SeasonResponse } from "./models/season-model";
export { Tag, TagCollection } from "./models/tag-model";
export { TagResponse } from "./models/tag-response-model";
export { Bookmark } from "./models/bookmark-model";
export { CustomerConfigFile } from "./models/customer-config-file-model";
export { Program, EpgResponse, OnNowAsset } from "./models/program-model";
export { Purchase, PurchaseResponse } from "./models/purchase-model";
export { Transaction, TransactionsWithProductOffering } from "./models/transaction-model";
export { UserDetailsResponse } from "./models/user-detail-response-model";
export { PasswordAlgorithm, PasswordHashConfig } from "./models/system-config-model";
export { PasswordPolicy } from "./models/password-policy-model";
export { AspectRatio } from "./interfaces/aspect-ratio";
export { ApiError } from "./models/api-error-model";
export { PaymentMethod } from "./models/payment-method";

export { SystemConfig, PaymentType };

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
  DocumentService
};

/* InterFaces */
export { Credentials, CardPaymentDetails, VerifyPurchasePayload, PasswordTuple, DeviceType };

/* Utils */
export { deserialize } from "./decorators/property-mapper";
export { jsonProperty } from "./decorators/json-property";
export { BaseService, CustomerAndBusinessUnitOptions, ServiceOptions } from "./services/base-service";
export { getCredentials } from "./utils/credentials";

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
