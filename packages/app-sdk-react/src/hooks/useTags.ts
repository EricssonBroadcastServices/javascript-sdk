import { PreferenceListTags } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { queryClient, QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";
import { useDeprecatedExposureApi } from "./useApi";
import { useUserSession } from "./useUserSession";
import { useCallback, useState } from "react";

const TAG_FEED_LIST_ID = "tagfeed";

export function useTagList(): TApiHook<PreferenceListTags> {
  const deprecatedExposureApi = useDeprecatedExposureApi();
  const [userSession] = useUserSession();
  const { data, isLoading, error } = useQuery([QueryKeys.TAGS_LIST, userSession?.sessionToken], () => {
    if (!userSession?.isLoggedIn()) return;
    return deprecatedExposureApi.preferences.getTagsFromList({
      listId: TAG_FEED_LIST_ID
    });
  });
  return [data || null, isLoading, error];
}

export function useAddTag(tagId: string): TApiHook<() => void, () => void> {
  const deprecatedExposureApi = useDeprecatedExposureApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const add = useCallback(async () => {
    setLoading(true);
    await deprecatedExposureApi.preferences
      .addTagToList({ listId: TAG_FEED_LIST_ID, tagId })
      .then(() => {
        queryClient.invalidateQueries(QueryKeys.TAGS_LIST);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return [add, loading, error];
}

export function useRemoveTag(tagId: string): TApiHook<() => void, () => void> {
  const deprecatedExposureApi = useDeprecatedExposureApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const remove = useCallback(async () => {
    setLoading(true);
    await deprecatedExposureApi.preferences
      .deleteTagFromList({ listId: TAG_FEED_LIST_ID, tagId })
      .then(() => {
        queryClient.invalidateQueries(QueryKeys.TAGS_LIST);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return [remove, loading, error];
}
