/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

export type RequestParams = Record<string, any>;
export type UriComponent = string | number | boolean;
export type QueryParams = Record<string, UriComponent | UriComponent[]>;

export type ServiceContext = {
  baseUrl: string;
  customer: string;
  businessUnit: string;
  sessionToken?: string;
  errorFactory?: (response: Response) => Error;
};

export type requestArgs = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string | URL;
  headers?: Record<string, string>;
  query?: QueryParams;
  body?: Record<string, any>;
  ctx?: ServiceContext;
};

const keyStorage = new Map<string, string>();

function toQueryString(query: QueryParams = {}): string {
  const sanitized = Object.entries(query)
    .filter(([, val]) => typeof val !== "undefined")
    .map(([key, val]) => [key, Array.isArray(val) ? val.join(",") : val]);

  return String(new URLSearchParams(Object.fromEntries(sanitized)));
}

function defaultErrorFactory(response: Response) {
  return new Error(`HTTP Error: ${response.statusText} (${response.status})`);
}

export async function request<T = any>({ method, url, headers = {}, query = {}, body, ctx }: requestArgs): Promise<T> {
  const fullUrl = Object.keys(query).length ? `${url}/?${toQueryString(query)}` : url;
  const headerKeys = Object.keys(headers).map(key => key.toLowerCase());
  let ctxIdent = ctx ? [ctx.baseUrl, ctx.customer, ctx.businessUnit].join(":") : "";

  if (!headerKeys.includes("content-type")) {
    headers["content-type"] = "application/json";
  }
  if (ctxIdent && !headerKeys.includes("authorization")) {
    const sessionToken = keyStorage.get(ctxIdent);
    if (sessionToken) {
      headers.authorization = `Bearer ${sessionToken}`;
    }
  }
  const params = { method, headers };
  if (body) {
    Object.assign(params, { body: JSON.stringify(body) });
  }
  const response = await fetch(fullUrl, params);
  if (!response.ok) {
    throw (ctx?.errorFactory || defaultErrorFactory)(response);
  }
  const data = await response.json();
  if (ctxIdent && data?.sessionToken) {
    keyStorage.set(ctxIdent, data.sessionToken);
  }
  return data;
}
