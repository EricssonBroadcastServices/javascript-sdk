import * as querystring from "query-string";
import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { Asset } from "../models/asset-model";
import { IAssetResponse } from "../interfaces/content/asset-response";
import { ISearchV3Response } from "../interfaces/search/search";

export interface SearchOptions extends CustomerAndBusinessUnitOptions {
  query: string;
  locale: string;
  types?: string[];
}

export class SearchService extends BaseService {
  public search({
    customer,
    businessUnit,
    query,
    locale,
    types = ["MOVIE", "TV_SHOW", "EPISODE", "CLIP", "TV_CHANNEL"]
  }: SearchOptions): Promise<IAssetResponse> {
    const requestQuery = {
      fieldSet: "ALL",
      locale,
      types: types.join(",")
    };
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v1",
        customer,
        businessUnit
      })}/content/search/query/${query}?${querystring.stringify(requestQuery)}`
    ).then(data => ({
      ...data,
      items: data.items.map(i => deserialize(Asset, i.asset))
    }));
  }

  public searchV3({
    customer,
    businessUnit,
    locale,
    query,
    types = ["MOVIE", "TV_SHOW", "EPISODE", "CLIP", "TV_CHANNEL"]
  }: SearchOptions): Promise<ISearchV3Response> {
    const requestQuery = {
      fieldSet: "ALL",
      locale,
      types: types.join(",")
    };
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v3",
        customer,
        businessUnit
      })}/content/search/query/${query}?${querystring.stringify(requestQuery)}`
    ).then(data => ({
      ...data,
      assetHits: {
        ...data.assetHits,
        items: data.assetHits.items.map(a => ({ asset: deserialize(Asset, a.asset) }))
      }
    }));
  }
}
