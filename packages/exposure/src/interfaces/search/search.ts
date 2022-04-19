import { Asset } from "../../models/asset-model";
import { IPaginatedResponse } from "../content/paginated";
import { ITag } from "../tag/tag";

export interface ISearchV3Response {
  assetHits: { items: { asset: Asset }[] } & IPaginatedResponse;
  tagHits: {
    tag: ITag;
  } & IPaginatedResponse;
}
