import { useCallback } from "react";
import { updateUserDetails } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { refetchUserDetails, useUserDetails } from "./useUserDetails";
import { useRedBeeStateDispatch, ActionType, useRedBeeState } from "../RedBeeProvider";
import { useUserSession } from "./useUserSession";
import { StorageKey } from "../util/storageKeys";

// Not sure we should do this here, but useSelectedLanguage need to return string, not undefined
const defaultLanguage = "en";

export function useSetSelectedLanguage() {
  const dispatch = useRedBeeStateDispatch();
  const [session] = useUserSession();
  const { storage, serviceContext } = useRedBeeState();
  const [userDetails] = useUserDetails();
  return useCallback(
    async (language: string, updateUserLanguage = true) => {
      dispatch({ type: ActionType.SET_SELECTED_LANGUAGE, language });
      if (storage) {
        storage.setItem(StorageKey.LOCALE, language);
      }
      if (!session?.isLoggedIn() || language === userDetails?.language || !updateUserLanguage) {
        return Promise.resolve();
      }
      const headers = { Authorization: `Bearer ${session?.sessionToken}` };
      await updateUserDetails.call(serviceContext, { language, headers });
      refetchUserDetails();
    },
    [serviceContext, dispatch]
  );
}

export function useSelectedLanguage() {
  const { selectedLanguage } = useRedBeeState();
  return selectedLanguage || defaultLanguage;
}
