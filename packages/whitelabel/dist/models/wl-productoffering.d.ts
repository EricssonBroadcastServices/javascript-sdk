import { Translations } from "./wl-translations";
import { OfferingPrice, ProductOffering } from "@ericssonbroadcastservices/exposure-sdk";
export declare class WLOfferingPrice extends OfferingPrice {
    getPriceWithVAT: (translations: Translations) => string;
    getPricelessVAT: (translations: Translations) => string;
}
export declare class WLProductOffering extends ProductOffering {
    offeringPrice: WLOfferingPrice;
    getRentalLengthString: (translations: Translations) => string;
    getRecurrenceString: (translations: Translations) => string;
}
export declare class ProductOfferingsResponse {
    productOfferings: ProductOffering[];
}
