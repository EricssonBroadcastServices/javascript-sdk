import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { PreferenceListTags, PreferenceListItem, UserPreferences } from "../models/preference-model";

interface GetListByIdOptions extends CustomerAndBusinessUnitOptions {
  listId: string;
}

interface DeleteAssetFromListOptions extends GetListByIdOptions {
  assetId: string;
}

interface AddAssetToListOptions extends DeleteAssetFromListOptions {
  order?: number;
}

type GetAssetFromListOptions = DeleteAssetFromListOptions;

interface GetTagsFromList extends CustomerAndBusinessUnitOptions {
  listId: string;
}

interface DeleteTagFromListOptions extends GetTagsFromList {
  tagId: string;
}

interface AddTagToListOptions extends DeleteTagFromListOptions {
  order?: number;
}

type GetPreferencesOptions = CustomerAndBusinessUnitOptions;

interface GetPreferenceOptions extends CustomerAndBusinessUnitOptions {
  key: string;
}

interface SetPreferenceOptions extends CustomerAndBusinessUnitOptions {
  key: string;
  value: string | boolean | Array<string | number> | number;
}

export class PreferencesService extends BaseService {
  public getListById({ customer, businessUnit, listId }: GetListByIdOptions): Promise<PreferenceListItem[]> {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1",
      })}/preferences/list/${listId}/asset`,
      this.options.authHeader()
    ).then((data) => data.map((item) => deserialize(PreferenceListItem, item)));
  }
  public addAssetToList({ customer, businessUnit, listId, assetId, order }: AddAssetToListOptions) {
    return this.post(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1",
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
        apiVersion: "v1",
      })}/preferences/list/${listId}/asset/${assetId}`,
      this.options.authHeader()
    );
  }
  public getAssetFromList({ listId, assetId, customer, businessUnit }: GetAssetFromListOptions) {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1",
      })}/preferences/list/${listId}/asset/${assetId}`,
      this.options.authHeader()
    ).then((data) => deserialize(PreferenceListItem, data));
  }

  public addTagToList({ customer, businessUnit, listId, tagId, order }: AddTagToListOptions) {
    return this.post(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/preferences/list/${listId}/tag/${tagId}`,
      {
        order: order || 0,
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

  public getPreferences({ customer, businessUnit }: GetPreferencesOptions): Promise<UserPreferences> {
    return this.get(
      `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/preferences`,
      this.options.authHeader()
    );
  }

  public getPreference({ customer, businessUnit, key }: GetPreferenceOptions): Promise<string> {
    return this.getPreferences({ customer, businessUnit }).then((userPreferences) => {
      if (!userPreferences.preferences || !userPreferences.preferences[key]) return "";
      return userPreferences.preferences[key];
    });
  }

  public setPreference({ customer, businessUnit, key, value }: SetPreferenceOptions) {
    return this.getPreferences({ customer, businessUnit })
      .then((userPreferences) => {
        userPreferences.preferences[key] = value.toString();
        delete userPreferences.lastUpdated;
        return userPreferences;
      })
      .then((updatedPreferences) =>
        this.post(
          `${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/preferences`,
          updatedPreferences,
          this.options.authHeader()
        )
      );
  }
}
