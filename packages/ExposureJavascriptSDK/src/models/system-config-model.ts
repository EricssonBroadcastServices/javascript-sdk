import { jsonProperty } from "../decorators/json-property";
import { PasswordPolicy } from "./password-policy-model";

class FrontEndFeatures {
  @jsonProperty()
  public shouldAlwaysUseAnonymousLogin: boolean;
}

export class PasswordAlgorithm {
  @jsonProperty()
  public algorithmName: string;
  @jsonProperty()
  public pbkdf2Iterations?: number;
}

export class PasswordHashConfig {
  @jsonProperty()
  public sharedRandom: string;
  @jsonProperty({ type: PasswordAlgorithm })
  public algorithms: PasswordAlgorithm[];
}

export class SystemConfig {
  @jsonProperty()
  public paymentType: string;
  @jsonProperty()
  public accountConfirmationRequired: boolean;
  @jsonProperty()
  public allowAccessWithoutLogin: boolean;
  @jsonProperty()
  public currencies: string[];
  @jsonProperty({ type: String })
  public displayLocales: string[];
  @jsonProperty()
  public production: boolean;
  @jsonProperty()
  public adyenContext: string;
  @jsonProperty()
  public informationCollectionConsentDate: string;
  @jsonProperty({ type: PasswordPolicy })
  public passwordPolicy: PasswordPolicy = new PasswordPolicy();
  @jsonProperty()
  public adyenOriginKey: string;
  @jsonProperty()
  public allowAnonymous = false;
  @jsonProperty()
  public playerUrl: string;
  @jsonProperty({ type: FrontEndFeatures })
  public frontendFeatures: FrontEndFeatures = new FrontEndFeatures();
  @jsonProperty()
  public passwordHashConfig: PasswordHashConfig;
  @jsonProperty()
  public externalPaymentUrl: string;
  public paymentsIsEnabled = () => {
    return (this.paymentType === "adyen" || this.paymentType === "external");
  };
}
