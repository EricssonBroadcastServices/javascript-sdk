import { SystemConfig } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";

export function useSystemConfigV2(): TApiHook<SystemConfig> {
  const state = useRedBeeState();
  return [state.essentialAppData?.systemConfig || null, false, null];
}
