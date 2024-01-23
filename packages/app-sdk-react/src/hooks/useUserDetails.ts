import { useQuery, useMutation } from "react-query";
import {
  changeEmail,
  changeEmailAndUsername,
  changePassword,
  ChangePasswordResponse,
  getUserDetails,
  LoginResponse,
  putUserAttributes,
  UserDetailsResponse
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { queryClient, QueryKeys } from "../util/react-query";
import { useSetSession, useUserSession } from "./useUserSession";
import { TApiMutation, TApiHook } from "../types/type.apiHook";
import { useServiceContext } from "./useApi";
import { useRedBeeState } from "../RedBeeProvider";
import { AppError } from "@ericssonbroadcastservices/app-sdk";

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
  return [data || null, isLoading, !!error ? AppError.fromUnknown(error) : null];
}

export function useChangePassword(): TApiMutation<
  { newPassword: string; currentPassword: string },
  ChangePasswordResponse
> {
  const { serviceContext, deviceRegistration } = useRedBeeState();
  const [userSession] = useUserSession();
  const setSession = useSetSession();

  const mutation = useMutation({
    onSuccess(data) {
      setSession({ ...(data.loginResponse as LoginResponse), isAnonymous: false });
    },
    mutationKey: [deviceRegistration, serviceContext, setSession, userSession?.sessionToken],
    mutationFn: async ({ newPassword, currentPassword }: { newPassword: string; currentPassword: string }) => {
      if (!userSession?.sessionToken) {
        throw new Error("Trying to change password without being logged in");
      }
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${userSession.sessionToken}`);
      return changePassword.call(serviceContext, {
        newPassword,
        oldPassword: currentPassword,
        device: deviceRegistration,
        headers
      });
    }
  });

  return [
    mutation.mutate,
    mutation.data || null,
    mutation.isLoading,
    !!mutation.error ? AppError.fromUnknown(mutation.error) : null
  ];
}

export function useChangeEmail(): TApiMutation<{ email: string; password: string }, Response> {
  const [userDetails] = useUserDetails();
  const [userSession] = useUserSession();
  const serviceContext = useServiceContext();

  const mutation = useMutation({
    onSuccess: refetchUserDetails,
    mutationKey: [serviceContext, userDetails, userSession],
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      if (!userSession?.sessionToken) {
        throw new Error("Trying to change email without being logged in");
      }
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${userSession.sessionToken}`);
      return changeEmailAndUsername.call(serviceContext, { newEmailAddressAndUsername: email, password, headers });
    }
  });
  return [
    mutation.mutate,
    mutation.data || null,
    mutation.isLoading,
    !!mutation.error ? AppError.fromUnknown(mutation.error) : null
  ];
}

export function useChangeEmailSSO(): TApiMutation<string, Response> {
  const serviceContext = useServiceContext();
  const [userSession] = useUserSession();
  const [userDetails] = useUserDetails();

  const mutation = useMutation({
    onSuccess: refetchUserDetails,
    mutationKey: [serviceContext, userDetails, userSession],
    mutationFn: async (email: string) => {
      if (!userSession?.sessionToken) {
        throw new Error("Trying to change email without being logged in");
      }
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${userSession.sessionToken}`);
      return changeEmail.call(serviceContext, { newEmailAddress: email, headers });
    }
  });

  return [
    mutation.mutate,
    mutation.data || null,
    mutation.isLoading,
    !!mutation.error ? AppError.fromUnknown(mutation.error) : null
  ];
}

type Attribute = { attributeId: string; value: any };

export function useSetUserAttributes(): TApiMutation<Attribute[], UserDetailsResponse> {
  const serviceContext = useServiceContext();
  const [userSession] = useUserSession();

  const mutation = useMutation({
    onSuccess: refetchUserDetails,
    mutationKey: [serviceContext, userSession],
    mutationFn: async (attributes: Attribute[]) => {
      if (!userSession?.sessionToken) {
        throw new Error("Trying to update user attributes without being logged in");
      }
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${userSession.sessionToken}`);
      return putUserAttributes.call(serviceContext, { list: attributes, headers });
    }
  });

  return [
    mutation.mutate,
    mutation.data || null,
    mutation.isLoading,
    !!mutation.error ? AppError.fromUnknown(mutation.error) : null
  ];
}

export function refetchUserDetails() {
  return queryClient.invalidateQueries(QueryKeys.USER_DETAILS);
}
