import { ISession } from "../interfaces/auth/session";
import { IUserProfile } from "../interfaces/user/user-profile";
interface IConfigReloadQueryParameter {
  name: string;
  value: string;
}
export class LoginResponse {
  public expirationDateTime: Date;
  public sessionToken: string;
  public informationCollectionConsentGiven: Date | null;
  public informationCollectionConsentRequiredDate: Date | null;
  public language: string;
  public username?: string;
  public configReloadQueryParameter?: IConfigReloadQueryParameter;
  public userId: string;
  public accountId: string;
  public isOverDeviceLimit: boolean;
  public userProfile: IUserProfile;
  public isAnonymous: boolean;

  constructor(json: ISession & { isAnonymous: boolean }) {
    this.expirationDateTime = new Date(json.expirationDateTime);
    this.sessionToken = json.sessionToken;
    if (!!json.informationCollectionConsentGiven) {
      this.informationCollectionConsentGiven = new Date(json.informationCollectionConsentGiven);
    }
    this.informationCollectionConsentRequiredDate = new Date(json.informationCollectionConsentRequiredDate);
    this.language = json.language;
    this.username = json.username;
    this.configReloadQueryParameter = json.configReloadQueryParameter;
    this.userId = json.userId;
    this.accountId = json.accountId;
    this.isOverDeviceLimit = json.isOverDeviceLimit;
    this.userProfile = json.userProfile;
    this.isAnonymous = !!json.isAnonymous;
  }

  public isLoggedIn = () => this.hasSession() && !this.isAnonymous;
  public isFirebase = () => this.accountId.startsWith("firebase..");
  public hasSession = () =>
    this.sessionToken && this.sessionToken !== "" && this.expirationDateTime.getTime() > Date.now();
}
