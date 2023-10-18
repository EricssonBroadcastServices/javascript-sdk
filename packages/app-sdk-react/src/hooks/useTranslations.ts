import { Translations } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useQuery } from "react-query";
import { useSelectedLanguage } from "../hooks/useSelectedLanguage";
import { QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";
import { useDeprecatedWLApi } from "./useApi";

export function useTranslations(): TApiHook<Translations> {
  const deprecatedWlApi = useDeprecatedWLApi();
  const locale = useSelectedLanguage();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.TRANSLATIONS, locale],
    () => {
      if (!locale) return;
      return deprecatedWlApi.getTranslations(locale).then(translations => new Translations(translations));
    },
    { staleTime: 1000 * 60 * 60 }
  );
  return [data || null, isLoading, error];
}
