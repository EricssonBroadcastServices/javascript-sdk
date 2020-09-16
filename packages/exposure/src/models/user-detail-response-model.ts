import { jsonProperty } from "../decorators/json-property";

export class UserDetailsResponse {
  @jsonProperty()
  public displayName: string;
  @jsonProperty()
  public language: string;
  @jsonProperty()
  public defaultLanguage: string;
  @jsonProperty()
  public username: string;
  @jsonProperty()
  public email: string;
}
