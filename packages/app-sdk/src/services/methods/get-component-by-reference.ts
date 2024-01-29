import { IExposureComponent } from "../../interfaces/exposure-wl-component.js";
import { IExposureWLReference } from "../../interfaces/exposure-wl-reference.js";
import { WhiteLabelServiceContext } from "../white-label-service.js";
import { getComponentById } from "./get-component-by-id.js";

export interface GetComponentByReferenceOptions {
  wlReference: IExposureWLReference;
  countryCode: string;
}

export async function getComponentByReference<T extends IExposureComponent>(
  context: WhiteLabelServiceContext,
  { wlReference, countryCode }: GetComponentByReferenceOptions
): Promise<T> {
  return getComponentById(context, {
    componentId: wlReference.referenceId,
    countryCode
  });
}
