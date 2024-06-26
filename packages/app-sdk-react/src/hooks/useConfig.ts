import { useMemo } from "react";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { useServiceContext } from "./useApi";
import {
  EssentialAppData,
  IExposureWLConfig,
  IExposureWLFooter,
  IExposureWLMenu,
  IWLTheme,
  WLComponentHelpers,
  FitOptions,
  fit
} from "@ericssonbroadcastservices/app-sdk";
import { useSystemConfigV2 } from "./useSystemConfig";
import { useLanguage, useSelectedLanguage } from "./useSelectedLanguage";
import { useTranslations } from "./useTranslations";

const configLoadingId = "configLoading";

export function useEssentialAppData(): TApiHook<EssentialAppData, EssentialAppData> {
  const state = useRedBeeState();
  return [state.essentialAppData, state.loading.includes(configLoadingId), null];
}

export function useConfig(): TApiHook<IExposureWLConfig, IExposureWLConfig> {
  const [essentialAppData, loading] = useEssentialAppData();
  return [essentialAppData.config, loading, null];
}

export function useMenu(): TApiHook<IExposureWLMenu, IExposureWLMenu> {
  const [essentialAppData, loading] = useEssentialAppData();
  return [essentialAppData.menu, loading, null];
}

export function useFooter(): TApiHook<IExposureWLFooter, undefined> {
  const [essentialAppData, loading] = useEssentialAppData();
  return [essentialAppData.footer, loading, null];
}

export function useTheme(): TApiHook<IWLTheme, IWLTheme> {
  const [config, isLoading] = useConfig();
  return [config.theme, isLoading, null];
}

export interface DocumentLink {
  title: string;
  webAppUrl: string;
  webAppUrlSimplified: string;
  qrCode: string;
}

function toDocumentLink(url: string, locale: string, qrCodeBaseUrl: string, title: string): DocumentLink {
  return {
    title,
    webAppUrl: url,
    webAppUrlSimplified: `${url}/apps/${locale}`,
    qrCode: `${qrCodeBaseUrl}/api/internal/qrcode?value=${url}`
  };
}
export function useDocumentLinks(): DocumentLink[] {
  const [translations] = useTranslations();
  const { baseUrl } = useServiceContext();
  const locale = useSelectedLanguage();
  const [systemConfig] = useSystemConfigV2();
  const playerUrl = systemConfig?.playerUrl;
  if (!playerUrl) return [];
  return [
    toDocumentLink(
      `${playerUrl}/document/end_user_terms_and_conditions`,
      locale,
      baseUrl,
      translations?.getText("TERMS_AND_CONDITIONS")
    ),
    toDocumentLink(
      `${playerUrl}/document/end_user_cookie_policy`,
      locale,
      baseUrl,
      translations?.getText("COOKIE_POLICY")
    ),
    toDocumentLink(
      `${playerUrl}/document/end_user_privacy_policy`,
      locale,
      baseUrl,
      translations?.getText("PRIVACY_POLICY")
    )
  ];
}

export function useServiceName(): string {
  const [config] = useConfig();
  const locale = useSelectedLanguage();
  if (!config) return "";
  return WLComponentHelpers.getTitle(config, locale);
}

export function useContactInformation() {
  const [config] = useConfig();
  const {
    parameters: { phone, website, email }
  } = config;
  return { phone, website, email };
}

export function useConfigImage(tag: "logo" | "background" | "staticBackground" | string, fitOptions: FitOptions) {
  const [config] = useConfig();
  const { language } = useLanguage();
  const imageUrl = useMemo(() => {
    const image = WLComponentHelpers.getImageByTag(config, tag, language);
    if (!image?.url) return;
    return fit(image.url, fitOptions);
  }, [config, fitOptions, language, tag]);

  return imageUrl;
}

export function useBackgroundImageUrl(size: number) {
  return useConfigImage("background", { w: size });
}
