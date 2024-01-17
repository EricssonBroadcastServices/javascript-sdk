import { useMutation, useQuery } from "react-query";
import {
  deleteStoredPaymentMethod,
  getStoredPaymentMethods,
  JsonAccount,
  PaymentMethod,
  updatePreferredPaymentMethod
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { TApiHook, TApiMutation } from "../types/type.apiHook";
import { useSystemConfigV2 } from "./useSystemConfig";
import { useServiceContext } from "./useApi";
import { useUserSession } from "./useUserSession";
import { queryClient, QueryKeys } from "../util/react-query";

const paymentMethodsCacheTime = 1000 * 60 * 30;

/** only stripe is supported */
export function usePaymentMethods(): TApiHook<PaymentMethod[]> {
  const ctx = useServiceContext();
  const [session] = useUserSession();
  const [systemConfig] = useSystemConfigV2();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.PAYMENT_METHODS, session?.sessionToken],
    () => {
      if (session?.isLoggedIn() && systemConfig?.payments.stripe.enabled) {
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${session?.sessionToken}`);
        return getStoredPaymentMethods.call(ctx, { headers });
      }
      return;
    },
    {
      staleTime: paymentMethodsCacheTime,
      refetchOnWindowFocus: false
    }
  );
  return [data?.methods || null, isLoading, error];
}

export function refetchPaymentMethods() {
  return queryClient.invalidateQueries(QueryKeys.PAYMENT_METHODS);
}

export function useDeletePaymentMethod(): TApiMutation<string, Response> {
  const ctx = useServiceContext();
  const [session] = useUserSession();

  const mutation = useMutation({
    onSuccess: refetchPaymentMethods,
    mutationKey: [session, ctx],
    mutationFn: (paymentMethodId: string) => {
      if (!session?.isLoggedIn()) {
        throw new Error("deleting a paymentmethod requires being logged in");
      }
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${session?.sessionToken}`);
      return deleteStoredPaymentMethod.call(ctx, { paymentMethodId, headers });
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, mutation.error];
}

export function useSetPreferredPaymentMethod(): TApiMutation<string, JsonAccount> {
  const ctx = useServiceContext();
  const [session] = useUserSession();

  const mutation = useMutation({
    onSuccess: refetchPaymentMethods,
    mutationKey: [session, ctx],
    mutationFn: (paymentMethodId: string) => {
      if (!session?.isLoggedIn()) {
        throw new Error("setting a paymentmethod requires being logged in");
      }
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${session?.sessionToken}`);
      return updatePreferredPaymentMethod.call(ctx, { paymentMethodId, headers });
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, mutation.error];
}
