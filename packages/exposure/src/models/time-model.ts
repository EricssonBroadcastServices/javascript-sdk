import { jsonProperty } from "../decorators/json-property";

export class Time {
  @jsonProperty()
  public epochMillis: number;
  @jsonProperty()
  public iso8601: string;
}
