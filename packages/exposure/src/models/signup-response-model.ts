import { jsonProperty } from "../decorators/json-property";
import { LoginResponse } from "./login-response-model";

export class SignupResponse {
  @jsonProperty()
  public unConfirmed: string;
  @jsonProperty()
  public loginResponse: LoginResponse;
}
