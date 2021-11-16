import { IUserLocation } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { useExposureApi } from "../";
import { QueryKeys } from "../util/react-query";

export function useUserGeoLocation(): [IUserLocation | null, boolean] {
  const exposureApi = useExposureApi();
  const { data, isLoading } = useQuery(
    QueryKeys.USER_LOCATION,
    () => {
      return exposureApi.location.getLocation();
    },
    { staleTime: 1000 * 60 * 60 * 24 }
  );
  return [data || null, isLoading];
}
