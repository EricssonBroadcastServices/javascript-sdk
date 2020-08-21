import { IWLAction } from "./wl-action";

export interface IWLMenuItem {
  action: IWLAction;
  title: string;
}

export interface IWLSocialMediaLink {
  action: IWLAction;
  icon: string;
}

export interface IWLFooter {
  menuItems: IWLMenuItem[];
  socialMediaLinks: IWLSocialMediaLink[];
}
