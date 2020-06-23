import { WLAsset } from "./wl-asset";
import { ImageScaler } from "../utils/image-scaler";
import { WLSeason } from "./wl-season";
import { jsonProperty } from "../decorators/json-property";
import { deserialize } from "../decorators/property-mapper";
import { ImageModel } from "./localized-model";
import { WLAction } from "./wl-config";

export enum CarouselSubType {
  EPG = "epg",
  PROGRESS = "progress"
}

export class WLComponent {
  @jsonProperty()
  public id: string;
  @jsonProperty()
  public type: string;
}

export class WLCarousel extends WLComponent {
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public subType?: CarouselSubType;
  @jsonProperty({ type: WLAsset })
  public assets: WLAsset[];

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
        return this.assets.map((a, i) => ({ ...a, index: i })).find(a => a.isLive())?.index || 0;
      default:
        return 0;
    }
  }
}

export class WLHerobannerItem {
  @jsonProperty({ type: ImageModel })
  public images: ImageModel[];
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public description: string;
  @jsonProperty()
  public trailerAssetId?: string;
  @jsonProperty({ type: WLAction })
  public action: WLAction;

  public getScaledImage(orientation: string, width: number) {
    const imageUrl = this.images.find(image => image.orientation.toUpperCase() === orientation.toUpperCase())?.url;
    return ImageScaler.fitToWidth(imageUrl, width);
  }
}

export class WLHerobanner extends WLComponent {
  @jsonProperty({ type: WLHerobannerItem })
  public items: WLHerobannerItem[];
}
