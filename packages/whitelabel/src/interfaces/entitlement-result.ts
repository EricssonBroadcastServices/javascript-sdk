import { IEntitlementError } from "@ericssonbroadcastservices/exposure-sdk";
import { IListOffering } from "./list-offering";

export enum EntitlementStatus {
  UNKNOWN,
  ENTITLED,
  GEO_BLOCKED,
  STREAM_LIMIT,
  IN_FUTURE,
  LOGIN,
  WAIT
}

export interface IEntitlementStatusResult {
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

export interface IEntitlementResult extends IEntitlementStatusResult {
  // this combines all the booleans in IEnntitlementStatusResult into a single enum
  status: EntitlementStatus;
}
