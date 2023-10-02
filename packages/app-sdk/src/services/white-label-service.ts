import {
  entitle,
  getAsset,
  getAssets,
  getWLComponent,
  getWLConfigWithDomain,
  getLocationFromReferer,
  getSystemConfigV2,
  getWLConfig,
  request,
  Asset,
  AssetList,
  PaymentProvider,
  ServiceContext,
  AssetType,
  SystemConfig,
  getNextEpisode,
  getRecommendationsForAsset,
  getNextProgramForAsset,
  ChannelEPGResponse,
  AssetListItemResponse,
  EventList,
  getList,
  ProgramResponse,
  StoreProductOffering,
  TagList
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { DeviceGroup } from "../interfaces/device-group";
import { IExposureWLConfig } from "../interfaces/exposure-wl-config";
import { IExposureWLReference } from "../interfaces/exposure-wl-reference";
import {
  IExposureComponent,
  IExposureWLCarousel,
  IExposureWLCategoriesComponent,
  IExpoureWLEpgComponent,
  WLCarouselAssetQueryTypes
} from "../interfaces/exposure-wl-component";
import { IExposureWLFooter, IExposureWLMenu } from "../interfaces/exposure-wl-menu";
import { PushNextContent } from "../interfaces/push-next-content";
import { PublicationHelpers } from "../utils/publication";
import { EntitlementStatus, EntitlementStatusResult } from "../interfaces/entitlement-result";
import { errorToEntitlementResult } from "../utils/entitlement";

type WhiteLabelServiceGetMethodParams = Omit<Parameters<typeof request>[0], "method">;

interface WhiteLabelServiceContext extends ServiceContext {
  deviceGroup: DeviceGroup;
  getAuthToken: () => Promise<string | undefined>;
}
export class WhiteLabelService {
  constructor(private context: WhiteLabelServiceContext) {}

  public async get<T>({ url, query, headers }: WhiteLabelServiceGetMethodParams): Promise<T> {
    return request({ method: "GET", url, query, headers }).then(response => response.json());
  }

  public async getComponentById<T extends IExposureComponent>({
    componentId,
    hasAuthorizedContent = false,
    countryCode
  }: {
    componentId: string;
    hasAuthorizedContent?: boolean;
    countryCode: string;
  }): Promise<T> {
    const authToken = await this.context.getAuthToken();
    if (hasAuthorizedContent && !authToken) {
      throw new Error("Content requires authorization but there is no auth token");
    }
    const headers = new Headers();
    if (hasAuthorizedContent) {
      headers.set("Authorization", `Bearer: ${authToken}`);
    }

    return (
      await getWLComponent.call(this, {
        configId: "sandwich",
        allowedCountry: countryCode,
        componentId,
        headers
      })
    ).json();
  }

  public async getComponentByReference<T extends IExposureComponent>({
    wlReference,
    countryCode
  }: {
    wlReference: IExposureWLReference;
    countryCode: string;
  }): Promise<T> {
    return this.getComponentById({
      componentId: wlReference.referenceId,
      hasAuthorizedContent: wlReference.hasAuthorizedContent,
      countryCode
    });
  }

  public async getEssentialAppData(): Promise<{
    systemConfig: SystemConfig;
    menu: IExposureWLMenu;
    footer: IExposureWLFooter | undefined;
    countryCode: string;
    config: IExposureWLConfig;
  }> {
    const location = await getLocationFromReferer.call(this);
    const { countryCode } = location;
    if (!countryCode) {
      throw Error("Couldn't get all the things");
    }
    const systemConfigRequest = getSystemConfigV2.call(this, { countryCode });
    const config = await this.getConfigByCustomerAndBusinessUnit({ countryCode });
    const menuReference = config.components.menu?.[0];
    const footerReference = config.components.footer?.[0];
    let footerRequest: Promise<IExposureWLFooter> | undefined;
    if (!menuReference) {
      throw new Error("nOoooo!");
    }
    const menuRequest = this.getComponentByReference<IExposureWLMenu>({ wlReference: menuReference, countryCode });
    if (footerReference) {
      footerRequest = this.getComponentByReference<IExposureWLFooter>({ wlReference: footerReference, countryCode });
    }

    return {
      systemConfig: await systemConfigRequest,
      menu: await menuRequest,
      footer: await footerRequest,
      countryCode,
      config
    };
  }

  public getConfigByOrigin({ origin }: { origin: string }) {
    if (!origin) {
      return Promise.reject(new Error("[WhiteLabelService] No origin set"));
    }
    return getWLConfigWithDomain.call(this, {
      configId: "sandwich",
      host: origin
    });
  }

  public async getConfigByCustomerAndBusinessUnit({ countryCode }: { countryCode: string }) {
    return (
      await getWLConfig.call(this, { configId: "sandwich", allowedCountry: countryCode })
    ).json() as Promise<IExposureWLConfig>;
  }

  public getAssetById(assetId: string): Promise<Asset> {
    return getAsset.call(this, { assetId, includeEpisodes: true, includeSeasons: true });
  }

  public getAssetsByIds = this.getAssets;

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

  public async getEntitlementForAsset({
    asset,
    paymentProvider,
    availableProductOfferings
  }: {
    asset: Asset;
    availableProductOfferings: StoreProductOffering[];
    paymentProvider?: PaymentProvider;
  }): Promise<EntitlementStatusResult> {
    return await entitle
      .call(this.context, {
        assetId: asset.assetId,
        paymentProvider,
        headers: { Authorization: `Bearer ${await this.context.getAuthToken()}` }
      })
      .then(() => {
        return {
          status: EntitlementStatus.ENTITLED,
          isEntitled: true,
          accessLater: [],
          accessNow: [],
          isInFuture: false,
          startTime: null,
          isGeoBlocked: false,
          isStreamLimitReached: false,
          entitlementError: null,
          loginToWatchForFree: false,
          shouldJustWait: false
        };
      })
      .catch(async err => {
        return errorToEntitlementResult(await (err.response as Response).json(), asset, availableProductOfferings);
      });
  }

  public async getTagList(listId: string) {
    return getList.call(this.context, {
      list: listId,
      headers: { Authorization: `Bearer ${await this.context.getAuthToken()}` }
    });
  }

  public async getCarouselAssets(carousel: IExposureWLCarousel): Promise<Asset[]> {
    const sessionToken = await this.context.getAuthToken();
    if (carousel.appSubType === "TagFeedQuery") {
      if (!carousel.contentPreferencesUrl?.url) return [];

      const userTagList = await this.getTagList("tagfeed");

      const url = new URL(carousel.contentPreferencesUrl.url, this.context.baseUrl);

      // fieldSet=ALL is missing, at least on BSBU. TODO: check with meta.
      url.searchParams.set("fieldSet", "ALL");

      carousel.contentPreferencesUrl?.fields.forEach(urlVariable => {
        url.searchParams.set(urlVariable, userTagList[`${urlVariable}`]);
      });
      return (await this.get<AssetList>({ url: url.toString() })).items;
    }
    if (!carousel.contentUrl?.url) return [];
    const contentUrl = new URL(carousel.contentUrl.url, this.context.baseUrl);
    try {
      switch (carousel.contentUrl?.type) {
        case WLCarouselAssetQueryTypes.CONTINUE_WATCHING:
        case WLCarouselAssetQueryTypes.RECOMMENDED:
        case WLCarouselAssetQueryTypes.RECENTLY_WATCHED:
          if (!sessionToken) return [];
          return (
            await this.get<AssetList>({
              url: contentUrl,
              headers: {
                Authorization: `Bearer ${sessionToken}`
              }
            })
          ).items;
        case WLCarouselAssetQueryTypes.EPG:
          return (await this.get<ChannelEPGResponse>({ url: contentUrl })).programs?.map(p => p.asset) || [];
        case WLCarouselAssetQueryTypes.FAVORITES:
          if (!sessionToken) return [];
          return (
            await this.get<AssetListItemResponse[]>({
              url: contentUrl,
              headers: {
                Authorization: `Bearer ${sessionToken}`
              }
            })
          ).map(item => item.asset);
        case WLCarouselAssetQueryTypes.TVOD:
          if (!sessionToken) return [];
          return await this.get<Asset[]>({
            url: contentUrl,
            headers: {
              Authorization: `Bearer ${sessionToken}`
            }
          });
        case WLCarouselAssetQueryTypes.EVENT:
          return (await this.get<EventList>({ url: contentUrl })).items?.map(event => event.asset) || [];
        case WLCarouselAssetQueryTypes.ASSET:
          return (await this.get<AssetList>({ url: contentUrl })).items;
        default:
          console.warn("trying to resolve unsupported carousel");
          return [];
      }
    } catch (err) {
      console.error("failed when resolving assets", carousel, err);
      return [];
    }
  }

  public async getCategoriesContent(categoriesComponent: IExposureWLCategoriesComponent) {
    const contentUrl = new URL(categoriesComponent.contentUrl.url, this.context.baseUrl);
    return await this.get<TagList>({ url: contentUrl });
  }

  public async getEpgContent(epgComponent: IExpoureWLEpgComponent): Promise<
    {
      channel: Asset;
      programs: ProgramResponse[];
    }[]
  > {
    const contentUrl = new URL(epgComponent.contentUrl.url, this.context.baseUrl);
    const content = await this.get<ChannelEPGResponse[]>({ url: contentUrl });
    const channels: Promise<{
      channel: Asset;
      programs: ProgramResponse[];
    } | null>[] = content.map(async channelResponse => {
      try {
        const channel = await getAsset.call(this.context, { assetId: channelResponse.channelId });
        return {
          channel,
          programs: channelResponse.programs
        };
      } catch (err) {
        // potentially the getAsset call can fail if the channel is not published
        return null;
      }
    });
    return (await Promise.all(channels)).filter(c => c !== null) as {
      channel: Asset;
      programs: ProgramResponse[];
    }[];
  }

  public getTranslations(locale: string) {
    return this.get({ url: `/api/internal/translations/${locale}` });
  }

  public async getPushNextContentData({
    assetId,
    pushNextProgram = false
  }: {
    /** The id of the asset */
    assetId: string;
    /** whether or not upNext should be populated by the next upcoming program, if available */
    pushNextProgram?: boolean;
  }): Promise<PushNextContent> {
    let upNextAsset: Asset | undefined;
    let recommendations: Asset[] = [];
    try {
      upNextAsset = await getNextEpisode.call(this.context, { assetId });
      /*
        if the asset has no active publications, discard it.
        This can be true when episodes are part of a live channel and the episode has not yet aired.
       */
      if (upNextAsset && PublicationHelpers.getActivePublications(upNextAsset.publications).length === 0) {
        upNextAsset = undefined;
      }
    } catch (err) {}
    try {
      /**
       * This gets the following program according to EPG and puts it as the first RECOMMENDATION
       */
      const nextProgram = await getNextProgramForAsset.call(this.context, { assetId });
      if (nextProgram.asset) {
        recommendations.push(nextProgram.asset);
      }

      if (!upNextAsset && pushNextProgram && nextProgram.asset) {
        upNextAsset = nextProgram.asset || undefined;
      }
    } catch (err) {}
    try {
      recommendations = [
        ...recommendations,
        ...(await getRecommendationsForAsset.call(this.context, { assetId })).items
      ].slice(0, 3);
    } catch (err) {}
    return {
      upNext: upNextAsset,
      recommendations
    };
  }
}
