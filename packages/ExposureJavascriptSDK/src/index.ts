import { ContentService } from "./services/content-service";
import { ServiceOptions } from "./services/base-service";
import { LocationService } from "./services/location-service";
import { EntitlementService } from "./services/entitlement-service";
import { TagService } from "./services/tag-service";
import { CustomerConfigService } from "./services/customer-config-service";
import { AuthenticationService } from "./services/authentication-service";
import { DocumentService } from "./services/document-service";

/* Models */
export { AssetModel } from "./models/Asset";
export { UserLocation } from "./models/UserLocation";
export { Product, ProductResponse } from "./models/Product";

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
}
