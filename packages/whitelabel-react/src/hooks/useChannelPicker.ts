import { useWLApi } from "./useApi";
import { IWLEPGChannel } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { useQuery } from "react-query";

const channelpickerUpdateInterval = 60000; // 1 minutes

export function useChannelPicker(
  updateInterval: number = channelpickerUpdateInterval
): TApiHook<IWLEPGChannel[] | null> {
  const { customer, businessUnit, selectedLanguage } = useRedBeeState();
  const wlApi = useWLApi();

  const { data, isLoading, error } = useQuery(
    [customer, businessUnit, selectedLanguage],
    () => {
      return wlApi.getChannelPicker({ locale: selectedLanguage as string, customer, businessUnit }).then(result => {
        if (result.channels?.length && result.channels.length > 1) {
          return result.channels;
        } else {
          return null;
        }
      });
    },
    { refetchInterval: updateInterval }
  );
  return [data || null, isLoading, error];
}
