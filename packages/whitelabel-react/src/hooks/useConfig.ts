import { useContext, useEffect } from "react";
import { ActionType, RedBeeContext, useSelectedLanguage } from "../";
import { useWLApi } from "../";
import { useUserGeoLocation } from "./useLocation";

export function useFetchConfig(disabled = false): void {
  const [{ customer, businessUnit, origin }, dispatch] = useContext(RedBeeContext);
  const locale = useSelectedLanguage();
  const userLocation = useUserGeoLocation();
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
  const [state] = useContext(RedBeeContext);
  return state.config;
}
