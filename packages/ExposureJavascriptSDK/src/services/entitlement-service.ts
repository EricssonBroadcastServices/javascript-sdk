import {
  BaseService,
  CustomerAndBusinessUnitOptions
} from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { ProductResponse } from "../models/Product";

interface GetEntitlementForAssetOptions extends CustomerAndBusinessUnitOptions {
  assetId: string;
}

export class EntitlementService extends BaseService {
  public getEntitlementForAsset({
    customer,
    businessUnit,
    headers,
    assetId
  }: GetEntitlementForAssetOptions) {
    return this.get(
      `/v2/customer/${customer}/businessunit/${businessUnit}/entitlement/${assetId}/entitle`,
      {
        ...headers,
        ...this.options.authHeader()
      }
    );
  }
  public getUserEntitlements({
    customer,
    businessUnit,
    headers
  }: CustomerAndBusinessUnitOptions) {
    return this.get(
      `/v2/customer/${customer}/businessunit/${businessUnit}/entitlement/accountproduct`,
      {
        ...headers,
        ...this.options.authHeader()
      }
    ).then(data => deserialize(ProductResponse, data));
  }
}
