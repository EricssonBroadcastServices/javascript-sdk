import { CustomerBusinessUnit } from "./ExposureApi";
import { ApiAnonymousSessionRequest, LoginRequest } from "./generated/data-contracts";
import { V2 } from "./generated/V2";
import { V3 } from "./generated/V3";

export default class Authentication {
  private customer: string;
  private businessUnit: string;
  constructor({ customer, businessUnit }: CustomerBusinessUnit, private v2: V2<null>, private v3: V3<null>) {
    this.customer = customer;
    this.businessUnit = businessUnit;
  }

  login(data: LoginRequest) {
    return this.v3.loginV3(this.customer, this.businessUnit, data);
  }

  loginAnonymous(requestData: ApiAnonymousSessionRequest) {
    return this.v2.anonymousSessionV2(this.customer, this.businessUnit, requestData)
  }
}
