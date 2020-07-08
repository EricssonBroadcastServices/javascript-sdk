import { BaseService, deserialize } from "../index";
import { WLConfig, WLPageModel, WLComponent, WLAsset, DeviceGroup } from "../white-label";
import {ServiceOptions} from "./base-service";

interface WhiteLabelServiceOptions extends ServiceOptions {
  deviceGroup: DeviceGroup,
  origin: string
}

export class WhiteLabelService extends BaseService {
  private deviceGroup: DeviceGroup;
  private origin: string;

  constructor(apiOptions: WhiteLabelServiceOptions) {
    const { deviceGroup, origin, ...baseOptions } = apiOptions;
    super(baseOptions);

    this.origin = origin;
    this.deviceGroup = deviceGroup;
  }

  public getConfig({
    locale,
  }: { locale: string }) {
    return this.get(`/api/internal/origin/config?locale=${locale}&deviceGroup=${this.deviceGroup}&origin=${this.origin}`)
      .then(data => deserialize(WLConfig, data));
  }

  public getConfigByCustomerAndBusinessUnit({
    locale,
    customer,
    businessUnit
  }: { locale: string; customer: string; businessUnit: string}) {
    return this.get(`/api/internal/customer/${customer}/businessunit/${businessUnit}/config?locale=${locale}&deviceGroup=${this.deviceGroup}`)
      .then(data => deserialize(WLConfig, data));
  }

  public getTranslations(locale: string) {
    return this.get(`/api/internal/translations/${locale}`);
  }
  public getPage({ customer, businessUnit, pageId, locale }: { customer: string; businessUnit: string; pageId: string; locale: string }) {
    return this.get(`/api/internal/customer/${customer}/businessunit/${businessUnit}/page/${pageId}?deviceGroup=${this.deviceGroup}&locale=${locale}`)
      .then(data => deserialize(WLPageModel, data));
  }
  public getComponentByInternalUrl<T extends WLComponent>({ internalUrl, type, useAuthHeader }: { internalUrl: string; type: new ()=> T; useAuthHeader: boolean }): Promise<T> {
    const headers = useAuthHeader ? this.options.authHeader() : undefined;
    return this.get(internalUrl, headers)
      .then(data => deserialize(type, data));
  }
  public getAssetPageById({ customer, businessUnit, assetId, locale }: { customer: string; businessUnit: string; assetId: string; locale: string }) {
    return this.get(`/api/internal/customer/${customer}/businessunit/${businessUnit}/detailPage/${assetId}?deviceGroup=${this.deviceGroup}&locale=${locale}`)
      .then(data => deserialize(WLPageModel, data));
  }

  public getAssetById({ customer, businessUnit, assetId, locale }: { customer: string; businessUnit: string; assetId: string; locale: string }) {
    return this.get(`/api/internal/exposure/v1/customer/${customer}/businessunit/${businessUnit}/content/asset/${assetId}?deviceGroup=${this.deviceGroup}&locale=${locale}&includeSeasons=true&fieldSet=ALL&includeEpisodes=true`)
      .then(data => deserialize(WLAsset, data));
  }

  public search({ url, searchTerm }: { url: string; searchTerm: string }): Promise<WLAsset[]> {
    return this.get(url.replace("{query}", searchTerm))
      .then(data => {
        return data.items.map(item => deserialize(WLAsset, item));
      });
  }
}
