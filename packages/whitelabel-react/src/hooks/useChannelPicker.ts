import { useWLApi } from "./useApi";
import { IWLEPGChannel } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { useQuery } from "react-query";

const channelpickerUpdateInterval = 60000; // 1 minutes

export function useChannelPicker(
  updateInterval: number = channelpickerUpdateInterval
): TApiHook<IWLEPGChannel[] | undefined> {
  const { customer, businessUnit, selectedLanguage } = useRedBeeState();
  const wlApi = useWLApi();

  const { data, isLoading, error } = useQuery(
    [customer, businessUnit, selectedLanguage],
    () => {
      return wlApi.getChannelPicker({ locale: selectedLanguage as string, customer, businessUnit }).then(result => {
        return result.channels;
      });
    },
    { refetchInterval: updateInterval }
  );
  return [data, isLoading, error];
}
