import axios, { AxiosError } from "axios";
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
  apiVersion: "v1" | "v2" | "v1/whitelabel" | "v3";
}

export const errorMapper = err => {
  if (!err) throw new ApiError({ message: "Unknown error", httpCode: 500 });
  if (typeof err === "string") throw new ApiError({ message: err, httpCode: 500 });
  throw new ApiError({
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

  public get(url: string, headers?: Headers, customErrorHandler?: (err: AxiosError) => void) {
    return axios
      .get(new URL(url, this.options.baseUrl).toString(), { headers })
      .then(response => response.data)
      .catch(customErrorHandler || errorMapper);
  }
  public delete(url: string, headers?: Headers, customErrorHandler?: (err: AxiosError) => void) {
    return axios
      .delete(new URL(url, this.options.baseUrl).toString(), { headers })
      .then(response => response.data)
      .catch(customErrorHandler || errorMapper);
  }
  public put(url: string, data: any, headers?: Headers, customErrorHandler?: (err: AxiosError) => void) {
    return axios
      .put(new URL(url, this.options.baseUrl).toString(), data, { headers })
      .then(response => response.data)
      .catch(customErrorHandler || errorMapper);
  }
  public post(url: string, data: any, headers?: Headers, customErrorHandler?: (err: AxiosError) => void) {
    return axios
      .post(new URL(url, this.options.baseUrl).toString(), data, { headers })
      .then(response => response.data)
      .catch(customErrorHandler || errorMapper);
  }
}
