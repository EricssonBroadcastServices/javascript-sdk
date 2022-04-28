import { IExposureWLAction } from "./exposure-wl-action";
import { IExposureWLPresentation } from "./exposure-wl-presentation";

export interface IExposureWLMenuItem {
  appType: string;
  appSubType: string;
  presentation?: IExposureWLPresentation;
  actions: {
    default: IExposureWLAction;
  };
}

export interface IExposureWLMenu {
  appType: string;
  appSubType: string;
  components: {
    menuItems?: IExposureWLMenuItem[];
  };
}

export interface IExposureWLFooter {
  appType: string;
  appSubType: string;
  components: {
    menuItems?: IExposureWLMenuItem[];
    socialMediaLinks?: IExposureWLMenuItem[];
  };
}
