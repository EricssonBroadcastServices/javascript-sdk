import { ITheme, WLConfig } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useEffect } from "react";
import { ActionType, useRedBeeState, useRedBeeStateDispatch, useSelectedLanguage } from "../";
import { useDeprecatedWLApi } from "../";
import { TApiHook } from "../types/type.apiHook";
import { useGeolocation } from "./useGeolocation";

const configLoadingId = "configLoading";

const DEFAULT_THEME: ITheme = {
  dark: "#000000",
  light: "#ffffff",
  error: "#ff0000",
  success: "#00ff00",
  warning: "#ffff00",
  primaryTextColor: "#ffffff",
  secondaryTextColor: "#d3d3d3",
  primaryBackgroundColor: "#000000",
  secondaryBackgroundColor: "#5a5a5a",
  primaryBrandColor: "#000000",
  heroBannerTextColor: "#ffffff"
};

export function useFetchConfig(disabled = false): void {
  const dispatch = useRedBeeStateDispatch();
  const { customer, businessUnit } = useRedBeeState();
  const locale = useSelectedLanguage();
  const [userLocation] = useGeolocation();
  const deprecatedWlApi = useDeprecatedWLApi();
  useEffect(() => {
    if (!userLocation || disabled || !customer || !businessUnit) return;
    dispatch({ type: ActionType.START_LOADING, id: configLoadingId });
    deprecatedWlApi
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

export function useTheme(): TApiHook<ITheme, ITheme> {
  const [config, isLoading] = useConfig();
  return [config?.theme || DEFAULT_THEME, isLoading, null];
}
