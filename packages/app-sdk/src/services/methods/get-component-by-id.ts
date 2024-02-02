import { getWLComponent } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureComponent } from "../../interfaces/exposure-wl-component.js";
import { WhiteLabelServiceContext } from "../white-label-service.js";

export interface GetComponentByIdOptions {
  componentId: string;
  countryCode: string;
}

export async function getComponentById<T extends IExposureComponent>(
  context: WhiteLabelServiceContext,
  { componentId, countryCode }: GetComponentByIdOptions
): Promise<T> {
  return (
    await getWLComponent.call(context, {
      configId: "sandwich",
      allowedCountry: countryCode,
      componentId,
      filters: `DEVICE:${context.deviceGroup}`
    })
  ).json();
}
