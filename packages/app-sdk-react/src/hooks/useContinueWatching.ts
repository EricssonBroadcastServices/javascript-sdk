import { getContinueWatchingTvShow, WatchedTvShowResponse } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useQuery } from "react-query";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { QueryKeys } from "../util/react-query";
import { useUserSession } from "./useUserSession";
import { AppError } from "@ericssonbroadcastservices/app-sdk";

export function useContinueWatching(tvshowid?: string): TApiHook<WatchedTvShowResponse> {
  const [session] = useUserSession();
  const { serviceContext } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.CONTINUE_WATCHING, tvshowid, serviceContext, session?.isLoggedIn()],
    () => {
      if (!tvshowid || !session?.isLoggedIn()) {
        return;
      }
      return getContinueWatchingTvShow.call(serviceContext, {
        tvshowid,
        headers: { Authorization: `Bearer ${session.sessionToken}` }
      });
    }
  );
  return [data || null, isLoading, !!error ? AppError.fromUnknown(error) : null];
}
