import { getWLConfig } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service";
import { IExposureWLConfig } from "../../interfaces/exposure-wl-config";
import { DeviceGroup } from "../../interfaces/device-group";

export interface GetConfigByCustomerAndBusinessUnitOptions {
  countryCode: string;
}

export async function getConfigByCustomerAndBusinessUnit(
  context: WhiteLabelServiceContext,
  { countryCode }: GetConfigByCustomerAndBusinessUnitOptions
) {
  const platformDeviceDefinition = Object.keys(DeviceGroup).find(v => DeviceGroup[v] === context.deviceGroup);
  return (
    await getWLConfig.call(context, {
      configId: "sandwich",
      allowedCountry: countryCode,
      filters: `DEVICE:${platformDeviceDefinition}`
    })
  ).json() as Promise<IExposureWLConfig>;
}
