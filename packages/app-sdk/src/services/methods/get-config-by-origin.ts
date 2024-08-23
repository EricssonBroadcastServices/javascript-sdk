import { ServiceContext, getWlConfig } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureWLConfig } from "../../interfaces";

export interface GetConfigByOriginOptions {
  origin: string;
  countryCode?: string;
}

export async function getConfigByOrigin(
  context: Omit<ServiceContext, "customer" | "businessUnit">,
  { origin, countryCode }: GetConfigByOriginOptions
): Promise<IExposureWLConfig> {
  if (!origin) {
    return Promise.reject(new Error("[WhiteLabelService] No origin set"));
  }
  return (await getWlConfig.call(context, {
    configId: "sandwich",
    host: origin,
    allowedCountry: countryCode
  })) as Promise<IExposureWLConfig>;
}
