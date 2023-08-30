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
};

export type requestArgs = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string | URL;
  headers?: Record<string, string>;
  query?: QueryParams;
  body?: Record<string, any>;
};

function toQueryString(query: QueryParams = {}): string {
  const sanitized = Object.entries(query)
    .filter(([, val]) => typeof val !== "undefined")
    .map(([key, val]) => [key, Array.isArray(val) ? val.join(",") : val]);

  return String(new URLSearchParams(Object.fromEntries(sanitized)));
}

export async function request<T = any>({
  method,
  url,
  headers = { "Content-Type": "application/json" },
  query = {},
  body
}: requestArgs): Promise<T> {
  const fullUrl = Object.keys(query).length ? `${url}/?${toQueryString(query)}` : url;
  const params = { method, headers };
  if (body) {
    Object.assign(params, { body: JSON.stringify(body) });
  }
  const response = await fetch(fullUrl, params);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.statusText} (${response.status})`);
  }
  return response.json();
}