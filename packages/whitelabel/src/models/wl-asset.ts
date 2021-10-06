import { ImageScaler } from "../utils/image-scaler";
import {
  IWLCarouselItem,
  IProductionCountry,
  IWLParticipant,
  IWLParentalRating,
  IWLOverlayWidget,
  IWLMarkerPoint
} from "../interfaces/wl-carousel-item";
import { WLSeason } from "./wl-season";
import { Translations } from "./wl-translations";
import { getTimeString, getDurationLocalized } from "../utils/time";
import { getDayLocalized } from "../utils/date";
import {
  jsonProperty,
  AssetType,
  Publication,
  ImageType,
  ExternalReferences,
  Product,
  IUserLocation,
  LoginResponse,
  MarkerType,
  ProductOffering,
  IImage
} from "@ericssonbroadcastservices/exposure-sdk";
import { EntitlementCase } from "../interfaces/entitlement-cases";
import { WLAction } from "./wl-config";
import { IWLAssetTag } from "..";

class ProductionCountry implements IProductionCountry {
  @jsonProperty()
  public code: string;
  @jsonProperty()
  public name: string;
}

export class WLParticipant implements IWLParticipant {
  @jsonProperty()
  public name: string;
  @jsonProperty()
  public function?: string;
  @jsonProperty()
  public action?: WLAction;
}

class WLParentalRating implements IWLParentalRating {
  @jsonProperty()
  public country: string;
  @jsonProperty()
  public rating: string;
  @jsonProperty()
  public scheme: string;
  @jsonProperty()
  public countryName: string;
}

class WLOverlayWidget implements IWLOverlayWidget {
  @jsonProperty()
  public url: string;
}

class WLMarkerPoint implements IWLMarkerPoint {
  @jsonProperty()
  public type: MarkerType;
  @jsonProperty()
  public offset: number;
  @jsonProperty()
  public endOffset?: number;
  @jsonProperty()
  public title: string;
}

export class WLAsset implements IWLCarouselItem {
  @jsonProperty({ externalName: "assetId" })
  public id: string;
  @jsonProperty()
  public trailerAssetId?: string;
  @jsonProperty()
  public type: AssetType;
  @jsonProperty()
  public assetId: string;
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public description: string;
  @jsonProperty({ type: Object })
  public images: IImage[];
  @jsonProperty({ type: Publication })
  public publications: Publication[] = [];
  @jsonProperty({ type: Object })
  public externalReferences: ExternalReferences[] = [];
  @jsonProperty()
  public tvShowId: string;
  @jsonProperty()
  public channelId: string;
  @jsonProperty()
  public season: number;
  @jsonProperty({ type: WLParticipant })
  public participants: WLParticipant[] = [];
  @jsonProperty()
  public startTime: Date;
  @jsonProperty()
  public endTime: Date;
  @jsonProperty()
  public duration: number;
  @jsonProperty()
  public year: number;
  @jsonProperty({ type: Object })
  public tags: IWLAssetTag[];
  @jsonProperty()
  public action: any;
  @jsonProperty()
  public pushNextCuepoint: number | null;
  @jsonProperty({ type: WLSeason })
  public seasons: WLSeason[] = [];
  @jsonProperty({ type: ProductionCountry })
  public productionCountries: ProductionCountry[];
  @jsonProperty()
  public bookmark?: {
    percentage: number;
    time: number;
  };
  @jsonProperty({ type: WLParentalRating })
  public parentalRatings: WLParentalRating[];
  @jsonProperty({ type: WLOverlayWidget })
  public overlayWidgets: WLOverlayWidget[];
  @jsonProperty({ type: String })
  public slugs: string[];
  @jsonProperty({ type: WLMarkerPoint })
  public markerPoints?: WLMarkerPoint[];

  private getIdentifier = () => {
    return this.slugs?.length > 0 ? this.slugs[0] : this.assetId;
  };

  public getDurationString = (locale?: string) => {
    const assetDuration = this.duration;
    if (!assetDuration) return;

    return getDurationLocalized(assetDuration, locale);
  };

  public getScaledLogo(width: number, format?: string) {
    const imageUrl = this.images.find(image => image.type === ImageType.LOGO)?.url;
    return ImageScaler.fitToWidth(imageUrl, width, format);
  }

