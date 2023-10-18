import { ComponentContentMap, ResolvedComponent } from "../../interfaces/component-content";
import { WLComponentType } from "../../interfaces/exposure-wl-component";
import { IExposureWLReference } from "../../interfaces/exposure-wl-reference";
import { WhiteLabelServiceContext } from "../white-label-service";
import { getComponentByReference } from "./get-component-by-reference";
import { getComponentContent } from "./get-component-content";

export async function getResolvedComponentByReference<T extends keyof ComponentContentMap | WLComponentType>(
  context: WhiteLabelServiceContext,
  {
    wlReference,
    countryCode
  }: {
    wlReference: IExposureWLReference;
    countryCode: string;
  }
): Promise<ResolvedComponent<T>> {
  const component = await getComponentByReference(context, { wlReference, countryCode });
  const componentContent = await getComponentContent<T>(context, { component });
  return {
    component,
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
