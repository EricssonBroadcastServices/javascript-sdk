import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { LoginResponse, ISessionResponse } from "../models/login-response-model";
import { IDeviceInfo } from "../interfaces/device";
export interface LoginOptions extends CustomerAndBusinessUnitOptions {
  username: string;
  password: string;
  device: IDeviceInfo;
  informationCollectionConsentGivenNow?: boolean;
}

export interface LoginAnonymousOptions extends CustomerAndBusinessUnitOptions {
  device: IDeviceInfo;
}

export interface LoginFireBaseOptions extends CustomerAndBusinessUnitOptions {
  username: string;
  email: string;
  displayName: string;
  providerId: string;
  accessToken: string;
  emailVerified: boolean;
  device: IDeviceInfo;
  expiration?: string;
  language?: string;
}

interface LoginByOauthTokenOptions extends CustomerAndBusinessUnitOptions {
  token: string;
  device: IDeviceInfo;
}

export class AuthenticationService extends BaseService {
  public async login({
    customer,
    businessUnit,
    username,
    password,
    device,
    informationCollectionConsentGivenNow = false
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

  public async loginByOauthToken({
    customer,
    businessUnit,
    token,
    device
  }: LoginByOauthTokenOptions): Promise<LoginResponse> {
    const url = `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v2" })}/auth/oauthLogin`;
    const payload = {
      token,
      device
    };
    return this.post(url, payload).then(data => deserialize(LoginResponse, data));
  }

  public async loginFirebase({ customer, businessUnit, ...payload }: LoginFireBaseOptions) {
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

  public async validateSession({
    customer,
    businessUnit,
    headers
  }: CustomerAndBusinessUnitOptions): Promise<ISessionResponse> {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v2"
      })}/auth/session`,
      { ...this.options.authHeader(), ...headers }
    );
  }
}
