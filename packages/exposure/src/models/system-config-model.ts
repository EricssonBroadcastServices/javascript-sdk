import { jsonProperty } from "../decorators/json-property";

export interface IPasswordPolicy {
  minimumLength: number;
  minimumGroups: number;
}

export enum PaymentType {
  ADYEN = "adyen",
  STRIPE = "stripe",
  EXTERNAL = "external",
  DENY = "deny",
  VOUCHERS_ONLY = "vouchers",
  BRAINTREE = "braintree"
}

interface IFrontEndFeatures {
  shouldAlwaysUseAnonymousLogin: boolean;
  customLandingPageUrl?: string;
  customAccountPageUrl?: string;
  customSignupPageUrl?: string;
}

export interface IPasswordAlgorithm {
  algorithmName: string;
  pbkdf2Iterations?: number;
}

export interface IPasswordHashConfig {
  sharedRandom: string;
  algorithms: IPasswordAlgorithm[];
}

export enum LoginMethodType {
  FIREBASE = "firebase",
  USER_ACCOUNTS = "useraccounts",
  OAUTH = "oauth"
}

export class ILoginMethodProvider {
  name: string;
  providerId: string;
  key: any;
}

export interface ILoginMethod {
  method: LoginMethodType;
  providers?: ILoginMethodProvider[];
  webkey?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
  config?: {
    web: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
      measurementId: string;
    };
    [key: string]: any;
  };
  name?: string;
  client_id?: string;
}

export enum AccessModel {
  /**
   * No user login required, but (some) content may require user login.
   * Anonymous login should be done.
   */
  OPEN = "open",
  /**
   * Login is always required.
   */
  LOGIN = "login",
  /**
   * Login and payment is required.
   */
  PAY = "pay"
}

export enum SignupModel {
  /**
   * All users are provisioned from the backend.
   * User login option to be present.
   */
  PROVISONED = "provisioned",
  /**
   * Users may signup, a confirmation mail will be sent, sessionToken created at conformation.
   * User signup and login option to be present.
   */
  CONFIRMED = "confirmed",
  /**
   * Users may signup, no conformation mail will be sent, sessionToken created at signup.
   * User signup and login option to be present.
   */
  UNCONFIRMED = "unconfirmed"
}

export interface IConsentManagement {
  didomi?: {
    apiKey: string;
    noticeId: string;
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
  @jsonProperty({ type: String })
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
  @jsonProperty()
  public consentManagement?: IConsentManagement;
  @jsonProperty()
  public passwordPolicy: IPasswordPolicy;
  @jsonProperty()
  public adyenOriginKey: string;
  @jsonProperty()
  public allowAnonymous = false;
  @jsonProperty()
  public playerUrl: string;
  @jsonProperty()
  public frontendFeatures: IFrontEndFeatures;
  @jsonProperty()
  public passwordHashConfig: IPasswordHashConfig;
  @jsonProperty()
  public externalPaymentUrl: string;
  @jsonProperty()
  public vouchers: boolean;
  @jsonProperty()
  public stripePublicKey: string;
  @jsonProperty()
  public signupMinimumAge: number;
  @jsonProperty({ type: Object })
  public loginMethods: ILoginMethod[];
  @jsonProperty()
  public accessModel: AccessModel;
  @jsonProperty()
  public signupModel: SignupModel;
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
