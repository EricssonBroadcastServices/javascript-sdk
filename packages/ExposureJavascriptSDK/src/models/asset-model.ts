import { jsonProperty } from "../decorators/json-property";
import { TagCollection } from "./tag-model";
import { UserLocation } from "./user-location-model";
import { Season } from "./season-model";
import { WithLocalized } from "./localized-model";

export enum mediumResBoundaries {
  lower = 500,
  upper = 1000
}

export enum lowResBoundaries {
  upper = 499
}

class Medias {
  @jsonProperty()
  public durationMillis: number;
}

export class Publication {
  @jsonProperty({ type: Date })
  public fromDate: Date;
  @jsonProperty({ type: String })
  public countries: string[] = [];
  @jsonProperty({ type: String })
  public products: string[] = [];
  @jsonProperty({ type: String })
  public availabilityKeys: string[];
}

export class ExternalReferences {
  @jsonProperty()
  public type: string;
  @jsonProperty()
  public locator: string;
}

export class Participants {
  @jsonProperty()
  public function?: string;
  @jsonProperty()
  public name: string;
}

export class PlayHistory {
  @jsonProperty()
  public channelId?: string;
  @jsonProperty()
  public lastViewedOffset?: number;
  @jsonProperty()
  public lastViewedTime?: number;
  @jsonProperty()
  public programId?: string;
}

export class UserData {
  @jsonProperty()
  public playHistory?: PlayHistory;
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

export class Asset extends WithLocalized {
  @jsonProperty()
  public assetId: string;
  @jsonProperty()
  public type: AssetType;
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
  @jsonProperty({ type: Season })
  public seasons?: Season[];
  @jsonProperty()
  public userData?: UserData;

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

  public getTitle = (locale: string, defaultLocale?: string) => {
    if (this.episode && this.season) {
      return `S${this.season}E${this.episode} ` + this.getLocalizedValue("title", locale, defaultLocale);
    }
    return this.getLocalizedValue("title", locale, defaultLocale);
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
