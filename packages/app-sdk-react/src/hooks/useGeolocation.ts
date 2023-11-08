import { useQuery } from "react-query";
import { getLocation, Location } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useServiceContext } from "./useApi";
import { QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";

export function useGeolocation(): TApiHook<Location> {
  const ctx = useServiceContext();
  const { data, isLoading, error } = useQuery(
    QueryKeys.USER_LOCATION,
    () => {
      return getLocation.call(ctx);
    },
    { staleTime: 1000 * 60 * 60 * 24 }
  );
  return [data || null, isLoading, error];
}
