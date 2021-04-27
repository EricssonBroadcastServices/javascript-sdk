import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { LoginResponse } from "../models/login-response-model";
import { SessionResponse } from "../models/session-model";

export enum DeviceType {
  WEB = "WEB",
  SMART_TV = "SMART_TV"
}

export interface DeviceInfo {
  height: number;
  width: number;
  type: DeviceType;
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
  username: string;
  password: string;
  device: DeviceInfo;
}

export interface LoginAnonymousOptions extends CustomerAndBusinessUnitOptions {
  body: {
    deviceId: string;
    device: DeviceInfo;
  };
}

export interface LoginFireBaseOptions extends CustomerAndBusinessUnitOptions {
  username: string;
  email: string;
  displayName: string;
  providerId: string;
  accessToken: string;
  emailVerified: boolean;
  device: DeviceInfo;
}

export class AuthenticationService extends BaseService {
  public async login({ customer, businessUnit, username, password, device }: LoginOptions) {
    return this.post(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/auth/login`,
      {
        username,
        credentials: {
          passwordTuples: [
            {
              algorithm: {
                algorithmName: "CLEAR"
              },
              value: password
            }
          ]
        },
        deviceId: device.deviceId,
        device
      }
    ).then(data => deserialize(LoginResponse, data));
  }

  public async loginAnonymous({ customer, businessUnit, body }: LoginAnonymousOptions) {
    return this.post(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/auth/anonymous`,
      body
    ).then(data => {
      return deserialize(LoginResponse, Object.assign({}, data, { isAnonymous: true }));
    });
  }

  public async loginFirebase({
    username,
    email,
    displayName,
    providerId,
    accessToken,
    customer,
    businessUnit,
    emailVerified,
    device
  }: LoginFireBaseOptions) {
    const payload = {
      username,
      email,
      displayName,
      emailVerified,
      providerId,
      accessToken,
      device
    };
    return this.post(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/auth/firebaseLogin`,
      payload
    ).then(data => deserialize(LoginResponse, data));
  }

  public async logout({
    customer,
    businessUnit,
    fromAllDevice = false
  }: CustomerAndBusinessUnitOptions & { fromAllDevice?: boolean }) {
    return this.delete(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/auth/login?fromAllDevice=${fromAllDevice}`,
      this.options.authHeader()
    );
  }

  public async validateSession({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/auth/session`,
      this.options.authHeader()
    ).then(data => deserialize(SessionResponse, data));
  }
}
