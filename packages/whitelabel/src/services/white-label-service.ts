import { BaseService, ServiceOptions, deserialize } from "@ericssonbroadcastservices/exposure-sdk";
import { WLConfig, WLPageModel, WLComponent, WLAsset, DeviceGroup, IWLAssetTag } from "../index";
import * as querystring from "query-string";
import { IWLEPG } from "../interfaces/wl-epg";

interface WhiteLabelServiceOptions extends ServiceOptions {
  deviceGroup: DeviceGroup;
  origin?: string;
}

export class WhiteLabelService extends BaseService {
  private deviceGroup: DeviceGroup;
  private origin?: string;

  constructor(apiOptions: WhiteLabelServiceOptions) {
    const { deviceGroup, origin, ...baseOptions } = apiOptions;
    super(baseOptions);

    this.origin = origin;
    this.deviceGroup = deviceGroup;
  }

  public getConfig({ locale, countryCode, origin }: { locale?: string; countryCode?: string; origin?: string }) {
    if (!this.origin && !origin) {
      return Promise.reject(new Error("[WhiteLabelService] No origin set"));
    }
    const queryString = querystring.stringify({
      locale,
      origin: origin || this.origin,
      deviceGroup: this.deviceGroup,
      countryCode
    });
    return this.get(`/api/internal/origin/config?${queryString}`).then(data => deserialize(WLConfig, data));
  }

  public getConfigByCustomerAndBusinessUnit({
    locale,
    customer,
    businessUnit,
    countryCode
  }: {
    locale: string;
    customer: string;
    businessUnit: string;
    countryCode?: string;
  }) {
    const queryString = querystring.stringify({
      locale,
      deviceGroup: this.deviceGroup,
      countryCode
    });
    return this.get(
      `/api/internal/customer/${customer}/businessunit/${businessUnit}/config?${queryString}`
    ).then(data => deserialize(WLConfig, data));
  }

  public getTagList({
    customer,
    businessUnit,
    deviceGroup,
    locale
  }: {
    customer: string;
    businessUnit: string;
    deviceGroup: string;
    locale?: string;
  }): Promise<IWLAssetTag[]> {
    const queryString = new URLSearchParams();
    deviceGroup && queryString.append("deviceGroup", deviceGroup);
    locale && queryString.append("locale", locale);
    return this.get(`/api/internal/customer/${customer}/businessunit/${businessUnit}/tags?${queryString.toString()}`);
  }
  public getTranslations(locale: string) {
    return this.get(`/api/internal/translations/${locale}`);
  }
  public getPage({
    customer,
    businessUnit,
    pageId,
    locale,
    countryCode
  }: {
    customer: string;
    businessUnit: string;
    pageId: string;
    locale: string;
    countryCode?: string;
  }) {
    const queryString = querystring.stringify({
      deviceGroup: this.deviceGroup,
      locale,
      countryCode
    });
    return this.get(
      `/api/internal/customer/${customer}/businessunit/${businessUnit}/page/${pageId}?${queryString}`
    ).then(data => deserialize(WLPageModel, data));
  }
  public getComponentByInternalUrl<T extends WLComponent>({
    internalUrl,
    type,
    useAuthHeader
  }: {
    internalUrl: string;
    type: new () => T;
    useAuthHeader: boolean;
  }): Promise<T> {
    const headers = useAuthHeader ? this.options.authHeader() : undefined;
    return this.get(internalUrl, headers).then(data => deserialize(type, data));
  }
  public getAssetPageById({
    customer,
    businessUnit,
    assetId,
    locale,
    countryCode
  }: {
    customer: string;
    businessUnit: string;
    assetId: string;
    locale: string;
    countryCode?: string;
  }) {
    const queryString = querystring.stringify({
      deviceGroup: this.deviceGroup,
      locale,
      countryCode
    });
    return this.get(
      `/api/internal/customer/${customer}/businessunit/${businessUnit}/detailPage/${assetId}?${queryString}`
    ).then(data => deserialize(WLPageModel, data));
  }

  public getAssetById({
    customer,
    businessUnit,
    assetId,
    locale
  }: {
    customer: string;
    businessUnit: string;
    assetId: string;
    locale: string;
  }) {
    return this.get(
      `/api/internal/exposure/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}?deviceGroup=${this.deviceGroup}&locale=${locale}&includeSeasons=true&fieldSet=ALL&includeEpisodes=true`
    ).then(data => deserialize(WLAsset, data));
  }

