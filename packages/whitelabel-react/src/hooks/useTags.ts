import { PreferenceListTags } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { queryClient, QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";
import { useExposureApi } from "./useApi";
import { useUserSession } from "./useUserSession";
import { useCallback, useState } from "react";
import { AppError } from "@ericssonbroadcastservices/app-sdk";

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
  return [data || null, isLoading, !!error ? AppError.fromUnknown(error) : null];
}

export function useAddTag(tagId: string): TApiHook<() => void, () => void> {
  const exposureApi = useExposureApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const add = useCallback(async () => {
    setLoading(true);
    await exposureApi.preferences
      .addTagToList({ listId: TAG_FEED_LIST_ID, tagId })
      .then(() => {
        queryClient.invalidateQueries(QueryKeys.TAGS_LIST);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return [add, loading, !!error ? AppError.fromUnknown(error) : null];
}

export function useRemoveTag(tagId: string): TApiHook<() => void, () => void> {
  const exposureApi = useExposureApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const remove = useCallback(async () => {
    setLoading(true);
    await exposureApi.preferences
      .deleteTagFromList({ listId: TAG_FEED_LIST_ID, tagId })
      .then(() => {
        queryClient.invalidateQueries(QueryKeys.TAGS_LIST);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return [remove, loading, !!error ? AppError.fromUnknown(error) : null];
}
