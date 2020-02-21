import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { ProductResponse } from "../models/product-model";

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
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/entitlement/${assetId}/entitle`,
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
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/entitlement/accountproduct`,
      {
        ...headers,
        ...this.options.authHeader()
      }
    ).then(data => deserialize(ProductResponse, data));
  }
}
