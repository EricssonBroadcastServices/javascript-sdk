import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { LoginResponse } from "../models/LoginResponse";

interface PasswordTuple {
  algorithm: {
    algorithmName: string;
    pbkdf2Iterations?: number;
  };
  value: string;
}

export interface Credentials {
  passwordTuples: PasswordTuple[];
}

interface LoginV2Options extends CustomerAndBusinessUnitOptions {
  body: {
    credentials: {
      passwordTuples: PasswordTuple[];
    };
    deviceId: string;
    device: {
      height: number;
      width: number;
      type: "WEB";
      name: string;
      deviceId: string;
    };
  };
}

export class AuthenticationService extends BaseService {
  public loginV2({ customer, businessUnit, body }: LoginV2Options) {
    return this.post(`/v2/customer/${customer}/businessunit/${businessUnit}/auth/login`, body).then(data =>
      deserialize(LoginResponse, data)
    );
  }
}
