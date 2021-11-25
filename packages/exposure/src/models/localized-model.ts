import { ImageOrientation } from "../interfaces/content/image";
import { ILocalizedContent, ILocalizedMetadata } from "../interfaces/content/localized-metadata";
import { localizedUtils } from "../utils/localized";

export abstract class WithLocalized implements ILocalizedContent {
  public abstract localized: ILocalizedMetadata[];

  public getTitle(locale: string, defaultLocale?: string) {
    return localizedUtils.getLocalizedValue(this.localized, "title", locale, defaultLocale) as string;
  }
  public getDescription(locale: string, maxLength?: number | null, defaultLocale?: string) {
    return localizedUtils.getDescription(this.localized, locale, maxLength, defaultLocale);
  }
  public getShortDescription(locale: string, maxLength?: number | null, defaultLocale?: string) {
    return localizedUtils.getShortDescription(this.localized, locale, maxLength, defaultLocale);
  }
  public getMediumDescription(locale: string, defaultLocale?: string) {
    return localizedUtils.getMediumDescription(this.localized, locale, defaultLocale);
  }
  public getLongDescription(locale: string, defaultLocale?: string) {
    return localizedUtils.getLongDescription(this.localized, locale, defaultLocale);
  }
  public getLocaleItem(locale: string) {
    return localizedUtils.getLocaleItem(this.localized, locale);
  }
  public getImage(imageOrientation: ImageOrientation, locale: string, defaultLocale?: string) {
    return localizedUtils.getImage(this.localized, imageOrientation, locale, defaultLocale);
  }
  public getImages(locale: string, defaultLocale?: string) {
    return localizedUtils.getImages(this.localized, locale, defaultLocale);
  }
  public getLocalizedValue(property: string, locale: string, defaultLocale?: string) {
    return localizedUtils.getLocalizedValue(this.localized, property, locale, defaultLocale);
  }
}
