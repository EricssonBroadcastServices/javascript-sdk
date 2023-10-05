import { WLReference } from "./wl-reference";
import { IWLAction } from "../interfaces/wl-action";
import { IWLMenuItem, IWLFooter, IWLSocialMediaLink } from "../interfaces/wl-menu";
import {
  IWLConfig,
  IAppConfig,
  IApiConfig,
  IContactInformation,
  IParameters,
  IWLSystemConfig,
  ISentryConfig
} from "../interfaces/wl-config";
import { IImage, jsonProperty, WLActionType, IWLTheme } from "@ericssonbroadcastservices/exposure-sdk";
export class WLAction implements IWLAction {
  @jsonProperty()
  public target: string;
  @jsonProperty()
  public type: WLActionType;
  @jsonProperty()
  public url?: string;
  @jsonProperty()
  public qrCode?: string;
  @jsonProperty()
  public pageId?: string;
  @jsonProperty()
  public assetId?: string;
  @jsonProperty()
  public page?: WLReference;
  @jsonProperty({ type: String })
  public slugs?: string[];
  public getLink = () => {
    const assetIdentifier =
      this.slugs && Array.isArray(this.slugs) && this.slugs.length > 0 ? this.slugs[0] : this.assetId;
    switch (this.type) {
      case WLActionType.ExternalLink:
        return this.url;
      case WLActionType.NavigateToPage:
        return `/page/${this.pageId}`;
      case WLActionType.NavigateToDetails:
        return `/asset/${assetIdentifier}`;
      case WLActionType.PlayAsset:
        return `/play/${assetIdentifier}`;
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
  @jsonProperty({ type: Object })
  public images: IImage[];
  @jsonProperty()
  public favicon?: string;
  @jsonProperty()
  public backgroundImage?: string;
  @jsonProperty()
  public staticBackgroundImage?: string;
  @jsonProperty()
  public systemConfig: IWLSystemConfig;
  @jsonProperty()
  public theme: IWLTheme;
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
  @jsonProperty()
  public sentry: ISentryConfig;

  public getShouldUseFreeForAll = () => this.systemConfig.frontendFeatures.shouldAlwaysUseAnonymousLogin;
}
