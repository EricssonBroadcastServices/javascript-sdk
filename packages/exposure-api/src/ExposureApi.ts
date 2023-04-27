import Asset from "./Asset";
import Authentication from "./Authentication";
import Entitlements from "./entitlements";
import { ApiConfig } from "./generated/http-client";
import { V1 } from "./generated/V1";
import { V2 } from "./generated/V2";
import { V3 } from "./generated/V3";

export type CustomerBusinessUnit = {
  customer: string;
  businessUnit: string;
};

type ExposureApiOptions = CustomerBusinessUnit & {
  baseUrl: string;
  getSessionToken: () => string;
};

export default class ExposureApi {
  private v1: V1<null>;
  private v2: V2<null>;
  private v3: V3<null>;


  public asset: Asset;
  public authentication: Authentication;
  public entitlements: Entitlements;

  constructor({ baseUrl, customer, businessUnit, getSessionToken }: ExposureApiOptions) {
    let httpClientOptions: ApiConfig<null> = {
      baseUrl,
      securityWorker: () => {
        const sessionToken = getSessionToken();
        if (sessionToken) {
          return {
            headers: {
              Authorization: sessionToken
            }
          };
        }
      }
    };
    this.v1 = new V1<null>(httpClientOptions);
    this.v2 = new V2<null>(httpClientOptions);
    this.v3 = new V3<null>(httpClientOptions);

    this.asset = new Asset({ customer, businessUnit }, this.v1);
    this.authentication = new Authentication({ customer, businessUnit }, this.v2, this.v3);
    this.entitlements = new Entitlements({ customer, businessUnit }, this.v2);
  }
}
