import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { LoginResponse } from "../models/login-response-model";
import { IDeviceInfo } from "../interfaces/device";
import { IValidateSessionResponse } from "../interfaces/auth/session";

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
    ).then(data => new LoginResponse(data));
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
      return new LoginResponse({ ...data, isAnonymous: true });
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
    return this.post(url, payload).then(data => new LoginResponse(data));
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
    ).then(data => new LoginResponse(data));
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
  }: CustomerAndBusinessUnitOptions): Promise<IValidateSessionResponse> {
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
