import { LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";
import { useCallback } from "react";
import { StorageKey } from "../util/storageKeys";
import { ActionType } from "../RedBeeProvider";
import { useRedBeeState, useRedBeeStateDispatch } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { useSetSelectedLanguage } from "../hooks/useSelectedLanguage";

const sessionLoadingStateId = "sessionLoading";

export function useUserSession(): TApiHook<LoginResponse> {
  const state = useRedBeeState();
  return [state.session, state.loading.includes(sessionLoadingStateId), null];
}

export function useSetSession(): (loginResponse: LoginResponse | null) => void {
  const dispatch = useRedBeeStateDispatch();
  const setSelectedLanguage = useSetSelectedLanguage();
  const { storage } = useRedBeeState();
  return useCallback(
    (loginResponse: LoginResponse | null) => {
      if (loginResponse) {
        if (storage) {
          storage.setItem(StorageKey.SESSION, JSON.stringify(loginResponse));
        }
        setSelectedLanguage(loginResponse.language);
      } else if (storage) {
        storage.removeItem(StorageKey.SESSION);
      }
      return dispatch({ type: ActionType.SET_SESSION, session: loginResponse });
    },
    [dispatch]
  );
}
