import { jsonProperty } from "../decorators/json-property";

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
}

export class PurchaseResponse {
  @jsonProperty({ type: Purchase })
  public purchases: Purchase[] = [];
}
