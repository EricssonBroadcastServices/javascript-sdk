import { jsonProperty } from "../decorators/json-property";

export class DocumentModel {
  @jsonProperty()
  public body: string;
}
