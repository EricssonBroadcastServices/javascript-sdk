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

import { get } from "../utils/http";
import { Translations } from "../utils/wl-translations";
import { Feature, isFeatureEnabled } from "../utils/legacy-features";
import { EssentialAppData } from "../interfaces/essential-app-data";
import {
  GetComponentByIdOptions,
  GetComponentByReferenceOptions,
  GetComponentContentOptions,
  GetConfigByCustomerAndBusinessUnitOptions,
  GetConfigByOriginOptions,
  GetEntitlementForAssetOptions,
  GetResolvedComponentByReferenceOptions,
  getComponentById,
  getComponentByReference,
  getComponentContent,
  getConfigByCustomerAndBusinessUnit,
  getConfigByOrigin,
  getEntitlementForAsset,
  getEssentialAppData,
  getResolvedComponentByReference,
  getTagList,
  getAssetPage,
  getCarouselAssets,
  getCategoriesContent,
  getEpgContent,
  getGeneratedByMetadataCarousel,
  getGeneratedCarouselByTagId,
  getGeneratedCollectionEntriesCarousel,
  getGeneratedEpgCarouselFromAssetId,
  getGeneratedOthersHaveWatchedCarousel,
  getGeneratedSeasonCarousel,
  getGeneratedTrailersForAssetCarousel,
  getPushNextContentData,
  getTagPage,
  GetPushNextContentDataOptions,
  GetGeneratedCarouselByTagIdOptions,
  GetGeneratedCollectionEntriesCarouselOptions,
  GetGeneratedTrailersForAssetCarouselOptions,
  GetGeneratedEpgCarouselFromAssetIdOptions,
  GetGeneratedByMetadataCarouselOptions,
  GetGeneratedOthersHaveWatchedOptions,
  GetGeneratedSeasonCarouselOptions,
  getParticipantPage,
  getResolvedSeeAllPage
} from "./methods";

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

  public async getGeneratedByMetadataCarousel(args: GetGeneratedByMetadataCarouselOptions) {
    return getGeneratedByMetadataCarousel(args);
  }

  public async getGeneratedOthersHaveWatchedCarousel(args: GetGeneratedOthersHaveWatchedOptions) {
    return getGeneratedOthersHaveWatchedCarousel(args);
  }

  public async getParticipantPage(participantName: string) {
    return getParticipantPage(this, { participantName });
  }

  public async getSeeAllPage<T extends keyof ComponentContentMap | WLComponentType>(
    args: GetResolvedComponentByReferenceOptions
  ): Promise<ResolvedComponent<T>> {
    return getResolvedSeeAllPage(this.context, args);
  }

  public async getTagPage(tagId: string, locale: string) {
    return getTagPage(this, { tagId, locale });
  }

  public async getAssetPage(assetId: string, locale: string, translations: Translations) {
    const useAssetEpgCarousel = isFeatureEnabled(Feature.ASSET_PAGE_EPG, this.context.customer);
    const useOthersHaveWatchedCarousel = isFeatureEnabled(Feature.OTHERS_HAVE_WATCHED_CAROUSEL, this.context.customer);
    const useRelatedByMetadataCarousel = isFeatureEnabled(Feature.RELATED_CAROUSEL, this.context.customer);
    const useSeasonCarousel = isFeatureEnabled(Feature.SEASON_CAROUSEL, this.context.customer);
    const useTagIdCarousels = isFeatureEnabled(Feature.TAG_IDS_CAROUSELS, this.context.customer);
    const useTrailersAndExtrasCarousel = isFeatureEnabled(Feature.TRAILERS_CAROUSEL, this.context.customer);
    const useOnlyPlayableAssets = isFeatureEnabled(Feature.ONLY_PLAYABLE_IN_CAROUSELS, this.context.customer);
    return getAssetPage(this, {
      assetId,
      locale,
      translations,
      useAssetEpgCarousel,
      useOthersHaveWatchedCarousel,
      useRelatedByMetadataCarousel,
      useSeasonCarousel,
      useTagIdCarousels,
      useTrailersAndExtrasCarousel,
      useOnlyPlayableAssets
    });
  }

  public async getGeneratedSeasonCarousel(args: GetGeneratedSeasonCarouselOptions) {
    return getGeneratedSeasonCarousel(this, args);
  }
}
