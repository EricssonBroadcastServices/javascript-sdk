import { jsonProperty } from "../decorators/json-property";
import { Asset } from "./asset-model";
import { WithLocalized } from "./localized-model";

export class Season extends WithLocalized {
  @jsonProperty()
  public season: number;
  @jsonProperty()
  public seasonId: string;
  @jsonProperty()
  public episodeCount: number;
  @jsonProperty({ type: Asset })
  public episodes?: Asset[];
}

export class SeasonResponse {
  @jsonProperty({ type: Season })
  public items: Season[];

  public series: string;
}
