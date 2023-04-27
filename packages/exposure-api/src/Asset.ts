import { CustomerBusinessUnit } from "./ExposureApi";
import { V1 } from "./generated/V1";

type GetAssetQuery = Parameters<V1["getAsset"]>[3];

export default class Asset {
  private customer: string;
  private businessUnit: string;
  constructor({ customer, businessUnit }: CustomerBusinessUnit, private v1: V1<null>) {
    this.customer = customer;
    this.businessUnit = businessUnit;
  }

  getAsset(assetId: string, query: GetAssetQuery) {
    return this.v1.getAsset(this.customer, this.businessUnit, assetId, query);
  }
}
