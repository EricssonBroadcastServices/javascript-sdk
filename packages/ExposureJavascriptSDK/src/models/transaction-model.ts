import { jsonProperty } from "../decorators/json-property";
import { ProductOffering } from "./product-offering-model";

export class Transaction {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public status: string;
  @jsonProperty()
  public amount: string;
  @jsonProperty()
  public completedTime: Date;
  @jsonProperty()
  public paymentProviderTransactionId: string;
  @jsonProperty()
  public paymentProviderType: string;
}

export class TransactionsWithProductOffering {
  @jsonProperty({ type: Transaction })
  public transactions: Transaction;
  @jsonProperty({ type: ProductOffering })
  public productOffering: ProductOffering;
}
