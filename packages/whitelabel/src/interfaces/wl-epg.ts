import { WLAsset } from "../models/wl-asset";

export interface IWLEPGChannel {
	channel: WLAsset;
	programs: WLAsset[];
}

export interface IWLEPG {
	channels: IWLEPGChannel[];
}
