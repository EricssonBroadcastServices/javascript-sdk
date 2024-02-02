import { getWLConfig } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service.js";
import { IExposureWLConfig } from "../../interfaces/exposure-wl-config.js";

export interface GetConfigByCustomerAndBusinessUnitOptions {
  countryCode: string;
}

export async function getConfigByCustomerAndBusinessUnit(
  context: WhiteLabelServiceContext,
  { countryCode }: GetConfigByCustomerAndBusinessUnitOptions
) {
  return (
    await getWLConfig.call(context, {
      configId: "sandwich",
      allowedCountry: countryCode,
      filters: `DEVICE:${context.deviceGroup}`
    })
  ).json() as Promise<IExposureWLConfig>;
}
