import { IImage } from "@ericssonbroadcastservices/exposure-sdk";
import { ISystemConfig } from "@ericssonbroadcastservices/exposure-sdk/dist/interfaces/config/system-config";
import { IWLMenuItem, IWLFooter } from "./wl-menu";
import { ITheme } from "./wl-theme";

export interface IWLLanguage {
  code: string;
  name: string;
  nativeName: string;
}

/**
 * @typedef {SystemConfig} IWLSystemConfig
 * @property {object} displayLocales
 */
export interface IWLSystemConfig extends Omit<ISystemConfig, "displayLocales"> {
  displayLocales: IWLLanguage[];
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

interface IWebAppUrl {
  url: string;
  qrCode: string;
}

/**
 * @typedef IApiConfigSearch
 * @property {string} internalUrl
 */
/**
 * @typedef IWebAppUrl
 * @property {string} url
 * @property {string} qrCode
 */
/**
 * @typedef IApiConfig
 * @property {string} exposureUrl
 * @property {IApiConfigSearch} search
 * @property {IWebAppUrl} tvLogin
 * @property {IWebAppUrl} termsAndConditions
 * @property {IWebAppUrl} cookiePolicy
 * @property {IWebAppUrl} privacyPolicy
 */
export interface IApiConfig {
  exposureUrl: string;
  search: {
    internalUrl: string;
  };
  tvLogin: IWebAppUrl;
  termsAndConditions: IWebAppUrl;
  cookiePolicy: IWebAppUrl;
  privacyPolicy: IWebAppUrl;
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
 * @property {IImage[]} images
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
  images: IImage[];
  logo?: string;
  favicon?: string;
  backgroundImage?: string;
  systemConfig: IWLSystemConfig;
  parameters: IParameters;
  theme: ITheme;
  appConfig: IAppConfig;
  apiConfig: IApiConfig;
  contactInformation: IContactInformation;
  footer: IWLFooter;
}
