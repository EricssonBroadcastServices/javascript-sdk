import { StoreProductOffering, StreamInfo } from "@ericssonbroadcastservices/rbm-ott-sdk";

interface PublicationReference {
  availableAt: string;
  publicationId: string;
}

interface EntitlementOfferingReference {
  offeringId: string;
  publications: PublicationReference[];
}

export const EntitlementActionType = {
  /* If BUY_WATCH_NOW action is present the user can access the content directly by purchasing an offering,
     provided that one of the offerings specified in the action is avalable at the users geo location */
  BUY_WATCH_NOW: "BUY_WATCH_NOW",
  /* if BUY_WATCH_LATER action is present, the user can prepurchase access to the content, provided that one
     of the offerings specified in the action is avalable at the users geo location */
  BUY_WATCH_LATER: "BUY_WATCH_LATER",
  /* if WAIT action is present, the user will be able to access the content with current product in the future.
     action.publication indicates when */
  WAIT: "WAIT",
  /* if LOGIN the user will be able to watch the content simply by logging in.
  This action will only be returned for anonymous sessions */
  LOGIN: "LOGIN"
} as const;
export type EntitlementActionType = (typeof EntitlementActionType)[keyof typeof EntitlementActionType];

export interface EntitlementActions {
  type: EntitlementActionType;
  offerings?: EntitlementOfferingReference[];
  publication?: PublicationReference;
}

export interface EntitlementError {
  httpCode: number;
  message: string;
  actions?: EntitlementActions[];
}

export interface ListOffering {
  productOffering: StoreProductOffering;
  // include available at Date if available for offerings that is only applicable in the future.
  availableAtDate?: Date;
}

export const EntitlementStatus = {
  UNKNOWN: "UNKNOWN",
  ENTITLED: "ENTITLED",
  BUY_WATCH_NOW: "BUY_WATCH_NOW",
  BUY_WATCH_LATER: "BUY_WATCH_LATER",
  GEO_BLOCKED: "GEO_BLOCKED",
  STREAM_LIMIT: "STREAM_LIMIT",
  IN_FUTURE: "IN_FUTURE",
  LOGIN: "LOGIN",
  WAIT: "WAIT"
} as const;
export type EntitlementStatus = (typeof EntitlementStatus)[keyof typeof EntitlementStatus];

export interface EntitlementStatusResult {
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

  entitlementError: EntitlementError | null;
  accessNow: ListOffering[];
  accessLater: ListOffering[];
  // return a date if all the user has to do is wait
  startTime: null | Date;
  streamInfo: StreamInfo;
}
