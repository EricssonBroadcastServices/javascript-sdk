import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import {
  addTagToPreferencesList,
  deleteTagFromPreferencesList,
  getTagById,
  getTagsFromPreferencesList,
  PreferencesListResponse,
  TagType
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { queryClient, QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";
import { useServiceContext } from "./useApi";
import { useUserSession } from "./useUserSession";

const TAG_FEED_LIST_ID = "tagfeed";

export function useTagList(): TApiHook<PreferencesListResponse> {
  const ctx = useServiceContext();
  const [session] = useUserSession();
  const { data, isLoading, error } = useQuery([QueryKeys.TAGS_LIST, session?.sessionToken], () => {
    if (!session?.isLoggedIn()) return;
    const headers = { Authorization: `Bearer ${session.sessionToken}` };
    return getTagsFromPreferencesList.call(ctx, { list: TAG_FEED_LIST_ID, headers });
  });
  return [data || null, isLoading, error];
}

export function useAddTag(tagId: string): TApiHook<() => void, () => void> {
  const ctx = useServiceContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const add = useCallback(async () => {
    const [session] = useUserSession();
    setLoading(true);
    try {
      if (!session?.isLoggedIn()) {
        throw new Error("User needs to be logged in to edit tags");
      }
      const headers = { Authorization: `Bearer ${session.sessionToken}` };
      await addTagToPreferencesList.call(ctx, { list: TAG_FEED_LIST_ID, id: tagId, headers });
      queryClient.invalidateQueries(QueryKeys.TAGS_LIST);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return [add, loading, error];
}

export function useRemoveTag(tagId: string): TApiHook<() => void, () => void> {
  const ctx = useServiceContext();
  const [session] = useUserSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const remove = useCallback(async () => {
    setLoading(true);
    try {
      if (!session?.isLoggedIn()) {
        throw new Error("User needs to be logged in to edit tags");
      }
      const headers = { Authorization: `Bearer ${session.sessionToken}` };
      await deleteTagFromPreferencesList.call(ctx, { list: TAG_FEED_LIST_ID, id: tagId, headers });
      queryClient.invalidateQueries(QueryKeys.TAGS_LIST);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return [remove, loading, error];
}

export function useTag(tagId: string): TApiHook<TagType> {
  const ctx = useServiceContext();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.TAG, tagId],
    () => {
      return getTagById.call(ctx, { tagId });
    },
    { staleTime: 1000 * 60 * 60 }
  );
  return [data || null, isLoading, error];
}
