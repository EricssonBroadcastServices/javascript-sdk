import { AppConfig } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { QueryKeys } from "../util/react-query";
import { useExposureApi } from "./useApi";

export function useAppConfig<App extends keyof AppConfig>(appConfigName: App): TApiHook<AppConfig[App] | undefined> {
  const exposureApi = useExposureApi();
  const { customer, businessUnit } = useRedBeeState();
  const { isLoading, data, error } = useQuery(
    [QueryKeys.APP_CONFIG, customer, businessUnit],
    () => {
      if (!customer || !businessUnit) return undefined;
      return exposureApi.whiteLabel.getAppConfig({ customer, businessUnit, app: appConfigName });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data, isLoading, error];
}
