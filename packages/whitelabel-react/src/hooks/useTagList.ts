import { PreferenceListTags } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";
import { useExposureApi } from "./useApi";
import { useUserSession } from "./useUserSession";

const TAG_FEED_LIST_ID = "tagfeed";

export function useTagList(): TApiHook<PreferenceListTags> {
  const exposureApi = useExposureApi();
  const [userSession] = useUserSession();
  const { data, isLoading, error } = useQuery([QueryKeys.TAGS_LIST, userSession?.sessionToken], () => {
    if (!userSession?.isLoggedIn()) return;
    return exposureApi.preferences.getTagsFromList({
      listId: TAG_FEED_LIST_ID
    });
  });
  return [data || null, isLoading, error];
}
