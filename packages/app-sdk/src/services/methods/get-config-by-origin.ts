import { ServiceContext, getWLConfigWithDomain } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureWLConfig } from "../../interfaces";

export interface GetConfigByOriginOptions {
  origin: string;
}

export async function getConfigByOrigin(
  context: Omit<ServiceContext, "customer" | "businessUnit">,
  { origin }: GetConfigByOriginOptions
): Promise<IExposureWLConfig> {
  if (!origin) {
    return Promise.reject(new Error("[WhiteLabelService] No origin set"));
  }
  return (
    await getWLConfigWithDomain.call(context, {
      configId: "sandwich",
      host: origin
    })
  ).json() as Promise<IExposureWLConfig>;
}
