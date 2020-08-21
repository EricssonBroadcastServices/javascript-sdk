import { BaseService, ServiceOptions } from "@EricssonBroadcastServices/exposure-sdk";
import { WLConfig, WLPageModel, WLComponent, WLAsset, DeviceGroup } from "../index";
interface WhiteLabelServiceOptions extends ServiceOptions {
    deviceGroup: DeviceGroup;
    origin: string;
}
export declare class WhiteLabelService extends BaseService {
    private deviceGroup;
    private origin;
    constructor(apiOptions: WhiteLabelServiceOptions);
    getConfig({ locale, }: {
        locale: string;
    }): Promise<WLConfig>;
    getConfigByCustomerAndBusinessUnit({ locale, customer, businessUnit }: {
        locale: string;
        customer: string;
        businessUnit: string;
    }): Promise<WLConfig>;
    getTranslations(locale: string): Promise<any>;
    getPage({ customer, businessUnit, pageId, locale }: {
        customer: string;
        businessUnit: string;
        pageId: string;
        locale: string;
    }): Promise<WLPageModel>;
    getComponentByInternalUrl<T extends WLComponent>({ internalUrl, type, useAuthHeader }: {
        internalUrl: string;
        type: new () => T;
        useAuthHeader: boolean;
    }): Promise<T>;
    getAssetPageById({ customer, businessUnit, assetId, locale }: {
        customer: string;
        businessUnit: string;
        assetId: string;
        locale: string;
    }): Promise<WLPageModel>;
    getAssetById({ customer, businessUnit, assetId, locale }: {
        customer: string;
        businessUnit: string;
        assetId: string;
        locale: string;
    }): Promise<WLAsset>;
    getAssetsByIds({ customer, businessUnit, assetIds, locale }: {
        customer: string;
        businessUnit: string;
        assetIds: string[];
        locale: string;
    }): Promise<WLAsset[]>;
    getAssets({ customer, businessUnit, locale, assetIds, sortOrder, products, type }: {
        type?: string;
        customer: string;
        businessUnit: string;
        assetIds?: string[];
        locale: string;
        sortOrder?: string;
        products?: string[];
    }): Promise<WLAsset[]>;
    search({ url, searchTerm }: {
        url: string;
        searchTerm: string;
    }): Promise<WLAsset[]>;
}
export {};
