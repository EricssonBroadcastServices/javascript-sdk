import { AssetHelpers, EPGComponentEntry, EPGHelpers } from "@ericssonbroadcastservices/app-sdk";
import { ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useLanguage } from "./useSelectedLanguage";
import { useMemo } from "react";

export function useEPGEntry(
  entry: EPGComponentEntry,
  time: Date,
  {
    width,
    imageOrientation
  }: {
    width: number;
    imageOrientation: ImageOrientation;
  }
) {
  const language = useLanguage();

  const image =
    AssetHelpers.getScaledImage({
      orientation: imageOrientation,
      width,
      asset: entry.channel,
      imageType: "logo",
      ...language
    }) ||
    AssetHelpers.getScaledImage({
      orientation: imageOrientation,
      width,
      asset: entry.channel,
      imageType: "cover",
      ...language
    });

  const programs = useMemo(
    () => EPGHelpers.findCurrentAndUpcomingProgramsByHour(entry.programs, time),
    [entry.programs, time]
  );

  const progress = EPGHelpers.getCurrentProgramProgress(programs);

  return {
    image,
    programs,
    progress
  };
}
