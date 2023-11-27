import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { useQuery } from "react-query";
import { getActiveChannels, ChannelStatus } from "@ericssonbroadcastservices/rbm-ott-sdk";

const DEFAULT_INTERVAL = 60000; // 1 minute

export function useChannelPicker(updateInterval: number = DEFAULT_INTERVAL): TApiHook<ChannelStatus[] | null> {
  const { customer, businessUnit, selectedLanguage, serviceContext } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [customer, businessUnit, selectedLanguage],
    () => {
      return getActiveChannels.call(serviceContext, {}).then(channels => {
        return channels.apiChannelStatuses?.filter(c => !!c.channel?.assetId && c.active);
      });
    },
    { refetchInterval: updateInterval }
  );
  return [data || null, isLoading, error];
}
