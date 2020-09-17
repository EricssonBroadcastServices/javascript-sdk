import { ImageScaler } from "../utils/image-scaler";
import { IWLCarouselItem } from "../interfaces/wl-carousel-item";
import { WLSeason } from "./wl-season";
import { Translations } from "./wl-translations";
import { WLProductOffering } from "./wl-productoffering";
import { getTimeString, getDurationLocalized } from "../utils/time";
import { getDayLocalized } from "../utils/date";
import {
  jsonProperty,
  AssetType,
  Publication,
  ImageModel,
  ExternalReferences,
  Participants,
  Product,
  UserLocation,
  LoginResponse
} from "@EricssonBroadcastServices/exposure-sdk";
import { EntitlementCase } from "../interfaces/entitlement-cases";
import { ImageType } from "../interfaces/image-fields";

export class WLTag {
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public tagType: string;
  @jsonProperty()
  public id: string;
}

export class WLAsset implements IWLCarouselItem {
  @jsonProperty({ externalName: "assetId" })
  public id: string;
  @jsonProperty()
  public type: AssetType;
  @jsonProperty()
  public assetId: string;
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public description: string;
  @jsonProperty({ type: ImageModel })
  public images: ImageModel[];
  @jsonProperty({ type: Publication })
  public publications: Publication[] = [];
  @jsonProperty({ type: ExternalReferences })
  public externalReferences: ExternalReferences[] = [];
  @jsonProperty()
  public tvShowId: string;
  @jsonProperty()
  public season: number;
  @jsonProperty({ type: Participants })
  public participants: Participants[] = [];
  @jsonProperty()
  public startTime: Date;
  @jsonProperty()
  public endTime: Date;
  @jsonProperty()
  public duration: number;
  @jsonProperty()
  public year: number;
  @jsonProperty({ type: WLTag })
  public tags: WLTag[];
  @jsonProperty()
  public action: any;
  @jsonProperty({ type: WLSeason })
  public seasons: WLSeason[] = [];
  @jsonProperty()
  public bookmark?: {
    percentage: number;
    time: number;
  };

  public getDurationString = () => {
    const assetDuration = this.duration;
    if (!assetDuration) return;

    return getDurationLocalized(assetDuration);
  };

  public getScaledLogo(width: number) {
    const imageUrl = this.images.find(image => image.type === ImageType.LOGO)?.url;
    return ImageScaler.fitToWidth(imageUrl, width);
  }

  public getScaledImage(orientation: string, width: number) {
    const imageUrl = this.images.find(image => image.orientation.toUpperCase() === orientation.toUpperCase())?.url;
    return ImageScaler.fitToWidth(imageUrl, width);
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
    return this.publications[0].fromDate.getTime() > Date.now();
  };

  public getIsEntitled = (availabilityKeys: string[]) => {
    return this.getHasProperProduct(availabilityKeys) && !this.inFuture();
  };

  public getActionLink = (userEntitlements: Product[], availabilityKeys: string[]): string => {
    switch (this.action?.type) {
      case "NavigateToDetails":
        return this.getBrowseLink();
      case "PlayAsset":
        return this.getPlayLink(userEntitlements, availabilityKeys);
    }
    return "";
  };

  public getBrowseLink = () => {
    switch (this.type) {
      case AssetType.TV_SHOW:
        return `/asset/${this.assetId}`;
      default:
        return `/asset/${this.assetId}`;
    }
  };

  public getPlayLink = (userEntitlements: Product[], availabilityKeys: string[]) => {
    switch (this.type) {
      case AssetType.TV_SHOW:
        return `/asset/${this.assetId}`;
      case AssetType.EPISODE:
        return this.getIsEntitled(availabilityKeys)
          ? `/play/${this.assetId}?playlist=season`
          : `/asset/${this.assetId}`;
      default:
        if (this.tvShowId && this.season) {
          return this.getIsEntitled(availabilityKeys)
            ? `/play/${this.assetId}?playlist=season`
            : `/asset/${this.assetId}`;
        }
        if (this.anonymousIsAllowed(userEntitlements)) {
          return `/play/anonymous/${this.assetId}`;
        }
        return this.getIsEntitled(availabilityKeys) ? `/play/${this.assetId}` : `/asset/${this.assetId}`;
    }
  };

  public getTrailerAssetId = (): string | null => {
    const trailer = Array.isArray(this.externalReferences) ? this.externalReferences.find(ref => ref.type === "trailer") : null; 
    return trailer?.locator ?? null;
  }

  public requiredProducts = (): string[] => {
    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    /* eslint-disable prefer-spread */
    return [].concat.apply(
      [],
      // @ts-ignore
      this.publications.map(pub => pub.products)
    );
  };

  public getAvailabilityKeys = (): string[] => {
    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    /* eslint-disable prefer-spread */
    return [].concat.apply(
      [],
      // @ts-ignore
      this.publications.map(pub => pub.availabilityKeys)
    );
  };

  public getHasProperProduct = (userAvailabilityKeys: string[]) => {
    const isEntitled = userAvailabilityKeys.filter(key => this.getAvailabilityKeys().includes(key));
    return isEntitled.length > 0;
  };
  public getBuyableProductOfferings = (availableProductOfferings: WLProductOffering[]) => {
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
    return this.startTime ? new Date(this.startTime) : this.publications[0].fromDate;
  };

  public getTimeSlot() {
    if (this.startTime && this.endTime) {
      return `${getTimeString(this.startTime)} - ${getTimeString(this.endTime)}`;
    }
    return null;
  }

  public isGeoBlocked = (location?: UserLocation) => {
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

  public getEntitlementCase= ({
    availabilityKeys,
    userEntitlements,
    paymentIsEnabled,
    availableProductOfferings,
    login
  }: {
      userEntitlements: Product[];
      login: LoginResponse;
      availableProductOfferings: WLProductOffering[];
      availabilityKeys: string[];
      paymentIsEnabled: boolean;
    }) => {
    if (this.inFuture() && this.getStartTime()) {
      if(!this.getHasProperProduct(availabilityKeys) &&
      this.getBuyableProductOfferings(availableProductOfferings).length > 0 &&
        paymentIsEnabled) {
        return EntitlementCase.IN_FUTURE_NEED_PURCHASE;
      }
      return EntitlementCase.IN_FUTURE;
    } else if (!login.hasSession() ||login.isAnonymous) {
      if (this.anonymousIsAllowed(userEntitlements)) {
        return EntitlementCase.IS_ENTITLED_ANON;
      } else {
        return EntitlementCase.NOT_LOGGED_IN;
      }
    } else if (
      !this.getHasProperProduct(availabilityKeys) &&
      this.getBuyableProductOfferings(availableProductOfferings).length > 0 &&
      paymentIsEnabled) {
      return EntitlementCase.NEED_PURCHASE;
    } else if (this.getIsEntitled(availabilityKeys)) {
      return EntitlementCase.IS_ENTITLED;
    }
    else {
      return EntitlementCase.NOT_ENTITLED;
    }
  }
}
