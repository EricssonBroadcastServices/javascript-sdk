import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { IProductResponse, IAvailabilityKeysResponse } from "../interfaces/product";
import { Play } from "../models/play-model";

interface GetEntitlementForAssetOptions extends CustomerAndBusinessUnitOptions {
  assetId: string;
}

export type TPlayFormat = "dash" | "hls" | "mss";
export type TPlayDrm = "widevine" | "playready" | "fairplay";

interface PlayAssetOptions extends GetEntitlementForAssetOptions {
  adParameters?: {
    latitude?: string;
    longitude?: string;
    mute?: boolean;
    autoplay?: boolean;
    consent?: string;
    deviceMake?: string;
    deviceType?: string;
    ifa?: string;
    uid?: string;
    gdprOptin?: boolean;
    width?: number;
    height?: number;
    pageUrl?: string;
    domain?: string;
    appBundle?: string;
    appName?: string;
    appStoreUrl?: string;
  };
  audioOnly?: boolean;
  maxResolution?: string;
  maxFrameRate?: number;
  supportedFormats?: TPlayFormat[];
  supportedDrms?: TPlayDrm[];
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
  public getUserEntitlements({
    customer,
    businessUnit,
    headers
  }: CustomerAndBusinessUnitOptions): Promise<IProductResponse> {
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
    );
  }
  public getAvailabilityKeys({
    customer,
    businessUnit,
    headers
  }: CustomerAndBusinessUnitOptions): Promise<IAvailabilityKeysResponse> {
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
    );
  }
  public playAsset({
    customer,
    businessUnit,
    headers,
    assetId,
    adParameters,
    audioOnly,
    maxFrameRate,
    maxResolution,
    supportedFormats,
    supportedDrms
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
    if (supportedFormats) {
      queryParameters.append("supportedFormats", supportedFormats.join(","));
    }
    if (supportedDrms) {
      queryParameters.append("supportedDrms", supportedDrms.join(","));
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
