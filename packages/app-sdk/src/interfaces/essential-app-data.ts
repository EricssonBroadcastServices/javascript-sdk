import { SystemConfig } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureWLFooter, IExposureWLMenu } from "./exposure-wl-menu.js";
import { IExposureWLConfig } from "./exposure-wl-config.js";

export type EssentialAppData = {
  systemConfig: SystemConfig;
  menu: IExposureWLMenu;
  footer: IExposureWLFooter | undefined;
  countryCode: string;
  config: IExposureWLConfig;
};
