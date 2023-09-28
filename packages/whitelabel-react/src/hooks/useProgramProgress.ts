import { useEffect, useMemo, useState } from "react";
import { useAsset } from "./useAsset";
import { getEventProgress, getTimeLeft } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useBookmarkPercentage } from "./useBookmarks";
import { useTranslations } from "./useTranslations";

type TimeLeftProps = {
  percentageWatched?: number;
  durationMs?: number;
};

export function useGetTimeLeft({ percentageWatched, durationMs }: TimeLeftProps): string {
  const [translations] = useTranslations();
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const time = getTimeLeft(percentageWatched, durationMs);
    let hours = "";
    let minutes = "";

    if (time.hours > 1) {
      hours = `${time.hours} ${translations?.getText(["DATES", "HOURS"])}`;
    } else if (time.hours) {
      hours = `${time.hours} ${translations?.getText(["DATES", "HOUR"])}`;
    }
    if (time.minutes > 1) {
      minutes = `${time.minutes} ${translations?.getText(["DATES", "MINUTES"])}`;
    } else if (time.minutes) {
      minutes = `${time.minutes} ${translations?.getText(["DATES", "MINUTE"])}`;
    }
    if (hours || minutes) {
      setTimeLeft(`${hours ? `${hours}, ` : ""}${minutes}`);
    }
  }, [durationMs, percentageWatched, translations]);

  return timeLeft;
}

export function useProgramProgress({ assetId, live }: { assetId?: string; live?: boolean }): {
  duration: number;
  progress: number;
} {
  const [asset] = useAsset(assetId);
  const [assetProgress] = useBookmarkPercentage(assetId);
  const [duration, progress] = useMemo(() => {
    if (live && asset?.programs) {
      const programProgress = getEventProgress(asset.programs, asset.assetId);
      return [programProgress.duration, programProgress.progress];
    } else if (asset && assetProgress) {
      return [asset.duration, assetProgress];
    }
    return [0, 0];
  }, [asset, assetProgress, assetId, live]);

  return { duration, progress };
}
