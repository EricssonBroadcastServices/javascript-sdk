import { getWLConfig } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service";
import { IExposureWLConfig } from "../../interfaces/exposure-wl-config";

export interface GetConfigByCustomerAndBusinessUnitOptions {
  countryCode: string;
}

export async function getConfigByCustomerAndBusinessUnit(
  context: WhiteLabelServiceContext,
  { countryCode }: GetConfigByCustomerAndBusinessUnitOptions
) {
  return (
    await getWLConfig.call(context, { configId: "sandwich", allowedCountry: countryCode })
  ).json() as Promise<IExposureWLConfig>;
}
