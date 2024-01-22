import { useCallback } from "react";
import { useSetSession, useUserSession } from "./useUserSession";
import { useRedBeeState } from "../RedBeeProvider";
import { ErrorCode } from "../util/error";
import {
  LoginResponse,
  login,
  loginFirebase,
  loginOauth,
  logout,
  validateSessionToken
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { TApiMutation } from "../types/type.apiHook";
import { useMutation } from "react-query";
import { useLanguage } from "./useSelectedLanguage";
import { AppError } from "@ericssonbroadcastservices/app-sdk";

type TUseLogin = { username: string; password: string };

export function useLogin(): TApiMutation<TUseLogin, LoginResponse> {
  const { deviceRegistration, serviceContext } = useRedBeeState();
  const setSession = useSetSession();
  const mutation = useMutation({
    onSuccess(data) {
      setSession(data);
    },
    mutationKey: [deviceRegistration, serviceContext, setSession],
    mutationFn: ({ username, password }: TUseLogin) => {
      return login.call(serviceContext, {
        username,
        password,
        device: deviceRegistration,
        informationCollectionConsentGivenNow: false
      });
    }
  });
  return [mutation.mutate, mutation.data || null, mutation.isLoading, AppError.fromUnknown(mutation.error, "LOGIN")];
}

export function useOauthLogin(): TApiMutation<string, LoginResponse> {
  const { language } = useLanguage();
  const { deviceRegistration, serviceContext } = useRedBeeState();
  const setSession = useSetSession();

  const mutation = useMutation({
    onSuccess(data) {
      setSession(data);
    },
    mutationKey: [deviceRegistration, serviceContext, setSession, language],
    mutationFn: (token: string) => {
      return loginOauth.call(serviceContext, { token, device: deviceRegistration, language });
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, AppError.fromUnknown(mutation.error, "LOGIN")];
}

type LoginFirebasePayload = {
  username: string;
  email?: string;
  displayName?;
  emailVerified?: boolean;
  providerId?: string;
  accessToken: string;
};

export function useFirebaseLogin(): TApiMutation<LoginFirebasePayload, LoginResponse> {
  const { language } = useLanguage();
  const { deviceRegistration, serviceContext } = useRedBeeState();
  const setSession = useSetSession();

  const mutation = useMutation({
    onSuccess(data) {
      setSession(data);
    },
    mutationKey: [deviceRegistration, serviceContext, setSession, language],
    mutationFn: (params: LoginFirebasePayload) => {
      return loginFirebase.call(serviceContext, { ...params, device: deviceRegistration, language });
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, AppError.fromUnknown(mutation.error, "LOGIN")];
}

type TUseLogout = { fromAllDevice?: boolean };

export function useLogout(): TApiMutation<TUseLogout, object> {
  const setSession = useSetSession();
  const { serviceContext } = useRedBeeState();
  const [session] = useUserSession();

  const mutation = useMutation({
    mutationKey: [serviceContext, session?.sessionToken, setSession],
    mutationFn: async ({ fromAllDevice = false }: TUseLogout) => {
      if (!session?.sessionToken) {
        return;
      }
      const headers = { Authorization: `Bearer ${session?.sessionToken}` };
      return logout.call(serviceContext, { headers, fromAllDevice }).finally(async () => setSession(null));
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, AppError.fromUnknown(mutation.error, "LOGIN")];
}

export function useValidateSession() {
  const { serviceContext } = useRedBeeState();
  const [session] = useUserSession();
  const setSession = useSetSession();
  return useCallback(async () => {
    if (session?.sessionToken) {
      const headers = { Authorization: `Bearer ${session.sessionToken}` };
      return validateSessionToken.call(serviceContext, { headers }).catch(err => {
        if ((err as any)?.response?.status !== 401) {
          throw { code: ErrorCode.UNEXPECTED_SESSION_VALIDATION_ERROR, error: err, session };
        }
        setSession(null);
      });
    }
    return Promise.resolve();
  }, [serviceContext, session, setSession]);
}
