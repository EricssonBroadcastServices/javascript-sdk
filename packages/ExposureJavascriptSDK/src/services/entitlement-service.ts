import {
  BaseService,
  CustomerAndBusinessUnitOptions,
  AuthHeaders
} from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { ProductResponse } from "../models/Product";

interface GetUserEntitlementsOptions extends CustomerAndBusinessUnitOptions {
  headers: AuthHeaders;
}

export class EntitlementService extends BaseService {
  public getUserEntitlements({
    customer,
    businessUnit,
    headers
  }: GetUserEntitlementsOptions) {
    return this.get(
      `/v2/customer/${customer}/businessunit/${businessUnit}/entitlement/accountproduct`,
      headers
    ).then(data => deserialize(ProductResponse, data));
  }
}
