export interface IUserProfileAttribute {
  attributeId: string;
  type: string;
  requiredAtSignup: boolean;
  defaultValue: any;
  value: any;
  valueSet: boolean;
}

export interface IUserCapabilities {
  canChangePassword: boolean;
  canChangeUserNameAndEmail: boolean;
  canChangeEmail: boolean;
  canManageAccount: boolean;
  canManageDevices: boolean;
  canManagePayments: boolean;
  canManagePurchases: boolean;
}

export interface IUserDetails {
  displayName: string;
  username: string;
  email: string;
  language: string;
  defaultLanguage: string;
  child: boolean;
  capabilities: IUserCapabilities;
  attributes: IUserProfileAttribute[];
}
