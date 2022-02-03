import { EntitlementActionType } from "@ericssonbroadcastservices/exposure-sdk";
import { IEntitlementStatusResult, WLAsset } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRedBeeState } from "../RedBeeProvider";
import { useWLApi } from "./useApi";
import { useProductOfferings } from "../hooks/useProductOfferings";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { useSetSession, useUserSession } from "./useUserSession";
import { StorageKey } from "../util/storageKeys";

export function refetchAssetEntitlements() {
  return queryClient.invalidateQueries(QueryKeys.ASSET_ENTITLEMENT);
}
interface IUseEntitlement {
  // should we do a new entitlement call at asset starttime or not.
  confirmEntitlementOnStart?: boolean;
  // how much should we spread out different calls in case we do a new entitle call.
  startTimeAdjustmentSpread?: number;
}

export const defaultEntitlementStatus: IEntitlementStatusResult = {
  isEntitled: false,
  accessLater: [],
  accessNow: [],
  isInFuture: false,
  startTime: null,
  isGeoBlocked: false,
  entitlementError: null,
  loginToWatchForFree: false,
  shouldJustWait: false
};

export function useEntitlementForAsset(
  asset: WLAsset,
  { confirmEntitlementOnStart = false, startTimeAdjustmentSpread = 30000 }: IUseEntitlement
): TApiHook<IEntitlementStatusResult> {
  const [availableProductOfferings, offeringsLoading] = useProductOfferings();
  const { customer, businessUnit } = useRedBeeState();
  const [session] = useUserSession();
  const wlApi = useWLApi();
  const [result, setResult] = useState<IEntitlementStatusResult>(defaultEntitlementStatus);
  const setSession = useSetSession();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.ASSET_ENTITLEMENT, asset.assetId, session?.sessionToken, availableProductOfferings?.length],
    () => {
      if (!session?.sessionToken || !customer || !businessUnit || !availableProductOfferings || offeringsLoading)
        return defaultEntitlementStatus;
      return wlApi
        .getEntitlementForAsset({
          asset,
          offerings: availableProductOfferings,
          customer,
          businessUnit
        })
        .then(result => {
          if (
            result.entitlementError?.httpCode === 401 &&
            result.entitlementError.message === "INVALID_SESSION_TOKEN"
          ) {
            // if we for any reason are calling the entitle endpoint with an invalid session, we should remove it.
            setSession(null);
          }
          let startTime = result.startTime;
          if (startTime && confirmEntitlementOnStart) {
            // add randomized extra time until start in order to spread out requests
            const adjustment = Math.floor(Math.random() * startTimeAdjustmentSpread);
            startTime = new Date(startTime.getTime() + adjustment);
          }
          return { ...result, startTime };
        });
    },
    { staleTime: 0, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (data) {
      setResult(data);
    }
  }, [data]);

  useEffect(() => {
    let timeout;
    if (data?.isInFuture && data.startTime) {
      const when = data.startTime.getTime() - Date.now();
      if (when > 0) {
        timeout = setTimeout(() => {
          if (confirmEntitlementOnStart) {
            refetchAssetEntitlements();
          } else if (
            data.entitlementError?.actions?.every(a => a.type === EntitlementActionType.WAIT) &&
            // make sure we are actually close to being entitled, in case timeout triggers wrongfully
            (data.startTime?.getTime() as number) - Date.now() < 5000
          ) {
            setResult({ ...data, isEntitled: true });
          }
        }, when);
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [data, confirmEntitlementOnStart]);
  return [result, isLoading || offeringsLoading, error];
}
