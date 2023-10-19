import { useQuery } from "react-query";
import { getLastViewedOffsetList, LastViewedOffset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useContext } from "./useApi";
import { useAsset } from "./useAsset";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { useUserSession } from "./useUserSession";

export function useBookmarks(): TApiHook<LastViewedOffset[]> {
  const ctx = useContext();
  const [session] = useUserSession();
  const { data, isLoading, error } = useQuery([QueryKeys.BOOKMARKS], async () => {
    if (!session?.isLoggedIn()) {
      return [];
    }
    const headers = { Authorization: `Bearer ${session?.sessionToken}` };
    return (await getLastViewedOffsetList.call(ctx, { headers })).items;
  });
  return [data || [], isLoading, error];
}

export function refetchBookmarks() {
  return queryClient.invalidateQueries([QueryKeys.BOOKMARKS]);
}

export function useBookmarkPercentage(assetId?: string): TApiHook<number> {
  const [asset, assetIsLoading, assetError] = useAsset(assetId);
  const [bookmarks, bookmarksIsLoading, bookmarksError] = useBookmarks();
  const bookmark = bookmarks?.find(b => b.assetId === assetId);
  if (!bookmark || !asset) return [0, assetIsLoading || bookmarksIsLoading, assetError || bookmarksError];
  return [
    Math.round((((bookmark.lastViewedOffset as number) * 100) / asset.duration) as number),
    assetIsLoading || bookmarksIsLoading,
    assetError || bookmarksError
  ];
}
