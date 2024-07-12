import { ComponentContentMap, ComponentComponentMap, ResolvedComponent } from "../../interfaces/component-content";
import { WLComponentType } from "../../interfaces/exposure-wl-component";
import { IExposureWLReference } from "../../interfaces/exposure-wl-reference";
import { WhiteLabelServiceContext } from "../white-label-service";
import { getComponentByReference } from "./get-component-by-reference";
import { getComponentContent } from "./get-component-content";

export interface GetResolvedSeeAllPage {
  wlReference: IExposureWLReference;
  countryCode: string;
}

export async function getResolvedSeeAllPage<T extends keyof ComponentContentMap | WLComponentType>(
  context: WhiteLabelServiceContext,
  { wlReference, countryCode }: GetResolvedSeeAllPage
): Promise<ResolvedComponent<T>> {
  const component = await getComponentByReference<ComponentComponentMap[T]>(context, { wlReference, countryCode });
  const newComponent = {
    ...component,
    contentUrl: { ...component.contentUrl, url: component.contentUrl?.url?.replace?.(/pageSize=\d/, "pageSize=140") }
  };
  const componentContent = await getComponentContent<T>(context, { component: newComponent });
  return {
    component: newComponent,
    content: componentContent,
    presentationParameters: {
      density: wlReference.parameters?.density || "MEDIUM",
      carouselLayout: wlReference.parameters?.carouselLayout || "carousel",
      imageOrientation: wlReference.parameters?.imageOrientation || "landscape",
      backgroundColor: wlReference.parameters?.backgroundColor,
      backgroundImage: wlReference.images?.find(i => i.tags?.includes("background"))
    }
  };
}
