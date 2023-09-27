import { StoreProductOffering } from "@ericssonbroadcastservices/rbm-ott-sdk";

export const EntitlementCase = {
  /* indicates that the user can view the content without any further action */
  IS_ENTITLED: "IS_ENTITLED",
  /**
   * indicates that the user can view the content with an anonymous session.
   * anonymous login has to be performed before playing an asset
   * TODO: should be deprecated in the future, once the apps can handle playback without it.
   */
  IS_ENTITLED_ANON: "IS_ENTITLED_ANON",
  /* indicated that the user has to log in before viewing content */
  NOT_LOGGED_IN: "NOT_LOGGED_IN",
  /* user is not logged in and don't have the proper product */
  NOT_LOGGED_IN_NEED_PURCHASE: "NOT_LOGGED_IN_NEED_PURCHASE",
  /* user cannot view the content at all */
  NOT_ENTITLED: "NOT_ENTITLED",
  /* user need to buy the proper product offering before viewing content */
  NEED_PURCHASE: "NEED_PURCHASE",
  /* the user will able to view the content in the future */
  IN_FUTURE: "IN_FUTURE",
  /* the event hasnt started and the user need to purchase a product */
  IN_FUTURE_NEED_PURCHASE: "IN_FUTURE_NEED_PURCHASE"
} as const;
export type EntitlementCase = typeof EntitlementCase[keyof typeof EntitlementCase];

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
export type EntitlementActionType = typeof EntitlementActionType[keyof typeof EntitlementActionType];

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
export type EntitlementStatus = typeof EntitlementStatus[keyof typeof EntitlementStatus];

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
}
