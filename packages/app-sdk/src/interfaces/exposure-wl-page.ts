import { IExposureComponent } from "./exposure-wl-component.js";
import { IExposureWLReference } from "./exposure-wl-reference.js";

export interface IExposureWLPage extends IExposureComponent {
  name?: string;
  components: {
    pageBody: IExposureWLReference[];
  };
}
