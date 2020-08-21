import { ImageModel } from "@ericssonbroadcastservices/exposure-sdk";
import { IWLSeason } from "../interfaces/wl-carousel-item";
import { WLAsset } from "./wl-asset";
export declare class WLSeason implements IWLSeason {
    episodes: WLAsset[];
    title: string;
    description: string;
    seasonId: string;
    images: ImageModel[];
    season: number;
    episodeCount: number;
}
