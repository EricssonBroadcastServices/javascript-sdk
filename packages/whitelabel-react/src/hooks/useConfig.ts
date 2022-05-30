import { ITheme, WLConfig } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useEffect } from "react";
import { ActionType, useRedBeeState, useRedBeeStateDispatch, useSelectedLanguage } from "../";
import { useWLApi } from "../";
import { TApiHook } from "../types/type.apiHook";
import { useGeolocation } from "./useGeolocation";

const configLoadingId = "configLoading";

export function useFetchConfig(disabled = false): void {
  const dispatch = useRedBeeStateDispatch();
  const { customer, businessUnit } = useRedBeeState();
  const locale = useSelectedLanguage();
  const [userLocation] = useGeolocation();
  const wlApi = useWLApi();
  useEffect(() => {
    if (!userLocation || disabled || !customer || !businessUnit) return;
    dispatch({ type: ActionType.START_LOADING, id: configLoadingId });
    wlApi
      .getConfigByCustomerAndBusinessUnit({
        countryCode: userLocation?.countryCode,
        locale: locale || undefined,
        customer,
        businessUnit
      })
      .then(
        config => {
          return dispatch({ type: ActionType.SET_CONFIG, config });
        },
        () => {
          return dispatch({ type: ActionType.SET_APP_UNAVAILABLE });
        }
      )
      .finally(() => {
        dispatch({ type: ActionType.STOP_LOADING, id: configLoadingId });
      });
    return () => {
      dispatch({ type: ActionType.STOP_LOADING, id: configLoadingId });
    };
  }, [locale, userLocation?.countryCode, disabled]);
}

export function useConfig(): TApiHook<WLConfig> {
  const state = useRedBeeState();
  return [state.config, state.loading.includes(configLoadingId), null];
}

export function useTheme(): TApiHook<ITheme> {
  const [config, isLoading] = useConfig();
  return [config?.theme || null, isLoading, null];
}
