import { IExposureWLAction } from "./exposure-wl-action";
import { IExposureComponent } from "./exposure-wl-component";
import { IExposureWLPresentation } from "./exposure-wl-presentation";

export interface IExposureWLMenuItem {
  appType: string;
  appSubType: string;
  presentation?: IExposureWLPresentation;
  actions: {
    default: IExposureWLAction;
  };
}

export interface IExposureWLMenu extends IExposureComponent {
  components: {
    menuItems?: IExposureWLMenuItem[];
  };
}

export interface IExposureWLFooter extends IExposureComponent {
  components: {
    menuItems?: IExposureWLMenuItem[];
    socialMediaLinks?: IExposureWLMenuItem[];
  };
}
