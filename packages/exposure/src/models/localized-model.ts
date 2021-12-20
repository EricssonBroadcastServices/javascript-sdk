import { jsonProperty } from "../decorators/json-property";
import { ImageOrientation, IImage } from "../interfaces/content/image";

export class Localized {
  @jsonProperty({
    type: Object,
  })
  public images?: IImage[] = [];
  @jsonProperty()
  public locale: string;
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public sortingTitle?: string;
  @jsonProperty()
  public shortDescription?: string;
  @jsonProperty()
  public description?: string;
  @jsonProperty()
  public longDescription?: string;
}

const sortByResolution = (a: IImage, b: IImage) => {
  return b.width - a.width;
};

export class WithLocalized {
  @jsonProperty({
    type: Localized,
  })
  public localized: Localized[] = [];

  public getLocaleItem = (prefferedLocale: string) =>
    this.localized.find((l) => l.locale === prefferedLocale) || this.localized[0];

  public getLocalizedValue = (property: string, locale: string, defaultLocale?: string) => {
    if (!this.localized || this.localized.length === 0) {
      return "";
    }
    const localeItem = this.localized.find((localizedItem) => localizedItem.locale === locale);
    if (!localeItem || !localeItem[property] || (Array.isArray(localeItem[property]) && !localeItem[property].length)) {
      if (defaultLocale) {
        return this.getLocalizedValue(property, defaultLocale);
      }
      if (locale === this.localized[0].locale) {
        return "";
      }
      return this.getLocalizedValue(property, this.localized[0].locale);
    }
    return localeItem[property] || "";
  };

  public getImage = (orientation = "LANDSCAPE", locale: string, defaultLocale?: string) => {
    if (!this.localized.length) {
      return "";
    }

    const allImages = (this.getLocalizedValue("images", locale, defaultLocale) || []).sort(sortByResolution);
    if (!allImages || !allImages.length) {
      return "";
    }

    const imagesByCorrectOrientation = allImages.filter((i) => i.orientation === orientation.toUpperCase());
    const imagesByCorrectType = imagesByCorrectOrientation.filter((i) => {
      if (orientation === ImageOrientation.LANDSCAPE) {
        return i.type === "cover";
      } else if (orientation === ImageOrientation.PORTRAIT) {
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

  public getImages = (locale: string, defaultLocale?: string): IImage[] => {
    return this.getLocalizedValue("images", locale, defaultLocale) || [];
  };

  public getTitle = (locale: string, defaultLocale?: string) => {
    return this.getLocalizedValue("title", locale, defaultLocale);
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
  public getShortDescription = (locale: string, maxLength: number | null = null, defaultLocale?: string) => {
    return this.maxLength(this.getLocalizedValue("shortDescription", locale, defaultLocale), maxLength || 50);
  };
  public getMediumDescription = (locale: string, defaultLocale?: string) =>
    this.getLocalizedValue("description", locale, defaultLocale);
  public getLongDescription = (locale: string, defaultLocale?: string) =>
    this.getLocalizedValue("longDescription", locale, defaultLocale);
  public getDescription = (locale: string, maxLength: number | null = null, defaultLocale?: string) => {
    if (this.getLongDescription(locale, defaultLocale)) {
      return this.maxLength(this.getLongDescription(locale, defaultLocale), maxLength);
    } else if (this.getMediumDescription(locale, defaultLocale)) {
      return this.maxLength(this.getMediumDescription(locale, defaultLocale), maxLength);
    } else if (this.getShortDescription(locale, null, defaultLocale)) {
      return this.maxLength(this.getShortDescription(locale, null, defaultLocale), maxLength);
    }
    return "";
  };
}
