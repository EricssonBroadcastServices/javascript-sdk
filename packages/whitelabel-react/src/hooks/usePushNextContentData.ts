import { WLAsset } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useEffect, useState } from "react";
import { useSelectedLanguage } from "./useSelectedLanguage";
import { useRedBeeState } from "../RedBeeProvider";
import { useWLApi } from "./useApi";
import { TApiHook } from "../types/type.apiHook";

export function usePushNextContentData(assetId?: string): TApiHook<{ upNext: WLAsset | null, recommendations: WLAsset[] | null }> {
  const { customer, businessUnit } = useRedBeeState();
  const locale = useSelectedLanguage();
  const [pushNextContent, setPushNextContent] = useState<{ upNext: WLAsset | null; recommendations: WLAsset[] } | null>(
    null
  );
  const [error, setError] = useState(null);
  const wlApi = useWLApi();
  useEffect(() => {
    if (assetId) {
      wlApi
        .getPushNextContent({ customer, businessUnit, assetId, locale: locale as string })
        .then((pnc) => {
          setPushNextContent(pnc);
        })
        .catch((err) => {
          setError(err)
        });
    }
  }, [assetId, customer, businessUnit, locale]);
  return [{ upNext: pushNextContent?.upNext || null, recommendations: pushNextContent?.recommendations || null }, false, error];
}
