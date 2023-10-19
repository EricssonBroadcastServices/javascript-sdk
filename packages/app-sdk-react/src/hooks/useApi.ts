import { WhiteLabelService as AppService } from "@ericssonbroadcastservices/app-sdk";
import { ServiceContext } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { DeprecatedExposureApi, DeprecatedWLService } from "../DeprecatedWLService";
import { useRedBeeState } from "../RedBeeProvider";

export function useContext(): ServiceContext {
  const { serviceContext } = useRedBeeState();
  return serviceContext;
}

export function useAppService(): AppService {
  const { appService } = useRedBeeState();
  return appService;
}

export function useDeprecatedExposureApi(): DeprecatedExposureApi {
  const { deprecatedExposureApi } = useRedBeeState();
  return deprecatedExposureApi;
}

export function useDeprecatedWLApi(): DeprecatedWLService {
  const { deprecatedWhiteLabelApi } = useRedBeeState();
  return deprecatedWhiteLabelApi;
}
