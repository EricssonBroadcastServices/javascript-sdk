import { jsonProperty } from "../decorators/json-property";
import { TagCollection } from "./tag-model";
import { UserLocation } from "./user-location-model";

enum Orientation {
  LANDSCAPE = "LANDSCAPE",
  PORTRAIT = "PORTRAIT"
}

export enum mediumResBoundaries {
  lower = 500,
  upper = 1000
}

export enum lowResBoundaries {
  upper = 499
}

export class ImageModel {
  @jsonProperty()
  public url: string;

  @jsonProperty()
  public type: string;

  @jsonProperty()
  public orientation: string;

  @jsonProperty()
  public height: number;

  @jsonProperty()
  public width: number;
}

class Medias {
  @jsonProperty()
  public durationMillis: number;
}

class Publication {
  @jsonProperty({ type: Date })
  public fromDate: Date;
  @jsonProperty({ type: String })
  public countries: string[] = [];
  @jsonProperty({ type: String })
  public products: string[] = [];
}

export class ExternalReferences {
  @jsonProperty()
  public type: string;
  @jsonProperty()
  public locator: string;
}

export class Participants {
  @jsonProperty()
  public function: string;
  @jsonProperty()
  public name: string;
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

export enum AssetType {
  MOVIE = "MOVIE",
  PROGRAM = "PROGRAM",
  TV_SHOW = "TV_SHOW",
  TV_CHANNEL = "TV_CHANNEL",
  EPISODE = "EPISODE",
  CLIP = "CLIP",
  AD = "AD",
  LIVE_EVENT = "LIVE_EVENT"
}

export class Asset {
  @jsonProperty()
  public assetId: string;
  @jsonProperty()
  public type: AssetType;
  @jsonProperty({
    type: Localized
  })
  public localized: Localized[] = [];
  @jsonProperty({
    type: Medias
  })
  public medias: Medias[] = [];
  @jsonProperty()
  public productionYear: number;
  @jsonProperty({
    type: TagCollection
  })
  public tags: TagCollection[] = [];
  @jsonProperty({ type: Publication })
  public publications: Publication[] = [];
  @jsonProperty()
  public startTime: string;
  @jsonProperty()
  public materialType: string;
  @jsonProperty()
  public endTime: string;
  @jsonProperty()
  public season: number;
  @jsonProperty()
  public episode: number;
  @jsonProperty()
  public tvShowId: string;
  @jsonProperty({ type: ExternalReferences })
  public externalReferences: ExternalReferences[] = [];
  @jsonProperty({ type: Participants })
  public participants: Participants[] = [];
  @jsonProperty()
  public duration: number;

  public series = () => {
    return this.tags.find(t => t.type === "series");
  };

  public isLive = () => {
    if (this.startTime && this.endTime) {
      const now = new Date();
      const startTime = new Date(this.startTime);
      const endTime = new Date(this.endTime);
      if (endTime > now && startTime <= now) {
        return true;
      }
    }
    return false;
  };
  public inFuture = () => {
    if (this.publications.length === 0) {
      return false;
    }
    return this.publications[0].fromDate.getTime() > Date.now();
  };

  public getStartTime = () => {
    if (this.publications.length === 0) {
      return undefined;
    }
    return this.startTime
      ? new Date(this.startTime)
      : this.publications[0].fromDate;
  };

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
    const imagesByCorrectOrientation = allImages.filter(
      i => i.orientation === orientation.toUpperCase()
    );
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
    const localeItem = this.localized.find(
      localizedItem => localizedItem.locale === locale
    );
    if (!localeItem || !localeItem[property]) {
      if (locale === this.localized[0].locale) {
        return "";
      }
      return this.getLocalizedValue(property, this.localized[0].locale);
    }
    if (this.episode && this.season) {
      return `S${this.season}E${this.episode} ` + localeItem[property] || "";
    }
    return localeItem[property] || "";
  };

  public getTitle = (locale: string) => this.getLocalizedValue("title", locale);

  public maxLenght = (aString: string, maxLenght: number | null) => {
    if (maxLenght === null) {
      return aString;
    }
    if (aString.split("").length < maxLenght || aString === "") {
      return aString;
    }
    return aString.slice(0, maxLenght) + "...";
  };
  public getShortDescription = (
    locale: string,
    maxLength: number | null = null
  ) => {
    return this.maxLenght(
      this.getLocalizedValue("shortDescription", locale),
      maxLength || 50
    );
  };
  public getMediumDescription = (locale: string) =>
    this.getLocalizedValue("description", locale);
  public getLongDescription = (locale: string) =>
    this.getLocalizedValue("longDescription", locale);
  public getDescription = (locale: string, maxLenght: number | null = null) => {
    if (this.getLongDescription(locale)) {
      return this.maxLenght(this.getLongDescription(locale), maxLenght);
    } else if (this.getMediumDescription(locale)) {
      return this.maxLenght(this.getMediumDescription(locale), maxLenght);
    } else if (this.getShortDescription(locale)) {
      return this.maxLenght(this.getShortDescription(locale), maxLenght);
    }
    return "";
  };
  public getYear = () => {
    return this.productionYear;
  };

  public isGeoBlocked = (location: UserLocation | null) => {
    if (!location) {
      return false; // if we do not know, let the backend handle things
    }
    let isBlocked = false;
    this.publications.forEach(publication => {
      if (publication.countries.length > 0) {
        if (!publication.countries.includes(location.countryCode)) {
          isBlocked = true;
        }
      }
    });
    return isBlocked;
  };

  public playlistEntry = (locale: string) => {
    return {
      src: this.assetId,
      type: "video/emp",
      title: this.getTitle(locale)
    };
  };
}

export class AssetResponse {
  @jsonProperty()
  public pageSize: number;
  @jsonProperty()
  public pageNumber: number;
  @jsonProperty()
  public totalCount: number;
  @jsonProperty({
    type: Asset
  })
  public items: Asset[] = [];
  public numberOfPages = () => {
    return Math.ceil(this.totalCount / this.pageSize);
  };
  public getInitialSlide = () => {
    const now = new Date();
    if (this.items.length === 0) {
      return 0;
    }
    if (this.items[0].startTime) {
      for (let i = 0; i < this.items.length; i++) {
        const endTime = new Date(this.items[i].endTime);
        if (endTime > now) {
          return i;
        }
      }
    }
    return 0;
  };
}

export class EpisodesResponse extends AssetResponse {
  public seriesId: string;
  public seasonNumber: number;
}
