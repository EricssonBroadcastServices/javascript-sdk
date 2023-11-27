import { AssetHelpers, CarouselItem } from "@ericssonbroadcastservices/app-sdk";
import { useMemo, useState } from "react";

export function useTagFeedFilter(componentAssets: CarouselItem[]): [CarouselItem[], (tagIds: string[]) => void] {
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const assets: CarouselItem[] = useMemo(() => {
    if (!componentAssets) return [];
    if (!tagFilter.length) return componentAssets;
    return componentAssets.filter(item =>
      AssetHelpers.getAllTagIds(item.asset).some(tagId => tagFilter.includes(tagId as string))
    );
  }, [tagFilter, componentAssets]);
  return [assets, setTagFilter];
}
