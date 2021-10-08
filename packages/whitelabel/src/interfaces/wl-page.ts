import { IWLReference } from "./wl-reference";

export interface IWLPage {
  components: IWLReference[];
  created?: Date;
  changed?: Date;
  id: string;
  name: string;
  title?: string;
  description?: string;
}
