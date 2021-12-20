import { Format, StreamInfo } from "../..";

export interface IEntitlementResponse {
  accountId: string;
  requestId: string;
  formats: Format;
  productId: string;
  publicationId: string;
  publicationStart: string;
  publicationEnd: string;
  time: string;
  streamInfo: StreamInfo; // TODO: should use new interface once https://github.com/EricssonBroadcastServices/javascript-sdk/pull/101 is merged
  status: string;
}

interface IPublicationReference {
  availableAt: string;
  publicationId: string;
}

interface IEntitlementOfferingReference {
  offeringId: string;
  publications: IPublicationReference[];
}

export enum EntitlementActionType {
  /* If BUY_WATCH_NOW action is present the user can access the content directly by purchasing an offering,
     provided that one of the offerings specified in the action is avalable at the users geo location */
  BUY_WATCH_NOW = "BUY_WATCH_NOW",
  /* if BUY_WATCH_LATER action is present, the user can prepurchase access to the content, provided that one
     of the offerings specified in the action is avalable at the users geo location */
  BUY_WATCH_LATER = "BUY_WATCH_LATER",
  /* if WAIT action is present, the user will be able to access the content with current product in the future.
     action.publication indicates when */
  WAIT = "WAIT",
  /* if LOGIN the user will be able to watch the content simply by logging in.
  This action will only be returned for anonymous sessions */
  LOGIN = "LOGIN",
}

export interface IEntitlementActions {
  type: EntitlementActionType;
  offerings?: IEntitlementOfferingReference[];
  publication?: IPublicationReference;
}

export interface IEntitlementError {
  httpCode: number;
  message: string;
  actions?: IEntitlementActions[];
}
