import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { PasswordTuple, DeviceInfo, Credentials } from "./authentication-service";
import { deserialize } from "../decorators/property-mapper";
import { SignupResponse } from "../models/SignupResponse";
import { UserDetailsResponse } from "../models/UserDetailsResponse";

interface SignupOptions extends CustomerAndBusinessUnitOptions {
  body: {
    emailAddress: string;
    password: string;
    informationCollectionConsentGivenNow: boolean;
    displayName: string;
    credentials: {
      passwordTuples: PasswordTuple[];
    };
    deviceId: string;
    device: DeviceInfo;
  };
}

export interface ResetOptions extends CustomerAndBusinessUnitOptions {
  username: string;
}

export interface SetNewPasswordOptions extends CustomerAndBusinessUnitOptions {
  token: string;
  body: {
    credentials: Credentials;
    informationCollectionConsentGivenNow: boolean;
  };
}

export class UserService extends BaseService {
  public signup({ customer, businessUnit, body }: SignupOptions) {
    return this.post(`/v2/customer/${customer}/businessunit/${businessUnit}/user/signup`, body, {
      "Content-Type": "application/json"
    }).then(data => deserialize(SignupResponse, data));
  }

  public reset({ customer, businessUnit, username }: ResetOptions) {
    return this.get(`/v1/customer/${customer}/businessunit/${businessUnit}/user/password/reset/${username}`);
  }
  public setNewPassword({ customer, businessUnit, body, token }: SetNewPasswordOptions) {
    return this.put(`/v2/customer/${customer}/businessunit/${businessUnit}/user/signup/password/${token}`, body);
  }
  public getUserDetails({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    return this.get(
      `/v2/customer/${customer}/businessunit/${businessUnit}/user/details`,
      this.options.authHeader()
    ).then(data => deserialize(UserDetailsResponse, data));
  }
}
