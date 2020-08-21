import { jsonProperty } from "../decorators/json-property";
import { ConfigReloadQueryParameter } from "./login-response-model";

export class SessionResponse {
  @jsonProperty()
  public configReloadQueryParameter?: ConfigReloadQueryParameter;
}
