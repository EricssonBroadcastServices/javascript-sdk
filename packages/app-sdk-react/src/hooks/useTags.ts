import { useMutation, useQuery } from "react-query";
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
import { TApiHook, TApiMutation } from "../types/type.apiHook";
import { useServiceContext } from "./useApi";
import { useUserSession } from "./useUserSession";
import { useMemo } from "react";

const TAG_FEED_LIST_ID = "tagfeed";

function refetchTagList() {
  return queryClient.invalidateQueries(QueryKeys.TAGS_LIST);
}

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

export function useAddTag(tagId: string): TApiMutation<void, null> {
  const ctx = useServiceContext();
  const [session] = useUserSession();

  const mutation = useMutation({
    onSuccess: refetchTagList,
    mutationKey: [ctx, session, tagId],
    mutationFn: async () => {
      if (!session?.isLoggedIn()) {
        throw new Error("User needs to be logged in to edit tags");
      }
      const headers = { Authorization: `Bearer ${session.sessionToken}` };
      await addTagToPreferencesList.call(ctx, { list: TAG_FEED_LIST_ID, id: tagId, headers });
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, mutation.error];
}

export function useRemoveTag(tagId: string): TApiMutation<void, null> {
  const ctx = useServiceContext();
  const [session] = useUserSession();

  const mutation = useMutation({
    onSuccess: refetchTagList,
    mutationKey: [ctx, session, tagId],
    mutationFn: async () => {
      if (!session?.isLoggedIn()) {
        throw new Error("User needs to be logged in to edit tags");
      }
      const headers = { Authorization: `Bearer ${session.sessionToken}` };
      await deleteTagFromPreferencesList.call(ctx, { list: TAG_FEED_LIST_ID, id: tagId, headers });
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, mutation.error];
}

type THandleTags = { add: () => void; remove: () => void; isFollowed: boolean };

export function useHandleFollowTag(tagId: string): TApiHook<THandleTags, THandleTags> {
  const [add, , addLoading, addError] = useAddTag(tagId);
  const [remove, , removeLoading, removeError] = useRemoveTag(tagId);
  const [tagList] = useTagList();
  const isFollowed = useMemo(() => !!tagList?.items?.some(t => t.id === tagId), [tagId, tagList?.items]);

  return [{ add, remove, isFollowed }, addLoading || removeLoading, addError || removeError];
}

async function fetchAllTags(ctx: ServiceContext) {
  const { items, totalCount, pageSize } = await listTags.call(ctx, { pageSize: 100, pageNumber: 1, sort: "-created" });
  const remainingPages = Math.ceil(totalCount / pageSize) - 1; // minus the one we already fetched;

  const pageItems = await Promise.all(
    // +2 for mapping 0 => 1, + 1 for skipping the one we already fetched
    Array.from({ length: remainingPages }, (_, i) => i + 2).map(pageNumber =>
      listTags.call(ctx, { pageSize, pageNumber, sort: "-created" }).then(({ items }) => items)
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
