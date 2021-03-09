import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { PreferenceListItem } from "../models/asset-model";

interface GetListByIdOptions extends CustomerAndBusinessUnitOptions {
  listId: string;
}

interface DeleteAssetFromListOptions extends GetListByIdOptions {
  assetId: string;
}

interface AddAssetToListOptions extends DeleteAssetFromListOptions {
  order?: number;
}

export class PreferencesService extends BaseService {
  public getListById({ customer, businessUnit, listId }: GetListByIdOptions): Promise<PreferenceListItem[]> {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/preferences/list/${listId}/asset`,
      this.options.authHeader()
    ).then(data => data.map(item => deserialize(PreferenceListItem, item)))
  }
  public addAssetToList({ customer, businessUnit, listId, assetId, order }: AddAssetToListOptions) {
    return this.post(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/preferences/list/${listId}/asset/${assetId}`,
      {
        order: order || 0,
      },
      this.options.authHeader()
    );
  }
  public deleteAssetFromList({ customer, businessUnit, listId, assetId }: DeleteAssetFromListOptions) {
    return this.delete(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/preferences/list/${listId}/asset/${assetId}`,
      this.options.authHeader()
    );
  }
  public getAssetFromList({ listId, assetId, customer, businessUnit }: DeleteAssetFromListOptions) {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/preferences/list/${listId}/asset/${assetId}`,
      this.options.authHeader()
    ).then(data => deserialize(PreferenceListItem, data));
  }
}
