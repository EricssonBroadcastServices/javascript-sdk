export enum UserAttributeType {
  BOOLEAN = "boolean",
  REAL = "real",
  EMAIL = "email",
  EMUN = "enum",
  STRING = "string",
  INTEGER = "integer",
}
interface IUserProfileAttributesEnum {
  id: string;
  localized: {
    locale: string;
    title?: string;
    description?: string;
  }[];
}
export interface IUserProfileAttribute {
  attributeId: string;
  type: UserAttributeType;
  range?: {
    min: number;
    max: number;
  };
  enums?: IUserProfileAttributesEnum[];
  requiredAtSignup: boolean;
  defaultValue: any;
  value: any;
  valueSet: boolean;
  localized: {
    locale: string;
    title?: string;
    description?: string;
  }[];
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
