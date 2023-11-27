import { Program } from "@ericssonbroadcastservices/rbm-ott-sdk";

export function getTimeLeft(
  percentageWatched?: number,
  durationMs?: number
): {
  hours: number;
  minutes: number;
} {
  if (percentageWatched === undefined || durationMs === undefined) {
    return { hours: 0, minutes: 0 };
  }
  const milliseconds = durationMs - (percentageWatched / 100) * durationMs;
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return { hours, minutes };
}

export function getEventProgress(
  programs: Program[],
  assetId: string
): {
  startTime: number;
  endTime: number;
  duration: number;
  progress: number;
} {
  const program = programs.find(p => p.programId?.includes(assetId));
  const currentTime = Date.now();
  const startTime = new Date(program?.startTime || 0).getTime();
  const endTime = new Date(program?.endTime || 0).getTime();
  const duration = endTime - startTime;
  const timeElapsed = currentTime - startTime;
  let progress = 0;
  if (timeElapsed && duration) {
    progress = Math.round((timeElapsed / duration) * 100);
  }
  return { startTime, endTime, duration, progress };
}
