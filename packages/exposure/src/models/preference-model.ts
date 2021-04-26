import { jsonProperty } from "../decorators/json-property";
import { Asset } from "./asset-model";

export class PreferenceListItem {
  @jsonProperty()
  public assetId: string;
  @jsonProperty()
  public lastUpdated: Date;
  @jsonProperty()
  public order: number;
  @jsonProperty()
  public asset: Asset;
}

export class PreferenceListTagItem {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public order: number;
}

export class PreferenceListTags {
  @jsonProperty()
  public query: string;
  @jsonProperty({ type: PreferenceListTagItem })
  public items: PreferenceListTagItem[];
}
