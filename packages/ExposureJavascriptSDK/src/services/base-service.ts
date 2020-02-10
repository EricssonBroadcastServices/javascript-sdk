import axios from "axios";
import { deserialize } from "../decorators/property-mapper";
import { ApiError } from "../models/ApiError";

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
  customer: string;
  businessUnit: string;
}

export interface ServiceOptions {
  baseUrl?: string;
  authHeader: () => AuthHeaders;
}

const errorMapper = err => {
  throw deserialize(ApiError, {
    httpCode: err.response.status,
    message: err.message
  });
};

export class BaseService {
  constructor(public options: ServiceOptions) {}
  public get(url: string, headers?: Headers) {
    return axios
      .get(this.options.baseUrl + url, { ...(headers || {}) })
      .then(response => response.data)
      .catch(errorMapper);
  }
  public delete(url: string, headers?: Headers) {
    return axios
      .delete(this.options.baseUrl + url, { ...(headers || {}) })
      .then(response => response.data)
      .catch(errorMapper);
  }
  public put(url: string, data: any, headers?: Headers) {
    return axios
      .put(this.options.baseUrl + url, data, { ...(headers || {}) })
      .then(response => response.data)
      .catch(errorMapper);
  }
  public post(url: string, data: any, headers?: Headers) {
    return axios
      .post(this.options.baseUrl + url, data, { ...(headers || {}) })
      .then(response => response.data)
      .catch(errorMapper);
  }
}
