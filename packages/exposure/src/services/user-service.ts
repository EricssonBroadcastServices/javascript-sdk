import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { DeviceInfo, DeviceType } from "./authentication-service";
import { deserialize } from "../decorators/property-mapper";
import { SignupResponse } from "../models/signup-response-model";
import { IUserDetails } from "../interfaces/user-details";
import { LoginResponse } from "../models/login-response-model";

interface SignupOptions extends CustomerAndBusinessUnitOptions {
  emailAddress: string;
  informationCollectionConsentGivenNow: boolean;
  language?: string;
  displayName: string;
  password: string;
  device: DeviceInfo;
}

export interface ResetOptions extends CustomerAndBusinessUnitOptions {
  username: string;
}

export interface SetNewPasswordOptions extends CustomerAndBusinessUnitOptions {
  token: string;
  password: string;
  informationCollectionConsentGivenNow: boolean;
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
  password: string;
}

export interface ChangePasswordOptions extends CustomerAndBusinessUnitOptions {
  newPassword: string;
  oldPassword: string;
  device: DeviceInfo;
  logoutOnAllDevices?: boolean;
}

export interface ConfirmActivationCodeOptions extends CustomerAndBusinessUnitOptions {
  code: string;
}

export interface ConsumeActivationCodeOptions extends CustomerAndBusinessUnitOptions {
  code: string;
  device: {
    deviceId: string;
    name: string;
    type: DeviceType;
  };
}

export interface ChangeEmailAndUsername extends CustomerAndBusinessUnitOptions {
  password: string;
  newEmailAddressAndUsername: string;
}

export interface ChangeEmailOptions extends CustomerAndBusinessUnitOptions {
  newEmailAddress: string;
}

interface AttributePayload {
  attributeId: string;
  value: any;
}
interface SetAttributeOptions extends CustomerAndBusinessUnitOptions {
  attributes: AttributePayload[];
}

export class UserService extends BaseService {
  public signup({
    customer,
    businessUnit,
    emailAddress,
    password,
    device,
    displayName,
    informationCollectionConsentGivenNow,
    language
  }: SignupOptions) {
    return this.post(
      `${this.cuBuUrl({
        apiVersion: "v3",
        customer,
        businessUnit
      })}/user/signup`,
      {
        emailAddress,
        password,
        device,
        displayName,
        informationCollectionConsentGivenNow,
        language
      },
      {
        "Content-Type": "application/json"
      }
    ).then(data => deserialize(SignupResponse, data));
  }

  public reset({ customer, businessUnit, username }: ResetOptions) {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/user/password/reset/${username}`
    );
  }

  public setNewPassword({
    customer,
    businessUnit,
    password,
    informationCollectionConsentGivenNow,
    token
  }: SetNewPasswordOptions) {
    return this.put(
      `${this.cuBuUrl({
        apiVersion: "v3",
        customer,
        businessUnit
      })}/user/signup/password/${token}`,
      {
        password,
        informationCollectionConsentGivenNow
      }
    );
  }

  public getUserDetails({ customer, businessUnit }: CustomerAndBusinessUnitOptions): Promise<IUserDetails> {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/user/details`,
      this.options.authHeader()
    );
  }

  public updateUserDetails({ customer, businessUnit, body }: UpdateUserDetailsOptions) {
    return this.put(
      `${this.cuBuUrl({
        apiVersion: "v1",
        customer,
        businessUnit
      })}/user/details`,
      body,
      this.options.authHeader()
    );
  }

  public confirmSignup({ customer, businessUnit, token, deviceId }: ConfirmSignupOptions) {
    return this.put(
      `${this.cuBuUrl({
        apiVersion: "v1",
        customer,
        businessUnit
      })}/user/signup/confirm/${token}`,
      {
        deviceRegistration: {
          deviceId
        }
      }
    ).then(data => deserialize(LoginResponse, data.loginResponse));
  }

  public deleteUser({ customer, businessUnit, password }: DeleteUserOptions) {
    return this.post(
      `${this.cuBuUrl({
        apiVersion: "v3",
        customer,
        businessUnit
      })}/user/delete`,
      { password },
      this.options.authHeader()
    );
  }

  public changePassword({
    customer,
    businessUnit,
    oldPassword,
    newPassword,
    logoutOnAllDevices,
    device
  }: ChangePasswordOptions) {
    return this.put(
      `${this.cuBuUrl({
        apiVersion: "v3",
        customer,
        businessUnit
      })}/user/changePassword`,
      {
        oldPassword,
        newPassword,
        logoutOnAllDevices: !!logoutOnAllDevices,
        device
      },
      this.options.authHeader()
    ).then(data => deserialize(LoginResponse, data.loginResponse));
  }

  public confirmActivationCode({ customer, businessUnit, code }: ConfirmActivationCodeOptions) {
    return this.put(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/user/activation/confirm/${code}`,
      null,
      this.options.authHeader()
    );
  }

  public getActivationCode({
    customer,
    businessUnit
  }: CustomerAndBusinessUnitOptions): Promise<{ code: string; expires: Date }> {
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/userActivation/activationCode`
    ).then(data => ({
      ...data,
      expires: new Date(data.expires)
    }));
  }

  public consumeActivationCode({ code, device, customer, businessUnit }: ConsumeActivationCodeOptions) {
    return this.post(
      `${this.cuBuUrl({
        apiVersion: "v2",
        customer,
        businessUnit
      })}/userActivation/consume`,
      {
        activationCode: code,
        device
      }
    ).then(data => deserialize(LoginResponse, data));
  }

  public changeEmail({ newEmailAddress, customer, businessUnit }: ChangeEmailOptions) {
    return this.put(
      `${this.cuBuUrl({
        apiVersion: "v3",
        customer,
        businessUnit
      })}/user/changeEmail`,
      {
        newEmailAddress
      },
      this.options.authHeader()
    );
  }

  public changeEmailAndUsername({
    newEmailAddressAndUsername,
    customer,
    businessUnit,
    password
  }: ChangeEmailAndUsername) {
    return this.put(
      `${this.cuBuUrl({
        apiVersion: "v3",
        customer,
        businessUnit
      })}/user/changeEmailAndUsername`,
      {
        password,
        newEmailAddressAndUsername
      },
      this.options.authHeader()
    );
  }

  public setAttributes({ customer, businessUnit, attributes }: SetAttributeOptions): Promise<IUserDetails> {
    return this.put(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v3" })}/user/attributes`,
      attributes,
      this.options.authHeader()
    );
  }
}
