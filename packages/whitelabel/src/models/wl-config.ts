import { WLReference } from "./wl-reference";
import { IWLAction, WLActionType } from "../interfaces/wl-action";
import { Theme } from "./wl-theme";
import { IWLMenuItem, IWLFooter, IWLSocialMediaLink } from "../interfaces/wl-menu";
import {
  IWLSystemConfig,
  IWLConfig,
  IAppConfig,
  IApiConfig,
  IContactInformation,
  IParameters
} from "../interfaces/wl-config";
import { jsonProperty, SystemConfig } from "@ericssonbroadcastservices/exposure-sdk";

export const breakpoints = {
  mobile: "600px",
  tablet: "839px",
  desktop: "1200px",
  mediumDesktop: "1300px",
  mediumLargeDesktop: "1525px",
  largeDesktop: "1800px"
};

export const paddings = {
  half: "1rem",
  basic: "2rem",
  double: "4rem",
  mobile: "0.5rem"
};

export class ThemeModel extends Theme {
  public breakpoints = breakpoints;
  public padding = paddings;
}

export class WLAction implements IWLAction {
  @jsonProperty()
  public target: string;
  @jsonProperty()
  public type: WLActionType;
  @jsonProperty()
  public url?: string;
  @jsonProperty()
  public pageId?: string;
  @jsonProperty()
  public assetId?: string;
  @jsonProperty()
  public page?: WLReference;
  public getLink = () => {
    switch (this.type) {
      case WLActionType.ExternalLink:
        return this.url;
      case WLActionType.NavigateToPage:
        return `/page/${this.pageId}`;
      case WLActionType.NavigateToDetails:
        return `/asset/${this.assetId}`;
      case WLActionType.PlayAsset:
        return `/play/${this.assetId}`;
      default:
        return "";
    }
  };
}

export class WLMenuItem implements IWLMenuItem {
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public action: WLAction;

  public getLink = () => {
    return this.action.getLink();
  };
}

export class WLSocialMediaLink implements IWLSocialMediaLink {
  @jsonProperty()
  public type: string;
  @jsonProperty()
  public icon: string;
  @jsonProperty()
  public iconUrl: string;
  @jsonProperty()
  public action: WLAction;

  public getLink = () => {
    return this.action.getLink();
  };
}

export class WLLanguage {
  @jsonProperty()
  public code: string;
  @jsonProperty()
  public name: string;
  @jsonProperty()
  public nativeName: string;
}

export class WLSystemConfig extends SystemConfig implements IWLSystemConfig {
  @jsonProperty({ externalName: "displayLocales", type: WLLanguage })
  public locales: WLLanguage[];
}

export class WLFooter implements IWLFooter {
  @jsonProperty({ type: WLMenuItem })
  public menuItems: WLMenuItem[];
  @jsonProperty({ type: WLSocialMediaLink })
  public socialMediaLinks: WLSocialMediaLink[];
}

export class WLConfig implements IWLConfig {
  @jsonProperty()
  public homePage: WLReference;
  @jsonProperty()
  public customer: string;
  @jsonProperty()
  public businessUnit: string;
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public description: string;
  @jsonProperty({ type: WLMenuItem })
  public menu: WLMenuItem[];
  @jsonProperty()
  public logo: string;
  @jsonProperty()
  public favicon?: string;
  @jsonProperty()
  public backgroundImage?: string;
  @jsonProperty()
  public systemConfig: WLSystemConfig = new WLSystemConfig();
  @jsonProperty()
  public theme: ThemeModel = new ThemeModel();
  @jsonProperty()
  public appConfig: IAppConfig;
  @jsonProperty()
  public appStoreId: string;
  @jsonProperty()
  public logoUrl: string;
  @jsonProperty()
  public apiConfig: IApiConfig;
  @jsonProperty()
  public contactInformation: IContactInformation;
  @jsonProperty()
  public parameters: IParameters;
  @jsonProperty()
  public footer: WLFooter;

  public getShouldUseFreeForAll = () => this.systemConfig.frontendFeatures.shouldAlwaysUseAnonymousLogin;
}
