import { AccessModel, IConsentManagement, ILoginMethod, IPasswordPolicy, SignupModel } from "./system-config";

export interface ISystemConfigV2 {
  access: {
    accessModel: AccessModel;
    signupMinimumAge: number;
    passwordPolicy: IPasswordPolicy;
    loginMethods: ILoginMethod[];
    signupModel: SignupModel;
    consentManagement: IConsentManagement;
  };
  analytics: {
    analyticsPercentage: number;
  };
  frontendFeatures: {
    shouldAlwaysUseAnonymousLogin: boolean;
    searchLocales: string[];
  };
  localization: {
    currencies: string[];
    displayLocales: string[];
    defaultLocale: string;
  };
  payments: {
    braintree: {
      enabled: boolean;
    };
    external: {
      enabled: boolean;
      externalPaymentUrl?: string;
    };
    googleplay: {
      enabled: boolean;
    };
    stripe: {
      enabled: boolean;
      stripePublicKey?: string;
    };
    vouchers: {
      enabled: boolean;
    };
  };
  playerUrl: string;
  production: boolean;
}
