import { refetchUserDetails, useUserDetails } from "./useUserDetails";
import { useCallback } from "react";
import { useDeprecatedExposureApi } from "./useApi";
import { useRedBeeStateDispatch, ActionType, useRedBeeState } from "../RedBeeProvider";
import { useUserSession } from "./useUserSession";
import { StorageKey } from "../util/storageKeys";

// Not sure we should do this here, but useSelectedLanguage need to return string, not undefined
const defaultLanguage = "en";

export function useSetSelectedLanguage() {
  const deprecatedExposureApi = useDeprecatedExposureApi();
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
        deprecatedExposureApi.user
          // TODO: this method should be changed in the api to only take relevant paramters
          .updateUserDetails({ body: { language, displayName: null, newPassword: null } })
          .then(() => refetchUserDetails())
      );
    },
    [deprecatedExposureApi, dispatch]
  );
}

export function useSelectedLanguage() {
  const { selectedLanguage } = useRedBeeState();
  return selectedLanguage || defaultLanguage;
}
