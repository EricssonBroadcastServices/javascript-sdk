import { getWLConfigWithDomain } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service";

export interface GetConfigByOriginOptions {
  origin: string;
}

export async function getConfigByOrigin(context: WhiteLabelServiceContext, { origin }: GetConfigByOriginOptions) {
  if (!origin) {
    return Promise.reject(new Error("[WhiteLabelService] No origin set"));
  }
  return getWLConfigWithDomain.call(context, {
    configId: "sandwich",
    host: origin
  });
}
