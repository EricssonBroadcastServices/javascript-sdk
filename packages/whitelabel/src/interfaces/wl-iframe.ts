import { WLComponentType } from "./wl-component";

export interface IWLIframe {
  url: string;
  height: number;
}

export interface IWLIframeComponent {
  id: string;
  type: WLComponentType;
  title: string;
  iframe?: IWLIframe;
}
