import { IUserDetails } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { QueryKeys } from "../util/react-query";
import { useUserSession } from "./useUserSession";
import { useExposureApi } from "./useApi";

export function useUserDetails(): [IUserDetails | null, boolean, unknown] {
  const userSession = useUserSession();
  const exposureApi = useExposureApi();
  const { isLoading, error, data } = useQuery(
    [QueryKeys.USER_DETAILS, userSession?.sessionToken],
    async () => {
      if (!userSession?.isLoggedIn()) return;
      return exposureApi.user.getUserDetails({});
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}
