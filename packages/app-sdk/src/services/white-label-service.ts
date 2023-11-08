import { getAsset, getAssets, Asset, ServiceContext, AssetType } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { DeviceGroup } from "../interfaces/device-group";
import {
  IExposureComponent,
  IExposureWLCarousel,
  IExposureWLCategoriesComponent,
  IExpoureWLEpgComponent,
  WLComponentType
} from "../interfaces/exposure-wl-component";
import { PushNextContent } from "../interfaces/push-next-content";

import { EntitlementStatusResult } from "../interfaces/entitlement-result";
import {
  CarouselItem,
  ComponentContentMap,
  EpgComponentContent,
  ResolvedComponent
} from "../interfaces/component-content";
import {
  GetGeneratedCarouselByTagIdOptions,
  getGeneratedCarouselByTagId
} from "./methods/get-generated-carousel-by-tag-id";
import { GetPushNextContentDataOptions, getPushNextContentData } from "./methods/get-push-next-content-data";
import { getEpgContent } from "./methods/get-epg-content";
import { getCarouselAssets } from "./methods/get-carousel-assets";
import { GetEntitlementForAssetOptions, getEntitlementForAsset } from "./methods/get-entitlement-for-asset";
import { EssentialAppData, getEssentialAppData } from "./methods/get-essential-app-data";
import { get } from "../utils/http";
import {
  GetConfigByCustomerAndBusinessUnitOptions,
  getConfigByCustomerAndBusinessUnit
} from "./methods/get-config-by-customer-and-businessUnit";
import { getTagList } from "./methods/get-tag-list";
import {
  GetResolvedComponentByReferenceOptions,
  getResolvedComponentByReference
} from "./methods/get-resolved-component-by-reference";
import { GetComponentContentOptions, getComponentContent } from "./methods/get-component-content";
import { getCategoriesContent } from "./methods/get-categories-content";
import { GetComponentByReferenceOptions, getComponentByReference } from "./methods/get-component-by-reference";
import { GetComponentByIdOptions, getComponentById } from "./methods/get-component-by-id";
import { GetConfigByOriginOptions, getConfigByOrigin } from "./methods/get-config-by-origin";
import {
  GetGeneratedCollectionEntriesCarouselOptions,
  getGeneratedCollectionEntriesCarousel
} from "./methods/get-generated-collection-entries-carousel";
import {
  GetGeneratedTrailersForAssetCarouselOptions,
  getGeneratedTrailersForAssetCarousel
} from "./methods/get-generated-trailers-carousel";
import {
  GetGeneratedEpgCarouselFromAssetIdOptions,
  getGeneratedEpgCarouselFromAssetId
} from "./methods/get-generated-epg-carousel";
import { Translations } from "../utils/wl-translations";
import { getAssetPage } from "./methods/get-asset-page";

export interface WhiteLabelServiceContext extends ServiceContext {
  deviceGroup: DeviceGroup;
  getAuthToken: () => Promise<string | undefined>;
}
export class WhiteLabelService {
  constructor(public context: WhiteLabelServiceContext) {}

  public async getResolvedComponentByReference<T extends keyof ComponentContentMap | WLComponentType>(
    args: GetResolvedComponentByReferenceOptions
  ): Promise<ResolvedComponent<T>> {
    return getResolvedComponentByReference(this.context, args);
  }

  public async getComponentContent<T extends keyof ComponentContentMap>(
    args: GetComponentContentOptions
  ): Promise<ComponentContentMap[T]> {
    return getComponentContent(this.context, args);
  }

  public async getComponentById<T extends IExposureComponent>(args: GetComponentByIdOptions): Promise<T> {
    return getComponentById(this.context, args);
  }

  public async getComponentByReference<T extends IExposureComponent>(args: GetComponentByReferenceOptions): Promise<T> {
    return getComponentByReference(this.context, args);
  }

  public async getEssentialAppData(): Promise<EssentialAppData> {
    return getEssentialAppData(this.context);
  }

  public getConfigByOrigin(args: GetConfigByOriginOptions) {
    return getConfigByOrigin(this.context, args);
  }

  public async getConfigByCustomerAndBusinessUnit(args: GetConfigByCustomerAndBusinessUnitOptions) {
    return getConfigByCustomerAndBusinessUnit(this.context, args);
  }

  public getAssetById(assetId: string): Promise<Asset> {
    return getAsset.call(this, { assetId, includeEpisodes: true, includeSeasons: true });
  }

  public async getAssets({
    assetIds,
    sortOrder: sort = "-created",
    products,
    type,
    countryCode,
    query
  }: {
    type?: AssetType;
    assetIds?: string[];
    sortOrder?: string;
    products?: string[];
    countryCode?: string;
    query?: string;
  }): Promise<Asset[]> {
    return (
      await getAssets.call(this, { assetIds, allowedCountry: countryCode, assetType: type, sort, products, query })
    ).items;
  }

  public async getEntitlementForAsset(args: GetEntitlementForAssetOptions): Promise<EntitlementStatusResult> {
    return getEntitlementForAsset(this, args);
  }

  public async getTagList(listId: string) {
    return getTagList(this.context, listId);
  }

  public async getCarouselAssets(carousel: IExposureWLCarousel): Promise<CarouselItem[]> {
    return getCarouselAssets(this.context, carousel);
  }

  public async getCategoriesContent(categoriesComponent: IExposureWLCategoriesComponent) {
    return getCategoriesContent(this.context, categoriesComponent);
  }

  public async getEpgContent(epgComponent: IExpoureWLEpgComponent): Promise<EpgComponentContent> {
    return getEpgContent(this.context, epgComponent);
  }

  public getTranslations(locale: string) {
    return get({ url: `${this.context.baseUrl}/api/internal/translations/${locale}` }).then(
      data => new Translations(data)
    );
  }

  public async getPushNextContentData(args: GetPushNextContentDataOptions): Promise<PushNextContent> {
    return getPushNextContentData(this.context, args);
  }

  public async getGeneratedCarouselByTagId(
    args: GetGeneratedCarouselByTagIdOptions
  ): Promise<ResolvedComponent<"carousel">> {
    return getGeneratedCarouselByTagId(this, args);
  }

  public async getGeneratedCollectionEntriesCarousel(args: GetGeneratedCollectionEntriesCarouselOptions) {
    return getGeneratedCollectionEntriesCarousel(this.context, args);
  }

  public async getGeneratedTrailersForAssetCarousel(args: GetGeneratedTrailersForAssetCarouselOptions) {
    return getGeneratedTrailersForAssetCarousel(this.context, args);
  }

  public async getGeneratedEpgCarouselFromAssetId(args: GetGeneratedEpgCarouselFromAssetIdOptions) {
    return getGeneratedEpgCarouselFromAssetId(this.context, args);
  }

  public async getAssetPage(assetId: string) {
    return getAssetPage(this.context, { assetId });
  }
}
