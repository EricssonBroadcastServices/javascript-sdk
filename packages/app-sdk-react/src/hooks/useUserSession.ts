import { loginAnonymous } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useCallback } from "react";
import { StorageKey } from "../util/storageKeys";
import { ActionType } from "../RedBeeProvider";
import { useRedBeeState, useRedBeeStateDispatch } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { useSetSelectedLanguage } from "../hooks/useSelectedLanguage";
import { Session, SessionData } from "../Session";

const sessionLoadingStateId = "sessionLoading";

export function useUserSession(): TApiHook<Session> {
  const { session, loading } = useRedBeeState();

  return [session, loading.includes(sessionLoadingStateId), null];
}

export function useSetSession(): (sessionData: SessionData | null) => void {
  const dispatch = useRedBeeStateDispatch();
  const setSelectedLanguage = useSetSelectedLanguage();
  const { storage, serviceContext, deviceRegistration } = useRedBeeState();
  const { deviceId, ...device } = deviceRegistration;
  return useCallback(
    async (sessionData: SessionData | null) => {
      if (sessionData) {
        if (storage) {
          storage.setItem(StorageKey.SESSION, JSON.stringify(sessionData));
        }
        if (sessionData.language) {
          setSelectedLanguage(sessionData.language, false);
        }
        return dispatch({ type: ActionType.SET_SESSION, session: new Session(sessionData) });
      } else {
        try {
          storage?.removeItem(StorageKey.SESSION);
          const session = new Session({
            ...(await loginAnonymous.call(serviceContext, { device, deviceId })),
            isAnonymous: true
          });
          return dispatch({ type: ActionType.SET_SESSION, session });
        } catch (err) {
          console.error(err);
          return dispatch({ type: ActionType.SET_SESSION, session: null });
        }
      }
    },
    [dispatch]
  );
}
