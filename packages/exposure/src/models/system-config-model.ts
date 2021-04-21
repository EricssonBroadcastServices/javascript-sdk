import { jsonProperty } from "../decorators/json-property";
import { PasswordPolicy } from "./password-policy-model";

export enum PaymentType {
  ADYEN = "adyen",
  STRIPE = "stripe",
  EXTERNAL = "external",
  DENY = "deny",
  VOUCHERS_ONLY = "vouchers",
  BRAINTREE = "braintree"
}

class FrontEndFeatures {
  @jsonProperty()
  public shouldAlwaysUseAnonymousLogin: boolean;
  @jsonProperty()
  public customLandingPageUrl?: string;
  @jsonProperty()
  public customAccountPageUrl?: string;
  @jsonProperty()
  public customSignupPageUrl?: string;
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

export enum LoginMethodType {
  FIREBASE = "firebase",
  USER_ACCOUNTS = "useraccounts"
}

export class LoginMethodProvider {
  @jsonProperty()
  public name: string;
  @jsonProperty()
  public key: any;
}

export class LoginMethod {
  @jsonProperty()
  public method: LoginMethodType;
  @jsonProperty({ type: LoginMethodProvider })
  public providers?: LoginMethodProvider[];
  @jsonProperty()
  public webkey?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
}

export class SystemConfig {
  @jsonProperty()
  public paymentType: PaymentType;
  @jsonProperty()
  public accountConfirmationRequired: boolean;
  @jsonProperty()
  public allowAccessWithoutLogin: boolean;
  @jsonProperty()
  public analyticsPercentage: number;
  @jsonProperty()
  public analyticsBaseUrl: string;
  @jsonProperty()
  public currencies: string[];
  @jsonProperty({ type: String })
  public displayLocales: string[];
  @jsonProperty()
  public defaultLocale: string;
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
  @jsonProperty()
  public vouchers: boolean;
  @jsonProperty()
  public stripePublicKey: string;
  @jsonProperty()
  public signupMinimumAge: number;
  @jsonProperty({ type: LoginMethod })
  public loginMethods: LoginMethod[];
  public paymentsIsEnabled = () => {
    return [
      PaymentType.ADYEN,
      PaymentType.EXTERNAL,
      PaymentType.STRIPE,
      PaymentType.VOUCHERS_ONLY,
      PaymentType.BRAINTREE
    ].includes(this.paymentType);
  };
}
