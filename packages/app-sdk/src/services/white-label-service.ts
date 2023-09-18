import {
  getWLConfigWithDomain,
  getLocationFromReferer,
  getSystemConfigV2,
  getWLConfig,
  request,
  //  AssetList,
  //  Asset,
  //  PaymentProvider,
  //  entitle,
  ServiceContext,
  getWLComponent
} from "@ericssonbroadcastservices/rbm-ott-sdk";
//import { IWLEPG } from "../interfaces/wl-epg";
import { DeviceGroup } from "../interfaces/device-group";
/*import { IWLAssetTag } from "../interfaces/wl-tag";
import { WLPageModel } from "../models/wl-page";
import { WLAsset } from "../models/wl-asset";
import { EntitlementStatus, IEntitlementStatusResult } from "../interfaces/entitlement-result";*/
import { IExposureWLConfig } from "../wl-config-interfaces/exposure-wl-config";
import { IExposureWLReference } from "../wl-config-interfaces/exposure-wl-reference";
import { IExposureComponent } from "../wl-config-interfaces/exposure-wl-component";
import { IExposureWLFooter, IExposureWLMenu } from "../wl-config-interfaces/exposure-wl-menu";

// Note:
// 1. No longer running deserialize from exposure on the results (want pure data from the backend)
// 2. Replaced most WLAsset with Asset but kept the rest of the types (all of them are probably incorrect now)
// 3. Removed getComponentByInternalUrl (it was  kind of pointless unless it runs deserialize on the result given the type)
// 4. getEntitlementForAsset would previously catch errors and return errorToEntitlementResult(err, offerings: IProductOffering[]) (from "../utils/entitlement") expecting an IEntitlementError ({ httpCode: number, message: string, actions?: IEntitlementActions[] }), but now it just throws a regular JS error
// 5. make sure the new authToken is fully implemented in the methods
type WhiteLabelServiceGetMethodParams = Omit<Parameters<typeof request>[0], "method">;

interface WhiteLabelServiceContext extends ServiceContext {
  deviceGroup: DeviceGroup;
  locale: string;
  getAuthToken: () => Promise<string | undefined>;
}
export class WhiteLabelService {
  constructor(private context: WhiteLabelServiceContext) {}

  /*private get cubu() {
    return `customer/${this.context.customer}/businessunit/${this.context.businessUnit}`;
  }*/

  /* @todo: migrade all uses of this wrapper to from WL_INTERNAL to RBMOTT-SDK */
  public async get<T>({ url, query, headers }: WhiteLabelServiceGetMethodParams): Promise<T> {
    return request({ method: "GET", url, query, headers }).then(response => response.json());
  }

  public async getComponentByReference<T extends IExposureComponent>({
    wlReference,
    countryCode
  }: {
    wlReference: IExposureWLReference;
    countryCode: string;
  }): Promise<T> {
    const authToken = await this.context.getAuthToken();
    if (wlReference.hasAuthorizedContent && !authToken) {
      throw new Error("Content requires authorization but there is no auth token");
    }
    const headers = new Headers();
    if (wlReference.hasAuthorizedContent) {
      headers.set("Authorization", `Bearer: ${authToken}`);
    }

    return (
      await getWLComponent.call(this.context, {
        configId: "sandwich",
        allowedCountry: countryCode,
        componentId: wlReference.referenceId,
        headers
      })
    ).json();
  }

