import { useEffect } from "react";
import { ActionType, useRedBeeState, useRedBeeStateDispatch } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { useAppService } from "./useApi";
import { EssentialAppData, IExposureWLConfig, IExposureWLMenu, IWLTheme } from "@ericssonbroadcastservices/app-sdk";

const configLoadingId = "configLoading";

const DEFAULT_THEME: IWLTheme = {
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
  const appService = useAppService();
  useEffect(() => {
    if (disabled || !customer || !businessUnit) return;
    dispatch({ type: ActionType.START_LOADING, id: configLoadingId });
    appService
      .getEssentialAppData()
      .then(
        data => {
          return dispatch({ type: ActionType.SET_ESSENTIAL_APP_DATA, data });
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
  }, [disabled]);
}

export function useEssentialAppData(): TApiHook<EssentialAppData> {
  const state = useRedBeeState();
  return [state.essentialAppData || null, state.loading.includes(configLoadingId), null];
}

export function useConfig(): TApiHook<IExposureWLConfig> {
  const [essentialAppData, loading] = useEssentialAppData();
  return [essentialAppData?.config || null, loading, null];
}

export function useMenu(): TApiHook<IExposureWLMenu> {
  const [essentialAppData, loading] = useEssentialAppData();
  return [essentialAppData?.menu || null, loading, null];
}

export function useTheme(): TApiHook<IWLTheme, IWLTheme> {
  const [config, isLoading] = useConfig();
  return [config?.theme || DEFAULT_THEME, isLoading, null];
}
