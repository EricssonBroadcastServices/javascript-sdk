import { getWLComponent } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureComponent } from "../../interfaces/exposure-wl-component";
import { WhiteLabelServiceContext } from "../white-label-service";

export interface GetComponentByIdOptions {
  componentId: string;
  hasAuthorizedContent?: boolean;
  countryCode: string;
}

export async function getComponentById<T extends IExposureComponent>(
  context: WhiteLabelServiceContext,
  { componentId, hasAuthorizedContent = false, countryCode }: GetComponentByIdOptions
): Promise<T> {
  const authToken = await context.getAuthToken();
  if (hasAuthorizedContent && !authToken) {
    throw new Error("Content requires authorization but there is no auth token");
  }
  const headers = new Headers();
  if (hasAuthorizedContent) {
    headers.set("Authorization", `Bearer: ${authToken}`);
  }

  return (
    await getWLComponent.call(context, {
      configId: "sandwich",
      allowedCountry: countryCode,
      componentId,
      headers
    })
  ).json();
}