  public async getAllTheThings() {
    const location = await getLocationFromReferer.call(this.context);
    const { countryCode } = location;
    if (!countryCode) {
      throw Error("Couldn't get all the things");
    }
    const systemConfigRequest = getSystemConfigV2.call(this.context, { countryCode });
    const config = await this.getConfigByCustomerAndBusinessUnit({ countryCode });
    const menuReference = config.components.menu?.[0];
    const footerReference = config.components.footer?.[0];
    let footerRequest;
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
      location,
      config
    };
  }

  public getConfigByOrigin({ origin }: { origin: string }) {
    if (!origin) {
      return Promise.reject(new Error("[WhiteLabelService] No origin set"));
    }
    return getWLConfigWithDomain.call(this.context, {
      configId: "sandwich",
      host: origin
    });
  }

  public async getConfigByCustomerAndBusinessUnit({ countryCode }: { countryCode: string }) {
    return (
      await getWLConfig.call(this.context, { configId: "sandwich", allowedCountry: countryCode })
    ).json() as Promise<IExposureWLConfig>;
  }

  /*

  public getTagList(): Promise<IWLAssetTag[]> {
    const { deviceGroup, locale } = this.context;
    const query = { deviceGroup, locale };
    return this.get<IWLAssetTag[]>({ url: `/api/internal/${this.cubu}/tags`, query });
  }

  public getTranslations() {
    return this.get({ url: `/api/internal/translations/${this.context.locale}` });
  }

  public getPage(pageId: string, countryCode?: string) {
    const query = {
      deviceGroup: this.context.deviceGroup,
      locale: this.context.locale,
      countryCode
    };
    return this.get<WLPageModel>({ url: `/api/internal/${this.cubu}/page/${pageId}`, query });
  }

  public getAssetPageById(assetId: string, countryCode?: string) {
    const { deviceGroup, locale } = this.context;
    const query = { deviceGroup, locale, countryCode };
    return this.get<WLPageModel>({ url: `/api/internal/${this.cubu}/detailPage/${assetId}`, query });
  }

  public getAssetById(assetId: string) {
    const { deviceGroup, locale } = this.context;
    const query = { deviceGroup, locale, fieldSet: "ALL", includeSeasons: true, includeEpisodes: true };
    return this.get<WLAsset>({ url: `/api/internal/exposure/v1/${this.cubu}/content/asset/${assetId}`, query });
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
    type?: string;
    assetIds?: string[];
    sortOrder?: string;
    products?: string[];
    countryCode?: string;
    query?: string;
  }): Promise<Asset[]> {
    const { deviceGroup, locale } = this.context;
    const queryParams = {
      locale,
      deviceGroup,
      includeEpisodes: true,
      includeSeasons: true,
      fieldSet: "ALL",
      assetIds,
      sort,
      products,
      assetType: type,
      countryCode,
      query
    };
    const { items } = await this.get<AssetList>({
      url: `/api/internal/exposure/v1/${this.cubu}/content/asset`,
      query: queryParams
    });
    return items;
  }

  public async search(url: string, searchTerm: string): Promise<Asset[]> {
    const { items } = await this.get<AssetList>({ url: url.replace("{query}", searchTerm) });
    return items;
  }

  public getChannelPicker(count?: number): Promise<IWLEPG> {
    const { deviceGroup, locale } = this.context;
    const query = {
      locale,
      deviceGroup,
      count
    };
    return this.get<IWLEPG>({ url: `/api/internal/${this.cubu}/channelpicker`, query });
  }

  public getPushNextContent(assetId: string): Promise<{ upNext: Asset; recommendations: Asset[] }> {
    const { deviceGroup, locale } = this.context;
    const query = { locale, deviceGroup };
    return this.get({ url: `/api/internal/${this.cubu}/push-next-content/${assetId}`, query });
  }

  public getEpgs({
    date,
    daysBackward,
    daysForward
  }: {
    date: string;
    daysForward?: number;
    daysBackward?: number;
  }): Promise<IWLEPG> {
    const { deviceGroup, locale } = this.context;
    const query = {
      locale,
      deviceGroup,
      daysForward,
      daysBackward
    };
    return this.get<IWLEPG>({ url: `/api/internal/${this.cubu}/epgs/${date}`, query });
  }
  public async getPageByBase64Query(searchQuery: string, countryCode?: string) {
    const { deviceGroup, locale } = this.context;
    const query = {
      deviceGroup,
      locale,
      countryCode
    };
    return this.get<WLPageModel>({ url: `/api/internal/${this.cubu}/browse/${searchQuery}`, query });
  }

  public async getAssetList(listId: string) {
    const { deviceGroup, locale } = this.context;
    const query = { deviceGroup, locale };
    const { items } = await this.get<AssetList>({
      url: `/api/internal/exposure/v1/${this.cubu}/preferences/list/${listId}/asset`,
      query,
      headers: this.context.authHeader()
    });
    return items;
  }

  public async getEntitlementForAsset({
    asset,
    paymentProvider
  }: {
    asset: WLAsset;
    paymentProvider?: PaymentProvider;
  }): Promise<IEntitlementStatusResult> {
    await entitle.call(this.context, {
      assetId: asset.assetId,
      paymentProvider,
      headers: this.context.authHeader()
    });
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
  }

  public getContinueWatchingForTvShow(tvShowId: string) {
    const url = `/api/internal/exposure/v1/${this.cubu}/userplayhistory/continue/tvshow/${tvShowId}?locale=${this.context.locale}`;
    return this.get<Asset>({ url, headers: this.context.authHeader() });
  }
  */
}
