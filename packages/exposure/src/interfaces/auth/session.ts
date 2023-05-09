import { IUserProfile } from "../user/user-profile";

interface IConfigReloadQueryParameter {
  name: string;
  value: string;
}

export interface ISession {
  expirationDateTime: string;
  sessionToken: string;
  informationCollectionConsentGiven?: string;
  informationCollectionConsentRequiredDate: string;
  language: string;
  username?: string;
  configReloadQueryParameter?: IConfigReloadQueryParameter;
  userId: string;
  accountId: string;
  isOverDeviceLimit: boolean;
  crmToken: string;
  child: boolean;
  userProfile: IUserProfile;
}

export interface IValidateSessionResponse {
  accountId: string;
  userId: string;
  configReloadQueryParameter?: IConfigReloadQueryParameter;
  overTheDeviceLimit: boolean;
  userProfile: IUserProfile;
}
