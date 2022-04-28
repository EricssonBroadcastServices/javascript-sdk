import { IExposureWLPresentation } from "./exposure-wl-presentation";
import { IExposureWLReference } from "./exposure-wl-reference";

export interface IExposureWLPage {
  id: string;
  name?: string;
  components: {
    pageBody: IExposureWLReference[];
  };
  presentation?: IExposureWLPresentation;
  created?: string;
  changed?: string;
}
