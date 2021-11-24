import { IBookmark } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { useExposureApi } from "./useApi";
import { useAsset } from "./useAsset";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";

export function useBookmarks(): TApiHook<IBookmark[]> {
  const exposureApi = useExposureApi();
  const { data, isLoading, error } = useQuery([QueryKeys.BOOKMARKS], () => {
    return exposureApi.content.getBookmarks({});
  });
  return [data || [], isLoading, error];
}

export function refetchBookmarks() {
  return queryClient.invalidateQueries([QueryKeys.BOOKMARKS]);
}

export function useBookmarkPercentage(assetId: string): TApiHook<number> {
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
