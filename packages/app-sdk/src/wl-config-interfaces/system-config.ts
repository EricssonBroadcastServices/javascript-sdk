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

export const AccessModel = {
  /**
   * No user login required, but (some) content may require user login.
   * Anonymous login should be done.
   */
  OPEN: "open",
  /**
   * Login is always required.
   */
  LOGIN: "login",
  /**
   * Login and payment is required.
   */
  PAY: "pay"
} as const;
export type AccessModel = typeof AccessModel[keyof typeof AccessModel];

export const SignupModel = {
  /**
   * All users are provisioned from the backend.
   * User login option to be present.
   */
  PROVISONED: "provisioned",
  /**
   * Users may signup, a confirmation mail will be sent, sessionToken created at conformation.
   * User signup and login option to be present.
   */
  CONFIRMED: "confirmed",
  /**
   * Users may signup, no conformation mail will be sent, sessionToken created at signup.
   * User signup and login option to be present.
   */
  UNCONFIRMED: "unconfirmed"
} as const;
export type SignupModel = typeof SignupModel[keyof typeof SignupModel];

export interface IConsentManagement {
  didomi?: {
    apiKey: string;
    noticeId: string;
    tvNoticeId?: string;
    appNoticeId?: string;
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

export const LoginMethodType = {
  FIREBASE: "firebase",
  USER_ACCOUNTS: "useraccounts",
  OAUTH: "oauth"
} as const;
export type LoginMethodType = typeof LoginMethodType[keyof typeof LoginMethodType];

export interface IPasswordPolicy {
  minimumLength: number;
  minimumGroups: number;
}

export const PaymentType = {
  ADYEN: "adyen",
  STRIPE: "stripe",
  EXTERNAL: "external",
  DENY: "deny",
  VOUCHERS_ONLY: "vouchers"
} as const;
export type PaymentType = typeof PaymentType[keyof typeof PaymentType];

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
