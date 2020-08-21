import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { TagResponse } from "../models/tag-response-model";

interface TagOptions extends CustomerAndBusinessUnitOptions {
  tagId: string;
}

export class TagService extends BaseService {
  public getTag({ customer, businessUnit, tagId }: TagOptions) {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/tag/${tagId}`
    ).then(data => deserialize(TagResponse, data));
  }
}
