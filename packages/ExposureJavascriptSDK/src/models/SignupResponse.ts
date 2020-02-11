import { jsonProperty } from "../decorators/json-property";
import { LoginResponse } from "./LoginResponse";

export class SignupResponse {
  @jsonProperty()
  public unConfirmed: string;
  @jsonProperty()
  public loginResponse: LoginResponse;
}
