import { useEffect, useState } from "react";
import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { PushNextContent } from "@ericssonbroadcastservices/app-sdk";
import { useAppError } from "./useAppError";

export function usePushNextContentData(
  assetId: string | undefined,
  pushNextProgram = true
): TApiHook<{ upNext?: Asset; recommendations: Asset[] | null }> {
  const { customer, businessUnit, appService } = useRedBeeState();
  const [pushNextContent, setPushNextContent] = useState<PushNextContent | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (assetId) {
      setLoading(true);
      appService
        .getPushNextContentData({ assetId, pushNextProgram: pushNextProgram })
        .then(pnc => {
          setPushNextContent(pnc);
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [assetId, customer, businessUnit, appService, pushNextProgram]);
  return [pushNextContent || null, loading, useAppError(error)];
}
