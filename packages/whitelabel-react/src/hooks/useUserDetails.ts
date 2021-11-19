import { IUserDetails } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { queryClient, QueryKeys } from "../util/react-query";
import { useUserSession } from "./useUserSession";
import { useExposureApi } from "./useApi";
import { TApiHook } from "../types/type.apiHook";
import { useRedBeeState } from "../RedBeeProvider";

export function useUserDetails(): TApiHook<IUserDetails> {
  const [userSession] = useUserSession();
  const exposureApi = useExposureApi();
  const { customer, businessUnit } = useRedBeeState();
  const { isLoading, data, error } = useQuery(
    [QueryKeys.USER_DETAILS, userSession?.sessionToken, customer, businessUnit],
    () => {
      if (!userSession?.isLoggedIn() || !customer || !businessUnit) return;
      return exposureApi.user.getUserDetails({ customer, businessUnit });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}

export function refetchUserDetails() {
  return queryClient.invalidateQueries(QueryKeys.USER_DETAILS);
}
