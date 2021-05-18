import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { LoginResponse } from "../models/login-response-model";
import { SessionResponse } from "../models/session-model";

export enum DeviceType {
  WEB = "WEB",
  SMART_TV = "SMART_TV"
}

export interface DeviceInfo {
  type: DeviceType;
  name: string;
  deviceId: string;
}

export interface LoginOptions extends CustomerAndBusinessUnitOptions {
  username: string;
  password: string;
  device: DeviceInfo;
  informationCollectionConsentGivenNow: boolean;
}

export interface LoginAnonymousOptions extends CustomerAndBusinessUnitOptions {
  device: DeviceInfo;
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
  public async login({
    customer,
    businessUnit,
    username,
    password,
    device,
    informationCollectionConsentGivenNow
  }: LoginOptions) {
    return this.post(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v3"
      })}/auth/login`,
      {
        username,
        password,
        device,
        informationCollectionConsentGivenNow
      }
    ).then(data => deserialize(LoginResponse, data));
  }

  public async loginAnonymous({ customer, businessUnit, device }: LoginAnonymousOptions) {
    return this.post(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/auth/anonymous`,
      { device, deviceId: device.deviceId }
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
