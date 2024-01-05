import { Translations } from "@ericssonbroadcastservices/app-sdk";
import { useQuery } from "react-query";
import { useSelectedLanguage } from "../hooks/useSelectedLanguage";
import { QueryKeys } from "../util/react-query";
import { TApiHook } from "../types/type.apiHook";
import { useRedBeeState } from "../RedBeeProvider";

const emptyTranslations = new Translations({});

export function useTranslations(): TApiHook<Translations, Translations> {
  const locale = useSelectedLanguage();
  const { appService } = useRedBeeState();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.TRANSLATIONS, locale],
    () => {
      if (!locale) return;
      return appService.getTranslations(locale);
    },
    { staleTime: 1000 * 60 * 60, keepPreviousData: true }
  );
  return [data || emptyTranslations, isLoading, error];
}
