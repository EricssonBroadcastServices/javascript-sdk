import { jsonProperty } from "../decorators/json-property";
import { ProductOffering } from "./product-offering-model";

export class Purchase {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public renewal: boolean;
  @jsonProperty()
  public transactionId: string;
  @jsonProperty()
  public productOfferingId: string;
  @jsonProperty()
  public from: Date;
  @jsonProperty()
  public until: Date;
  @jsonProperty()
  public renewAt: Date;
  @jsonProperty()
  public status: string;
  @jsonProperty()
  public assetId?: string;
  @jsonProperty()
  public apiStoreProductOffering: ProductOffering;
}

export class PurchaseResponse {
  @jsonProperty({ type: String })
  public consumedProductOfferingDiscounts: string[];
  @jsonProperty({ type: Purchase })
  public purchases: Purchase[] = [];

  public getTvods = () => {
    return this.purchases.filter(p => p.assetId);
  };
}
