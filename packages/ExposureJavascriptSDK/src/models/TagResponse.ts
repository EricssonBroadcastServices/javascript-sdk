import { jsonProperty } from "../decorators/json-property";
import { LocalizedTitle } from "./LocalizedText";

export class TagResponse {
  @jsonProperty({
    type: LocalizedTitle
  })
  public localized: LocalizedTitle[];
  @jsonProperty()
  public scheme: string;
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
