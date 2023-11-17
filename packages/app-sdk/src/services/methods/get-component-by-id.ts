import { getWLComponent } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureComponent } from "../../interfaces/exposure-wl-component";
import { WhiteLabelServiceContext } from "../white-label-service";
import { DeviceGroup } from "../../interfaces/device-group";

export interface GetComponentByIdOptions {
  componentId: string;
  countryCode: string;
}

export async function getComponentById<T extends IExposureComponent>(
  context: WhiteLabelServiceContext,
  { componentId, countryCode }: GetComponentByIdOptions
): Promise<T> {
  const platformDeviceDefinition = Object.keys(DeviceGroup).find(v => DeviceGroup[v] === context.deviceGroup);
  return (
    await getWLComponent.call(context, {
      configId: "sandwich",
      allowedCountry: countryCode,
      componentId,
      filters: `DEVICE:${platformDeviceDefinition}`
    })
  ).json();
}
