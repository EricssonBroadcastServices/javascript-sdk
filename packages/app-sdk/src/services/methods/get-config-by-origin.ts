import { getWLConfigWithDomain } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service";

export async function getConfigByOrigin(context: WhiteLabelServiceContext, { origin }: { origin: string }) {
  if (!origin) {
    return Promise.reject(new Error("[WhiteLabelService] No origin set"));
  }
  return getWLConfigWithDomain.call(context, {
    configId: "sandwich",
    host: origin
  });
}
