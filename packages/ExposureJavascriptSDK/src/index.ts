import { ContentService } from "./services/content-service";
import { ServiceOptions } from "./services/base-service";
import { LocationService } from "./services/location-service";
import { EntitlementService } from "./services/entitlement-service";
import { TagService } from "./services/tag-service";
import { CustomerConfigService } from "./services/customer-config-service";
import { AuthenticationService } from "./services/authentication-service";
import { DocumentService } from "./services/document-service";
import { SearchService } from "./services/search-service";
import { UserService } from "./services/user-service";
import { PaymentService } from "./services/payment-service";

/* Models */
export { AssetModel } from "./models/asset-model";
export { UserLocation } from "./models/user-location-model";
export { Product, ProductResponse } from "./models/product-model";

/* Services */
export { ContentService, LocationService, TagService, EntitlementService };

/* Utils */
export { deserialize } from "./decorators/property-mapper";
export { jsonProperty } from "./decorators/json-property";

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
