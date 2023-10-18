import {
  getAsset,
  getAssets,
  Asset,
  PaymentProvider,
  ServiceContext,
  AssetType,
  SystemConfig,
  StoreProductOffering
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { DeviceGroup } from "../interfaces/device-group";
import { IExposureWLConfig } from "../interfaces/exposure-wl-config";
import { IExposureWLReference } from "../interfaces/exposure-wl-reference";
import {
  IExposureComponent,
  IExposureWLCarousel,
  IExposureWLCategoriesComponent,
  IExpoureWLEpgComponent,
  WLComponentType
} from "../interfaces/exposure-wl-component";
import { IExposureWLFooter, IExposureWLMenu } from "../interfaces/exposure-wl-menu";
import { PushNextContent } from "../interfaces/push-next-content";
import { EntitlementStatusResult } from "../interfaces/entitlement-result";
import {
  CarouselItem,
  ComponentContentMap,
  EpgComponentContent,
  ResolvedComponent
} from "../interfaces/component-content";
import { getGeneratedCarouselByTagId } from "./methods/get-generated-carousel-by-tag-id";
import { getPushNextContentData } from "./methods/get-push-next-content-data";
import { getEpgContent } from "./methods/get-epg-content";
import { getCarouselAssets } from "./methods/get-carousel-assets";
import { getEntitlementForAsset } from "./methods/get-entitlement-for-asset";
import { getEssentialAppData } from "./methods/get-essential-app-data";
import { get } from "../utils/http";
import { getConfigByCustomerAndBusinessUnit } from "./methods/get-config-by-customer-and-businessUnit";
import { getTagList } from "./methods/get-tag-list";
import { getResolvedComponentByReference } from "./methods/get-resolved-component-by-reference";
import { getComponentContent } from "./methods/get-component-content";
import { getCategoriesContent } from "./methods/get-categories-content";
import { getComponentByReference } from "./methods/get-component-by-reference";
import { getComponentById } from "./methods/get-component-by-id";
import { getConfigByOrigin } from "./methods/get-config-by-origin";

export interface WhiteLabelServiceContext extends ServiceContext {
  deviceGroup: DeviceGroup;
  getAuthToken: () => Promise<string | undefined>;
}
export class WhiteLabelService {
  constructor(public context: WhiteLabelServiceContext) {}

  public async getResolvedComponentByReference<T extends keyof ComponentContentMap | WLComponentType>(args: {
    wlReference: IExposureWLReference;
    countryCode: string;
  }): Promise<ResolvedComponent<T>> {
    return getResolvedComponentByReference(this.context, args);
  }

  public async getComponentContent<T extends keyof ComponentContentMap>(args: {
    component: IExposureComponent;
  }): Promise<ComponentContentMap[T]> {
    return getComponentContent(this.context, args);
  }

  public async getComponentById<T extends IExposureComponent>(args: {
    componentId: string;
    hasAuthorizedContent?: boolean;
    countryCode: string;
  }): Promise<T> {
    return getComponentById(this.context, args);
  }

  public async getComponentByReference<T extends IExposureComponent>(args: {
    wlReference: IExposureWLReference;
    countryCode: string;
  }): Promise<T> {
    return getComponentByReference(this.context, args);
  }

  public async getEssentialAppData(): Promise<{
    systemConfig: SystemConfig;
    menu: IExposureWLMenu;
    footer: IExposureWLFooter | undefined;
    countryCode: string;
    config: IExposureWLConfig;
  }> {
    return getEssentialAppData(this.context);
  }

  public getConfigByOrigin(args: { origin: string }) {
    return getConfigByOrigin(this.context, args);
  }

  public async getConfigByCustomerAndBusinessUnit(args: { countryCode: string }) {
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

  public async getEntitlementForAsset(args: {
    asset: Asset;
    availableProductOfferings: StoreProductOffering[];
    paymentProvider?: PaymentProvider;
  }): Promise<EntitlementStatusResult> {
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
    return get({ url: `/api/internal/translations/${locale}` });
  }

  public async getPushNextContentData(args: {
    /** The id of the asset */
    assetId: string;
    /** whether or not upNext should be populated by the next upcoming program, if available */
    pushNextProgram?: boolean;
  }): Promise<PushNextContent> {
    return getPushNextContentData(this.context, args);
  }

  public async getGeneratedCarouselByTagId(args: {
    tagId: string;
    excludedAssetId?: string;
    onlyIncludePlayableAssets?: boolean;
    locale: string;
  }): Promise<ResolvedComponent<"carousel">> {
    return getGeneratedCarouselByTagId(this, args);
  }
}
