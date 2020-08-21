import { SystemConfig } from "@EricssonBroadcastServices/exposure-sdk";
import { Theme } from "../models/wl-theme";
import { IWLMenuItem, IWLFooter } from "./wl-menu";
export interface IWLSystemConfig extends SystemConfig {
    displayLocales: any;
}
export interface IContactInformation {
    email?: string;
    phone?: string;
    website?: string;
}
export interface IAppConfig {
    __DEPRECATED__WILL__BE_REMOVED__?: boolean;
    chromeCastAppId?: string;
    appStoreId?: string;
    googleAnalyticsId?: string;
    search: {
        internalUrl: string;
    };
}
export interface IApiConfig {
    search: {
        internalUrl: string;
    };
}
export interface IParameters {
    chromecastAppId?: string;
    appStoreId?: string;
    googleAnalyticsId?: string;
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
    logo?: string;
    favicon?: string;
    backgroundImage?: string;
    systemConfig: IWLSystemConfig;
    parameters: IParameters;
    theme: Theme;
    appConfig: IAppConfig;
    apiConfig: IApiConfig;
    contactInformation: IContactInformation;
    footer: IWLFooter;
}
