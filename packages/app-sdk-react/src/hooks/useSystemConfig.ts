import { useQuery } from "react-query";
import { SystemConfig, getSystemConfigV2 } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { QueryKeys } from "../util/react-query";
import { useGeolocation } from "./useGeolocation";

export function useSystemConfigV2(): TApiHook<SystemConfig> {
  const { serviceContext } = useRedBeeState();
  const [userLocation] = useGeolocation();
  const { isLoading, data, error } = useQuery(
    [QueryKeys.SYSTEM_CONFIG_V2, userLocation?.countryCode, serviceContext],
    () => {
      if (!userLocation?.countryCode) return;
      return getSystemConfigV2.call(serviceContext, { countryCode: userLocation.countryCode });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}
