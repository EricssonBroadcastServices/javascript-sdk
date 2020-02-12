import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { PasswordTuple, DeviceInfo, Credentials } from "./authentication-service";
import { deserialize } from "../decorators/property-mapper";
import { SignupResponse } from "../models/signup-response-model";
import { UserDetailsResponse } from "../models/user-detail-response-model";
import { LoginResponse } from "../models/login-response-model";

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

export interface UpdateUserDetailsOptions extends CustomerAndBusinessUnitOptions {
  body: {
    displayName: string | null;
    newPassword: string | null;
    language: string | null;
  };
}

export interface ConfirmSignupOptions extends CustomerAndBusinessUnitOptions {
  token: string;
  deviceId: string;
}

export interface DeleteUserOptions extends CustomerAndBusinessUnitOptions {
  credentials: Credentials;
}

export interface ChangePasswordOptions extends CustomerAndBusinessUnitOptions {
  body: {
    newCredentials: Credentials;
    oldCredentials: Credentials;
    device: DeviceInfo;
  };
}

export interface ConfirmActivationCodeOptions extends CustomerAndBusinessUnitOptions {
  code: string;
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

  public updateUserDetails({ customer, businessUnit, body }: UpdateUserDetailsOptions) {
    return this.put(
      `/v1/customer/${customer}/businessunit/${businessUnit}/user/details`,
      body,
      this.options.authHeader()
    );
  }

  public confirmSignup({ customer, businessUnit, token, deviceId }: ConfirmSignupOptions) {
    return this.put(`/v1/customer/${customer}/businessunit/${businessUnit}/user/signup/confirm/${token}`, {
      deviceRegistration: {
        deviceId
      }
    }).then(data => deserialize(LoginResponse, data.loginResponse));
  }

  public deleteUser({ customer, businessUnit, credentials }: DeleteUserOptions) {
    return this.post(
      `/v2/customer/${customer}/businessunit/${businessUnit}/user/delete`,
      credentials,
      this.options.authHeader()
    );
  }

  public changePassword({ customer, businessUnit, body }: ChangePasswordOptions) {
    return this.put(
      `/v2/customer/${customer}/businessunit/${businessUnit}/user/changePassword`,
      body,
      this.options.authHeader()
    ).then(data => deserialize(LoginResponse, data.loginResponse));
  }

  public confirmActivationCode({ customer, businessUnit, code }: ConfirmActivationCodeOptions) {
    return this.put(
      `/v1/customer/${customer}/businessunit/${businessUnit}/user/activation/confirm/${code}`,
      null,
      this.options.authHeader()
    );
  }
}
