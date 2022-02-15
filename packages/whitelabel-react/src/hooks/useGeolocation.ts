import { IUserLocation } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { useExposureApi } from "./useApi";
import { QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";

export function useGeolocation(): TApiHook<IUserLocation> {
  const exposureApi = useExposureApi();
  const { data, isLoading, error } = useQuery(
    QueryKeys.USER_LOCATION,
    () => {
      return exposureApi.location.getLocation();
    },
    { staleTime: 1000 * 60 * 60 * 24 }
  );
  return [data || null, isLoading, error];
}