  public getScaledImage(orientation: string, width: number, format?: string) {
    const imageUrl = this.images.find(image => image.orientation.toUpperCase() === orientation.toUpperCase())?.url;
    return ImageScaler.fitToWidth(imageUrl, width, format);
  }

  public getActivePublications() {
    return this.publications.filter(p => p.isActive());
  }

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

  public getIsEntitled = (availabilityKeys: string[]) => {
    return this.getHasProperProduct(availabilityKeys) && !this.inFuture();
  };

  /**
   * @deprecated routing logic should preferably be kept in apps
   */
  public getActionLink = (userEntitlements: Product[], availabilityKeys: string[]): string => {
    switch (this.action?.type) {
      case "NavigateToDetails":
        return this.getBrowseLink();
      case "PlayAsset":
        return this.getPlayLink(userEntitlements, availabilityKeys);
    }
    return "";
  };

  /**
   * @deprecated routing logic should preferably be kept in apps
   */
  public getBrowseLink = () => {
    switch (this.type) {
      case AssetType.TV_SHOW:
        return `/asset/${this.getIdentifier()}`;
      default:
        return `/asset/${this.getIdentifier()}`;
    }
  };

  /**
   * @deprecated routing logic should preferably be kept in apps
   */
  public getPlayLink = (userEntitlements: Product[], availabilityKeys: string[]) => {
    switch (this.type) {
      case AssetType.TV_SHOW:
        return `/asset/${this.getIdentifier()}`;
      case AssetType.EPISODE:
        return this.getIsEntitled(availabilityKeys)
          ? `/play/${this.getIdentifier()}?playlist=season`
          : `/asset/${this.getIdentifier()}`;
      default:
        if (this.tvShowId && this.season) {
          return this.getIsEntitled(availabilityKeys)
            ? `/play/${this.getIdentifier()}?playlist=season`
            : `/asset/${this.getIdentifier()}`;
        }
        if (this.anonymousIsAllowed(userEntitlements)) {
          return `/play/anonymous/${this.getIdentifier()}`;
        }
        return this.getIsEntitled(availabilityKeys)
          ? `/play/${this.getIdentifier()}`
          : `/asset/${this.getIdentifier()}`;
    }
  };

  public getTrailerAssetId = (): string | null => {
    const trailer = Array.isArray(this.externalReferences)
      ? this.externalReferences.find(ref => ref.type === "trailer")
      : null;
    return trailer?.locator ?? null;
  };

  public requiredProducts = (): string[] => {
    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    /* eslint-disable prefer-spread */
    let publications = this.getActivePublications();
    if (this.inFuture()) {
      publications = this.getNextPublications();
    }
    return [].concat.apply(
      [],
      // @ts-ignore
      publications.map(pub => pub.products)
    );
  };

  public getAvailabilityKeys = (): string[] => {
    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    /* eslint-disable prefer-spread */
    let publications = this.getActivePublications();
    if (this.inFuture()) {
      publications = this.publications.filter(p => p.isInFuture());
    }
    return [].concat.apply(
      [],
      // @ts-ignore
      publications.map(pub => pub.availabilityKeys)
    );
  };

  public getHasProperProduct = (userAvailabilityKeys: string[]) => {
    const isEntitled = userAvailabilityKeys.filter(key => this.getAvailabilityKeys().includes(key));
    return isEntitled.length > 0;
  };
  public getBuyableProductOfferings = (availableProductOfferings: ProductOffering[]) => {
    // TODO: solve this with proper typings, cannot find a solution now, hence eslint disable
    const buyable = [].concat
      .apply(
        [],
        // @ts-ignore
        availableProductOfferings.map(po => po.productIds)
      )
      .filter(p => this.requiredProducts().includes(p));
    // @ts-ignore
    return availableProductOfferings.filter(po => po.productIds.filter(pId => buyable.includes(pId)).length > 0);
  };

  public getAnonymousProducts = (userEntitlements: Product[]) => {
    return userEntitlements.filter(ut => ut.anonymousAllowed).map(ut => ut.id);
  };

