import { jsonProperty } from "../decorators/json-property";

export class Product {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public name: string;
  @jsonProperty()
  public entitlementRequired: boolean;
  @jsonProperty()
  public blocked: boolean;
  @jsonProperty()
  public anonymousAllowed: boolean;
}

export class ProductResponse {
  @jsonProperty({ type: Product })
  public entitled: Product[] = [];
  @jsonProperty({ type: Product })
  public notEntitled: Product[] = [];
}

export class AvailabilityKeysResponse {
  @jsonProperty()
  public expiryDate: Date;
  @jsonProperty({ type: String })
  public availabilityKeys: string[];
}
