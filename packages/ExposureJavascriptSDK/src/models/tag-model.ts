import { jsonProperty } from "../decorators/json-property";

export class Tag {
  @jsonProperty()
  public tagId: string;
}

export class TagCollection {
  @jsonProperty({
    type: Tag
  })
  public tagValues: Tag[] = [];
  @jsonProperty()
  public type: string;
}
