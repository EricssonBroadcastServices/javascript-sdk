import { jsonProperty } from "../decorators/json-property";

export class Tag {
  @jsonProperty()
  public tagId = "";
}

export class TagCollection {
  @jsonProperty({
    type: Tag
  })
  public tagValues: Tag[] = [];
  @jsonProperty()
  public type: string;
}
