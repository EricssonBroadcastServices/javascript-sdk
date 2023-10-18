import { ISystemConfigV2 } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { QueryKeys } from "../util/react-query";
import { useDeprecatedExposureApi } from "./useApi";
import { useGeolocation } from "./useGeolocation";

export function useSystemConfigV2(): TApiHook<ISystemConfigV2> {
  const deprecatedExposureApi = useDeprecatedExposureApi();
  const { customer, businessUnit } = useRedBeeState();
  const [userLocation] = useGeolocation();
  const { isLoading, data, error } = useQuery(
    [QueryKeys.SYSTEM_CONFIG_V2, customer, businessUnit, userLocation?.countryCode],
    () => {
      if (!userLocation?.countryCode || !customer || !businessUnit) return;
      return deprecatedExposureApi.system.getSystemConfigV2({
        customer,
        businessUnit,
        countryCode: userLocation.countryCode
      });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}
