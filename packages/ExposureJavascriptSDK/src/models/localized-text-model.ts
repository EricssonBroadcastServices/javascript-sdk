import { jsonProperty } from "../decorators/json-property";

export class LocalizedText {
  @jsonProperty()
  public text: string;
  @jsonProperty()
  public locale: string;
}

export class LocalizedTitle {
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public locale: string;
}
