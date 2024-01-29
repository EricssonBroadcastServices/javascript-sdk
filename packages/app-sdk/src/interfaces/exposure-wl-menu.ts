import { IExposureWLAction } from "./exposure-wl-action.js";
import { IExposureComponent } from "./exposure-wl-component.js";
import { IExposureWLPresentation } from "./exposure-wl-presentation.js";

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
