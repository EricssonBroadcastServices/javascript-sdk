import { ISystemConfig } from "../config/system-config";
import { IExposureWLPresentation } from "./exposure-wl-presentation";
import { IExposureWLReference } from "./exposure-wl-reference";

export interface IConfigParameters {
  chromecastAppId?: string;
  appStoreId?: string;
  googleAnalyticsId?: string;
  email?: string;
  phone?: string;
  website?: string;
  assetSearchTypes: string;
}

export interface IWLTheme {
  dark: string;
  light: string;
  error: string;
  success: string;
  warning: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  primaryBackgroundColor: string;
  secondaryBackgroundColor: string;
  primaryBrandColor: string;
  heroBannerTextColor: string;
  fontLight?: string;
  fontRegular?: string;
  fontBold?: string;
}

export interface IExposureWLConfig {
  id: string;
  customer: string;
  businessUnit: string;
  presentation: IExposureWLPresentation;
  components: {
    homePage: IExposureWLReference[];
    menu: IExposureWLReference[];
    footer?: IExposureWLReference[];
  };
  parameters: IConfigParameters;
  theme: IWLTheme;
  systemConfig: ISystemConfig;
}