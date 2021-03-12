import { WLComponentType } from "./wl-component";

export interface IWLTextComponent {
  id: string;
  type: WLComponentType;
  title?: string;
  body: string;
}
