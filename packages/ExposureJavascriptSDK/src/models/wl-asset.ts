import * as moment from "moment";
import { ImageScaler } from "../utils/image-scaler";
import { jsonProperty } from "../decorators/json-property";
import { IWLCarouselItem } from "../interfaces/wl-carousel-item";
import { AssetType, Publication, ExternalReferences, Participants } from "./asset-model";
import { ImageModel } from "./localized-model";
import { WLSeason } from "./wl-season";
import { Product } from "./product-model";
import { Translations } from "./wl-translations";
import { UserLocation } from "./user-location-model";
import { WLProductOffering } from "./wl-productoffering";

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
  }

  public getDurationString = () => {
    const assetDuration = this.duration;
    if (!assetDuration) return;
    const duration = moment.duration(assetDuration);
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `\
${hours > 0 ? hours + "h " : ""}\
${minutes > 0 ? minutes + "min " : ""}\
${minutes < 1 && seconds > 0 ? seconds + "sec" : ""}\
`;
  };

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

  public getIsEntitled = (userEntitlements: Product[]) => {
    return this.getHasProperProduct(userEntitlements) && !this.getIsBlackedOut(userEntitlements) && !this.inFuture();
  };

  public getActionLink = (userEntitlements: Product[]): string => {
    switch (this.action?.type) {
      case "NavigateToDetails":
        return this.getBrowseLink();
      case "PlayAsset":
        return this.getPlayLink(userEntitlements);
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

  public getPlayLink = (userEntitlements: Product[]) => {
    switch (this.type) {
      case AssetType.TV_SHOW:
        return `/asset/${this.assetId}`;
      case AssetType.EPISODE:
        return this.getIsEntitled(userEntitlements)
          ? `/play/${this.assetId}?playlist=season`
          : `/asset/${this.assetId}`;
      default:
        /* if (this.materialType === "LOW_LATENCY_CHANNEL") {
          return this.getIsEntitled(userEntitlements)
            ? `/play/ll/${this.assetId}`
            : `/asset/${this.assetId}`;
        } */
        if (this.tvShowId && this.season) {
          return this.getIsEntitled(userEntitlements)
            ? `/play/${this.assetId}?playlist=season`
            : `/asset/${this.assetId}`;
        }
        if (this.anonymousIsAllowed(userEntitlements)) {
          return `/play/anonymous/${this.assetId}`;
        }
        return this.getIsEntitled(userEntitlements) ? `/play/${this.assetId}` : `/asset/${this.assetId}`;
    }
  };
  public requiredProducts = (): string[] => {
    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    /* eslint-disable prefer-spread */
    return [].concat.apply(
      [],
      // @ts-ignore
      this.publications.map(pub => pub.products)
    );
  };
  public getHasProperProduct = (userEntitlements: Product[]) => {
    const isEntitled = userEntitlements.filter(ut => this.requiredProducts().includes(ut.id));
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
    return availableProductOfferings.filter(po => po.productIds.filter(pId => buyable.includes(pId)).length > 0);
  };
  public getIsBlackedOut = (userEntitlements: Product[]) => {
    const blockedProducts = userEntitlements.filter(ut => ut.blocked);
    return this.requiredProducts().filter(p => blockedProducts.map(bp => bp.id).includes(p)).length > 0;
  };

  public getAnonymousProducts = (userEntitlements: Product[]) => {
    return userEntitlements.filter(ut => ut.anonymousAllowed).map(ut => ut.id);
  };

  public anonymousIsAllowed = (userEntitlements: Product[]) => {
    return this.getAnonymousProducts(userEntitlements).filter(p => this.requiredProducts().includes(p)).length > 0;
  };

  public getLocalAssetStartTimeString = () => {
    if (this.getStartTime()) {
      return moment(this.startTime).format("HH:mm");
    }
    return null;
  };
  public getLocalStartDayString = (translations: Translations) => {
    if (this.startTime) {
      return moment(this.startTime).calendar("", {
        sameDay: `[${translations.getText(["DATES", "TODAY"])}]`,
        nextDay: `[${translations.getText(["DATES", "TOMORROW"])}]`,
        lastDay: `[${translations.getText(["DATES", "YESTERDAY"])}]`,
        nextWeek: "DD/MM/YYYY",
        lastWeek: "DD/MM/YYYY",
        sameElse: "DD/MM/YYYY"
      });
    }
    return null;
  };

  public getStartTime = () => {
    if (this.publications.length === 0 && !this.startTime) {
      return undefined;
    }
    return this.startTime ? new Date(this.startTime) : this.publications[0].fromDate;
  };

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
}

