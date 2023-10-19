import { Translations } from "@ericssonbroadcastservices/app-sdk";
import { useQuery } from "react-query";
import { useSelectedLanguage } from "../hooks/useSelectedLanguage";
import { QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";
import { useRedBeeState } from "../RedBeeProvider";

export function useTranslations(): TApiHook<Translations> {
  const locale = useSelectedLanguage();
  const { appService } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.TRANSLATIONS, locale],
    () => {
      if (!locale) return;
      return appService.getTranslations(locale).then(translations => new Translations(translations));
    },
    { staleTime: 1000 * 60 * 60 }
  );
  return [data || null, isLoading, error];
}
