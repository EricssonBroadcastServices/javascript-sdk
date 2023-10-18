import { ExposureApi as DeprecatedExposureApi } from "@ericssonbroadcastservices/exposure-sdk";
import { WhiteLabelService as DeprecatedWLService } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useRedBeeState } from "../RedBeeProvider";

export function useDeprecatedExposureApi(): DeprecatedExposureApi {
  const { deprecatedExposureApi } = useRedBeeState();
  return deprecatedExposureApi;
}

export function useDeprecatedWLApi(): DeprecatedWLService {
  const { deprecatedWhiteLabelApi } = useRedBeeState();
  return deprecatedWhiteLabelApi;
}
