import { ContentService } from "./services/content-service";
import { ServiceOptions } from "./services/base-service";
import { LocationService } from "./services/location-service";
import { EntitlementService } from "./services/entitlement-service";
import { TagService } from "./services/tag-service";

/* Models */
export { Asset } from "./models/Asset";
export { UserLocation } from "./models/UserLocation";
export { Product, ProductResponse } from "./models/Product";

/* Services */
export { ContentService, LocationService, TagService, EntitlementService };

/* Utils */
export { deserialize } from "./decorators/property-mapper";
export { jsonProperty } from "./decorators/json-property";

export class ExposureApi {
  constructor(public options: ServiceOptions) {}
  public content = new ContentService(this.options);
  public location = new LocationService(this.options);
  public tag = new TagService(this.options);
  public entitlements = new EntitlementService(this.options);
}
