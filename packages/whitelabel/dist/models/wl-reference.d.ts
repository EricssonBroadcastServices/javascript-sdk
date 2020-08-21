import { Orientation } from "../interfaces/orientation";
import { CarouselLayout, IWLReference } from "../interfaces/wl-reference";
import { WLComponentType } from "../interfaces/wl-component";
import { AspectRatio } from "@ericssonbroadcastservices/exposure-sdk";
export declare class WLReferencePresentation {
    imageOrientation: Orientation;
    layout: CarouselLayout;
    imageAspectRatio: AspectRatio;
}
export declare class WLReference implements IWLReference {
    id: string;
    internalUrl: string;
    authorized: boolean;
    reloadInterval?: number;
    type: WLComponentType;
    presentation: WLReferencePresentation;
}
