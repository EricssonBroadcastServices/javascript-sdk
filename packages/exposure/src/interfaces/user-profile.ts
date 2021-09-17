import { IUserCapabilities, IUserProfileAttribute } from "./user-details";

export interface IUserProfile {
  username: string;
  displayName: string;
  emailAddress: string;
  userId: string;
  child: boolean;
  owner: boolean;
  emailAddressRequired: boolean;
  language: string;
  capabilities: IUserCapabilities;
  attributes: IUserProfileAttribute[];
}
