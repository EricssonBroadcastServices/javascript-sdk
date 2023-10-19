import { IExposureComponent } from "../../interfaces/exposure-wl-component";
import { IExposureWLReference } from "../../interfaces/exposure-wl-reference";
import { WhiteLabelServiceContext } from "../white-label-service";
import { getComponentById } from "./get-component-by-id";

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
    hasAuthorizedContent: wlReference.hasAuthorizedContent,
    countryCode
  });
}
