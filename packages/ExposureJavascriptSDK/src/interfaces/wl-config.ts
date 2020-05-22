import { SystemConfig } from "../models/system-config-model";
import { Theme } from "../models/wl-theme";
import { IWLMenuItem } from "./wl-menu";

interface ISystemConfig extends SystemConfig {
  displayLocales: any;
}

interface IAppConfig {
  chromeCastAppId?: string;
  appStoreId?: string;
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
  systemConfig: ISystemConfig;
  theme: Theme;
  appConfig: IAppConfig;
}
