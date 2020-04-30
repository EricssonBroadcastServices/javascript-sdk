import { jsonProperty } from "../decorators/json-property";

enum Orientation {
  LANDSCAPE = "LANDSCAPE",
  PORTRAIT = "PORTRAIT"
}

export class ImageModel {
  @jsonProperty()
  public url: string;

  @jsonProperty()
  public type?: string;

  @jsonProperty()
  public orientation: string = Orientation.LANDSCAPE;

  @jsonProperty()
  public height = 0;

  @jsonProperty()
  public width = 0;
}

export class Localized {
  @jsonProperty({
    type: ImageModel
  })
  public images: ImageModel[] = [];
  @jsonProperty()
  public locale: string;
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public shortDescription: string;
  @jsonProperty()
  public description: string;
  @jsonProperty()
  public longDescription: string;
}

export class WithLocalized {
  @jsonProperty({
    type: Localized
  })
  public localized: Localized[] = [];

  public getLocaleItem = (prefferedLocale: string) =>
    this.localized.find(l => l.locale === prefferedLocale) || this.localized[0];

  public getImage = (orientation = "LANDSCAPE", locale: string) => {
    if (!this.localized.length) {
      return "";
    }
    const sortByResolution = (a: ImageModel, b: ImageModel) => {
      return b.width - a.width;
    };
    const allImages =
      this.getLocaleItem(locale).images.length > 0
        ? this.getLocaleItem(locale).images.sort(sortByResolution)
        : this.localized[0].images.sort(sortByResolution);
    const imagesByCorrectOrientation = allImages.filter(i => i.orientation === orientation.toUpperCase());
    const imagesByCorrectType = imagesByCorrectOrientation.filter(i => {
      if (orientation === Orientation.LANDSCAPE) {
        return i.type === "cover";
      } else if (orientation === Orientation.PORTRAIT) {
        return i.type === "poster";
      }
      return false;
    });
    if (imagesByCorrectType.length > 0) {
      return imagesByCorrectType[0].url;
    }
    if (imagesByCorrectOrientation.length > 0) {
      return imagesByCorrectOrientation[0].url;
    }
    if (allImages.length > 0) {
      return allImages[0].url;
    }
    return "";
  };

  public getLocalizedValue = (property: string, locale: string) => {
    if (!this.localized || this.localized.length === 0) {
      return "";
    }
    const localeItem = this.localized.find(localizedItem => localizedItem.locale === locale);
    if (!localeItem || !localeItem[property]) {
      if (locale === this.localized[0].locale) {
        return "";
      }
      return this.getLocalizedValue(property, this.localized[0].locale);
    }
    return localeItem[property] || "";
  };

  public getTitle = (locale: string) => {
    return this.getLocalizedValue("title", locale);
  };

  public maxLength = (aString: string, maxLength: number | null) => {
    if (maxLength === null) {
      return aString;
    }
    if (aString.split("").length < maxLength || aString === "") {
      return aString;
    }
    return aString.slice(0, maxLength) + "...";
  };
  public getShortDescription = (locale: string, maxLength: number | null = null) => {
    return this.maxLength(this.getLocalizedValue("shortDescription", locale), maxLength || 50);
  };
  public getMediumDescription = (locale: string) => this.getLocalizedValue("description", locale);
  public getLongDescription = (locale: string) => this.getLocalizedValue("longDescription", locale);
  public getDescription = (locale: string, maxLength: number | null = null) => {
    if (this.getLongDescription(locale)) {
      return this.maxLength(this.getLongDescription(locale), maxLength);
    } else if (this.getMediumDescription(locale)) {
      return this.maxLength(this.getMediumDescription(locale), maxLength);
    } else if (this.getShortDescription(locale)) {
      return this.maxLength(this.getShortDescription(locale), maxLength);
    }
    return "";
  };
}
