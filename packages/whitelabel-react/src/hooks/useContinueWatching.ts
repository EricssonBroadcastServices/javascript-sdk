import { WLAsset } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useQuery } from "react-query";
import { useRedBeeState } from "../RedBeeProvider";
import { useWLApi } from "./useApi";
import { TApiHook } from "../types/type.apiHook";
import { QueryKeys } from "..";

export function useContinueWatching(tvShowId?: string): TApiHook<WLAsset> {
  const wlApi = useWLApi();
  const { customer, businessUnit, selectedLanguage } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.CONTINUE_WATCHING, tvShowId, customer, businessUnit, selectedLanguage],
    () => {
      if (!customer || !businessUnit || !tvShowId) return;
      return wlApi.getContinueWatchingForTvShow({
        tvShowId,
        customer,
        businessUnit,
        locale: selectedLanguage as string
      });
    },
    { staleTime: 1000 * 60 * 5 }
  );
  return [data || null, isLoading, error];
}
