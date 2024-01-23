import { useEffect, useMemo, useState } from "react";
import { useBookmarkPercentage } from "./useBookmarks";
import { useTranslations } from "./useTranslations";
import { getEventProgress, getTimeLeft } from "@ericssonbroadcastservices/app-sdk";
import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";

type TimeLeftProps = {
  percentageWatched?: number;
  durationMs?: number;
};

export function useTimeLeft({ percentageWatched, durationMs }: TimeLeftProps): string {
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
      setTimeLeft(
        `${hours ? `${hours}${minutes ? ", " : ""}` : ""}${minutes} ${translations?.getText([
          "ASSETS",
          "REMAINING"
        ])}`.toLowerCase()
      );
    }
  }, [durationMs, percentageWatched, translations]);

  return timeLeft;
}

export function useProgramProgress({ asset, live }: { asset: Asset; live?: boolean }): {
  duration: number;
  percentage: number;
} {
  const [assetProgress] = useBookmarkPercentage(asset.assetId, asset.duration);
  const [duration, percentage] = useMemo(() => {
    if (live && asset?.programs) {
      const programProgress = getEventProgress(asset.programs, asset.assetId);
      return [programProgress.duration, programProgress.progress];
    } else if (asset && assetProgress) {
      return [asset.duration, assetProgress];
    }
    return [0, 0];
  }, [asset, assetProgress, live]);

  return { duration, percentage };
}
