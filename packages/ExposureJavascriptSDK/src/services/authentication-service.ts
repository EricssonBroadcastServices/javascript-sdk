import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { LoginResponse } from "../models/login-response-model";
import { SessionResponse } from "../models/session-model";

export interface DeviceInfo {
  height: number;
  width: number;
  type: "WEB";
  name: string;
  deviceId: string;
}

export interface PasswordTuple {
  algorithm: {
    algorithmName: string;
    pbkdf2Iterations?: number;
  };
  value: string;
}

export interface Credentials {
  passwordTuples: PasswordTuple[];
}

export interface LoginOptions extends CustomerAndBusinessUnitOptions {
  body: {
    username: string;
    credentials: {
      passwordTuples: PasswordTuple[];
    };
    deviceId: string;
    device: DeviceInfo;
  };
}

export interface LoginAnonymousOptions extends CustomerAndBusinessUnitOptions {
  body: {
    deviceId: string;
    device: DeviceInfo;
  };
}

export class AuthenticationService extends BaseService {
  public login({ customer, businessUnit, body }: LoginOptions) {
    return this.post(
      `/v2/customer/${customer}/businessunit/${businessUnit}/auth/login`,
      body
    ).then(data => deserialize(LoginResponse, data));
  }

  public loginAnonymous({
    customer,
    businessUnit,
    body
  }: LoginAnonymousOptions) {
    return this.post(
      `/v2/customer/${customer}/businessunit/${businessUnit}/auth/anonymous`,
      body
    ).then(data => {
      return deserialize(
        LoginResponse,
        Object.assign({}, data, { isAnonymous: true })
      );
    });
  }
  public logout({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    // TODO: not used. Check why we get error.
    return this.delete(
      `/v2/customer/${customer}/businessunit/${businessUnit}/auth/login`,
      this.options.authHeader()
    );
  }

  public validateSession({
    customer,
    businessUnit
  }: CustomerAndBusinessUnitOptions) {
    return this.get(
      `/v2/customer/${customer}/businessunit/${businessUnit}/auth/session`,
      this.options.authHeader()
    ).then(data => deserialize(SessionResponse, data));
  }
}
