import { jsonProperty } from "../decorators/json-property";

class CardSummary {
  @jsonProperty()
  public brand: string;
  @jsonProperty()
  public expiryMonth: string;
  @jsonProperty()
  public expiryYear: string;
  @jsonProperty()
  public last4: string;
  @jsonProperty()
  public origin?: string;
}

export class PaymentMethod {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public cardSummary?: CardSummary;
  @jsonProperty()
  public payPalDetails?: {
    email: string;
  };
  @jsonProperty()
  public preferred: boolean;
}
