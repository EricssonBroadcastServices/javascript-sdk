import { SystemConfig } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureWLFooter, IExposureWLMenu } from "./exposure-wl-menu";
import { IExposureWLConfig } from "./exposure-wl-config";

export type EssentialAppData = {
  systemConfig: SystemConfig;
  menu: IExposureWLMenu;
  footer: IExposureWLFooter | undefined;
  countryCode: string;
  config: IExposureWLConfig;
};