  public anonymousIsAllowed = (userEntitlements: Product[]) => {
    return this.getAnonymousProducts(userEntitlements).filter(p => this.requiredProducts().includes(p)).length > 0;
  };

  public getLocalAssetStartTimeString = () => {
    if (this.getStartTime()) {
      return getTimeString(this.startTime);
    }
    return null;
  };
  public getLocalStartDayString = (translations: Translations) => {
    if (this.startTime) {
      return getDayLocalized(this.startTime, translations);
    }
    return null;
  };

  public getStartTime = () => {
    if (this.publications.length === 0 && !this.startTime) {
      return undefined;
    }
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

  public getNextPublications = () => {
    const publicationsSortedAscending = this.publications.sort((a, b) => a.fromDate.getTime() - b.fromDate.getTime());
    if (this.inFuture()) {
      const upcomingPublications = publicationsSortedAscending.filter(p => p.isInFuture());
      if (upcomingPublications.length > 0) {
        const nextDate = upcomingPublications[0].fromDate;
        return upcomingPublications.filter(up => {
          return up.fromDate.getTime() === nextDate.getTime();
        });
      }
    }
    const activePublications = publicationsSortedAscending.filter(p => p.isActive());
    return activePublications;
  };

  public getTimeSlot() {
    if (this.startTime && this.endTime) {
      return `${getTimeString(this.startTime)} - ${getTimeString(this.endTime)}`;
    }
    return null;
  }

  public getEPGProgress(now?: number): number {
    const { startTime, endTime } = this;
    if (startTime && endTime) {
      const currentTime = (now || Date.now()) - startTime.getTime();
      const duration = endTime.getTime() - startTime.getTime();
      return Math.max(Math.min((currentTime / duration) * 100, 100), 0);
    }
    return 0;
  }

  public isGeoBlocked = (location?: IUserLocation) => {
    if (!location) {
      return false; // if we do not know, let the backend handle things
    }
    // since we want to check all publications, ant all need to be blocked to block
    // let's sum the result of each in an array
    let publicationBlock: Boolean[] = [];
    this.getActivePublications().forEach(publication => {
      // if no countries specified, it does not block
      if (!publication.countries || publication.countries.length === 0) {
        publicationBlock.push(false);
      }
      // if counties specified this publication blocks
      if (publication.countries.length > 0) {
        if (!publication.countries.includes(location.countryCode)) {
          publicationBlock.push(true);
        }
      }
    });
    // if any publication allows your region, don't block.
    const isBlocked = publicationBlock.length === 0 || publicationBlock.includes(false) ? false : true;
    return isBlocked;
  };

  public getEntitlementCase = ({
    availabilityKeys,
    userEntitlements,
    paymentIsEnabled,
    availableProductOfferings,
    login
  }: {
    userEntitlements: Product[];
    login: LoginResponse;
    availableProductOfferings: ProductOffering[];
    availabilityKeys: string[];
    paymentIsEnabled: boolean;
  }) => {
    if (!login.hasSession() || login.isAnonymous) {
      if (this.anonymousIsAllowed(userEntitlements)) {
        if (this.inFuture()) {
          return EntitlementCase.IN_FUTURE;
        }
        return EntitlementCase.IS_ENTITLED_ANON;
      } else {
        return EntitlementCase.NOT_LOGGED_IN;
      }
    } else if (this.inFuture() && this.getStartTime()) {
      if (
        !this.getHasProperProduct(availabilityKeys) &&
        this.getBuyableProductOfferings(availableProductOfferings).length > 0 &&
        paymentIsEnabled
      ) {
        return EntitlementCase.IN_FUTURE_NEED_PURCHASE;
      }
      return EntitlementCase.IN_FUTURE;
    } else if (
      !this.getHasProperProduct(availabilityKeys) &&
      this.getBuyableProductOfferings(availableProductOfferings).length > 0 &&
      paymentIsEnabled
    ) {
      return EntitlementCase.NEED_PURCHASE;
    } else if (this.getIsEntitled(availabilityKeys)) {
      return EntitlementCase.IS_ENTITLED;
    } else {
      return EntitlementCase.NOT_ENTITLED;
    }
  };
}
