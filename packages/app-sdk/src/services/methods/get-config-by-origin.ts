import { ServiceContext, getWLConfigWithDomain } from "@ericssonbroadcastservices/rbm-ott-sdk";

import { IExposureWLConfig } from "../../interfaces/index.js";

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
  return (
    await getWLConfigWithDomain.call(context, {
      configId: "sandwich",
      host: origin,
      allowedCountry: countryCode
    })
  ).json() as Promise<IExposureWLConfig>;
}
