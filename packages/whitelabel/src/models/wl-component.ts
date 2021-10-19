import * as marked from "marked";
import { jsonProperty, deserialize, IImage } from "@ericssonbroadcastservices/exposure-sdk";
import { WLAsset } from "./wl-asset";
import { ImageScaler } from "../utils/image-scaler";
import { WLSeason } from "./wl-season";
import { WLAction } from "./wl-config";
import { IWLCarousel, IWLTagTitles } from "../interfaces/wl-carousel";
import { IWLHeroBannerItem, WLHeroBannerItemType, IWLHeroBanner } from "../interfaces/wl-herobanner";
import { IWLImageComponent } from "../interfaces/wl-image-component";
import { WLComponentType } from "../interfaces/wl-component";
import { IWLTextComponent } from "../interfaces/wl-text-component";
import { IWLEpgComponent } from "../interfaces/wl-epg";
import { IWLIframe, IWLIframeComponent } from "../interfaces/wl-iframe";
import { getIndexOfLiveOrClosestUpcomingDateInterval } from "../utils/date";
import { IWLAssetTag, IWLCategoriesComponent } from "..";

marked.setOptions({
  mangle: false
});

export enum CarouselSubType {
  EPG = "epg",
  PROGRESS = "progress",
  FAVORITES = "favorites",
  TAG_FEED_QUERY = "TagFeedQuery"
}

export class WLComponent {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public type: string;
}

export class WLCarousel extends WLComponent implements IWLCarousel {
  @jsonProperty()
  public title: string;
  @jsonProperty({ type: String })
  public subType: CarouselSubType | null;
  @jsonProperty({ type: WLAsset })
  public assets: WLAsset[];
  @jsonProperty()
  public tagTitles?: IWLTagTitles;

  public static fromSeason = (season: WLSeason) => {
    const carousel = new WLCarousel();
    carousel.title = season.title;
    carousel.assets = season.episodes.map(e => {
      /* Hack due to bug in deserialize */
      return Array.isArray(e) ? deserialize(WLAsset, e[0]) : e;
    });
    return carousel;
  };

  public getInitialSlide() {
    switch (this.subType) {
      case CarouselSubType.EPG:
        return getIndexOfLiveOrClosestUpcomingDateInterval(this.assets);
      default:
        return 0;
    }
  }
}

export class WLCategoriesComponent implements IWLCategoriesComponent {
  @jsonProperty()
  id: string;
  @jsonProperty()
  type: WLComponentType;
  @jsonProperty()
  title?: string;
  @jsonProperty({ type: Object })
  tags: IWLAssetTag[];
}

export class WLHerobannerItem implements IWLHeroBannerItem {
  @jsonProperty({ type: Object })
  public images: IImage[];
  @jsonProperty()
  public type: WLHeroBannerItemType;
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public description: string;
  @jsonProperty()
  public trailerAssetId?: string;
  @jsonProperty({ type: WLAction })
  public action: WLAction;

  public getScaledImage(orientation: string, width: number, format?: string) {
    const imageUrl = this.images.find(image => image.orientation.toUpperCase() === orientation.toUpperCase())?.url;
    return ImageScaler.fitToWidth(imageUrl, width, format);
  }
}

export class WLHerobanner extends WLComponent implements IWLHeroBanner {
  @jsonProperty({ type: WLHerobannerItem })
  public items: WLHerobannerItem[];
}

export class WLImageComponent extends WLComponent implements IWLImageComponent {
  @jsonProperty()
  public type: WLComponentType;
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public title?: string;
  @jsonProperty()
  public description?: string;
  @jsonProperty({ type: Object })
  public images: IImage[];
  @jsonProperty()
  public action?: WLAction;
}

export class WLTextComponent extends WLComponent implements IWLTextComponent {
  @jsonProperty()
  public type: WLComponentType;
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public title?: string;
  @jsonProperty()
  public body: string;

  public getHtml(): string {
    return marked(this.body);
  }

  public getLexer() {
    return marked.lexer(this.body);
  }
}

export class WLEpgComponentChannel {
  @jsonProperty()
  public channel: WLAsset;
  @jsonProperty({ type: WLAsset })
  public programs: WLAsset[];

  public findOngoing(time = new Date()) {
    return this.programs.find(p => p.startTime < time && p.endTime > time);
  }

  public findCurrentAndUpcomingProgramsByHour(date: Date) {
    const ongoingAtHour = this.findOngoing(date);
    const startingNextHour = this.programs.find(p => p.startTime.getHours() >= date.getHours() + 1);
    if (!ongoingAtHour) return [];
    /* return all programs that in some way is ongoing during the selected hour
     * return the rest of the list if there is nothing starting in the next hour.
     * This will occur when date.getHours() + 1 equals 24, and will result in us
     * showing the remaining programs in todays epg
     * if programs ongoing or starting during the hour is less than 3. Use minimum 3.
     */
    const startIndex = this.programs.indexOf(ongoingAtHour);
    const stopIndex = startingNextHour
      ? this.programs.indexOf(startingNextHour) - startIndex < 3
        ? startIndex + 3
        : this.programs.indexOf(startingNextHour)
      : undefined;
    return this.programs.slice(startIndex, stopIndex);
  }
}

export class WLEpgComponent extends WLComponent implements IWLEpgComponent {
  @jsonProperty()
  public title?: string;
  @jsonProperty({ type: WLEpgComponentChannel })
  public channels: WLEpgComponentChannel[];
}

export class WLIframe extends WLComponent implements IWLIframeComponent {
  @jsonProperty()
  public type: WLComponentType;
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public iframe?: IWLIframe;
}
