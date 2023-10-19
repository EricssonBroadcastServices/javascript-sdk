import { useEffect, useState } from "react";
import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";

interface pncState {
  upNext?: Asset;
  recommendations: Asset[];
}

export function usePushNextContentData(
  assetId?: string
): TApiHook<{ upNext?: Asset; recommendations: Asset[] | null }> {
  const { customer, businessUnit, appService } = useRedBeeState();
  const [pushNextContent, setPushNextContent] = useState<pncState | null>(null);
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
  }, [assetId, customer, businessUnit]);
  return [pushNextContent || null, false, error];
}
