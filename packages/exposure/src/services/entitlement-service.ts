import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { ProductResponse, AvailabilityKeysResponse } from "../models/product-model";
import { Play } from "../models/play-model";

interface GetEntitlementForAssetOptions extends CustomerAndBusinessUnitOptions {
  assetId: string;
}

interface PlayAssetOptions extends GetEntitlementForAssetOptions {
  adParameters?: {
    latitude?: string;
    longitude?: string;
    mute?: boolean;
    consent?: string;
    deviceMake?: string;
    ifa?: string;
    gdprOptin?: boolean;
  }
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
  public playAsset({ customer, businessUnit, headers, assetId, adParameters }: PlayAssetOptions) {
    const queryParameters = new URLSearchParams(adParameters as Record<string, string>);
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/entitlement/${assetId}/play?${queryParameters.toString()}`,
      {
        ...headers,
        ...this.options.authHeader()
      }
    ).then(data => deserialize(Play, data));
  }
}
