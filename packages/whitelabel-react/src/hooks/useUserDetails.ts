import { IUserDetails } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { QueryKeys } from "../util/react-query";
import { useUserSession } from "./useUserSession";
import { useExposureApi } from "./useApi";
import { TApiHook } from "../types/type.apiHook";

export function useUserDetails(): TApiHook<IUserDetails> {
  const [userSession] = useUserSession();
  const exposureApi = useExposureApi();
  const { isLoading, data, error } = useQuery(
    [QueryKeys.USER_DETAILS, userSession?.sessionToken],
    () => {
      if (!userSession?.isLoggedIn()) return;
      return exposureApi.user.getUserDetails({});
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}