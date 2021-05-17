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
  };
  audioOnly?: boolean;
  maxResolution?: string;
  maxFrameRate?: number;
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
        ...this.options.authHeader(),
        ...headers
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
        ...this.options.authHeader(),
        ...headers
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
        ...this.options.authHeader(),
        ...headers
      }
    ).then(data => deserialize(AvailabilityKeysResponse, data));
  }
  public playAsset({
    customer,
    businessUnit,
    headers,
    assetId,
    adParameters,
    audioOnly,
    maxFrameRate,
    maxResolution
  }: PlayAssetOptions) {
    const queryParameters = new URLSearchParams(adParameters as Record<string, string>);
    if (audioOnly) {
      queryParameters.append("audioOnly", "true");
    }
    if (maxFrameRate) {
      queryParameters.append("maxFrameRate", maxFrameRate.toString());
    }
    if (maxResolution) {
      queryParameters.append("maxResolution", maxResolution);
    }
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/entitlement/${assetId}/play?${queryParameters.toString()}`,
      {
        ...this.options.authHeader(),
        ...headers
      }
    ).then(data => deserialize(Play, data));
  }
}
