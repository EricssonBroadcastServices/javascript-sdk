import { Translations } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useQuery } from "react-query";
import { useSelectedLanguage } from "../hooks/useSelectedLanguage";
import { QueryKeys } from "../util/react-query";
import { useWLApi } from "./useApi";

export function useTranslations(): [Translations | null, boolean] {
  const wlApi = useWLApi();
  const locale = useSelectedLanguage();
  const { data, isLoading } = useQuery(
    [QueryKeys.TRANSLATIONS, locale],
    () => {
      if (!locale) return;
      return wlApi.getTranslations(locale).then(translations => new Translations(translations));
    },
    { staleTime: 1000 * 60 * 60 }
  );
  return [data || null, isLoading];
}
