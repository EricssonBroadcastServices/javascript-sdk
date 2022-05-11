import { PurchaseResponse, purchaseUtils, systemConfigUtils } from "@ericssonbroadcastservices/exposure-sdk";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useExposureApi } from "./useApi";
import { useRedBeeState } from "../RedBeeProvider";
import { useUserSession } from "./useUserSession";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";

const purchasesCacheTime = 1000 * 60 * 30;

export function usePurchases(): TApiHook<PurchaseResponse> {
  const { customer, businessUnit, config } = useRedBeeState();
  const paymentIsEnabled = systemConfigUtils.paymentsIsEnabled(config?.systemConfig.paymentType || "");
  const [login] = useUserSession();
  const exposureApi = useExposureApi();

  const { data, isLoading, error } = useQuery(
    [QueryKeys.PURCHASES, login?.sessionToken],
    () => {
      if (login?.isLoggedIn() && paymentIsEnabled) {
        return exposureApi.payment.getPurchases({ customer, businessUnit, includeOfferingDetails: true });
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
  const tvodIds = purchaseUtils.getTvods(purchaseResponse?.purchases || []).map(t => t.assetId);
  return [tvodIds as string[], isLoading, error];
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
  const { customer, businessUnit } = useRedBeeState();
  const exposureApi = useExposureApi();
  const unsubscribe = useCallback(
    (purchaseId: string) => {
      setLoading(true);
      exposureApi.payment
        .cancelSubscription({ customer, businessUnit, purchaseId })
        .then(() => {
          refetchPurchases();
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [customer, businessUnit]
  );
  return [unsubscribe, loading];
}
