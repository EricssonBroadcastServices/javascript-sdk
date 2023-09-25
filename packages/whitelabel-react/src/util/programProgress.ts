import { IProgram } from "@ericssonbroadcastservices/exposure-sdk";

export function getTimeLeft(
  percentageWatched?: number,
  durationMs?: number
): {
  hours: number;
  minutes: number;
} {
  const timeLeft = { hours: 0, minutes: 0 };
  if (percentageWatched === undefined || durationMs === undefined) return timeLeft;
  const milliseconds = durationMs - (percentageWatched / 100) * durationMs;
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) {
    timeLeft.hours = hours;
  }
  if (minutes > 0) {
    timeLeft.minutes = minutes;
  }
  return timeLeft;
}

export function getEventProgress(
  programs: IProgram[],
  assetId: string
): {
  startTime: number;
  endTime: number;
  duration: number;
  progress: number;
} {
  const program = programs.find(p => p.programId?.includes(assetId));
  const currentTime = Date.now();
  const eventProgress = { startTime: 0, endTime: 0, duration: 0, progress: 0 };

  if (program && program.startTime && program.endTime) {
    eventProgress.startTime = new Date(program.startTime).getTime();
    eventProgress.endTime = new Date(program.endTime).getTime();
    eventProgress.duration = eventProgress.endTime - eventProgress.startTime;
    const timeElapsed = currentTime - eventProgress.startTime;
    eventProgress.progress = (timeElapsed / eventProgress.duration) * 100;
  }
  return eventProgress;
}
