import { IWLReference } from "./wl-reference";

export interface IWLPage {
  components: IWLReference[];
  id: string;
  name: string;
  title?: string;
  description?: string;
}