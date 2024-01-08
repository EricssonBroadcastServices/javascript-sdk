import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import {
  addTagToPreferencesList,
  deleteTagFromPreferencesList,
  getTagsFromPreferencesList,
  listTags,
  PreferencesListResponse,
  ServiceContext,
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

async function fetchAllTags(ctx: ServiceContext) {
  const { items, totalCount, pageSize } = await listTags.call(ctx, { pageSize: 100, pageNumber: 1, sort: "-created" });
  const remainingPages = Math.ceil(totalCount / pageSize) - 1; // minus the one we already fetched;

  const pageItems = await Promise.all(
    // +2 for mapping 0 => 1, + 1 for skipping the one we already fetched
    Array.from({ length: remainingPages }, (_, i) => i + 2).map(pageNumber =>
      listTags.call(ctx, { pageSize: 100, pageNumber, sort: "-created" }).then(({ items }) => items)
    )
  );

  return [...items, ...pageItems.flat()];
}

export function useTags(): TApiHook<TagType[], []> {
  const ctx = useServiceContext();
  const { data, isLoading, error } = useQuery([QueryKeys.TAGS], () => fetchAllTags(ctx), { staleTime: 1000 * 60 * 60 });
  return [data || [], isLoading, error];
}

/**
 * **Notice**: useTag is just a convenient wrapper around useTag*s*, that assumes you want to fetch all tags once and reuse the same cache. If you just want to fetch one tag id, use `getTagById` from rbm-ott-sdk instead.
 */
export function useTag(tagId: string): TApiHook<TagType> {
  const [tags, isLoading, error] = useTags();
  const tag = isLoading || error ? null : tags.find(tag => tag.tagId === tagId);
  return [tag || null, isLoading, error];
}
