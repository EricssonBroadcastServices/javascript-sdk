import { IExposureComponent } from "./exposure-wl-component";
import { IExposureWLReference } from "./exposure-wl-reference";

export interface IExposureWLPage extends IExposureComponent {
  name?: string;
  components: {
    pageBody: IExposureWLReference[];
  };
}
