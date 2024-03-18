import { ChannelStatus, getActiveChannels, getChannelStatus } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useQuery } from "react-query";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { useAppError } from "./useAppError";
import { QueryKeys } from "../util/react-query";

const DEFAULT_INTERVAL = 60000 * 10; // 10 minutes

export function useOnNow(updateInterval: number = DEFAULT_INTERVAL): TApiHook<Required<ChannelStatus>[] | null> {
  const { customer, businessUnit, selectedLanguage, serviceContext } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.ON_NOW, customer, businessUnit, selectedLanguage],
    async () => {
      const channels = await getActiveChannels.call(serviceContext, { sortingLocale: selectedLanguage });
      return channels.apiChannelStatuses?.filter(
        c => !!c.channel?.assetId && c.active && !!c.assets
      ) as Required<ChannelStatus>[];
    },
    { refetchInterval: updateInterval }
  );
  return [data || null, isLoading, useAppError(error)];
}

type TUseOnNowForChannel = {
  channelId?: string;
  updateInterval?: number;
};

export function useOnNowForChannel({
  channelId,
  updateInterval = DEFAULT_INTERVAL
}: TUseOnNowForChannel): TApiHook<ChannelStatus> {
  const { customer, businessUnit, selectedLanguage, serviceContext } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.ON_NOW, customer, businessUnit, selectedLanguage, channelId],
    () => {
      if (!channelId) return;
      return getChannelStatus.call(serviceContext, { channelId });
    },
    { refetchInterval: updateInterval }
  );
  return [data || null, isLoading, useAppError(error)];
}
