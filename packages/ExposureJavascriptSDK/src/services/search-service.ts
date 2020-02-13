import * as querystring from "query-string";
import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { AssetResponse } from "../models/asset-model";

export interface SearchOptions extends CustomerAndBusinessUnitOptions {
  query: string;
  locale: string;
}

export class SearchService extends BaseService {
  public search({ customer, businessUnit, query, locale }: SearchOptions) {
    const requestQuery = {
      fieldSet: "ALL",
      locale,
      types: "MOVIE,TV_SHOW,EPISODE,CLIP,TV_CHANNEL"
    };
    return this.get(
      `/v1/customer/${customer}/businessunit/${businessUnit}/content/search/query/${query}?${querystring.stringify(
        requestQuery
      )}`
    ).then(data => {
      return deserialize(AssetResponse, {
        ...data,
        items: data.items.map(i => i.asset)
      });
    });
  }
}
