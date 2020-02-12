import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { PasswordTuple, DeviceInfo } from "./authentication-service";
import { deserialize } from "../decorators/property-mapper";
import { SignupResponse } from "../models/SignupResponse";

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

export class UserService extends BaseService {
  public signup({ customer, businessUnit, body }: SignupOptions) {
    return this.post(`/v2/customer/${customer}/businessunit/${businessUnit}/user/signup`, body, {
      "Content-Type": "application/json"
    }).then(data => deserialize(SignupResponse, data));
  }

  public reset({ customer, businessUnit, username }: ResetOptions) {
    return this.get(`/v1/customer/${customer}/businessunit/${businessUnit}/user/password/reset/${username}`);
  }
}
