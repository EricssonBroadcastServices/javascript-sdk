import { useCallback } from "react";
import { useQuery } from "react-query";
import {
  changeEmail,
  changeEmailAndUsername,
  changePassword,
  getUserDetails,
  LoginResponse,
  UserDetailsResponse
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { queryClient, QueryKeys } from "../util/react-query";
import { useSetSession, useUserSession } from "./useUserSession";
import { TApiHook } from "../types/type.apiHook";
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

export function useChangePassword() {
  const { serviceContext, deviceRegistration } = useRedBeeState();
  const [userSession] = useUserSession();
  const setSession = useSetSession();
  return useCallback(
    async ({ newPassword, currentPassword }: { newPassword: string; currentPassword: string }) => {
      if (!userSession?.sessionToken) {
        throw new Error("Trying to change password without being logged in");
      }
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
        });
    },
    [serviceContext, setSession, userSession]
  );
}

export function useChangeEmail() {
  const [userDetails] = useUserDetails();
  const [userSession] = useUserSession();
  const serviceContext = useServiceContext();
  return useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (email !== userDetails?.email) {
        if (!userSession?.sessionToken) {
          throw new Error("Trying to change email without being logged in");
        }
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${userSession.sessionToken}`);
        return changeEmailAndUsername
          .call(serviceContext, { newEmailAddressAndUsername: email, password, headers })
          .then(() => {
            queryClient.invalidateQueries(QueryKeys.USER_DETAILS);
          });
      }
      return Promise.resolve();
    },
    [serviceContext, userDetails, userSession]
  );
}

export function useChangeEmailSSO() {
  const serviceContext = useServiceContext();
  const [userSession] = useUserSession();
  const [userDetails] = useUserDetails();
  const { customer, businessUnit } = useServiceContext();
  return useCallback(
    async ({ email }: { email: string }) => {
      if (email !== userDetails?.email) {
        if (!userSession?.sessionToken) {
          throw new Error("Trying to change email without being logged in");
        }
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${userSession.sessionToken}`);
        return changeEmail.call(serviceContext, { newEmailAddress: email, headers }).then(() => {
          queryClient.invalidateQueries(QueryKeys.USER_DETAILS);
        });
      }
      return Promise.resolve();
    },
    [customer, businessUnit, userDetails]
  );
}

/* type Attribute = { attributeId: string; value: any };

export function useSetUserAttributes(): (attributes: { attributeId: string; value: any }[]) => Promise<void> {
  const serviceContext = useServiceContext();

  return useCallback(
    (attributes: Attribute[]): Promise<void> => {
      return putUserAttributes.call(serviceContext, { attributes }).then(() => {
        queryClient.invalidateQueries(QueryKeys.USER_DETAILS);
      });
    },
    [serviceContext]
  );
} */

export function refetchUserDetails() {
  return queryClient.invalidateQueries(QueryKeys.USER_DETAILS);
}
