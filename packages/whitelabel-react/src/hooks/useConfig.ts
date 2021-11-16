import { useEffect } from "react";
import { ActionType, useRedBeeState, useRedBeeStateDispatch, useSelectedLanguage } from "../";
import { useWLApi } from "../";
import { useUserGeoLocation } from "./useLocation";

export function useFetchConfig(disabled = false): void {
  const dispatch = useRedBeeStateDispatch();
  const { customer, businessUnit, origin } = useRedBeeState();
  const locale = useSelectedLanguage();
  const [userLocation] = useUserGeoLocation();
  const wlApi = useWLApi();
  useEffect(() => {
    if (!userLocation || disabled) return;
    if (customer && businessUnit) {
      wlApi
        .getConfigByCustomerAndBusinessUnit({
          countryCode: userLocation?.countryCode,
          locale: locale || undefined,
          customer,
          businessUnit
        })
        .then(config => {
          dispatch({ type: ActionType.SET_CONFIG, config });
        });
    } else if (origin) {
      wlApi
        .getConfig({
          countryCode: userLocation?.countryCode,
          locale: locale || undefined,
          origin
        })
        .then(config => {
          dispatch({ type: ActionType.SET_CONFIG, config });
        });
    }
  }, [locale, userLocation?.countryCode]);
}

export function useConfig() {
  const state = useRedBeeState();
  return state.config;
}

export function useTheme() {
  const config = useConfig();
  return config?.theme || null;
}
