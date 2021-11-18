import { useRedBeeState } from "..";
import { useCallback } from "react";
import { useExposureApi } from "./useApi";
import { useRedBeeStateDispatch, ActionType } from "../RedBeeProvider";
import { useUserSession } from "./useUserSession";
import { StorageKey } from "../util/storageKeys";

export function useSetSelectedLanguage() {
  const exposureApi = useExposureApi();
  const dispatch = useRedBeeStateDispatch();
  const [userSession] = useUserSession();
  const { storage } = useRedBeeState();
  return useCallback(
    (language: string) => {
      dispatch({ type: ActionType.SET_SELECTED_LANGUAGE, language: language });
      if (storage) {
        storage.setItem(StorageKey.LOCALE, language);
      }
      if (!userSession?.isLoggedIn()) return Promise.resolve();
      return (
        exposureApi.user
          // TODO: this method should be changed in the api to only take relevant paramters
          .updateUserDetails({ body: { language, displayName: null, newPassword: null } })
      );
    },
    [exposureApi, dispatch]
  );
}

export function useSelectedLanguage() {
  const { selectedLanguage } = useRedBeeState();
  return selectedLanguage;
}
