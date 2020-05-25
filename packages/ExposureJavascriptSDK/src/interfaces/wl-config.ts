import { SystemConfig } from "../models/system-config-model";
import { Theme } from "../models/wl-theme";
import { IWLMenuItem } from "./wl-menu";

export interface IWLSystemConfig extends SystemConfig {
  displayLocales: any;
}

export interface IAppConfig {
  chromeCastAppId?: string;
  appStoreId?: string;
  googleAnalyticsId?: string;
  search: {
    internalUrl: string;
  };
}

export interface IWLConfig {
  customer: string;
  businessUnit: string;
  homePage: {
    id: string;
    internalUrl: string;
  };
  title: string;
  menu: IWLMenuItem[];
  logo: string;
  systemConfig: IWLSystemConfig;
  theme: Theme;
  appConfig: IAppConfig;
}
