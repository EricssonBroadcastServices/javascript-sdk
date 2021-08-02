import { SystemConfig } from "@ericssonbroadcastservices/exposure-sdk";
import { Theme } from "../models/wl-theme";
import { IWLMenuItem, IWLFooter } from "./wl-menu";

/**
 * @typedef {SystemConfig} IWLSystemConfig
 * @property {object} displayLocales
 */
export interface IWLSystemConfig extends SystemConfig {
  displayLocales: any;
}

/**
 * @typedef IContactInformation
 * @property {string} email - optional
 * @property {string} phone - optional
 * @property {string} website - optional
 */
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

/**
 * @typedef IApiConfigSearch
 * @property {string} internalUrl
 */
/**
 * @typedef IApiConfigTVLogin
 * @property {string} url
 * @property {string} qrCode
 */
/**
 * @typedef IApiConfig
 * @property {string} exposureUrl
 * @property {IApiConfigSearch} search
 * @property {IApiConfigTVLogin} tvLogin
 */
export interface IApiConfig {
  exposureUrl: string;
  search: {
    internalUrl: string;
  };
  tvLogin: {
    url: string;
    qrCode: string;
  };
}

/**
 * @typedef IParameters
 * @property {string} chromecastAppId - optional
 * @property {string} appStoreId - optional
 * @property {string} googleAnalyticsId - optional
 */

export interface IParameters {
  chromecastAppId?: string;
  appStoreId?: string;
  googleAnalyticsId?: string;
  googlePlayStorePackageId?: string;
}

/**
 * @typedef IConfigHomePage
 * @property {string} id
 * @property {string} internalUrl - relative URL with the same baseUrl as the current request
 */

/**
 * @typedef WLConfig
 * @property {string} customer
 * @property {string} businessUnit
 * @property {IConfigHomePage} homePage
 * @property {string} title
 * @property {WLMenuItem[]} menu
 * @property {string} logo - optional
 * @property {string} backgroundImage - optional
 * @property {WLSystemConfig} systemConfig
 * @property {IParameters} parameters,
 * @property {Theme} theme
 * @property {ApiConfig} apiConfig
 * @property {ContactInformation} contactInformation
 */

export interface IWLConfig {
  customer: string;
  businessUnit: string;
  homePage: {
    id: string;
    internalUrl: string;
  };
  title: string;
  description: string;
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
