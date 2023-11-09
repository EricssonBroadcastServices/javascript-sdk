import { CarouselItem, getIndexOfLiveOrClosestUpcomingDateInterval } from "@ericssonbroadcastservices/app-sdk";
import { useMemo } from "react";

export function useInitialCarouselIndex(list: CarouselItem[]): number {
  return useMemo(() => {
    if (!list.every(item => !!item.startTime && !!item.endTime)) {
      return 0;
    }

    return getIndexOfLiveOrClosestUpcomingDateInterval(
      list.map(item => ({ startTime: new Date(item.startTime as string), endTime: new Date(item.endTime as string) }))
    );
  }, [list]);
}
