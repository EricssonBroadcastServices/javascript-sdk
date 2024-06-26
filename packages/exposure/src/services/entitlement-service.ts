import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { IProductResponse, IAvailabilityKeysResponse } from "../interfaces/entitlement/product";
import { IPlay } from "../interfaces/entitlement/play";
import { IEntitlementError, IEntitlementResponse } from "../interfaces/entitlement/entitlement";
import { TPaymentProvider } from "./payment-service";

interface GetEntitlementForAssetOptions extends CustomerAndBusinessUnitOptions {
  assetId: string;
  paymentProvider?: TPaymentProvider;
  time?: Date;
}

export type TPlayFormat = "dash" | "hls" | "mss" | "mp3";
export type TPlayDrm = "widevine" | "playready" | "fairplay";
export type TAdDeviceType = "desktop" | "tablet" | "mobile" | "ctv" | "chromecast" | "airplay";

interface PlayAssetOptions extends GetEntitlementForAssetOptions {
  adParameters?: {
    latitude?: string;
    longitude?: string;
    mute?: boolean;
    autoplay?: boolean;
    consent?: string;
    deviceMake?: string;
    deviceType?: TAdDeviceType;
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
    /**
     * These custom parameters will be added to the querystring of the play request.
     * e.g. ?customParam1=value1&customParam2=value2 etc
     */
    [key: string]: any;
  };
  audioOnly?: boolean;
  maxResolution?: string;
  maxFrameRate?: number;
  supportedFormats?: TPlayFormat[];
  supportedDrms?: TPlayDrm[];
  materialProfile?: string;
  start?: number;
  end?: number;
}

export class EntitlementService extends BaseService {
  public getEntitlementForAsset({
    customer,
    businessUnit,
    headers,
    assetId,
    time,
    paymentProvider
  }: GetEntitlementForAssetOptions): Promise<IEntitlementResponse> {
    const searchParams = new URLSearchParams({});
    if (paymentProvider) {
      searchParams.set("paymentProvider", paymentProvider);
    }
    if (time) {
      searchParams.set("time", time.toISOString());
    }
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/entitlement/${assetId}/entitle?${searchParams.toString()}`,
      {
        ...this.options.authHeader(),
        ...headers
      },
      err => {
        throw err.response?.data as IEntitlementError;
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
    supportedDrms,
    materialProfile,
    start,
    end
  }: PlayAssetOptions): Promise<IPlay> {
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
    if (materialProfile) {
      queryParameters.append("materialProfile", materialProfile);
    }
    if (start) {
      queryParameters.append("start", `${start}`);
    }
    if (end) {
      queryParameters.append("end", `${end}`);
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
    );
  }
}
