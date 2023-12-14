import { SystemConfig } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { localizedLanguages } from "@ericssonbroadcastservices/app-sdk";

export function useSystemConfigV2(): TApiHook<SystemConfig> {
  const state = useRedBeeState();
  return [state.essentialAppData?.systemConfig || null, false, null];
}

export function useAvailableLanguages(): { code: string; name: string; nativeName: string }[] {
  const [systemConfig] = useSystemConfigV2();
  if (!systemConfig) return [];
  return systemConfig.localization.displayLocales
    .map(languageCode => localizedLanguages.find(l => l.code === languageCode))
    .filter(i => i !== undefined) as { code: string; name: string; nativeName: string }[];
}

export function usePasswordPolicy() {
  const [systemConfig] = useSystemConfigV2();
  return systemConfig?.access.passwordPolicy;
}
