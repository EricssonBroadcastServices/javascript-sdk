import { getWLConfig } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service";
import { IExposureWLConfig } from "../../interfaces/exposure-wl-config";

export async function getConfigByCustomerAndBusinessUnit(
  context: WhiteLabelServiceContext,
  { countryCode }: { countryCode: string }
) {
  return (
    await getWLConfig.call(context, { configId: "sandwich", allowedCountry: countryCode })
  ).json() as Promise<IExposureWLConfig>;
}
