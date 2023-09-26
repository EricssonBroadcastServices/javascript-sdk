import { ISystemConfigV2 } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { QueryKeys } from "../util/react-query";
import { useExposureApi } from "./useApi";
import { useGeolocation } from "./useGeolocation";

export function useSystemConfigV2(): TApiHook<ISystemConfigV2> {
  const exposureApi = useExposureApi();
  const { customer, businessUnit } = useRedBeeState();
  const [userLocation] = useGeolocation();
  const { isLoading, data, error } = useQuery(
    [QueryKeys.SYSTEM_CONFIG_V2, customer, businessUnit, userLocation?.countryCode],
    () => {
      if (!userLocation?.countryCode || !customer || !businessUnit) return;
      return exposureApi.system.getSystemConfigV2({ customer, businessUnit, countryCode: userLocation.countryCode });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}
