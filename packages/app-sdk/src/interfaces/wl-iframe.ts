import { WLComponentType } from "@ericssonbroadcastservices/exposure-sdk";

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
