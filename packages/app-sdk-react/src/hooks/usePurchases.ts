import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import {
  Asset,
  ProductOfferingPurchase,
  ProductOfferingPurchases,
  StorePurchaseTransaction,
  cancelPurchaseSubscription,
  getAccountAssetPurchases,
  getOfferingPurchases,
  getPurchaseTransactions
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useServiceContext } from "./useApi";
import { useUserSession } from "./useUserSession";
import { TApiHook, TApiMutation } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { useSystemConfigV2 } from "./useSystemConfig";
import { AppError } from "@ericssonbroadcastservices/app-sdk";

const purchasesCacheTime = 1000 * 60 * 30;

export function usePurchaseTransactions(): TApiHook<StorePurchaseTransaction[]> {
  const ctx = useServiceContext();
  const [session] = useUserSession();

  const { data, isLoading, error } = useQuery(
    [QueryKeys.PURCHASE_TRANSACTIONS, session?.sessionToken],
    () => {
      if (session?.isLoggedIn()) {
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${session?.sessionToken}`);
        return getPurchaseTransactions.call(ctx, { headers });
      }
      return;
    },
    {
      staleTime: purchasesCacheTime
    }
  );
  return [data || [], isLoading, AppError.fromUnknown(error)];
}
export function usePurchases(): TApiHook<ProductOfferingPurchases> {
  const [login] = useUserSession();
  const ctx = useServiceContext();
  const [systemConfigV2] = useSystemConfigV2();
  const paymentIsEnabled = Object.keys(systemConfigV2?.payments || {}).find(paymentType => {
    return systemConfigV2?.payments[paymentType].enabled;
  });
  const { data, isLoading, error } = useQuery(
    [QueryKeys.PURCHASES, login?.sessionToken, paymentIsEnabled],
    () => {
      if (login?.isLoggedIn() && paymentIsEnabled) {
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${login.sessionToken}`);
        return getOfferingPurchases.call(ctx, {
          includeOfferingDetails: true,
          headers
        });
      }
      return;
    },
    {
      staleTime: purchasesCacheTime
    }
  );
  return [data || null, isLoading, AppError.fromUnknown(error)];
}

export function useActivePackages(): TApiHook<ProductOfferingPurchase[]> {
  const [purchaseResponse, isLoading, error] = usePurchases();
  // Filter out TVODs and non-active packages
  const purchases = useMemo(
    () =>
      purchaseResponse?.purchases?.filter(
        p => p.apiStoreProductOffering && !p.apiStoreProductOffering.productRequiresSelectAsset
      ),
    [purchaseResponse]
  );
  return [purchases || [], isLoading, error];
}

/** @deprecated use useTvodAssets instead */
export function useTvodIds(): TApiHook<string[]> {
  const [purchaseResponse, isLoading, error] = usePurchases();
  const tvodIds = useMemo(() => purchaseResponse?.purchases?.flatMap(t => t.assetId || []) || [], [purchaseResponse]);
  return [tvodIds, isLoading, error];
}

export function useTvodAssets(): TApiHook<Asset[]> {
  const [session] = useUserSession();
  const ctx = useServiceContext();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.PURCHASES, session],
    () => {
      if (!session?.sessionToken) return;
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${session?.sessionToken}`);
      return getAccountAssetPurchases.call(ctx, { headers });
    },
    { staleTime: purchasesCacheTime }
  );
  return [data || null, isLoading, AppError.fromUnknown(error)];
}

export function useConsumedDiscounts(): TApiHook<string[]> {
  const [purchaseResponse, isLoading, error] = usePurchases();
  return [purchaseResponse?.consumedProductOfferingDiscounts || [], isLoading, error];
}

export function refetchPurchases() {
  return queryClient.invalidateQueries([QueryKeys.PURCHASES, QueryKeys.PURCHASE_TRANSACTIONS]);
}

type TUseUnsubscribe = { purchaseId: string };

export function useUnsubscribe(): TApiMutation<TUseUnsubscribe, void> {
  const [session] = useUserSession();
  const ctx = useServiceContext();

  const mutation = useMutation({
    onSuccess: refetchPurchases,
    mutationKey: [ctx, session],
    mutationFn: async ({ purchaseId }: TUseUnsubscribe) => {
      if (!session?.isLoggedIn()) {
        throw new Error("User needs to be logged in to unsubscribe");
      }
      const headers = { Authorization: `Bearer ${session.sessionToken}` };
      await cancelPurchaseSubscription.call(ctx, { purchaseId, headers });
    }
  });

  return [mutation.mutate, mutation.data || null, mutation.isLoading, AppError.fromUnknown(mutation.error)];
}
