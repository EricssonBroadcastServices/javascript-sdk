import { useQuery } from "react-query";
import { getUserDetails, UserDetailsResponse } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { queryClient, QueryKeys } from "../util/react-query";
import { useUserSession } from "./useUserSession";
import { TApiHook } from "../types/type.apiHook";
import { useRedBeeState } from "../RedBeeProvider";

export function useUserDetails(): TApiHook<UserDetailsResponse> {
  const [session] = useUserSession();
  const { serviceContext } = useRedBeeState();
  const { isLoading, data, error } = useQuery(
    [QueryKeys.USER_DETAILS, session?.sessionToken, serviceContext],
    () => {
      if (!session?.isLoggedIn()) {
        return;
      }
      const headers = { Authorization: `Bearer ${session?.sessionToken}` };
      return getUserDetails.call(serviceContext, { headers });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}

export function refetchUserDetails() {
  return queryClient.invalidateQueries(QueryKeys.USER_DETAILS);
}