  public getAssetsByIds({
    customer,
    businessUnit,
    assetIds,
    locale
  }: {
    customer: string;
    businessUnit: string;
    assetIds: string[];
    locale: string;
  }): Promise<WLAsset[]> {
    return this.getAssets({ customer, businessUnit, assetIds, locale });
  }

  public getAssets({
    customer,
    businessUnit,
    locale,
    assetIds,
    sortOrder = "-created",
    products,
    type,
    countryCode,
    query
  }: {
    type?: string;
    customer: string;
    businessUnit: string;
    assetIds?: string[];
    locale: string;
    sortOrder?: string;
    products?: string[];
    countryCode?: string;
    query?: string;
  }): Promise<WLAsset[]> {
    const queryString = querystring.stringify({
      locale,
      deviceGroup: this.deviceGroup,
      includeSeasons: true,
      fieldSet: "ALL",
      includeEpisodes: true,
      assetIds,
      sort: sortOrder,
      products,
      assetType: type,
      countryCode,
      query
    });
    return this.get(
      `/api/internal/exposure/v1/customer/${customer}/businessunit/${businessUnit}/content/asset?${queryString}`
    ).then(data => data.items.map(a => deserialize(WLAsset, a)));
  }

  public search({ url, searchTerm }: { url: string; searchTerm: string }): Promise<WLAsset[]> {
    return this.get(url.replace("{query}", searchTerm)).then(data => {
      return data.items.map(item => deserialize(WLAsset, item));
    });
  }

  public getChannelPicker({
    locale,
    count,
    customer,
    businessUnit
  }: {
    count?: number;
    locale: string;
    customer: string;
    businessUnit: string;
  }): Promise<IWLEPG> {
    const queryString = querystring.stringify({
      locale,
      deviceGroup: this.deviceGroup,
      count
    });
    return this.get(
      `/api/internal/customer/${customer}/businessunit/${businessUnit}/channelpicker?${queryString}`
    ).then(data => ({
      channels: data.channels.map(c => ({
        channel: deserialize(WLAsset, c.channel),
        programs: c.programs.map(p => deserialize(WLAsset, p))
      }))
    }));
  }

  public getPushNextContent({
    customer,
    businessUnit,
    assetId,
    locale
  }: {
    customer: string;
    businessUnit: string;
    assetId: string;
    locale: string;
  }) {
    const queryString = querystring.stringify({
      locale,
      deviceGroup: this.deviceGroup
    });
    return this.get(
      `/api/internal/customer/${customer}/businessunit/${businessUnit}/push-next-content/${assetId}?${queryString}`
    ).then(data => {
      return {
        upNext: data.upNext ? deserialize(WLAsset, data.upNext) : null,
        recommendations: data.recommendations.map(a => deserialize(WLAsset, a))
      };
    });
  }

  public getEpgs({
    customer,
    businessUnit,
    locale,
    date,
    daysBackward,
    daysForward
  }: {
    locale: string;
    date: string;
    daysForward?: number;
    daysBackward?: number;
    customer: string;
    businessUnit: string;
  }): Promise<IWLEPG> {
    const queryString = querystring.stringify({
      locale,
      deviceGroup: this.deviceGroup,
      daysForward,
      daysBackward
    });
    return this.get(`/api/internal/customer/${customer}/businessunit/${businessUnit}/epgs/${date}?${queryString}`).then(
      data => ({
        channels: data.channels.map(c => ({
          channel: deserialize(WLAsset, c.channel),
          programs: c.programs.map(p => deserialize(WLAsset, p))
        }))
      })
    );
  }
  public getPageByBase64Query({
    customer,
    businessUnit,
    query,
    locale,
    countryCode
  }: {
    customer: string;
    businessUnit: string;
    query: string;
    locale: string;
    countryCode?: string;
  }) {
    const queryString = querystring.stringify({
      deviceGroup: this.deviceGroup,
      locale,
      countryCode
    });
    return this.get(
      `/api/internal/customer/${customer}/businessunit/${businessUnit}/browse/${query}?${queryString}`
    ).then(data => deserialize(WLPageModel, data));
  }

  public getAssetList({
    customer,
    businessUnit,
    locale,
    listId
  }: {
    customer: string;
    businessUnit: string;
    listId: string;
    locale: string;
  }) {
    const queryString = querystring.stringify({
      deviceGroup: this.deviceGroup,
      locale
    });
    return this.get(
      `/api/internal/exposure/v1/customer/${customer}/businessunit/${businessUnit}/preferences/list/${listId}/asset?${queryString}`,
      this.options.authHeader()
    ).then(data => data.items.map(a => deserialize(WLAsset, a)));
  }
}
