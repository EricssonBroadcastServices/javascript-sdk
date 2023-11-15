import { ProgramResponse } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { ChannelAssetHelpers } from "./asset";

function findOngoingPrograms(programs: ProgramResponse[], time = new Date()) {
  return programs.find(p => new Date(p.startTime) < time && new Date(p.endTime) > time);
}

function findCurrentAndUpcomingProgramsByHour(programs: ProgramResponse[], date: Date) {
  const ongoingAtHour = findOngoingPrograms(programs, date);
  const startingNextHour = programs.find(p => new Date(p.startTime).getHours() >= date.getHours() + 1);
  if (!ongoingAtHour) return [];
  /* return all programs that in some way is ongoing during the selected hour
   * return the rest of the list if there is nothing starting in the next hour.
   * This will occur when date.getHours() + 1 equals 24, and will result in us
   * showing the remaining programs in todays epg
   * if programs ongoing or starting during the hour is less than 3. Use minimum 3.
   */
  const startIndex = programs.indexOf(ongoingAtHour);
  const stopIndex = startingNextHour
    ? programs.indexOf(startingNextHour) - startIndex < 3
      ? startIndex + 3
      : programs.indexOf(startingNextHour)
    : undefined;
  return programs.slice(startIndex, stopIndex);
}

export const EPGHelpers = {
  findOngoingPrograms,
  findCurrentAndUpcomingProgramsByHour,
  isProgramLive: ChannelAssetHelpers.isLive,
  getProgramTimeSlotString: ChannelAssetHelpers.getTimeSlotString
};
