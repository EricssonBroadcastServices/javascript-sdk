import { CustomerBusinessUnit } from "./ExposureApi";
import { V2 } from "./generated/V2";

type PlayParameters = Parameters<V2["playV2"]>

export default class Entitlements {
  private customer: string;
  private businessUnit: string;
  constructor({ customer, businessUnit }: CustomerBusinessUnit, private v2: V2<null>) {
    this.customer = customer;
    this.businessUnit = businessUnit;
  }

  play(assetId: string, query: PlayParameters[3]) {
    return this.v2.playV2(this.customer, this.businessUnit, assetId, query);
  }
}