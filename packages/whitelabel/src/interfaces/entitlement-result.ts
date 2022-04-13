import { IEntitlementError } from "@ericssonbroadcastservices/exposure-sdk";
import { IListOffering } from "./list-offering";

export enum EntitlementStatus {
  UNKNOWN = "UNKNOWN",
  ENTITLED = "ENTITLED",
  BUY_WATCH_NOW = "BUY_WATCH_NOW",
  BUY_WATCH_LATER = "BUY_WATCH_LATER",
  GEO_BLOCKED = "GEO_BLOCKED",
  STREAM_LIMIT = "STREAM_LIMIT",
  IN_FUTURE = "IN_FUTURE",
  LOGIN = "LOGIN",
  WAIT = "WAIT"
}

export interface IEntitlementStatusResult {
  // this combines all the booleans in IEntitlementStatusResult into a single enum
  status: EntitlementStatus;

  // the user is already entitled
  isEntitled: boolean;
  isGeoBlocked: boolean;
  isStreamLimitReached: boolean;
  // the user is entitled in the future
  isInFuture: boolean;
  loginToWatchForFree: boolean;
  // if the user should just wait. This will be true if a wait actions is before or at the same time as any accessLater offering
  shouldJustWait: boolean;

  entitlementError: IEntitlementError | null;
  accessNow: IListOffering[];
  accessLater: IListOffering[];
  // return a date if all the user has to do is wait
  startTime: null | Date;
}
