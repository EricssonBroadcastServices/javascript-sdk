import { jsonProperty } from "../decorators/json-property";

export class UserLocation {
  @jsonProperty()
  public locationKnown: boolean;
  @jsonProperty()
  public countryCode: string;
}
