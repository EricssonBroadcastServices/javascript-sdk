import axios from "axios";
import { deserialize } from "../decorators/property-mapper";
import { ApiError } from "../models/api-error-model";

interface Headers {
  [key: string]: string;
}

export interface AuthHeaders extends Headers {
  Authorization: string;
}

export interface BaseRequestOptions {
  headers?: Headers;
}

export interface AuthenticatedRequestOptions {
  headers: AuthHeaders;
}

export interface CustomerAndBusinessUnitOptions extends BaseRequestOptions {
  customer?: string;
  businessUnit?: string;
}

export interface ServiceOptions {
  baseUrl?: string;
  authHeader: () => AuthHeaders | undefined;
  customer?: string;
  businessUnit?: string;
}

interface CuBuUrlOptions extends CustomerAndBusinessUnitOptions {
  apiVersion: "v1" | "v2" | "v1/whitelabel";
}

export const errorMapper = err => {
  if (!err)
    throw deserialize(ApiError, { message: "Unknown error", httpCode: 500 });
  if (typeof err === "string")
    throw deserialize(ApiError, { message: err, httpCode: 500 });
  throw deserialize(ApiError, {
    httpCode: err.response ? err.response.status : 500,
    message: err.response?.data?.message ? err.response?.data?.message : err.message
  });
};

export class BaseService {
  constructor(public options: ServiceOptions) {}
  public setOptions(options: ServiceOptions) {
    this.options = options;
  }
  public cuBuUrl({ customer, businessUnit, apiVersion }: CuBuUrlOptions) {
    const cu = customer || this.options.customer;
    const bu = businessUnit || this.options.businessUnit;
    if (!cu || !bu) throw new Error("Missing customer or businessUnit");
    return `/${apiVersion}/customer/${cu}/businessunit/${bu}`;
  }
  public get(url: string, headers?: Headers) {
    return axios
      .get(this.options.baseUrl + url, { headers })
      .then(response => response.data)
      .catch(errorMapper);
  }
  public delete(url: string, headers?: Headers) {
    return axios
      .delete(this.options.baseUrl + url, { headers })
      .then(response => response.data)
      .catch(errorMapper);
  }
  public put(url: string, data: any, headers?: Headers) {
    return axios
      .put(this.options.baseUrl + url, data, { headers })
      .then(response => response.data)
      .catch(errorMapper);
  }
  public post(url: string, data: any, headers?: Headers) {
    return axios
      .post(this.options.baseUrl + url, data, { headers })
      .then(response => response.data)
      .catch(errorMapper);
  }
}
