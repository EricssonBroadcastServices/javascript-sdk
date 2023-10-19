import { useQuery } from "react-query";
import { getLocation, Location } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useContext } from "./useApi";
import { QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";

export function useGeolocation(): TApiHook<Location> {
  const ctx = useContext();
  const { data, isLoading, error } = useQuery(
    QueryKeys.USER_LOCATION,
    () => {
      return getLocation.call(ctx);
    },
    { staleTime: 1000 * 60 * 60 * 24 }
  );
  return [data || null, isLoading, error];
}
