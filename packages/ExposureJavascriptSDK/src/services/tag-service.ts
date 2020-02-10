import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { TagResponse } from "../models/TagResponse";

interface TagOptions extends CustomerAndBusinessUnitOptions {
  tagId: string;
}

export class TagService extends BaseService {
  public getTag({ customer, businessUnit, tagId }: TagOptions) {
    return this.get(
      `/v1/customer/${customer}/businessunit/${businessUnit}/tag/${tagId}`
    ).then(data => deserialize(TagResponse, data));
  }
}
