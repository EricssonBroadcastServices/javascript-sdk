import { jsonProperty } from "../decorators/json-property";
import { IAssetTagCollection } from "../interfaces/content/asset-tag";
import { IUserLocation } from "../interfaces/location/user-location";
import { Season } from "./season-model";
import { WithLocalized } from "./localized-model";

export enum mediumResBoundaries {
  lower = 500,
  upper = 1000
}

export enum lowResBoundaries {
  upper = 499
}

export enum ChannelFeature {
  VIRTUAL = "VIRTUAL",
  VC_CURATED = "VC_CURATED",
  VC_PERSONALIZED = "VC_PERSONALIZED",
  VC_SCHEDULED = "VC_SCHEDULED",
  EPG = "EPG"
}

interface IMedias {
  durationMillis: number;
}

export class Publication {
  @jsonProperty({ type: Date })
  public fromDate: Date;
  @jsonProperty({ type: Date })
  public toDate: Date;
  @jsonProperty({ type: String })
  public countries: string[] = [];
  @jsonProperty({ type: String })
  public products: string[] = [];
  @jsonProperty({ type: String })
  public availabilityKeys: string[];

  public isExpired() {
    return this.toDate.getTime() < Date.now();
  }

  public isInFuture() {
    return this.fromDate.getTime() > Date.now();
  }

  public isActive() {
    return !this.isInFuture() && !this.isExpired();
  }
}

export interface ExternalReferences {
  type: string;
  locator: string;
}

export interface Participants {
  function?: string;
  name: string;
}

export interface PlayHistory {
  channelId?: string;
  lastViewedOffset?: number;
  lastViewedTime?: number;
  programId?: string;
}

export interface UserData {
  playHistory?: PlayHistory;
}

export enum AssetType {
  MOVIE = "MOVIE",
  PROGRAM = "PROGRAM",
  TV_SHOW = "TV_SHOW",
  TV_CHANNEL = "TV_CHANNEL",
  EPISODE = "EPISODE",
  CLIP = "CLIP",
  AD = "AD",
  LIVE_EVENT = "LIVE_EVENT",
  EVENT = "EVENT",
  COLLECTION = "COLLECTION",
  PODCAST = "PODCAST",
  PODCAST_EPISODE = "PODCAST_EPISODE",
  OTHER = "OTHER"
}

interface ParentalRating {
  country: string;
  rating: string;
  scheme: string;
}

interface IOverlayWidget {
  url: string;
}

export enum EntityType {
  ASSET = "ASSET"
}

export enum LinkType {
  TRAILER = "TRAILER"
}

export interface LinkedEntity {
  entityId: string;
  entityType: EntityType;
  linkType: LinkType;
}

export enum MarkerType {
  INTRO = "INTRO",
  CREDITS = "CREDITS",
  POINT = "POINT",
  CHAPTER = "CHAPTER"
}

class EventTimes {
  @jsonProperty()
  public startTime: Date;
  @jsonProperty()
  public endTime: Date;
}

export class MarkerPoint extends WithLocalized {
  @jsonProperty()
  public offset: number;
  @jsonProperty()
  public endOffset?: number;
  @jsonProperty()
  public type: MarkerType;
}

export class Asset extends WithLocalized {
  @jsonProperty()
  public assetId: string;
  @jsonProperty()
  public changed: Date;
  @jsonProperty()
  public created: Date;
  @jsonProperty()
  public type: AssetType;
  @jsonProperty()
  public medias: IMedias[] = [];
  @jsonProperty()
  public productionYear: number;
  @jsonProperty({
    type: Object
  })
  public tags: IAssetTagCollection[] = [];
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
  @jsonProperty({ type: Object })
  public externalReferences: ExternalReferences[] = [];
  @jsonProperty({ type: Object })
  public linkedEntities: LinkedEntity[] = [];
  @jsonProperty({ type: Object })
  public participants: Participants[] = [];
  @jsonProperty()
  public duration: number;
  @jsonProperty({ type: Season })
  public seasons?: Season[];
  @jsonProperty()
  public userData?: UserData;
  @jsonProperty({ type: String })
  public productionCountries: string[] = [];
  @jsonProperty({ type: Object })
  public parentalRatings: ParentalRating[];
  @jsonProperty({ type: String })
  public channelFeatures?: ChannelFeature[];
  @jsonProperty()
  public overlayWidgets?: IOverlayWidget[];
  @jsonProperty({ type: String })
  public slugs: string[] = [];
  @jsonProperty({ type: MarkerPoint })
  public markerPoints: MarkerPoint[] = [];
  @jsonProperty()
  public event?: EventTimes;

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
    return this.publications.filter(p => !p.isExpired()).every(p => p.isInFuture());
  };

  public getStartTime = () => {
    if (this.publications.length === 0 && !this.startTime && !this.event?.startTime) {
      return undefined;
    }

    if (this.event?.startTime) return this.event.startTime;

    const publicationsSortedAscending = this.publications.sort((a, b) => a.fromDate.getTime() - b.fromDate.getTime());
    // if we the asset will be published in the future, take the start time from next upcoming publication
    if (this.inFuture()) {
      const futurePublications = publicationsSortedAscending.filter(p => p.isInFuture());
      if (futurePublications.length) return futurePublications[0].fromDate;
    }
    // if we have active publications, the start time has already been
    const activePublications = publicationsSortedAscending.filter(p => p.isActive());
    if (activePublications.length) {
      return this.startTime ? new Date(this.startTime) : activePublications[0].fromDate;
    }
    return this.startTime ? new Date(this.startTime) : publicationsSortedAscending[0].fromDate;
  };

  public getYear = () => {
    return this.productionYear;
  };

  public isGeoBlocked = (location: IUserLocation | null) => {
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

  public getTitle = (locale: string, defaultLocale?: string, enrichEpisodeTitles = true) => {
    if (this.episode && this.season && enrichEpisodeTitles) {
      return `S${this.season}E${this.episode} ` + this.getLocalizedValue("title", locale, defaultLocale);
    }
    return this.getLocalizedValue("title", locale, defaultLocale);
  };

  public getSortingTitle = (locale: string, defaultLocale?: string) => {
    return this.getLocalizedValue("sortingTitle", locale, defaultLocale);
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
