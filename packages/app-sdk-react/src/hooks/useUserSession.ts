import { IDeviceInfo, LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";
import { useCallback } from "react";
import { StorageKey } from "../util/storageKeys";
import { ActionType } from "../RedBeeProvider";
import { useRedBeeState, useRedBeeStateDispatch } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { useSetSelectedLanguage } from "../hooks/useSelectedLanguage";
import { useDeprecatedExposureApi } from "./useApi";

const sessionLoadingStateId = "sessionLoading";

export function useUserSession(): TApiHook<LoginResponse> {
  const state = useRedBeeState();
  return [state.session, state.loading.includes(sessionLoadingStateId), null];
}

export function useSetSession(): (loginResponse: LoginResponse | null) => void {
  const dispatch = useRedBeeStateDispatch();
  const setSelectedLanguage = useSetSelectedLanguage();
  const { device } = useRedBeeState();
  const deprecatedExposureApi = useDeprecatedExposureApi();
  const { storage } = useRedBeeState();
  return useCallback(
    async (loginResponse: LoginResponse | null) => {
      if (loginResponse) {
        if (storage) {
          storage.setItem(StorageKey.SESSION, JSON.stringify(loginResponse));
        }
        setSelectedLanguage(loginResponse.language, false);
        return dispatch({ type: ActionType.SET_SESSION, session: loginResponse });
      } else {
        try {
          storage?.removeItem(StorageKey.SESSION);
          const anonSession = await deprecatedExposureApi.authentication.loginAnonymous({
            device: device as IDeviceInfo
          });
          return dispatch({ type: ActionType.SET_SESSION, session: anonSession });
        } catch (err) {
          console.error(err);
          return dispatch({ type: ActionType.SET_SESSION, session: null });
        }
      }
    },
    [dispatch]
  );
}
