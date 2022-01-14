import { IHttpClient, IRequestError, TErrorMapper } from "../interfaces/http-client";

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

export interface IHttpOptions {
  client: IHttpClient;
  errorMapper: TErrorMapper;
}
export interface ServiceOptions {
  baseUrl?: string;
  authHeader: () => AuthHeaders | undefined;
  customer?: string;
  businessUnit?: string;
  http: IHttpOptions;
}

interface CuBuUrlOptions extends CustomerAndBusinessUnitOptions {
  apiVersion: "v1" | "v2" | "v1/whitelabel" | "v3";
}
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

  public get(url: string, headers?: Headers, customErrorHandler?: (err: IRequestError) => void) {
    return this.options.http.client
      .get(new URL(url, this.options.baseUrl).toString(), { headers })
      .then(response => response.data)
      .catch(err => {
        throw this.options.http.errorMapper(err);
      })
      .catch((err: IRequestError) => {
        if (customErrorHandler) throw customErrorHandler(err);
        throw err;
      });
  }
  public delete(url: string, headers?: Headers, customErrorHandler?: (err: IRequestError) => void) {
    return this.options.http.client
      .delete(new URL(url, this.options.baseUrl).toString(), { headers })
      .then(response => response.data)
      .catch(err => {
        throw this.options.http.errorMapper(err);
      })
      .catch((err: IRequestError) => {
        if (customErrorHandler) throw customErrorHandler(err);
        throw err;
      });
  }
  public put(url: string, data: any, headers?: Headers, customErrorHandler?: (err: IRequestError) => void) {
    return this.options.http.client
      .put(new URL(url, this.options.baseUrl).toString(), data, { headers })
      .then(response => response.data)
      .catch(err => {
        throw this.options.http.errorMapper(err);
      })
      .catch((err: IRequestError) => {
        if (customErrorHandler) throw customErrorHandler(err);
        throw err;
      });
  }
  public post(url: string, data: any, headers?: Headers, customErrorHandler?: (err: IRequestError) => void) {
    return this.options.http.client
      .post(new URL(url, this.options.baseUrl).toString(), data, { headers })
      .then(response => response.data)
      .catch(err => {
        throw this.options.http.errorMapper(err);
      })
      .catch((err: IRequestError) => {
        if (customErrorHandler) throw customErrorHandler(err);
        throw err;
      });
  }
}
