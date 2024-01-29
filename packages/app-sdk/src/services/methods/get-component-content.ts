import { ComponentContentMap } from "../../interfaces/component-content.js";
import {
  IExposureComponent,
  IExposureWLCarousel,
  IExposureWLCategoriesComponent,
  IExpoureWLEpgComponent
} from "../../interfaces/exposure-wl-component.js";
import { WhiteLabelServiceContext } from "../white-label-service.js";
import { getCarouselAssets } from "./get-carousel-assets.js";
import { getCategoriesContent } from "./get-categories-content.js";
import { getEpgContent } from "./get-epg-content.js";

export interface GetComponentContentOptions {
  component: IExposureComponent;
}

export async function getComponentContent<T extends keyof ComponentContentMap>(
  context: WhiteLabelServiceContext,
  { component }: GetComponentContentOptions
): Promise<ComponentContentMap[T]> {
  switch (component.appType) {
    case "carousel":
      return (await getCarouselAssets(context, component as IExposureWLCarousel)) as ComponentContentMap[T];
    case "epg":
      return (await getEpgContent(context, component as IExpoureWLEpgComponent)) as ComponentContentMap[T];
    case "tagtype":
      return (await getCategoriesContent(
        context,
        component as IExposureWLCategoriesComponent
      )) as ComponentContentMap[T];
    case "herobanner":
    case "asset_display":
    case "menu":
    case "page":
    case "footer":
    case "image":
    case "text":
    case "iframe":
    default:
      return undefined as ComponentContentMap[T];
  }
}
