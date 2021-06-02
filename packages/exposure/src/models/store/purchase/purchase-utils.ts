import { IExposurePurchase, IPurchase } from "./i-purchase";

export class PurchaseUtils {
  static build(json: IExposurePurchase): IPurchase {
    return {
      ...json,
      from: new Date(json.from),
      until: new Date(json.until),
      renewAt: new Date(json.renewAt)
    };
  }
  static getTvods(purchases: IPurchase[]) {
    return purchases.filter(p => p.assetId);
  }
}
