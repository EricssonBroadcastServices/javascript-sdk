import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import {
  ProductOfferingPurchases,
  cancelPurchaseSubscription,
  getOfferingPurchases
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useServiceContext } from "./useApi";
import { useUserSession } from "./useUserSession";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { useSystemConfigV2 } from "./useSystemConfig";

const purchasesCacheTime = 1000 * 60 * 30;

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
  return [data || null, isLoading, error];
}

export function useTvodIds(): TApiHook<string[]> {
  const [purchaseResponse, isLoading, error] = usePurchases();
  const tvodIds = purchaseResponse?.purchases?.flatMap(t => t.assetId || []) || [];
  return [tvodIds, isLoading, error];
}

export function useConsumedDiscounts(): TApiHook<string[]> {
  const [purchaseResponse, isLoading, error] = usePurchases();
  return [purchaseResponse?.consumedProductOfferingDiscounts || [], isLoading, error];
}

export function refetchPurchases() {
  return queryClient.invalidateQueries(QueryKeys.PURCHASES);
}

export function useUnsubscribe(): [(purchaseId: string) => void, boolean] {
  const [loading, setLoading] = useState(false);
  const [session] = useUserSession();
  const ctx = useServiceContext();
  const unsubscribe = useCallback(
    async (purchaseId: string) => {
      setLoading(true);
      try {
        if (!session?.isLoggedIn()) {
          throw new Error("User needs to be logged in to unsubscribe");
        }
        const headers = { Authorization: `Bearer ${session.sessionToken}` };
        await cancelPurchaseSubscription.call(ctx, { purchaseId, headers });
        refetchPurchases();
      } finally {
        setLoading(false);
      }
    },
    [ctx, session?.sessionToken]
  );
  return [unsubscribe, loading];
}
