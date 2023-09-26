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
  ChannelEPGResponse,
  AssetListItemResponse,
  EventList,
  getList
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { DeviceGroup } from "../interfaces/device-group";
import { IExposureWLConfig } from "../interfaces/exposure-wl-config";
import { IExposureWLReference } from "../interfaces/exposure-wl-reference";
import {
  IExposureComponent,
  IExposureWLCarousel,
  WLCarouselAssetQueryTypes
} from "../interfaces/exposure-wl-component";
import { IExposureWLFooter, IExposureWLMenu } from "../interfaces/exposure-wl-menu";

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

  public getAssetById(assetId: string) {
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

  public async getEntitlementForAsset({ asset, paymentProvider }: { asset: Asset; paymentProvider?: PaymentProvider }) {
    return await entitle.call(this.context, {
      assetId: asset.assetId,
      paymentProvider,
      headers: { Authorization: `Bearer ${this.context.getAuthToken()}` }
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

  public getTranslations(locale: string) {
    return this.get({ url: `/api/internal/translations/${locale}` });
  }
}
