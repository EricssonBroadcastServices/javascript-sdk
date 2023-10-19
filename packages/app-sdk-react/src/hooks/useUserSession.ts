import { LoginResponse, loginAnonymous } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useCallback } from "react";
import { StorageKey } from "../util/storageKeys";
import { ActionType } from "../RedBeeProvider";
import { useRedBeeState, useRedBeeStateDispatch } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { useSetSelectedLanguage } from "../hooks/useSelectedLanguage";

const sessionLoadingStateId = "sessionLoading";

export class Session implements LoginResponse {
  constructor(private data: LoginResponse) {}

  hasSession() {
    return Boolean(this.sessionToken && this.expirationDateTime && Date.parse(this.expirationDateTime) > Date.now());
  }

  isLoggedIn() {
    return Boolean(this.hasSession() && this.data.accountId);
  }

  isFirebase() {
    return this.data.accountId?.startsWith("firebase..") || false;
  }

  get sessionToken() {
    return this.data.sessionToken;
  }

  get expirationDateTime() {
    return this.data.expirationDateTime;
  }

  get accountId() {
    return this.data.accountId;
  }
}

export function useUserSession(): TApiHook<Session> {
  const { session, loading } = useRedBeeState();

  return [session && new Session(session), loading.includes(sessionLoadingStateId), null];
}

export function useSetSession(): (loginResponse: LoginResponse | null) => void {
  const dispatch = useRedBeeStateDispatch();
  const setSelectedLanguage = useSetSelectedLanguage();
  const { storage, serviceContext, deviceRegistration } = useRedBeeState();
  const { deviceId, ...device } = deviceRegistration;
  return useCallback(
    async (loginResponse: LoginResponse | null) => {
      if (loginResponse) {
        if (storage) {
          storage.setItem(StorageKey.SESSION, JSON.stringify(loginResponse));
        }
        if (loginResponse.language) {
          setSelectedLanguage(loginResponse.language, false);
        }
        return dispatch({ type: ActionType.SET_SESSION, session: loginResponse });
      } else {
        try {
          storage?.removeItem(StorageKey.SESSION);
          const session = await loginAnonymous.call(serviceContext, { device, deviceId });
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
