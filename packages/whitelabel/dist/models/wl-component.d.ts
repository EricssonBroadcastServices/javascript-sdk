import { ImageModel } from "@ericssonbroadcastservices/exposure-sdk";
import { WLAsset } from "./wl-asset";
import { WLSeason } from "./wl-season";
import { WLAction } from "./wl-config";
export declare enum CarouselSubType {
    EPG = "epg",
    PROGRESS = "progress"
}
export declare class WLComponent {
    id: string;
    type: string;
}
export declare class WLCarousel extends WLComponent {
    title: string;
    subType?: CarouselSubType;
    assets: WLAsset[];
    static fromSeason: (season: WLSeason) => WLCarousel;
    getInitialSlide(): number;
}
export declare class WLHerobannerItem {
    images: ImageModel[];
    title: string;
    description: string;
    trailerAssetId?: string;
    action: WLAction;
    getScaledImage(orientation: string, width: number): string;
}
export declare class WLHerobanner extends WLComponent {
    items: WLHerobannerItem[];
}
