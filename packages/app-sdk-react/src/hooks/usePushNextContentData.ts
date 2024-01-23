import { useEffect, useState } from "react";
import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { AppError, PushNextContent } from "@ericssonbroadcastservices/app-sdk";

export function usePushNextContentData(
  assetId?: string
): TApiHook<{ upNext?: Asset; recommendations: Asset[] | null }> {
  const { customer, businessUnit, appService } = useRedBeeState();
  const [pushNextContent, setPushNextContent] = useState<PushNextContent | null>(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (assetId) {
      appService
        .getPushNextContentData({ assetId })
        .then(pnc => {
          setPushNextContent(pnc);
        })
        .catch(err => {
          setError(err);
        });
    }
  }, [assetId, customer, businessUnit, appService]);
  return [pushNextContent || null, false, !!error ? AppError.fromUnknown(error) : null];
}
