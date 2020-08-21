import { IWLCarouselItem } from "../interfaces/wl-carousel-item";
import { WLSeason } from "./wl-season";
import { Translations } from "./wl-translations";
import { WLProductOffering } from "./wl-productoffering";
import { AssetType, Publication, ImageModel, ExternalReferences, Participants, Product, UserLocation } from "@ericssonbroadcastservices/exposure-sdk";
export declare class WLTag {
    title: string;
    tagType: string;
    id: string;
}
export declare class WLAsset implements IWLCarouselItem {
    id: string;
    type: AssetType;
    assetId: string;
    title: string;
    description: string;
    images: ImageModel[];
    publications: Publication[];
    externalReferences: ExternalReferences[];
    tvShowId: string;
    season: number;
    participants: Participants[];
    startTime: Date;
    endTime: Date;
    duration: number;
    year: number;
    tags: WLTag[];
    action: any;
    seasons: WLSeason[];
    bookmark?: {
        percentage: number;
        time: number;
    };
    getDurationString: () => string | undefined;
    getScaledImage(orientation: string, width: number): string;
    isLive: () => boolean;
    inFuture: () => boolean;
    getIsEntitled: (availabilityKeys: string[]) => boolean;
    getActionLink: (userEntitlements: Product[], availabilityKeys: string[]) => string;
    getBrowseLink: () => string;
    getPlayLink: (userEntitlements: Product[], availabilityKeys: string[]) => string;
    requiredProducts: () => string[];
    getAvailabilityKeys: () => string[];
    getHasProperProduct: (userAvailabilityKeys: string[]) => boolean;
    getBuyableProductOfferings: (availableProductOfferings: WLProductOffering[]) => WLProductOffering[];
    getAnonymousProducts: (userEntitlements: Product[]) => string[];
    anonymousIsAllowed: (userEntitlements: Product[]) => boolean;
    getLocalAssetStartTimeString: () => string | null;
    getLocalStartDayString: (translations: Translations) => any;
    getStartTime: () => Date | undefined;
    isGeoBlocked: (location?: UserLocation | undefined) => boolean;
}
