import { useEffect, useMemo } from "react";
import { ActionType, useRedBeeState, useRedBeeStateDispatch } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { useAppService, useServiceContext } from "./useApi";
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

const DEFAULT_THEME: IWLTheme = {
  dark: "#000000",
  light: "#ffffff",
  error: "#ff0000",
  success: "#00ff00",
  warning: "#ffff00",
  primaryTextColor: "#ffffff",
  secondaryTextColor: "#d3d3d3",
  primaryBackgroundColor: "#000000",
  secondaryBackgroundColor: "#5a5a5a",
  primaryBrandColor: "#000000",
  heroBannerTextColor: "#ffffff"
};

export function useFetchConfig(disabled = false): void {
  const dispatch = useRedBeeStateDispatch();
  const { customer, businessUnit } = useRedBeeState();
  const appService = useAppService();
  useEffect(() => {
    if (disabled || !customer || !businessUnit) return;
    dispatch({ type: ActionType.START_LOADING, id: configLoadingId });
    appService
      .getEssentialAppData()
      .then(
        data => {
          return dispatch({ type: ActionType.SET_ESSENTIAL_APP_DATA, data });
        },
        () => {
          return dispatch({ type: ActionType.SET_APP_UNAVAILABLE });
        }
      )
      .finally(() => {
        dispatch({ type: ActionType.STOP_LOADING, id: configLoadingId });
      });
    return () => {
      dispatch({ type: ActionType.STOP_LOADING, id: configLoadingId });
    };
  }, [disabled]);
}

export function useEssentialAppData(): TApiHook<EssentialAppData> {
  const state = useRedBeeState();
  return [state.essentialAppData || null, state.loading.includes(configLoadingId), null];
}

export function useConfig(): TApiHook<IExposureWLConfig> {
  const [essentialAppData, loading] = useEssentialAppData();
  return [essentialAppData?.config || null, loading, null];
}

export function useMenu(): TApiHook<IExposureWLMenu> {
  const [essentialAppData, loading] = useEssentialAppData();
  return [essentialAppData?.menu || null, loading, null];
}

export function useFooter(): TApiHook<IExposureWLFooter> {
  const [essentialAppData, loading] = useEssentialAppData();
  return [essentialAppData?.footer || null, loading, null];
}

export function useTheme(): TApiHook<IWLTheme, IWLTheme> {
  const [config, isLoading] = useConfig();
  return [config?.theme || DEFAULT_THEME, isLoading, null];
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
  if (!config) return null;
  const {
    parameters: { phone, website, email }
  } = config;
  return { phone, website, email };
}

export function useConfigImage(tag: "logo" | "background", fitOptions: FitOptions) {
  const [config] = useConfig();
  const { language } = useLanguage();
  if (!config) {
    return;
  }
  return useMemo(() => {
    const image = WLComponentHelpers.getImageByTag(config, tag, language);
    if (!image?.url) return;
    return fit(image.url, fitOptions);
  }, [config]);
}

export function useBackgroundImageUrl(size: number) {
  return useConfigImage("background", { w: size });
}
