import { jsonProperty } from "../decorators/json-property";

export class PasswordPolicy {
  @jsonProperty()
  public minimumLength: 8;
  @jsonProperty()
  public minimumGroups = 2;
}
