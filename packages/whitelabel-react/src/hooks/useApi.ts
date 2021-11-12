import { ExposureApi } from "@ericssonbroadcastservices/exposure-sdk";
import { WhiteLabelService } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useRedBeeState } from "../RedBeeProvider";

export function useExposureApi(): ExposureApi {
  const { exposureApi } = useRedBeeState();
  return exposureApi;
}

export function useWLApi(): WhiteLabelService {
  const { whiteLabelApi } = useRedBeeState();
  return whiteLabelApi;
}
