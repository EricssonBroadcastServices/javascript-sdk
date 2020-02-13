import { ContentService } from "./services/content-service";
import { ServiceOptions } from "./services/base-service";
import { LocationService } from "./services/location-service";
import { EntitlementService } from "./services/entitlement-service";
import { TagService } from "./services/tag-service";
import { CustomerConfigService } from "./services/customer-config-service";
import { AuthenticationService, Credentials, PasswordTuple } from "./services/authentication-service";
import { DocumentService } from "./services/document-service";
import { SearchService } from "./services/search-service";
import { UserService } from "./services/user-service";
import { PaymentService, CardPaymentDetails, VerifyPurchasePayload } from "./services/payment-service";

/* Models */
export { Asset, AssetResponse, AssetType, ImageModel, Localized, Participants } from "./models/asset-model";
export { UserLocation } from "./models/user-location-model";
export { Product, ProductResponse } from "./models/product-model";
export { ProductOffering, ProductOfferingsResponse, OfferingPrice, Price } from "./models/product-offering-model";
export { LoginResponse } from "./models/login-response-model";
export { CardPaymentResponse, PaymentStatus } from "./models/card-payment-response-model";
export { Season, SeasonResponse } from "./models/season-model";
export { Tag, TagCollection } from "./models/tag-model";
export { TagResponse } from "./models/tag-response-model";
export { Bookmark } from "./models/bookmark-model";
export { CustomerConfigFile } from "./models/customer-config-file-model";
export { Program, EpgResponse } from "./models/program-model";
export { Purchase, PurchaseResponse } from "./models/purchase-model";
export { Transaction, TransactionsWithProductOffering } from "./models/transaction-model";
export { UserDetailsResponse } from "./models/user-detail-response-model";

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
export { Credentials, CardPaymentDetails, VerifyPurchasePayload, PasswordTuple };

/* Utils */
export { deserialize } from "./decorators/property-mapper";
export { jsonProperty } from "./decorators/json-property";
export { BaseService } from "./services/base-service";

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
}
