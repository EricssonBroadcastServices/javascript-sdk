import { WLReference } from "./wl-reference";
import { IWLAction, WLActionType } from "../interfaces/wl-action";
import { Theme } from "./wl-theme";
import { IWLMenuItem, IWLFooter, IWLSocialMediaLink } from "../interfaces/wl-menu";
import { IWLSystemConfig, IWLConfig, IAppConfig, IApiConfig, IContactInformation, IParameters } from "../interfaces/wl-config";
import { SystemConfig } from "@ericssonbroadcastservices/exposure-sdk";
export declare const breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    mediumDesktop: string;
    mediumLargeDesktop: string;
    largeDesktop: string;
};
export declare const paddings: {
    half: string;
    basic: string;
    double: string;
    mobile: string;
};
export declare class ThemeModel extends Theme {
    breakpoints: {
        mobile: string;
        tablet: string;
        desktop: string;
        mediumDesktop: string;
        mediumLargeDesktop: string;
        largeDesktop: string;
    };
    padding: {
        half: string;
        basic: string;
        double: string;
        mobile: string;
    };
}
export declare class WLAction implements IWLAction {
    target: string;
    type: WLActionType;
    url?: string;
    pageId?: string;
    assetId?: string;
    getLink: () => string | undefined;
}
export declare class WLMenuItem implements IWLMenuItem {
    title: string;
    action: WLAction;
    getLink: () => string | undefined;
}
export declare class WLSocialMediaLink implements IWLSocialMediaLink {
    icon: string;
    action: WLAction;
    getLink: () => string | undefined;
}
export declare class WLLanguage {
    code: string;
    name: string;
    nativeName: string;
}
export declare class WLSystemConfig extends SystemConfig implements IWLSystemConfig {
    locales: WLLanguage[];
}
export declare class WLFooter implements IWLFooter {
    menuItems: WLMenuItem[];
    socialMediaLinks: WLSocialMediaLink[];
}
export declare class WLConfig implements IWLConfig {
    homePage: WLReference;
    customer: string;
    businessUnit: string;
    title: string;
    description: string;
    menu: WLMenuItem[];
    logo: string;
    favicon?: string;
    backgroundImage?: string;
    systemConfig: WLSystemConfig;
    theme: ThemeModel;
    appConfig: IAppConfig;
    appStoreId: string;
    logoUrl: string;
    apiConfig: IApiConfig;
    contactInformation: IContactInformation;
    parameters: IParameters;
    footer: WLFooter;
    getShouldUseFreeForAll: () => boolean;
}
