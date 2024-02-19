import { EPGHelpers, getTitleFromAsset } from "@ericssonbroadcastservices/app-sdk";
import { ProgramResponse } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useLanguage } from "./useSelectedLanguage";

export function useEPGProgram(program: ProgramResponse) {
  const language = useLanguage();

  const { tvShowId, season, episode } = program.asset;

  let title = getTitleFromAsset(program.asset, language);
  if (tvShowId && season && episode) {
    title = `S${season} E${episode} ${title}`;
  }

  const time = EPGHelpers.getProgramTimeSlotString(program) ?? "";
  const isLive = EPGHelpers.isProgramLive(program);
  return {
    title,
    time,
    isLive
  };
}
