import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import {
  changeEmail,
  changeEmailAndUsername,
  changePassword,
  getUserDetails,
  LoginResponse,
  putUserAttributes,
  UserDetailsResponse
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { queryClient, QueryKeys } from "../util/react-query";
import { useSetSession, useUserSession } from "./useUserSession";
import { TApiCallback, TApiHook } from "../types/type.apiHook";
import { useServiceContext } from "./useApi";
import { useRedBeeState } from "../RedBeeProvider";

export function useUserDetails(): TApiHook<UserDetailsResponse> {
  const [session] = useUserSession();
  const serviceContext = useServiceContext();
  const { isLoading, data, error } = useQuery(
    [QueryKeys.USER_DETAILS, session?.sessionToken, serviceContext],
    () => {
      if (!session?.isLoggedIn()) {
        return;
      }
      const headers = { Authorization: `Bearer ${session?.sessionToken}` };
      return getUserDetails.call(serviceContext, { headers });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}

export function useChangePassword(): TApiCallback<
  (payload: { newPassword: string; currentPassword: string }) => Promise<void>
> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const { serviceContext, deviceRegistration } = useRedBeeState();
  const [userSession] = useUserSession();
  const setSession = useSetSession();
  const changePasswordCallback = useCallback(
    async ({ newPassword, currentPassword }: { newPassword: string; currentPassword: string }) => {
      if (!userSession?.sessionToken) {
        setError(new Error("Trying to change password without being logged in"));
        return;
      }
      setIsLoading(true);
      setError(null);
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${userSession.sessionToken}`);
      return changePassword
        .call(serviceContext, {
          newPassword,
          oldPassword: currentPassword,
          device: deviceRegistration,
          headers
        })
        .then(response => {
          setSession({ ...(response.loginResponse as LoginResponse), isAnonymous: false });
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [serviceContext, setSession, userSession]
  );
  return [changePasswordCallback, isLoading, error];
}

export function useChangeEmail(): TApiCallback<(payload: { email: string; password: string }) => Promise<void>> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [userDetails] = useUserDetails();
  const [userSession] = useUserSession();
  const serviceContext = useServiceContext();
  const changeEmailCallback = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (email !== userDetails?.email) {
        if (!userSession?.sessionToken) {
          setError(new Error("Trying to change email without being logged in"));
          return;
        }
        setIsLoading(true);
        setError(null);
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${userSession.sessionToken}`);
        return changeEmailAndUsername
          .call(serviceContext, { newEmailAddressAndUsername: email, password, headers })
          .then(() => {
            refetchUserDetails();
          })
          .catch(err => {
            setError(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      return Promise.resolve();
    },
    [serviceContext, userDetails, userSession]
  );
  return [changeEmailCallback, isLoading, error];
}

export function useChangeEmailSSO(): TApiCallback<(email: string) => Promise<void>> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const serviceContext = useServiceContext();
  const [userSession] = useUserSession();
  const [userDetails] = useUserDetails();
  const { customer, businessUnit } = useServiceContext();
  const changeEmailSSO = useCallback(
    async (email: string) => {
      if (email !== userDetails?.email) {
        if (!userSession?.sessionToken) {
          setError(new Error("Trying to change email without being logged in"));
          return;
        }
        setIsLoading(true);
        setError(null);
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${userSession.sessionToken}`);
        return changeEmail
          .call(serviceContext, { newEmailAddress: email, headers })
          .then(() => {
            refetchUserDetails();
          })
          .catch(err => {
            setError(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      return Promise.resolve();
    },
    [customer, businessUnit, userDetails]
  );
  return [changeEmailSSO, isLoading, error];
}

type Attribute = { attributeId: string; value: any };

export function useSetUserAttributes(): TApiCallback<
  (attributes: { attributeId: string; value: any }[]) => Promise<void>
> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const serviceContext = useServiceContext();
  const [userSession] = useUserSession();
  const setUserAttributes = useCallback(
    async (attributes: Attribute[]): Promise<void> => {
      if (!userSession?.sessionToken) {
        setError(new Error("Trying to update user attributes without being logged in"));
        return;
      }
      setIsLoading(true);
      setError(null);
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${userSession.sessionToken}`);
      return putUserAttributes
        .call(serviceContext, { list: attributes, headers })
        .then(() => {
          refetchUserDetails();
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [serviceContext, userSession]
  );
  return [setUserAttributes, isLoading, error];
}

export function refetchUserDetails() {
  return queryClient.invalidateQueries(QueryKeys.USER_DETAILS);
}
