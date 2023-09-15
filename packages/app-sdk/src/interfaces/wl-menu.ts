import { IWLAction } from "./wl-action";

export interface IWLMenuItem {
  action: IWLAction;
  title: string;
}

export interface IWLSocialMediaLink {
  type: string;
  action: IWLAction;
  icon: string;
  iconUrl: string;
}

export interface IWLFooter {
  menuItems: IWLMenuItem[];
  socialMediaLinks: IWLSocialMediaLink[];
}
