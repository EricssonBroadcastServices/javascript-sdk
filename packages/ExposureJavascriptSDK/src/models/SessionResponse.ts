import { jsonProperty } from "../decorators/json-property";
import { ConfigReloadQueryParameter } from "./LoginResponse";

export class SessionResponse {
  @jsonProperty()
  public configReloadQueryParameter?: ConfigReloadQueryParameter;
}
