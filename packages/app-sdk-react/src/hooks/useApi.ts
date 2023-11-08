import { WhiteLabelService as AppService } from "@ericssonbroadcastservices/app-sdk";
import { ServiceContext } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { DeprecatedWLService } from "../DeprecatedWLService";
import { useRedBeeState } from "../RedBeeProvider";

export function useServiceContext(): ServiceContext {
  const { serviceContext } = useRedBeeState();
  return serviceContext;
}

export function useAppService(): AppService {
  const { appService } = useRedBeeState();
  return appService;
}

export function useDeprecatedWLApi(): DeprecatedWLService {
  const { deprecatedWhiteLabelApi } = useRedBeeState();
  return deprecatedWhiteLabelApi;
}
