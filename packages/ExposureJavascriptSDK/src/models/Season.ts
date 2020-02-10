import { jsonProperty } from "../decorators/json-property";
import { Localized } from "./Asset";

export class Season {
  @jsonProperty({ type: Localized })
  public localized: Localized[];
  @jsonProperty()
  public season: number;
  @jsonProperty()
  public seasonId: string;
  @jsonProperty()
  public episodeCount: number;

  public getTitle = (locale: string) => {
    if (this.localized.length === 0) {
      return "";
    }
    const localeItem =
      this.localized.find(localizedItem => localizedItem.locale === locale) ||
      this.localized[0];

    return localeItem.title || "";
  };
}

export class SeasonResponse {
  @jsonProperty({ type: Season })
  public items: Season[];

  public series: string;
}
