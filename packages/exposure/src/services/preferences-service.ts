import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { PreferenceListTags, PreferenceListItem } from "../models/preference-model";

interface GetListByIdOptions extends CustomerAndBusinessUnitOptions {
  listId: string;
}

interface DeleteAssetFromListOptions extends GetListByIdOptions {
  assetId: string;
}

interface AddAssetToListOptions extends DeleteAssetFromListOptions {
  order?: number;
}

interface GetAssetFromListOptions extends DeleteAssetFromListOptions {}

interface GetTagsFromList extends CustomerAndBusinessUnitOptions {
  listId: string;
}

interface DeleteTagFromListOptions extends GetTagsFromList {
  tagId: string;
}

interface AddTagToListOptions extends DeleteTagFromListOptions {
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
    ).then(data => data.map(item => deserialize(PreferenceListItem, item)));
  }
  public addAssetToList({ customer, businessUnit, listId, assetId, order }: AddAssetToListOptions) {
    return this.post(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/preferences/list/${listId}/asset/${assetId}`,
      {
        order: order || 0
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
  public getAssetFromList({ listId, assetId, customer, businessUnit }: GetAssetFromListOptions) {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/preferences/list/${listId}/asset/${assetId}`,
      this.options.authHeader()
    ).then(data => deserialize(PreferenceListItem, data));
  }

  public addTagToList({ customer, businessUnit, listId, tagId, order }: AddTagToListOptions) {
    return this.post(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/preferences/list/${listId}/tag/${tagId}`,
      {
        order: order || 0
      },
      this.options.authHeader()
    );
  }

  public deleteTagFromList({ customer, businessUnit, listId, tagId }: DeleteTagFromListOptions) {
    return this.delete(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/preferences/list/${listId}/tag/${tagId}`,
      this.options.authHeader()
    );
  }

  public getTagsFromList({ customer, businessUnit, listId }: GetTagsFromList): Promise<PreferenceListTags> {
    return this.get(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/preferences/list/${listId}/tag`,
      this.options.authHeader()
    );
  }
}
