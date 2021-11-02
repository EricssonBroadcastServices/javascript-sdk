import { IEntitlementError } from "@ericssonbroadcastservices/exposure-sdk";
import { IListOffering } from "./list-offering";

export interface IEntitlementStatusResult {
  // the user is already entitled
  isEntitled: boolean;
  entitlementError: IEntitlementError | null;
  isGeoBlocked: boolean;
  accessNow: IListOffering[];
  accessLater: IListOffering[];
  // the user is entitled in the future
  isInFuture: boolean;
  // return a date if all the user has to do is wait
  startTime: null | Date;
  loginToWatchForFree: boolean;
}
