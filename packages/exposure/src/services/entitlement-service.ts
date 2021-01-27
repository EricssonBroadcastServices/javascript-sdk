import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { ProductResponse, AvailabilityKeysResponse } from "../models/product-model";
import { Play } from "../models/play-model";

interface GetEntitlementForAssetOptions extends CustomerAndBusinessUnitOptions {
  assetId: string;
}

export class EntitlementService extends BaseService {
  public getEntitlementForAsset({ customer, businessUnit, headers, assetId }: GetEntitlementForAssetOptions) {
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
  public getUserEntitlements({ customer, businessUnit, headers }: CustomerAndBusinessUnitOptions) {
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
  public getAvailabilityKeys({ customer, businessUnit, headers }: CustomerAndBusinessUnitOptions) {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/entitlement/availabilitykey`,
      {
        ...headers,
        ...this.options.authHeader()
      }
    ).then(data => deserialize(AvailabilityKeysResponse, data));
  }
  public getPlay({ customer, businessUnit, headers, assetId }: GetEntitlementForAssetOptions) {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/entitlement/${assetId}/play`,
      {
        ...headers,
        ...this.options.authHeader()
      }
    ).then(data => deserialize(Play, data));
  }
}
