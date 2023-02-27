export interface ILoginMethodProvider {
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
    tvNoticeId?: string;
  };
}

export interface IFrontEndFeatures {
  shouldAlwaysUseAnonymousLogin: boolean;
  customLandingPageUrl?: string;
  customAccountPageUrl?: string;
  customSignupPageUrl?: string;
  customPasswordResetPageUrl?: string;
  searchLocales?: string[];
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

export interface IPasswordPolicy {
  minimumLength: number;
  minimumGroups: number;
}

export enum PaymentType {
  ADYEN = "adyen",
  STRIPE = "stripe",
  EXTERNAL = "external",
  DENY = "deny",
  VOUCHERS_ONLY = "vouchers"
}

export interface ISystemConfig {
  paymentType: PaymentType;
  accountConfirmationRequired: boolean;
  allowAccessWithoutLogin: boolean;
  analyticsPercentage: number;
  analyticsBaseUrl: string;
  currencies: string[];
  displayLocales: string[];
  defaultLocale: string;
  production: boolean;
  adyenContext: string;
  informationCollectionConsentDate: string;
  consentManagement?: IConsentManagement;
  passwordPolicy: IPasswordPolicy;
  adyenOriginKey: string;
  allowAnonymous: boolean;
  playerUrl: string;
  frontendFeatures: IFrontEndFeatures;
  passwordHashConfig: IPasswordHashConfig;
  externalPaymentUrl: string;
  vouchers: boolean;
  stripePublicKey: string;
  signupMinimumAge: number;
  loginMethods: ILoginMethod[];
  accessModel: AccessModel;
  signupModel: SignupModel;
}
