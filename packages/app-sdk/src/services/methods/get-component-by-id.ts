import { getWLComponent } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureComponent } from "../../interfaces/exposure-wl-component";
import { WhiteLabelServiceContext } from "../white-label-service";

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
  ) as unknown as T;
}
