import { useCallback } from "react";
import { updateUserDetails } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { refetchUserDetails, useUserDetails } from "./useUserDetails";
import { useRedBeeStateDispatch, ActionType, useRedBeeState } from "../RedBeeProvider";
import { useUserSession } from "./useUserSession";
import { StorageKey } from "../util/storageKeys";
import { useConfig } from "./useConfig";

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
    [dispatch, storage, session, userDetails?.language, serviceContext]
  );
}

export function useDefaultLanguage() {
  const [config] = useConfig();
  return config?.systemConfig.defaultLocale || "en";
}

export function useSelectedLanguage() {
  const defaultLanguage = useDefaultLanguage();
  const { selectedLanguage } = useRedBeeState();
  return selectedLanguage || defaultLanguage;
}

export function useLanguage() {
  const defaultLanguage = useDefaultLanguage();
  const language = useSelectedLanguage();

  return {
    language,
    defaultLanguage
  };
}
