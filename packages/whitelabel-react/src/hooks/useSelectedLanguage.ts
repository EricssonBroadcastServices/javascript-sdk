import { refetchUserDetails, useUserDetails } from "./useUserDetails";
import { useCallback } from "react";
import { useExposureApi } from "./useApi";
import { useRedBeeStateDispatch, ActionType, useRedBeeState } from "../RedBeeProvider";
import { useUserSession } from "./useUserSession";
import { StorageKey } from "../util/storageKeys";
import { useSystemConfigV2 } from "./useSystemConfig";

export function useSetSelectedLanguage() {
  const exposureApi = useExposureApi();
  const dispatch = useRedBeeStateDispatch();
  const [userSession] = useUserSession();
  const { storage } = useRedBeeState();
  const [userDetails] = useUserDetails();
  return useCallback(
    (language: string, updateUserLanguage = true) => {
      dispatch({ type: ActionType.SET_SELECTED_LANGUAGE, language: language });
      if (storage) {
        storage.setItem(StorageKey.LOCALE, language);
      }
      if (!userSession?.isLoggedIn() || language === userDetails?.language || !updateUserLanguage)
        return Promise.resolve();
      return (
        exposureApi.user
          // TODO: this method should be changed in the api to only take relevant paramters
          .updateUserDetails({ body: { language, displayName: null, newPassword: null } })
          .then(() => refetchUserDetails())
      );
    },
    [exposureApi, dispatch]
  );
}

export function useSelectedLanguage() {
  const [systemConfig] = useSystemConfigV2();
  const { selectedLanguage } = useRedBeeState();
  if (systemConfig?.localization.displayLocales.length === 1) {
    return systemConfig.localization.defaultLocale;
  }
  return selectedLanguage;
}
