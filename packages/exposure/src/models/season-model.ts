import { Asset } from "./asset-model";
import { WithLocalized } from "./localized-model";
import { ILocalizedMetadata } from "../interfaces/content/localized-metadata";
import { jsonProperty } from "../decorators/json-property";

export class Season extends WithLocalized {
  @jsonProperty({ type: Object })
  public localized: ILocalizedMetadata[] = [];
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
