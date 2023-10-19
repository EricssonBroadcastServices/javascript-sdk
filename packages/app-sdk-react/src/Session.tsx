import { LoginResponse } from "@ericssonbroadcastservices/rbm-ott-sdk";

export interface SessionData extends LoginResponse {
  isAnonymous?: boolean;
}

export class Session implements SessionData {
  constructor(private data: SessionData) {}

  hasSession() {
    return Boolean(this.sessionToken && this.expirationDateTime && Date.parse(this.expirationDateTime) > Date.now());
  }

  isLoggedIn() {
    return Boolean(this.hasSession() && this.data.accountId);
  }

  isFirebase() {
    return this.data.accountId?.startsWith("firebase..") || false;
  }

  valueOf() {
    return this.data;
  }

  get sessionToken() {
    return this.data.sessionToken;
  }

  get expirationDateTime() {
    return this.data.expirationDateTime;
  }

  get accountId() {
    return this.data.accountId;
  }
}
