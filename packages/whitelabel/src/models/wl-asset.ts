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
  IPublication,
  ImageType,
  ExternalReferences,
  Product,
  IUserLocation,
  LoginResponse,
  ProductOffering,
  IImage,
  publicationUtils
} from "@ericssonbroadcastservices/exposure-sdk";
import { EntitlementCase } from "../interfaces/entitlement-cases";
import { WLAction } from "./wl-config";
import { IWLAssetTag } from "../interfaces/wl-tag";

export class WLParticipant implements IWLParticipant {
  @jsonProperty()
  public name: string;
  @jsonProperty()
  public function?: string;
  @jsonProperty()
  public action?: WLAction;
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
  @jsonProperty({ type: Object })
  public publications: IPublication[] = [];
  @jsonProperty({ type: Object })
  public externalReferences: ExternalReferences[] = [];
  @jsonProperty()
  public tvShowId: string;
  @jsonProperty()
  public channelId: string;
  @jsonProperty()
  public season: number;
  @jsonProperty()
  public episode?: number;
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
  public pushNextCuepoint?: number;
  @jsonProperty({ type: WLSeason })
  public seasons: WLSeason[] = [];
  @jsonProperty({ type: Object })
  public productionCountries: IProductionCountry[];
  @jsonProperty()
  public bookmark?: {
    percentage: number;
    time: number;
  };
  @jsonProperty({ type: Object })
  public parentalRatings: IWLParentalRating[];
  @jsonProperty({ type: Object })
  public overlayWidgets: IWLOverlayWidget[];
  @jsonProperty({ type: String })
  public slugs: string[];
  @jsonProperty({ type: Object })
  public markerPoints?: IWLMarkerPoint[];
  @jsonProperty()
  public seriesAssetAction?: WLAction;

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
    return publicationUtils.getActivePublications(this.publications);
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
    return publicationUtils.allInFuture(this.publications);
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
    /* eslint-disable @typescript-eslint/ban-ts-comment */
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
    return publicationUtils.getAvailabilityKeys(this.publications);
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

  public getStartTime = (): Date | null => {
    if (this.publications.length === 0 && !this.startTime) {
      return null;
    }
    const publicationsSortedAscending = this.publications.sort(publicationUtils.sortPublicationsAscending);
    // if we the asset will be published in the future, take the start time from next upcoming publication
    if (this.inFuture()) {
      const futurePublications = publicationsSortedAscending.filter(p => publicationUtils.inFuture(p));
      if (futurePublications.length) return new Date(futurePublications[0].fromDate);
    }
    // if we have active publications, the start time has already been
    const activePublications = publicationUtils.getActivePublications(publicationsSortedAscending);
    if (activePublications.length) {
      return this.startTime ? new Date(this.startTime) : new Date(activePublications[0].fromDate);
    }
    return this.startTime ? new Date(this.startTime) : new Date(publicationsSortedAscending[0].fromDate);
  };

  public getNextPublications = () => {
    return publicationUtils.getNextPublications(this.publications);
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
    return publicationUtils.isGeoBlocked(this.publications, location || null);
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
