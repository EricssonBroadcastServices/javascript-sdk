import { useQuery } from "react-query";
import { getLastViewedOffsetList, LastViewedOffset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useServiceContext } from "./useApi";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { useUserSession } from "./useUserSession";

export function useBookmarks(): TApiHook<LastViewedOffset[]> {
  const ctx = useServiceContext();
  const [session] = useUserSession();
  const { data, isLoading, error } = useQuery([QueryKeys.BOOKMARKS, session?.isLoggedIn()], async () => {
    if (!session?.isLoggedIn()) {
      return [];
    }
    const headers = { Authorization: `Bearer ${session?.sessionToken}` };
    return (await getLastViewedOffsetList.call(ctx, { headers })).items;
  });
  return [data || [], isLoading, error];
}

export function refetchBookmarks() {
  return queryClient.invalidateQueries(QueryKeys.BOOKMARKS);
}

export function useBookmarkPercentage(assetId?: string, duration?: number): TApiHook<number> {
  const [bookmarks, bookmarksIsLoading, bookmarksError] = useBookmarks();
  const bookmark = bookmarks?.find(b => b.assetId === assetId);
  if (!bookmark || !duration) return [0, bookmarksIsLoading, bookmarksError];
  return [
    Math.round((((bookmark.lastViewedOffset as number) * 100) / duration) as number),
    bookmarksIsLoading,
    bookmarksError
  ];
}
