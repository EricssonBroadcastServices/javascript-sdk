import {
  EpgComponentContent,
  ResolvedComponent,
  WLComponentHelpers,
  getLocalizedValue
} from "@ericssonbroadcastservices/app-sdk";
import { useLanguage } from "./useSelectedLanguage";
import { useMemo } from "react";

export function useEPG(epg: ResolvedComponent<"epg">): { title: string; content: EpgComponentContent } {
  const { language, defaultLanguage } = useLanguage();

  const sortedContent = useMemo(
    () =>
      epg.content.sort(({ channel: channelA }, { channel: channelB }) => {
        const sortingTitelA = getLocalizedValue(channelA.localized, "sortingTitle", language, defaultLanguage);
        const sortingTitelB = getLocalizedValue(channelB.localized, "sortingTitle", language, defaultLanguage);
        if (!sortingTitelA || !sortingTitelB) {
          return 0;
        }
        return sortingTitelA.localeCompare(sortingTitelB);
      }),
    [epg.content, language, defaultLanguage]
  );

  return { title: WLComponentHelpers.getTitle(epg.component, language), content: sortedContent };
}
